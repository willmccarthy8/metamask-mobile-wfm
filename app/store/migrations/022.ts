/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export default function migrate(state) {
  if (state?.engine?.backgroundState?.PreferencesController?.openSeaEnabled) {
    state.engine.backgroundState.PreferencesController.displayNftMedia =
      state.engine.backgroundState.PreferencesController.openSeaEnabled ?? true;

    delete state.engine.backgroundState.PreferencesController.openSeaEnabled;
  }
  if (state?.user?.nftDetectionDismissed) {
    delete state.user.nftDetectionDismissed;
  }

  return state;
}
