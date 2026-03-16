import { RootState } from '../reducers';
import { createSelector } from 'reselect';
import { AvatarAccountType } from '../component-library/components/Avatars/Avatar/variants/AvatarAccount/AvatarAccount.types';
import type { SettingsState } from '../reducers/settings';

const selectSettings = (state: RootState) => state.settings;

export const selectShowFiatInTestnets = createSelector(
  selectSettings,
  (settingsState: SettingsState) =>
    settingsState.showFiatOnTestnets as boolean,
);

export const selectPrimaryCurrency = createSelector(
  selectSettings,
  (settingsState: SettingsState) => settingsState.primaryCurrency,
);

export const selectBasicFunctionalityEnabled = createSelector(
  selectSettings,
  (settingsState: SettingsState) =>
    settingsState.basicFunctionalityEnabled as boolean,
);

export const selectHideZeroBalanceTokens = createSelector(
  selectSettings,
  (settingsState: SettingsState) =>
    Boolean(settingsState.hideZeroBalanceTokens),
);

export const selectDeepLinkModalDisabled = createSelector(
  selectSettings,
  (settingsState: SettingsState) =>
    Boolean(settingsState.deepLinkModalDisabled),
);

export const selectAvatarAccountType = createSelector(
  selectSettings,
  (settingsState: SettingsState) =>
    settingsState.avatarAccountType ??
    AvatarAccountType.Maskicon,
);
