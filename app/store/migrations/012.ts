import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  const {
    allCollectibles,
    allCollectibleContracts,
    ignoredCollectibles,
    ...unexpectedCollectiblesControllerState
  } = bgState.CollectiblesController;
  bgState.NftController = {
    ...unexpectedCollectiblesControllerState,
    allNfts: allCollectibles,
    allNftContracts: allCollectibleContracts,
    ignoredNfts: ignoredCollectibles,
  };
  delete bgState.CollectiblesController;

  bgState.NftDetectionController =
    bgState.CollectibleDetectionController;
  delete bgState.CollectibleDetectionController;

  bgState.PreferencesController.useNftDetection =
    bgState.PreferencesController.useCollectibleDetection;
  delete bgState.PreferencesController
    .useCollectibleDetection;

  return state;
}
