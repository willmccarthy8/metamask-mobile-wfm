/* eslint-disable */
// Mock for @nktkas/hyperliquid SDK

interface MockExchangeClient {
  order: jest.Mock;
  modify: jest.Mock;
  cancel: jest.Mock;
}

interface MockInfoClient {
  clearinghouseState: jest.Mock;
  accountState: jest.Mock;
  meta: jest.Mock;
  allMids: jest.Mock;
}

interface MockSubscriptionClient {
  subscription: jest.Mock;
  subscribe: jest.Mock;
  unsubscribe: jest.Mock;
  [Symbol.asyncDispose]: jest.Mock;
}

interface MockWebSocketTransport {
  connect: jest.Mock;
  disconnect: jest.Mock;
  send: jest.Mock;
  [Symbol.asyncDispose]: jest.Mock;
}

const mockExchangeClient: MockExchangeClient = {
  order: jest.fn(),
  modify: jest.fn(),
  cancel: jest.fn(),
};

const mockInfoClient: MockInfoClient = {
  clearinghouseState: jest.fn(),
  accountState: jest.fn(),
  meta: jest.fn(),
  allMids: jest.fn(),
};

const mockSubscriptionClient: MockSubscriptionClient = {
  subscription: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  [Symbol.asyncDispose]: jest.fn(),
};

const mockWebSocketTransport: MockWebSocketTransport = {
  connect: jest.fn(),
  disconnect: jest.fn(),
  send: jest.fn(),
  [Symbol.asyncDispose]: jest.fn(),
};

class ExchangeClient {
  constructor() {
    return mockExchangeClient as unknown as ExchangeClient;
  }
}

class InfoClient {
  constructor() {
    return mockInfoClient as unknown as InfoClient;
  }
}

class SubscriptionClient {
  constructor() {
    return mockSubscriptionClient as unknown as SubscriptionClient;
  }
}

class WebSocketTransport {
  constructor() {
    return mockWebSocketTransport as unknown as WebSocketTransport;
  }
}

// Mock signing functions
const actionSorter: jest.Mock = jest.fn();
const signL1Action: jest.Mock = jest.fn();

module.exports = {
  ExchangeClient,
  InfoClient,
  SubscriptionClient,
  WebSocketTransport,
  actionSorter,
  signL1Action,
};
