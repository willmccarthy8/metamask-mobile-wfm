/**
 * Browser actions for Redux
 */
export const BrowserActionTypes = {
  ADD_TO_VIEWED_DAPP: 'ADD_TO_VIEWED_DAPP',
  ADD_TO_BROWSER_HISTORY: 'ADD_TO_BROWSER_HISTORY',
  CLEAR_BROWSER_HISTORY: 'CLEAR_BROWSER_HISTORY',
  ADD_TO_BROWSER_WHITELIST: 'ADD_TO_BROWSER_WHITELIST',
  CLOSE_ALL_TABS: 'CLOSE_ALL_TABS',
  CREATE_NEW_TAB: 'CREATE_NEW_TAB',
  CLOSE_TAB: 'CLOSE_TAB',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  UPDATE_TAB: 'UPDATE_TAB',
  STORE_FAVICON_URL: 'STORE_FAVICON_URL',
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
} as const;

export interface TabData {
  isArchived?: boolean;
  url?: string;
  image?: string;
}

interface AddToViewedDappAction {
  type: typeof BrowserActionTypes.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

interface AddToHistoryAction {
  type: typeof BrowserActionTypes.ADD_TO_BROWSER_HISTORY;
  url: string;
  name: string;
}

interface ClearHistoryAction {
  type: typeof BrowserActionTypes.CLEAR_BROWSER_HISTORY;
  id: number;
  metricsEnabled: boolean;
  marketingEnabled: boolean;
}

interface AddToWhitelistAction {
  type: typeof BrowserActionTypes.ADD_TO_BROWSER_WHITELIST;
  url: string;
}

interface CloseAllTabsAction {
  type: typeof BrowserActionTypes.CLOSE_ALL_TABS;
}

interface CreateNewTabAction {
  type: typeof BrowserActionTypes.CREATE_NEW_TAB;
  url: string;
  linkType?: string;
  id: number;
}

interface CloseTabAction {
  type: typeof BrowserActionTypes.CLOSE_TAB;
  id: number;
}

interface SetActiveTabAction {
  type: typeof BrowserActionTypes.SET_ACTIVE_TAB;
  id: number;
}

interface UpdateTabAction {
  type: typeof BrowserActionTypes.UPDATE_TAB;
  id: number;
  data: TabData;
}

interface StoreFaviconAction {
  type: typeof BrowserActionTypes.STORE_FAVICON_URL;
  origin: string;
  url: string;
}

interface ToggleFullscreenAction {
  type: typeof BrowserActionTypes.TOGGLE_FULLSCREEN;
  isFullscreen: boolean;
}

export type BrowserAction =
  | AddToViewedDappAction
  | AddToHistoryAction
  | ClearHistoryAction
  | AddToWhitelistAction
  | CloseAllTabsAction
  | CreateNewTabAction
  | CloseTabAction
  | SetActiveTabAction
  | UpdateTabAction
  | StoreFaviconAction
  | ToggleFullscreenAction;

/**
 * Adds a new entry to viewed dapps
 */
export function addToViewedDapp(hostname: string): AddToViewedDappAction {
  return {
    type: BrowserActionTypes.ADD_TO_VIEWED_DAPP,
    hostname,
  };
}

/**
 * Adds a new entry to the browser history
 */
export function addToHistory({
  url,
  name,
}: {
  url: string;
  name: string;
}): AddToHistoryAction {
  return {
    type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY,
    url,
    name,
  };
}

/**
 * Clears the entire browser history
 */
export function clearHistory(
  metricsEnabled: boolean,
  marketingEnabled: boolean,
): ClearHistoryAction {
  return {
    type: BrowserActionTypes.CLEAR_BROWSER_HISTORY,
    id: Date.now(),
    metricsEnabled,
    marketingEnabled,
  };
}

/**
 * Adds a new entry to the whitelist
 */
export function addToWhitelist(url: string): AddToWhitelistAction {
  return {
    type: BrowserActionTypes.ADD_TO_BROWSER_WHITELIST,
    url,
  };
}

/**
 * Closes all the opened tabs
 */
export function closeAllTabs(): CloseAllTabsAction {
  return {
    type: BrowserActionTypes.CLOSE_ALL_TABS,
  };
}

/**
 * Creates a new tab
 */
export function createNewTab(
  url: string,
  linkType?: string,
): CreateNewTabAction {
  return {
    type: BrowserActionTypes.CREATE_NEW_TAB,
    url,
    linkType,
    id: Date.now(),
  };
}

/**
 * Closes an existing tab
 */
export function closeTab(id: number): CloseTabAction {
  return {
    type: BrowserActionTypes.CLOSE_TAB,
    id,
  };
}

/**
 * Selects an existing tab
 */
export function setActiveTab(id: number): SetActiveTabAction {
  return {
    type: BrowserActionTypes.SET_ACTIVE_TAB,
    id,
  };
}

/**
 * Updates an existing tab
 */
export function updateTab(id: number, data: TabData): UpdateTabAction {
  return {
    type: BrowserActionTypes.UPDATE_TAB,
    id,
    data,
  };
}

/**
 * Stores the favicon url using the origin as key
 */
export function storeFavicon({
  origin,
  url,
}: {
  origin: string;
  url: string;
}): StoreFaviconAction {
  return {
    type: BrowserActionTypes.STORE_FAVICON_URL,
    origin,
    url,
  };
}

/**
 * Toggles fullscreen mode for the browser
 */
export function toggleFullscreen(
  isFullscreen: boolean,
): ToggleFullscreenAction {
  return {
    type: BrowserActionTypes.TOGGLE_FULLSCREEN,
    isFullscreen,
  };
}
