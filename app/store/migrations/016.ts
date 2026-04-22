/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export default function migrate(state: any) {
  if (state.engine.backgroundState.NetworkController.properties) {
    state.engine.backgroundState.NetworkController.networkDetails =
      state.engine.backgroundState.NetworkController.properties;
    delete state.engine.backgroundState.NetworkController.properties;
  }
  return state;
}
