/* eslint-disable @typescript-eslint/default-param-last */
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
import type { Nft, NftContract } from '@metamask/assets-controllers';
import type { RootState } from '..';

/**
 * Builds a set of chain IDs for filtering. When chainIds include CAIP-2 (e.g. from listPopularNetworks),
 * adds Hex form for eip155:* so we match NFT keys which are Hex.
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

interface CollectibleIdentifier {
  tokenId: string;
  address: string;
}

interface FavoritesMap {
  [address: string]: {
    [chainId: string]: CollectibleIdentifier[];
  };
}

export interface CollectiblesState {
  favorites: FavoritesMap;
  isNftFetchingProgress: boolean;
}

const favoritesSelector = (state: RootState): FavoritesMap =>
  state.collectibles.favorites;

export const isNftFetchingProgressSelector = (state: RootState): boolean =>
  state.collectibles.isNftFetchingProgress;

export const collectibleContractsSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNftContracts,
  (address: string | undefined, chainId: string, allNftContracts: Record<string, Record<string, NftContract[]>>): NftContract[] =>
    allNftContracts[address ?? '']?.[chainId] || [],
);

/**
 * @deprecated - this does not return all collectibles if multiple networks are selected
 */
export const collectiblesSelector = createDeepEqualSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNfts,
  (address: string | undefined, chainId: string, allNfts: Record<string, Record<string, Nft[]>>): Nft[] =>
    allNfts[address ?? '']?.[chainId] || [],
);

/**
 * Multichain collectibles filtered by chain IDs.
 */
export const multichainCollectiblesByEnabledNetworksSelector =
  createDeepEqualSelector(
    [
      selectSelectedInternalAccountAddress,
      selectAllNfts,
      selectEnabledNetworksByNamespace,
      (_state: unknown, preferredChainIds?: string[]) => preferredChainIds,
      (_state: unknown, _preferredChainIds?: string[], addressesOverride?: string[]) => addressesOverride,
    ],
    (
      selectedAddress: string | undefined,
      allNfts: Record<string, Record<string, Nft[]>>,
      enabledNetworks: Record<string, Record<string, boolean>>,
      preferredChainIds?: string[],
      addressesOverride?: string[],
    ): Record<string, Nft[]> => {
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
          const networkMap = enabledNetworks[namespace] || {};
          for (const chainId of Object.keys(networkMap)) {
            if (networkMap[chainId]) enabledChainIds.push(chainId);
          }
        }

        if (enabledChainIds.length === 0) {
          return {};
        }

        allowedChainIdsSet = new Set(enabledChainIds);
      }

      const result: Record<string, Nft[]> = {};
      for (const address of addresses) {
        const addressNfts = allNfts?.[address];
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
  (address: string | undefined, chainId: string, favorites: FavoritesMap): CollectibleIdentifier[] =>
    favorites[address ?? '']?.[chainId] || [],
);

export const isCollectibleInFavoritesSelector = createSelector(
  favoritesCollectiblesSelector,
  (_state: unknown, collectible: CollectibleIdentifier) => collectible,
  (favoriteCollectibles: CollectibleIdentifier[], collectible: CollectibleIdentifier): boolean =>
    Boolean(
      favoriteCollectibles.find(
        ({ tokenId, address }) =>
          compareTokenIds(tokenId, collectible.tokenId) &&
          address === collectible.address,
      ),
    ),
);

const getFavoritesCollectibles = (
  favoriteCollectibles: FavoritesMap,
  selectedAddress: string,
  chainId: string,
): CollectibleIdentifier[] => favoriteCollectibles[selectedAddress]?.[chainId] || [];

export const ADD_FAVORITE_COLLECTIBLE = 'ADD_FAVORITE_COLLECTIBLE';
export const REMOVE_FAVORITE_COLLECTIBLE = 'REMOVE_FAVORITE_COLLECTIBLE';
export const SHOW_NFT_FETCHING_LOADER = 'SHOW_NFT_FETCHING_LOADER';
export const HIDE_NFT_FETCHING_LOADER = 'HIDE_NFT_FETCHING_LOADER';

const initialState: CollectiblesState = {
  favorites: {},
  isNftFetchingProgress: false,
};

interface CollectibleAction {
  type: string | null;
  selectedAddress?: string;
  chainId?: string;
  collectible?: CollectibleIdentifier;
}

const collectiblesFavoritesReducer = (
  state: CollectiblesState = initialState,
  action: CollectibleAction,
): CollectiblesState => {
  switch (action.type) {
    case ADD_FAVORITE_COLLECTIBLE: {
      const { selectedAddress, chainId, collectible } = action;
      if (!selectedAddress || !chainId || !collectible) return state;
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
      if (!selectedAddress || !chainId || !collectible) return state;
      const collectibles = getFavoritesCollectibles(
        state.favorites,
        selectedAddress,
        chainId,
      );
      const indexToRemove = collectibles.findIndex(
        ({ tokenId, address }) =>
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

export const showNftFetchingLoadingIndicator = (): { type: string } => ({
  type: SHOW_NFT_FETCHING_LOADER,
});

export const hideNftFetchingLoadingIndicator = (): { type: string } => ({
  type: HIDE_NFT_FETCHING_LOADER,
});

export default collectiblesFavoritesReducer;
