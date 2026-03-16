import { createSelector } from 'reselect';
import { RootState } from '../../../../../reducers';
import {
  CandlePeriod,
  DEFAULT_CANDLE_PERIOD,
} from '@metamask/perps-controller';

const selectSettings = (state: RootState) => state.settings;

export const selectPerpsChartPreferences = createSelector(
  selectSettings,
  (settingsState) => {
    const preferences = settingsState.perpsChartPreferences;
    return {
      preferredCandlePeriod:
        preferences?.preferredCandlePeriod ?? DEFAULT_CANDLE_PERIOD,
    };
  },
);

export const selectPerpsChartPreferredCandlePeriod = createSelector(
  selectPerpsChartPreferences,
  (preferences): CandlePeriod => {
    const period = preferences.preferredCandlePeriod;
    // Validate that the stored value is a valid CandlePeriod
    if (Object.values(CandlePeriod).includes(period as CandlePeriod)) {
      return period as CandlePeriod;
    }
    // Fallback to default if invalid
    return DEFAULT_CANDLE_PERIOD;
  },
);
