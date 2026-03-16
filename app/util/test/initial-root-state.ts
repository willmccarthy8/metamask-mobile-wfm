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
import alertReducer from '../../reducers/alert';
import bookmarksReducer from '../../reducers/bookmarks';
import browserReducer from '../../reducers/browser';
import collectiblesReducer from '../../reducers/collectibles';
import infuraAvailabilityReducer from '../../reducers/infuraAvailability';
import modalsReducer from '../../reducers/modals';
import notificationReducer from '../../reducers/notification';
import privacyReducer from '../../reducers/privacy';
import settingsReducer from '../../reducers/settings';
import swapsReducer from '../../reducers/swaps';
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
  collectibles: collectiblesReducer(undefined, { type: '@@INIT' } as never),
  engine: { backgroundState },
  cronjobController: {
    storage: undefined,
  },
  privacy: privacyReducer(undefined, { type: '@@INIT' } as never),
  bookmarks: bookmarksReducer(undefined, { type: '@@INIT' } as never),
  browser: browserReducer(undefined, { type: '@@INIT' } as never),
  modals: modalsReducer(undefined, { type: '@@INIT' } as never),
  settings: settingsReducer(undefined, { type: '@@INIT' } as never),
  alert: alertReducer(undefined, { type: '@@INIT' } as never),
  securityAlerts: {
    alerts: {},
  },
  user: userInitialState,
  onboarding: initialOnboardingState,
  notification: notificationReducer(undefined, { type: '@@INIT' } as never),
  swaps: swapsReducer(undefined, { type: '@@INIT' } as never),
  fiatOrders: initialFiatOrdersState,
  infuraAvailability: infuraAvailabilityReducer(undefined, { type: '@@INIT' } as never),
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
