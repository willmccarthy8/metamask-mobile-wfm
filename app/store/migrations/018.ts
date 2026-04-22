// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export default function migrate(state) {
  if (state.engine.backgroundState.TokensController.suggestedAssets) {
    delete state.engine.backgroundState.TokensController.suggestedAssets;
  }
  return state;
}
