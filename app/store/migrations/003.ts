// @ts-nocheck
import { NetworksChainId } from '@metamask/controller-utils';
import { isSafeChainId } from '../../util/networks';
import { GOERLI } from '../../../app/constants/network';
import { regex } from '../../../app/util/regex';
import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  const provider = bgState.NetworkController.provider as Record<string, unknown>;
  const chainId = NetworksChainId[provider.type];
  // if chainId === '' is a rpc
  if (chainId) {
    bgState.NetworkController.provider = {
      ...(provider as Record<string, unknown>),
      chainId,
    };
    return state;
  }

  // If provider is rpc, check if the current network has a valid chainId
  const storedChainId =
    typeof provider.chainId === 'string' ? provider.chainId : '';
  const isDecimalString = regex.decimalStringMigrations.test(storedChainId);
  const hasInvalidChainId =
    !isDecimalString || !isSafeChainId(parseInt(storedChainId, 10));

  if (hasInvalidChainId) {
    // If the current network does not have a chainId, switch to testnet.
    bgState.NetworkController.provider = {
      ticker: 'ETH',
      type: GOERLI,
      chainId: NetworksChainId.goerli,
    };
  }
  return state;
}
