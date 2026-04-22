/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export function toggleNetworkModal(shouldNetworkSwitchPopToWallet: any = true) {
  return {
    type: 'TOGGLE_NETWORK_MODAL',
    shouldNetworkSwitchPopToWallet,
  };
}

export function toggleCollectibleContractModal() {
  return {
    type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL',
  };
}

export function toggleDappTransactionModal(show: any) {
  return {
    type: 'TOGGLE_DAPP_TRANSACTION_MODAL',
    show,
  };
}

export function toggleInfoNetworkModal(show: any) {
  return {
    type: 'TOGGLE_INFO_NETWORK_MODAL',
    show,
  };
}

export function toggleSignModal(show: any) {
  return {
    type: 'TOGGLE_SIGN_MODAL',
    show,
  };
}
