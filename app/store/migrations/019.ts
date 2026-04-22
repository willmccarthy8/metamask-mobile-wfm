/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export default function migrate(state) {
  if (state.recents) {
    delete state.recents;
  }
  return state;
}
