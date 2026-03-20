/* eslint-disable */
// Mock for @nktkas/hyperliquid SDK

const mockExchangeClient: Record<string, jest.Mock> = {
  order: jest.fn(),
  modify: jest.fn(),
  cancel: jest.fn(),
};

const mockInfoClient: Record<string, jest.Mock> = {
  clearinghouseState: jest.fn(),
  accountState: jest.fn(),
  meta: jest.fn(),
  allMids: jest.fn(),
};

const mockSubscriptionClient: Record<string | symbol, jest.Mock> = {
  subscription: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  [Symbol.asyncDispose]: jest.fn(),
};

const mockWebSocketTransport: Record<string | symbol, jest.Mock> = {
  connect: jest.fn(),
  disconnect: jest.fn(),
  send: jest.fn(),
  [Symbol.asyncDispose]: jest.fn(),
};

export class ExchangeClient {
  constructor() {
    return mockExchangeClient;
  }
}

export class InfoClient {
  constructor() {
    return mockInfoClient;
  }
}

export class SubscriptionClient {
  constructor() {
    return mockSubscriptionClient;
  }
}

export class WebSocketTransport {
  constructor() {
    return mockWebSocketTransport;
  }
}

// Mock signing functions
export const actionSorter: jest.Mock = jest.fn();
export const signL1Action: jest.Mock = jest.fn();
