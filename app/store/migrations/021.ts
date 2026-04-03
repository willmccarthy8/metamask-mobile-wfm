import { IPFS_DEFAULT_GATEWAY_URL } from '../../../app/constants/network';
import { isObject } from '@metamask/utils';

export default function migrate(state: unknown) {
  if (!isObject(state)) return state;
  if (!isObject(state.engine)) return state;
  const engineState = state.engine as Record<string, unknown>;
  if (!isObject(engineState.backgroundState)) return state;
  const bgState = engineState.backgroundState as Record<string, Record<string, unknown>>;

  const outdatedIpfsGateways = [
    'https://hardbin.com/ipfs/',
    'https://ipfs.greyh.at/ipfs/',
    'https://ipfs.fooock.com/ipfs/',
    'https://cdn.cwinfo.net/ipfs/',
  ];

  const isUsingOutdatedGateway = outdatedIpfsGateways.includes(
    bgState?.PreferencesController?.ipfsGateway as string,
  );

  if (isUsingOutdatedGateway) {
    bgState.PreferencesController.ipfsGateway =
      IPFS_DEFAULT_GATEWAY_URL;
  }
  return state;
}
