import type { Action as ReduxAction } from 'redux';
import type { AvatarAccountType } from '../../component-library/components/Avatars/Avatar/variants/AvatarAccount/AvatarAccount.types';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from '../../reducers';

export enum SettingsActionType {
  SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE',
  SET_SHOW_HEX_DATA = 'SET_SHOW_HEX_DATA',
  SET_SHOW_FIAT_ON_TESTNETS = 'SET_SHOW_FIAT_ON_TESTNETS',
  SET_HIDE_ZERO_BALANCE_TOKENS = 'SET_HIDE_ZERO_BALANCE_TOKENS',
  SET_LOCK_TIME = 'SET_LOCK_TIME',
  SET_PRIMARY_CURRENCY = 'SET_PRIMARY_CURRENCY',
  SET_AVATAR_ACCOUNT_TYPE = 'SET_AVATAR_ACCOUNT_TYPE',
  TOGGLE_BASIC_FUNCTIONALITY = 'TOGGLE_BASIC_FUNCTIONALITY',
  TOGGLE_DEVICE_NOTIFICATIONS = 'TOGGLE_DEVICE_NOTIFICATIONS',
  SET_TOKEN_SORT_CONFIG = 'SET_TOKEN_SORT_CONFIG',
  SET_DEEP_LINK_MODAL_DISABLED = 'SET_DEEP_LINK_MODAL_DISABLED',
  SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD = 'SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD',
}

export interface SetSearchEngineAction
  extends ReduxAction<SettingsActionType.SET_SEARCH_ENGINE> {
  searchEngine: string;
}

export interface SetShowHexDataAction
  extends ReduxAction<SettingsActionType.SET_SHOW_HEX_DATA> {
  showHexData: boolean;
}

export interface SetShowFiatOnTestnetsAction
  extends ReduxAction<SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS> {
  showFiatOnTestnets: boolean;
}

export interface SetHideZeroBalanceTokensAction
  extends ReduxAction<SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS> {
  hideZeroBalanceTokens: boolean;
}

export interface SetLockTimeAction
  extends ReduxAction<SettingsActionType.SET_LOCK_TIME> {
  lockTime: number;
}

export interface SetPrimaryCurrencyAction
  extends ReduxAction<SettingsActionType.SET_PRIMARY_CURRENCY> {
  primaryCurrency: string;
}

export interface SetAvatarAccountTypeAction
  extends ReduxAction<SettingsActionType.SET_AVATAR_ACCOUNT_TYPE> {
  avatarAccountType: AvatarAccountType;
}

export interface SetBasicFunctionalityAction
  extends ReduxAction<SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY> {
  basicFunctionalityEnabled: boolean;
}

export interface ToggleDeviceNotificationAction
  extends ReduxAction<SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS> {
  deviceNotificationEnabled: boolean;
}

export interface SetTokenSortConfigAction
  extends ReduxAction<SettingsActionType.SET_TOKEN_SORT_CONFIG> {
  tokenSortConfig: Record<string, unknown>;
}

export interface SetDeepLinkModalDisabledAction
  extends ReduxAction<SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED> {
  deepLinkModalDisabled: boolean;
}

export interface SetPerpsChartPreferredCandlePeriodAction
  extends ReduxAction<SettingsActionType.SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD> {
  preferredCandlePeriod: string;
}

export type SettingsActionTypes =
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
    type: SettingsActionType.SET_SEARCH_ENGINE,
    searchEngine,
  };
}

export function setShowHexData(showHexData: boolean): SetShowHexDataAction {
  return {
    type: SettingsActionType.SET_SHOW_HEX_DATA,
    showHexData,
  };
}

export function setShowFiatOnTestnets(
  showFiatOnTestnets: boolean,
): SetShowFiatOnTestnetsAction {
  return {
    type: SettingsActionType.SET_SHOW_FIAT_ON_TESTNETS,
    showFiatOnTestnets,
  };
}

export function setHideZeroBalanceTokens(
  hideZeroBalanceTokens: boolean,
): SetHideZeroBalanceTokensAction {
  return {
    type: SettingsActionType.SET_HIDE_ZERO_BALANCE_TOKENS,
    hideZeroBalanceTokens,
  };
}

export function setLockTime(lockTime: number): SetLockTimeAction {
  return {
    type: SettingsActionType.SET_LOCK_TIME,
    lockTime,
  };
}

export function setPrimaryCurrency(
  primaryCurrency: string,
): SetPrimaryCurrencyAction {
  return {
    type: SettingsActionType.SET_PRIMARY_CURRENCY,
    primaryCurrency,
  };
}

export function setAvatarAccountType(
  avatarAccountType: AvatarAccountType,
): SetAvatarAccountTypeAction {
  return {
    type: SettingsActionType.SET_AVATAR_ACCOUNT_TYPE,
    avatarAccountType,
  };
}

// Plain action creator for state updates (used during store initialization)
export function setBasicFunctionality(
  basicFunctionalityEnabled: boolean,
): SetBasicFunctionalityAction {
  return {
    type: SettingsActionType.TOGGLE_BASIC_FUNCTIONALITY,
    basicFunctionalityEnabled,
  };
}

// Thunk action creator for user-initiated toggles (includes MultichainAccountService integration)
export function toggleBasicFunctionality(
  basicFunctionalityEnabled: boolean,
): ThunkAction<Promise<void>, RootState, unknown, SetBasicFunctionalityAction> {
  return async (dispatch) => {
    // First dispatch the Redux state update
    dispatch(setBasicFunctionality(basicFunctionalityEnabled));

    const Engine = require('../../core/Engine').default;
    Engine.context.MultichainAccountService.setBasicFunctionality(
      basicFunctionalityEnabled,
    ).catch((error: Error) => {
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
    type: SettingsActionType.TOGGLE_DEVICE_NOTIFICATIONS,
    deviceNotificationEnabled,
  };
}

export function setTokenSortConfig(
  tokenSortConfig: Record<string, unknown>,
): SetTokenSortConfigAction {
  return {
    type: SettingsActionType.SET_TOKEN_SORT_CONFIG,
    tokenSortConfig,
  };
}

export function setDeepLinkModalDisabled(
  deepLinkModalDisabled: boolean,
): SetDeepLinkModalDisabledAction {
  return {
    type: SettingsActionType.SET_DEEP_LINK_MODAL_DISABLED,
    deepLinkModalDisabled,
  };
}

export function setPerpsChartPreferredCandlePeriod(
  preferredCandlePeriod: string,
): SetPerpsChartPreferredCandlePeriodAction {
  return {
    type: SettingsActionType.SET_PERPS_CHART_PREFERRED_CANDLE_PERIOD,
    preferredCandlePeriod,
  };
}
