import { getGanachePort } from '../../../tests/framework/fixtures/FixtureUtils';
import ganache from 'ganache';
import { ServerStatus } from '../../../tests/framework/types';

export const DEFAULT_GANACHE_PORT = 8545;

interface GanacheOptions {
  blockTime?: number;
  network_id?: number;
  port?: number;
  vmErrorsOnRPCResponse?: boolean;
  hardfork?: string;
  quiet?: boolean;
  mnemonic?: string;
  [key: string]: unknown;
}

const defaultOptions: GanacheOptions = {
  blockTime: 2,
  network_id: 1337,
  port: DEFAULT_GANACHE_PORT,
  vmErrorsOnRPCResponse: false,
  hardfork: 'muirGlacier',
  quiet: false,
};

export default class Ganache {
  private _startOptions: GanacheOptions;
  private _serverPort: number | undefined;
  private _serverStatus: ServerStatus;
  private _server: ReturnType<typeof ganache.server> | undefined;

  constructor() {
    this._startOptions = {};
    this._serverPort = undefined;
    this._serverStatus = ServerStatus.STOPPED;
  }

  /**
   * Set start options that will be used when start() is called
   * @param {Object} opts - Ganache node options
   */
  setStartOptions(opts: GanacheOptions): void {
    this._startOptions = opts;
  }

  /**
   * Set the port that Ganache should listen on
   * @param {number} port - Port number
   */
  setServerPort(port: number): void {
    this._serverPort = port;
  }

  async start(opts: GanacheOptions = {}): Promise<void> {
    // Use stored options if no options provided, otherwise use provided opts
    const optsToUse = Object.keys(opts).length > 0 ? opts : this._startOptions;

    if (!optsToUse.mnemonic) {
      throw new Error('Missing required mnemonic');
    }

    const port = this._serverPort || getGanachePort();
    const options = { ...defaultOptions, ...optsToUse, port };

    try {
      this._server = ganache.server(options);
      await this._server.listen(port);
      this._serverStatus = ServerStatus.STARTED;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getProvider(): ReturnType<ReturnType<typeof ganache.server>['provider']> | undefined {
    // @ts-expect-error ganache server provider type mismatch
    return this._server?.provider;
  }

  async getAccounts(): Promise<string[]> {
    return await this.getProvider().request({
      method: 'eth_accounts',
      params: [],
    });
  }

  async getBalance(): Promise<string | number> {
    const accounts = await this.getAccounts();
    const balanceHex = await this.getProvider().request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    });
    const balanceInt = parseInt(balanceHex, 16) / 10 ** 18;

    const balanceFormatted =
      balanceInt % 1 === 0 ? balanceInt : balanceInt.toFixed(4);

    return balanceFormatted;
  }

  async stop(): Promise<void> {
    if (!this._server) {
      throw new Error('Server not running yet');
    }
    await this._server.close();
    this._server = undefined;
    this._serverStatus = ServerStatus.STOPPED;
    this._serverPort = undefined;
  }

  /**
   * Check if the Ganache server is running
   * @returns {boolean} True if the server is running, false otherwise
   */
  isStarted(): boolean {
    return this._serverStatus === ServerStatus.STARTED;
  }

  /**
   * Get the port the Ganache server is listening on
   * @returns {number} The port number
   */
  getServerPort(): number {
    return this._serverPort ?? 0;
  }

  /**
   * Get the current server status
   * @returns {ServerStatus} The server status
   */
  getServerStatus(): ServerStatus {
    return this._serverStatus;
  }
}
