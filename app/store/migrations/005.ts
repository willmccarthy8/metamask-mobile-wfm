import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  bgState.TokensController = {
    allTokens: bgState.AssetsController.allTokens,
    ignoredTokens: bgState.AssetsController.ignoredTokens,
  };

  bgState.CollectiblesController = {
    allCollectibles:
      bgState.AssetsController.allCollectibles,
    allCollectibleContracts:
      bgState.AssetsController.allCollectibleContracts,
    ignoredCollectibles:
      bgState.AssetsController.ignoredCollectibles,
  };

  delete bgState.AssetsController;

  return state;
}
