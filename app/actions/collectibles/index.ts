import type { Action as ReduxAction } from 'redux';
import {
  ADD_FAVORITE_COLLECTIBLE,
  REMOVE_FAVORITE_COLLECTIBLE,
} from '../../reducers/collectibles';

export interface CollectibleIdentifier {
  tokenId: string;
  address: string;
}

export interface AddFavoriteCollectibleAction
  extends ReduxAction<typeof ADD_FAVORITE_COLLECTIBLE> {
  selectedAddress: string | undefined;
  chainId: string | undefined;
  collectible: CollectibleIdentifier;
}

export interface RemoveFavoriteCollectibleAction
  extends ReduxAction<typeof REMOVE_FAVORITE_COLLECTIBLE> {
  selectedAddress: string | undefined;
  chainId: string | undefined;
  collectible: CollectibleIdentifier;
}

export type CollectibleActionTypes =
  | AddFavoriteCollectibleAction
  | RemoveFavoriteCollectibleAction;

export const addFavoriteCollectible = (
  selectedAddress: string | undefined,
  chainId: string | undefined,
  collectible: CollectibleIdentifier,
): AddFavoriteCollectibleAction => ({
  type: ADD_FAVORITE_COLLECTIBLE,
  selectedAddress,
  chainId,
  collectible,
});

export const removeFavoriteCollectible = (
  selectedAddress: string | undefined,
  chainId: string | undefined,
  collectible: CollectibleIdentifier,
): RemoveFavoriteCollectibleAction => ({
  type: REMOVE_FAVORITE_COLLECTIBLE,
  selectedAddress,
  chainId,
  collectible,
});
