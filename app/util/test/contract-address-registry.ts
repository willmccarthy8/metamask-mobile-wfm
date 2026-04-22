/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
/*
 * Use this class to store pre-deployed smart contract addresses of the contracts deployed to
 * a local blockchain instance.
 */
class ContractAddressRegistry {
  #addresses = {};

  /**
   * Store new contract address in key:value pair.
   *
   * @param contractName
   * @param contractAddress
   */
  storeNewContractAddress(contractName, contractAddress) {
    this.#addresses[contractName] = contractAddress;
  }

  /**
   * Get deployed contract address by its name (key).
   *
   * @param contractName
   */
  getContractAddress(contractName) {
    return this.#addresses[contractName];
  }
}

export default ContractAddressRegistry;
