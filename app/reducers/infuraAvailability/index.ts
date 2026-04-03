/* eslint-disable @typescript-eslint/default-param-last */
import type { RootState } from '..';

export const INFURA_AVAILABILITY_BLOCKED = 'INFURA_AVAILABILITY_BLOCKED';
export const INFURA_AVAILABILITY_NOT_BLOCKED =
  'INFURA_AVAILABILITY_NOT_BLOCKED';

export interface InfuraAvailabilityState {
  isBlocked: boolean;
}

export const initialState: InfuraAvailabilityState = {
  isBlocked: false,
};

export const getInfuraBlockedSelector = (state: RootState): boolean =>
  state.infuraAvailability?.isBlocked;

interface InfuraAction {
  type: string;
}

const infuraAvailabilityReducer = (
  state: InfuraAvailabilityState = initialState,
  action: InfuraAction,
): InfuraAvailabilityState => {
  switch (action.type) {
    case INFURA_AVAILABILITY_BLOCKED:
      return {
        ...state,
        isBlocked: true,
      };
    case INFURA_AVAILABILITY_NOT_BLOCKED:
      return {
        ...state,
        isBlocked: false,
      };
    default:
      return state;
  }
};
export default infuraAvailabilityReducer;
