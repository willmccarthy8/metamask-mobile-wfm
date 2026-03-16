/**
 * Browser actions for Redux
 */
export enum BrowserActionType {
  ADD_TO_VIEWED_DAPP = 'ADD_TO_VIEWED_DAPP',
  ADD_TO_BROWSER_HISTORY = 'ADD_TO_BROWSER_HISTORY',
  CLEAR_BROWSER_HISTORY = 'CLEAR_BROWSER_HISTORY',
  ADD_TO_BROWSER_WHITELIST = 'ADD_TO_BROWSER_WHITELIST',
  CLOSE_ALL_TABS = 'CLOSE_ALL_TABS',
  CREATE_NEW_TAB = 'CREATE_NEW_TAB',
  CLOSE_TAB = 'CLOSE_TAB',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  UPDATE_TAB = 'UPDATE_TAB',
  STORE_FAVICON_URL = 'STORE_FAVICON_URL',
  TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN',
}

// Keep legacy export for backward compat
export const BrowserActionTypes = {
  ADD_TO_VIEWED_DAPP: BrowserActionType.ADD_TO_VIEWED_DAPP,
  TOGGLE_FULLSCREEN: BrowserActionType.TOGGLE_FULLSCREEN,
} as const;

export interface AddToViewedDappAction {
  type: BrowserActionType.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

export interface AddToHistoryAction {
  type: BrowserActionType.ADD_TO_BROWSER_HISTORY;
  url: string;
  name: string;
}

export interface ClearHistoryAction {
  type: BrowserActionType.CLEAR_BROWSER_HISTORY;
  id: number;
  metricsEnabled: boolean | null;
  marketingEnabled: boolean | null;
}

export interface AddToWhitelistAction {
  type: BrowserActionType.ADD_TO_BROWSER_WHITELIST;
  url: string;
}

export interface CloseAllTabsAction {
  type: BrowserActionType.CLOSE_ALL_TABS;
}

export interface CreateNewTabAction {
  type: BrowserActionType.CREATE_NEW_TAB;
  url: string;
  linkType?: string;
  id: number;
}

export interface CloseTabAction {
  type: BrowserActionType.CLOSE_TAB;
  id: number;
}

export interface SetActiveTabAction {
  type: BrowserActionType.SET_ACTIVE_TAB;
  id: number;
}

export interface UpdateTabData {
  isArchived?: boolean;
  url?: string;
  image?: string;
}

export interface UpdateTabAction {
  type: BrowserActionType.UPDATE_TAB;
  id: number;
  data: UpdateTabData;
}

export interface StoreFaviconAction {
  type: BrowserActionType.STORE_FAVICON_URL;
  origin: string;
  url: string;
}

export interface ToggleFullscreenAction {
  type: BrowserActionType.TOGGLE_FULLSCREEN;
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
    type: BrowserActionType.ADD_TO_VIEWED_DAPP,
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
    type: BrowserActionType.ADD_TO_BROWSER_HISTORY,
    url,
    name,
  };
}

/**
 * Clears the entire browser history
 */
export function clearHistory(
  metricsEnabled: boolean | null,
  marketingEnabled: boolean | null,
): ClearHistoryAction {
  return {
    type: BrowserActionType.CLEAR_BROWSER_HISTORY,
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
    type: BrowserActionType.ADD_TO_BROWSER_WHITELIST,
    url,
  };
}

/**
 * Closes all the opened tabs
 */
export function closeAllTabs(): CloseAllTabsAction {
  return {
    type: BrowserActionType.CLOSE_ALL_TABS,
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
    type: BrowserActionType.CREATE_NEW_TAB,
    url,
    linkType,
    id: Date.now(),
  };
}

/**
 * Closes an exiting tab
 */
export function closeTab(id: number): CloseTabAction {
  return {
    type: BrowserActionType.CLOSE_TAB,
    id,
  };
}

/**
 * Selects an exiting tab
 */
export function setActiveTab(id: number): SetActiveTabAction {
  return {
    type: BrowserActionType.SET_ACTIVE_TAB,
    id,
  };
}

/**
 * Updates an existing tab
 */
export function updateTab(id: number, data: UpdateTabData): UpdateTabAction {
  return {
    type: BrowserActionType.UPDATE_TAB,
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
    type: BrowserActionType.STORE_FAVICON_URL,
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
    type: BrowserActionType.TOGGLE_FULLSCREEN,
    isFullscreen,
  };
}
