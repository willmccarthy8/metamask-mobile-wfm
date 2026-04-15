import type { RootState } from '../../reducers';
import type { EngineState } from '../../core/Engine';
import { initialState as initialFiatOrdersState } from '../../reducers/fiatOrders';
import { initialState as initialSecurityState } from '../../reducers/security';
import { initialState as initialInpageProvider } from '../../core/redux/slices/inpageProvider';
import { initialState as confirmationMetrics } from '../../core/redux/slices/confirmationMetrics';
import { initialState as originThrottling } from '../../core/redux/slices/originThrottling';
import { initialState as initialBridgeState } from '../../core/redux/slices/bridge';
import { initialState as initialQrKeyringScannerState } from '../../core/redux/slices/qrKeyringScanner';
import { initialState as initialCardState } from '../../core/redux/slices/card';
import initialBackgroundState from './initial-background-state.json';
import { userInitialState } from '../../reducers/user';
import { initialNavigationState } from '../../reducers/navigation';
import { initialOnboardingState } from '../../reducers/onboarding';
import { initialState as initialPerformanceState } from '../../core/redux/slices/performance';
import { initialState as initialSampleCounterState } from '../../features/SampleFeature/reducers/sample-counter';
import { isTest } from './utils';
import { initialState as initialRewardsState } from '../../reducers/rewards';
import { initialState as initialNetworkConnectionBannerState } from '../../reducers/networkConnectionBanner';
import { initialState as initialCollectiblesState } from '../../reducers/collectibles';
import { initialState as initialPrivacyState } from '../../reducers/privacy';
import { initialState as initialBookmarksState } from '../../reducers/bookmarks';
import { initialState as initialBrowserState } from '../../reducers/browser';
import { initialState as initialModalsState } from '../../reducers/modals';
import { initialState as initialSettingsState } from '../../reducers/settings';
import { initialState as initialAlertState } from '../../reducers/alert';
import { initialState as initialNotificationState } from '../../reducers/notification';
import { initialState as initialSwapsState } from '../../reducers/swaps';
import { initialState as initialInfuraAvailabilityState } from '../../reducers/infuraAvailability';
// A cast is needed here because we use enums in some controllers, and TypeScript doesn't consider
// the string value of an enum as satisfying an enum type.
export const backgroundState: EngineState =
  initialBackgroundState as unknown as EngineState;

const initialRootState: RootState = {
  legalNotices: {
    isPna25Acknowledged: false,
    newPrivacyPolicyToastClickedOrClosed: false,
    newPrivacyPolicyToastShownDate: null,
  },
  collectibles: initialCollectiblesState,
  engine: { backgroundState },
  cronjobController: {
    storage: undefined,
  },
  privacy: initialPrivacyState,
  bookmarks: initialBookmarksState,
  browser: initialBrowserState,
  modals: initialModalsState,
  settings: initialSettingsState,
  alert: initialAlertState,
  securityAlerts: {
    alerts: {},
  },
  user: userInitialState,
  onboarding: initialOnboardingState,
  notification: initialNotificationState,
  swaps: initialSwapsState,
  fiatOrders: initialFiatOrdersState,
  infuraAvailability: initialInfuraAvailabilityState,
  navigation: initialNavigationState,
  networkOnboarded: undefined,
  security: initialSecurityState,
  qrKeyringScanner: initialQrKeyringScannerState,
  sdk: {
    connections: {},
    approvedHosts: {},
    dappConnections: {},
    v2Connections: {},
  },
  experimentalSettings: undefined,
  rpcEvents: undefined,
  accounts: {
    reloadAccounts: false,
  },
  inpageProvider: initialInpageProvider,
  confirmationMetrics,
  originThrottling,
  notifications: {},
  bridge: initialBridgeState,
  banners: {
    dismissedBanners: [],
  },
  sampleCounter: initialSampleCounterState,
  card: initialCardState,
  rewards: initialRewardsState,
  networkConnectionBanner: initialNetworkConnectionBannerState,
};

if (isTest) {
  initialRootState.performance = initialPerformanceState;
}

export default initialRootState;
