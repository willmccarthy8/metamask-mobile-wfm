import { toHex } from '@metamask/controller-utils';
import { createSelector } from 'reselect';
import { selectChainId } from '../../selectors/networkController';
import {
  selectAllNftContracts,
  selectAllNfts,
} from '../../selectors/nftController';
import { selectSelectedInternalAccountAddress } from '../../selectors/accountsController';
import { compareTokenIds } from '../../util/tokens';
import { createDeepEqualSelector } from '../../selectors/util';
import { selectEnabledNetworksByNamespace } from '../../selectors/networkEnablementController';

export interface CollectibleIdentifier {
  tokenId: string;
  address: string;
}

export interface CollectiblesState {
  favorites: Record<string, Record<string, CollectibleIdentifier[]>>;
  isNftFetchingProgress: boolean;
}

/**
 * Builds a set of chain IDs for filtering. When chainIds include CAIP-2 (e.g. from listPopularNetworks),
 * adds Hex form for eip155:* so we match NFT keys which are Hex.
 * @param chainIds - CAIP-2 or Hex chain IDs
 * @returns Set of chain IDs
 */
function buildAllowedChainIdSet(chainIds: string[]): Set<string> {
  const set = new Set(chainIds);
  for (const id of chainIds) {
    if (id.startsWith('eip155:')) {
      const reference = id.slice(7);
      if (reference) set.add(toHex(reference));
    }
  }
  return set;
}

const favoritesSelector = (state: { collectibles: CollectiblesState }) =>
  state.collectibles.favorites;

export const isNftFetchingProgressSelector = (state: {
  collectibles: CollectiblesState;
}) => state.collectibles.isNftFetchingProgress;

export const collectibleContractsSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNftContracts,
  (address, chainId, allNftContracts) =>
    (address ? allNftContracts[address]?.[chainId as `0x${string}`] : undefined) || [],
);

/**
 * @deprecated - this does not return all collectibles if multiple networks are selected
 */
export const collectiblesSelector = createDeepEqualSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNfts,
  (address, chainId, allNfts) => (address ? allNfts[address]?.[chainId as `0x${string}`] : undefined) || [],
);

/**
 * Multichain collectibles filtered by chain IDs. When addressesOverride is passed (e.g. all
 * addresses in the selected account group), aggregates NFTs from those addresses so that when
 * Solana is selected we still include NFTs keyed by EVM address. When preferredChainIds is
 * passed (e.g. from listPopularNetworks()), uses that list; otherwise falls back to
 * selectEnabledNetworksByNamespace.
 * @param state - Redux state
 * @param preferredChainIds - Optional chain IDs (CAIP-2 or Hex) to filter by; when omitted, uses enabled networks
 * @param addressesOverride - Optional list of addresses to aggregate NFTs from; when omitted, uses selected account address only
 */
export const multichainCollectiblesByEnabledNetworksSelector =
  createDeepEqualSelector(
    [
      selectSelectedInternalAccountAddress,
      selectAllNfts,
      selectEnabledNetworksByNamespace,
      (state: unknown, preferredChainIds?: string[]) => preferredChainIds,
      (
        state: unknown,
        _preferredChainIds?: string[],
        addressesOverride?: string[],
      ) => addressesOverride,
    ],
    (
      selectedAddress,
      allNfts,
      enabledNetworks,
      preferredChainIds,
      addressesOverride,
    ) => {
      const addresses =
        addressesOverride != null &&
        Array.isArray(addressesOverride) &&
        addressesOverride.length > 0
          ? addressesOverride
          : selectedAddress
            ? [selectedAddress]
            : [];

      let allowedChainIdsSet: Set<string>;

      if (
        preferredChainIds != null &&
        Array.isArray(preferredChainIds) &&
        preferredChainIds.length > 0
      ) {
        allowedChainIdsSet = buildAllowedChainIdSet(preferredChainIds);
      } else {
        const enabledChainIds: string[] = [];
        for (const namespace of Object.keys(enabledNetworks || {})) {
          const networkMap =
            (enabledNetworks as Record<string, Record<string, boolean>>)[
              namespace
            ] || {};
          for (const chainId of Object.keys(networkMap)) {
            if (networkMap[chainId]) enabledChainIds.push(chainId);
          }
        }

        if (enabledChainIds.length === 0) {
          return {};
        }

        allowedChainIdsSet = new Set(enabledChainIds);
      }

      const result: Record<string, unknown[]> = {};
      for (const address of addresses) {
        const addressNfts = (allNfts as Record<string, Record<string, unknown[]>>)?.[address];
        if (!addressNfts) continue;
        for (const chainId of Object.keys(addressNfts)) {
          if (!allowedChainIdsSet.has(chainId)) continue;
          const nfts = addressNfts[chainId];
          if (!Array.isArray(nfts)) continue;
          result[chainId] = (result[chainId] || []).concat(nfts);
        }
      }

      return result;
    },
  );

export const favoritesCollectiblesSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  favoritesSelector,
  (address, chainId, favorites) => (address ? favorites[address]?.[chainId] : undefined) || [],
);

export const isCollectibleInFavoritesSelector = createSelector(
  favoritesCollectiblesSelector,
  (state: unknown, collectible: CollectibleIdentifier) => collectible,
  (favoriteCollectibles, collectible) =>
    Boolean(
      favoriteCollectibles.find(
        ({ tokenId, address }: CollectibleIdentifier) =>
          // TO DO: Remove after moving favorites to controllers.
          compareTokenIds(tokenId, collectible.tokenId) &&
          address === collectible.address,
      ),
    ),
);

const getFavoritesCollectibles = (
  favoriteCollectibles: Record<string, Record<string, CollectibleIdentifier[]>>,
  selectedAddress: string,
  chainId: string,
): CollectibleIdentifier[] =>
  favoriteCollectibles[selectedAddress]?.[chainId] || [];

export const ADD_FAVORITE_COLLECTIBLE = 'ADD_FAVORITE_COLLECTIBLE' as const;
export const REMOVE_FAVORITE_COLLECTIBLE =
  'REMOVE_FAVORITE_COLLECTIBLE' as const;
export const SHOW_NFT_FETCHING_LOADER = 'SHOW_NFT_FETCHING_LOADER' as const;
export const HIDE_NFT_FETCHING_LOADER = 'HIDE_NFT_FETCHING_LOADER' as const;

interface AddFavoriteCollectibleAction {
  type: typeof ADD_FAVORITE_COLLECTIBLE;
  selectedAddress: string;
  chainId: string;
  collectible: CollectibleIdentifier;
}

interface RemoveFavoriteCollectibleAction {
  type: typeof REMOVE_FAVORITE_COLLECTIBLE;
  selectedAddress: string;
  chainId: string;
  collectible: CollectibleIdentifier;
}

interface ShowNftFetchingLoaderAction {
  type: typeof SHOW_NFT_FETCHING_LOADER;
}

interface HideNftFetchingLoaderAction {
  type: typeof HIDE_NFT_FETCHING_LOADER;
}

type CollectiblesReducerAction =
  | AddFavoriteCollectibleAction
  | RemoveFavoriteCollectibleAction
  | ShowNftFetchingLoaderAction
  | HideNftFetchingLoaderAction;

const initialState: CollectiblesState = {
  favorites: {},
  isNftFetchingProgress: false,
};

const collectiblesFavoritesReducer = (
  state: CollectiblesState = initialState,
  action: CollectiblesReducerAction,
): CollectiblesState => {
  switch (action.type) {
    case ADD_FAVORITE_COLLECTIBLE: {
      const { selectedAddress, chainId, collectible } = action;
      const collectibles = getFavoritesCollectibles(
        state.favorites,
        selectedAddress,
        chainId,
      );
      collectibles.push({
        tokenId: collectible.tokenId,
        address: collectible.address,
      });
      const selectedAddressCollectibles =
        state.favorites[selectedAddress] || {};
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [selectedAddress]: {
            ...selectedAddressCollectibles,
            [chainId]: collectibles.slice(),
          },
        },
      };
    }
    case REMOVE_FAVORITE_COLLECTIBLE: {
      const { selectedAddress, chainId, collectible } = action;
      const collectibles = getFavoritesCollectibles(
        state.favorites,
        selectedAddress,
        chainId,
      );
      const indexToRemove = collectibles.findIndex(
        ({ tokenId, address }: CollectibleIdentifier) =>
          // TO DO: Remove after moving favorites to controllers.
          compareTokenIds(tokenId, collectible.tokenId) &&
          address === collectible.address,
      );
      collectibles.splice(indexToRemove, 1);
      const selectedAddressCollectibles =
        state.favorites[selectedAddress] || {};
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [selectedAddress]: {
            ...selectedAddressCollectibles,
            [chainId]: collectibles.slice(),
          },
        },
      };
    }
    case SHOW_NFT_FETCHING_LOADER: {
      return {
        ...state,
        isNftFetchingProgress: true,
      };
    }
    case HIDE_NFT_FETCHING_LOADER: {
      return {
        ...state,
        isNftFetchingProgress: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const showNftFetchingLoadingIndicator = (): ShowNftFetchingLoaderAction => ({
  type: SHOW_NFT_FETCHING_LOADER,
});

export const hideNftFetchingLoadingIndicator = (): HideNftFetchingLoaderAction => ({
  type: HIDE_NFT_FETCHING_LOADER,
});

export default collectiblesFavoritesReducer;
