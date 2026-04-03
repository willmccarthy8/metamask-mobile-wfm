import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;

  if ((state as Record<string, Record<string, unknown>>).networkOnboarded && (state as Record<string, Record<string, unknown>>).networkOnboarded.networkOnboardedState) {
    (state as Record<string, Record<string, unknown>>).networkOnboarded.networkOnboardedState = {};
  }
  return state;
}
