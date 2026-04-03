import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  if (bgState.NetworkController.provider) {
    bgState.NetworkController.providerConfig =
      bgState.NetworkController.provider;
    delete bgState.NetworkController.provider;
  }

  return state;
}
