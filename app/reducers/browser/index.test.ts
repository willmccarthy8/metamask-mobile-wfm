import browserReducer, { BrowserState } from './index';
import type { BrowserAction } from '../../actions/browser';
import AppConstants from '../../core/AppConstants';

describe('browserReducer CREATE_NEW_TAB', () => {
  it('sets lastActiveAt when creating a new tab', () => {
    const now = Date.now();
    const initialState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [],
      activeTab: null,
      visitedDappsByHostname: {},
      isFullscreen: false,
    } as BrowserState;

    const action = {
      type: 'CREATE_NEW_TAB' as const,
      url: 'https://example.com',
      id: 42,
    } as BrowserAction;

    const newState = browserReducer(initialState, action);

    expect(newState.tabs).toHaveLength(1);
    expect(newState.tabs[0].id).toBe(42);
    expect(newState.tabs[0].url).toBe('https://example.com');
    expect(newState.tabs[0].lastActiveAt).toBeGreaterThanOrEqual(now);
    expect(newState.tabs[0].lastActiveAt).toBeLessThanOrEqual(Date.now());
  });
});

describe('browserReducer SET_ACTIVE_TAB', () => {
  it('updates lastActiveAt for the activated tab', () => {
    const now = Date.now();
    const initialState = {
      history: [],
      whitelist: [],
      tabs: [
        { id: 1, url: 'https://a.com', lastActiveAt: 100 },
        { id: 2, url: 'https://b.com', lastActiveAt: 200 },
      ],
      favicons: [],
      activeTab: 1,
      visitedDappsByHostname: {},
      isFullscreen: false,
    } as BrowserState;

    const action = {
      type: 'SET_ACTIVE_TAB' as const,
      id: 2,
    } as BrowserAction;

    const newState = browserReducer(initialState, action);

    expect(newState.activeTab).toBe(2);
    // Tab 2 should have an updated lastActiveAt
    expect(newState.tabs[1].lastActiveAt).toBeGreaterThanOrEqual(now);
    // Tab 1 should keep its old lastActiveAt
    expect(newState.tabs[0].lastActiveAt).toBe(100);
  });
});

describe('browserReducer STORE_FAVICON_URL', () => {
  it('adds favicon in the state', () => {
    const initialState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [],
      activeTab: null,
      visitedDappsByHostname: {},
      isFullscreen: false,
    } as BrowserState;

    const action = {
      type: 'STORE_FAVICON_URL' as const,
      origin: 'testOrigin',
      url: 'testUrl',
    } as BrowserAction;

    const expectedState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [{ origin: 'testOrigin', url: 'testUrl' }],
      activeTab: null,
    };

    const newState = browserReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('limits the number of stored favicons in state to FAVICON_CACHE_MAX_SIZE', () => {
    const initialState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: new Array(AppConstants.FAVICON_CACHE_MAX_SIZE).fill({
        origin: 'oldOrigin',
        url: 'oldUrl',
      }),
      activeTab: null,
      visitedDappsByHostname: {},
      isFullscreen: false,
    } as BrowserState;

    const action = {
      type: 'STORE_FAVICON_URL' as const,
      origin: 'newOrigin',
      url: 'newUrl',
    } as BrowserAction;

    const expectedState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [
        { origin: 'newOrigin', url: 'newUrl' },
        ...new Array(AppConstants.FAVICON_CACHE_MAX_SIZE - 1).fill({
          origin: 'oldOrigin',
          url: 'oldUrl',
        }),
      ],
      activeTab: null,
    };

    const newState = browserReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});

describe('browserReducer TOGGLE_FULLSCREEN', () => {
  it('toggles isFullscreen from false to true', () => {
    // Arrange
    const initialState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [],
      activeTab: null,
      visitedDappsByHostname: {},
      isFullscreen: false,
    } as BrowserState;

    const action = {
      type: 'TOGGLE_FULLSCREEN' as const,
      isFullscreen: true,
    } as BrowserAction;

    const expectedState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [],
      activeTab: null,
      isFullscreen: true,
    };

    // Act
    const newState = browserReducer(initialState, action);

    // Assert
    expect(newState).toEqual(expectedState);
  });

  it('toggles isFullscreen from true to false', () => {
    // Arrange
    const initialState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [],
      activeTab: null,
      visitedDappsByHostname: {},
      isFullscreen: true,
    } as BrowserState;

    const action = {
      type: 'TOGGLE_FULLSCREEN' as const,
      isFullscreen: false,
    } as BrowserAction;

    const expectedState = {
      history: [],
      whitelist: [],
      tabs: [],
      favicons: [],
      activeTab: null,
      isFullscreen: false,
    };

    // Act
    const newState = browserReducer(initialState, action);

    // Assert
    expect(newState).toEqual(expectedState);
  });

  it('preserves all other state properties when toggling fullscreen', () => {
    // Arrange
    const initialState = {
      history: [{ url: 'https://example.com', name: 'Example' }],
      whitelist: ['https://trusted.com'],
      tabs: [{ id: 'tab1', url: 'https://example.com' }],
      favicons: [{ origin: 'example.com', url: 'favicon.ico' }],
      activeTab: 'tab1',
      visitedDappsByHostname: {},
      isFullscreen: false,
    } as unknown as BrowserState;

    const action = {
      type: 'TOGGLE_FULLSCREEN' as const,
      isFullscreen: true,
    } as BrowserAction;

    // Act
    const newState = browserReducer(initialState, action);

    // Assert
    expect(newState.history).toEqual(initialState.history);
    expect(newState.whitelist).toEqual(initialState.whitelist);
    expect(newState.tabs).toEqual(initialState.tabs);
    expect(newState.favicons).toEqual(initialState.favicons);
    expect(newState.activeTab).toEqual(initialState.activeTab);
    expect(newState.isFullscreen).toBe(true);
  });
});
