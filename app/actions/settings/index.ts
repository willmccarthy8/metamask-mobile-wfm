import type { AvatarAccountType } from '../../component-library/components/Avatars/Avatar/variants/AvatarAccount/AvatarAccount.types';
import type { Dispatch } from 'redux';

export const SettingsActionTypes = {
  SET_SEARCH_ENGINE: 'SET_SEARCH_ENGINE',
  SET_SHOW_HEX_DATA: 'SET_SHOW_HEX_DATA',
  SET_SHOW_FIAT_ON_TESTNETS: 'SET_SHOW_FIAT_ON_TESTNETS',
  SET_HIDE_ZERO_BALANCE_TOKENS: 'SET_HIDE_ZERO_BALANCE_TOKENS',
  SET_LOCK_TIME: 'SET_LOCK_TIME',
  SET_PRIMARY_CURRENCY: 'SET_PRIMARY_CURRENCY',
  SET_AVATAR_ACCOUNT_TYPE: 'SET_AVATAR_ACCOUNT_TYPE',
  TOGGLE_BASIC_FUNCTIONALITY: 'TOGGLE_BASIC_FUNCTIONALITY',
  TOGGLE_DEVICE_NOTIFICATIONS: 'TOGGLE_DEVICE_NOTIFICATIONS',
  SET_TOKEN_SORT_CONFIG: 'SET_TOKEN_SORT_CONFIG',
  SET_DEEP_LINK_MODAL_DISABLED: 'SET_DEEP_LINK_MODAL_DISABLED',
  SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD:
    'SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD',
} as const;

export interface TokenSortConfig {
  key: string;
  order: string;
  sortCallback?: string;
}

interface SetSearchEngineAction {
  type: typeof SettingsActionTypes.SET_SEARCH_ENGINE;
  searchEngine: string;
}

interface SetShowHexDataAction {
  type: typeof SettingsActionTypes.SET_SHOW_HEX_DATA;
  showHexData: boolean;
}

interface SetShowFiatOnTestnetsAction {
  type: typeof SettingsActionTypes.SET_SHOW_FIAT_ON_TESTNETS;
  showFiatOnTestnets: boolean;
}

interface SetHideZeroBalanceTokensAction {
  type: typeof SettingsActionTypes.SET_HIDE_ZERO_BALANCE_TOKENS;
  hideZeroBalanceTokens: boolean;
}

interface SetLockTimeAction {
  type: typeof SettingsActionTypes.SET_LOCK_TIME;
  lockTime: number;
}

interface SetPrimaryCurrencyAction {
  type: typeof SettingsActionTypes.SET_PRIMARY_CURRENCY;
  primaryCurrency: string;
}

interface SetAvatarAccountTypeAction {
  type: typeof SettingsActionTypes.SET_AVATAR_ACCOUNT_TYPE;
  avatarAccountType: AvatarAccountType;
}

interface SetBasicFunctionalityAction {
  type: typeof SettingsActionTypes.TOGGLE_BASIC_FUNCTIONALITY;
  basicFunctionalityEnabled: boolean;
}

interface ToggleDeviceNotificationAction {
  type: typeof SettingsActionTypes.TOGGLE_DEVICE_NOTIFICATIONS;
  deviceNotificationEnabled: boolean;
}

interface SetTokenSortConfigAction {
  type: typeof SettingsActionTypes.SET_TOKEN_SORT_CONFIG;
  tokenSortConfig: TokenSortConfig;
}

interface SetDeepLinkModalDisabledAction {
  type: typeof SettingsActionTypes.SET_DEEP_LINK_MODAL_DISABLED;
  deepLinkModalDisabled: boolean;
}

interface SetPerpsChartPreferredCandlePeriodAction {
  type: typeof SettingsActionTypes.SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD;
  preferredCandlePeriod: string;
}

export type SettingsAction =
  | SetSearchEngineAction
  | SetShowHexDataAction
  | SetShowFiatOnTestnetsAction
  | SetHideZeroBalanceTokensAction
  | SetLockTimeAction
  | SetPrimaryCurrencyAction
  | SetAvatarAccountTypeAction
  | SetBasicFunctionalityAction
  | ToggleDeviceNotificationAction
  | SetTokenSortConfigAction
  | SetDeepLinkModalDisabledAction
  | SetPerpsChartPreferredCandlePeriodAction;

export function setSearchEngine(searchEngine: string): SetSearchEngineAction {
  return {
    type: SettingsActionTypes.SET_SEARCH_ENGINE,
    searchEngine,
  };
}

export function setShowHexData(showHexData: boolean): SetShowHexDataAction {
  return {
    type: SettingsActionTypes.SET_SHOW_HEX_DATA,
    showHexData,
  };
}

export function setShowFiatOnTestnets(
  showFiatOnTestnets: boolean,
): SetShowFiatOnTestnetsAction {
  return {
    type: SettingsActionTypes.SET_SHOW_FIAT_ON_TESTNETS,
    showFiatOnTestnets,
  };
}

export function setHideZeroBalanceTokens(
  hideZeroBalanceTokens: boolean,
): SetHideZeroBalanceTokensAction {
  return {
    type: SettingsActionTypes.SET_HIDE_ZERO_BALANCE_TOKENS,
    hideZeroBalanceTokens,
  };
}

export function setLockTime(lockTime: number): SetLockTimeAction {
  return {
    type: SettingsActionTypes.SET_LOCK_TIME,
    lockTime,
  };
}

export function setPrimaryCurrency(
  primaryCurrency: string,
): SetPrimaryCurrencyAction {
  return {
    type: SettingsActionTypes.SET_PRIMARY_CURRENCY,
    primaryCurrency,
  };
}

export function setAvatarAccountType(
  avatarAccountType: AvatarAccountType,
): SetAvatarAccountTypeAction {
  return {
    type: SettingsActionTypes.SET_AVATAR_ACCOUNT_TYPE,
    avatarAccountType,
  };
}

// Plain action creator for state updates (used during store initialization)
export function setBasicFunctionality(
  basicFunctionalityEnabled: boolean,
): SetBasicFunctionalityAction {
  return {
    type: SettingsActionTypes.TOGGLE_BASIC_FUNCTIONALITY,
    basicFunctionalityEnabled,
  };
}

// Thunk action creator for user-initiated toggles (includes MultichainAccountService integration)
export function toggleBasicFunctionality(basicFunctionalityEnabled: boolean) {
  return async (dispatch: Dispatch<SetBasicFunctionalityAction>) => {
    // First dispatch the Redux state update
    dispatch(setBasicFunctionality(basicFunctionalityEnabled));

    const Engine = require('../../core/Engine').default;
    Engine.context.MultichainAccountService.setBasicFunctionality(
      basicFunctionalityEnabled,
    ).catch((error: unknown) => {
      console.error(
        'Failed to set basic functionality on MultichainAccountService:',
        error,
      );
    });
  };
}

export function toggleDeviceNotification(
  deviceNotificationEnabled: boolean,
): ToggleDeviceNotificationAction {
  return {
    type: SettingsActionTypes.TOGGLE_DEVICE_NOTIFICATIONS,
    deviceNotificationEnabled,
  };
}

export function setTokenSortConfig(
  tokenSortConfig: TokenSortConfig,
): SetTokenSortConfigAction {
  return {
    type: SettingsActionTypes.SET_TOKEN_SORT_CONFIG,
    tokenSortConfig,
  };
}

export function setDeepLinkModalDisabled(
  deepLinkModalDisabled: boolean,
): SetDeepLinkModalDisabledAction {
  return {
    type: SettingsActionTypes.SET_DEEP_LINK_MODAL_DISABLED,
    deepLinkModalDisabled,
  };
}

export function setPerpsChartPreferredCandlePeriod(
  preferredCandlePeriod: string,
): SetPerpsChartPreferredCandlePeriodAction {
  return {
    type: SettingsActionTypes.SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD,
    preferredCandlePeriod,
  };
}
