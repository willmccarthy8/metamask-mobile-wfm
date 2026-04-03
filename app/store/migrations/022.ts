// @ts-nocheck
import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  if ((state as Record<string, Record<string, Record<string, unknown>>>)?.engine?.backgroundState?.PreferencesController?.openSeaEnabled) {
    bgState.PreferencesController.displayNftMedia =
      bgState.PreferencesController.openSeaEnabled ?? true;

    delete bgState.PreferencesController.openSeaEnabled;
  }
  if ((state as Record<string, Record<string, unknown>>)?.user?.nftDetectionDismissed) {
    delete (state as Record<string, Record<string, unknown>>).user.nftDetectionDismissed;
  }

  return state;
}
