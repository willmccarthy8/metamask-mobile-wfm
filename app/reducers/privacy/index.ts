/* eslint-disable @typescript-eslint/default-param-last */
import {
  PrivacyActionType,
  type PrivacyActionTypes,
} from '../../actions/privacy';

export interface PrivacyState {
  approvedHosts: Record<string, boolean>;
  revealSRPTimestamps: (string | number)[];
}

export const initialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

const privacyReducer = (
  state: PrivacyState = initialState,
  action: PrivacyActionTypes,
): PrivacyState => {
  const newHosts = { ...state.approvedHosts };
  switch (action.type) {
    case PrivacyActionType.APPROVE_HOST:
      return {
        ...state,
        approvedHosts: {
          ...state.approvedHosts,
          [action.hostname]: true,
        },
      };
    case PrivacyActionType.REJECT_HOST:
      delete newHosts[action.hostname];
      return {
        ...state,
        approvedHosts: newHosts,
      };
    case PrivacyActionType.CLEAR_HOSTS:
      return {
        ...state,
        approvedHosts: {},
      };
    case PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP:
      return {
        ...state,
        revealSRPTimestamps: [...state.revealSRPTimestamps, action.timestamp],
      };
    default:
      return state;
  }
};

export default privacyReducer;
