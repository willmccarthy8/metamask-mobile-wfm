import { ControllerInitFunction } from '../types';
import {
  PermissionController,
  type PermissionSpecificationConstraint,
  type CaveatSpecificationConstraint,
  type PermissionControllerMessenger,
} from '@metamask/permission-controller';
import { PermissionControllerInitMessenger } from '../messengers/permission-controller-messenger';
import {
  getCaveatSpecifications,
  getPermissionSpecifications,
  unrestrictedMethods,
} from '../../Permissions/specifications';
///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
import { getSnapPermissionSpecifications } from '../../Snaps/permissions/specifications';
///: END:ONLY_INCLUDE_IF
import { CaipChainId } from '@metamask/utils';

/**
 * Initialize the permission controller.
 *
 * @param request - The request object.
 * @param request.controllerMessenger - The messenger to use for the controller.
 * @returns The initialized controller.
 */
export const permissionControllerInit: ControllerInitFunction<
  PermissionController<
    PermissionSpecificationConstraint,
    CaveatSpecificationConstraint
  >,
  PermissionControllerMessenger,
  PermissionControllerInitMessenger
> = ({ controllerMessenger, initMessenger, persistedState, getController }) => {
  ///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
  const keyringController = getController('KeyringController');
  ///: END:ONLY_INCLUDE_IF

  const controller = new PermissionController({
    messenger: controllerMessenger,
    state: persistedState.PermissionController,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    caveatSpecifications: getCaveatSpecifications({
      listAccounts: () =>
        initMessenger.call('AccountsController:listAccounts'),
      findNetworkClientIdByChainId: (chainId: `0x${string}`) =>
        initMessenger.call(
          'NetworkController:findNetworkClientIdByChainId',
          chainId,
        ),
      isNonEvmScopeSupported: (scope) =>
        initMessenger.call(
          'MultichainRouter:isSupportedScope',
          scope as CaipChainId,
        ),
      getNonEvmAccountAddresses: (scope) =>
        initMessenger.call(
          'MultichainRouter:getSupportedAccounts',
          scope as CaipChainId,
        ) as any,
    }) as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    permissionSpecifications: {
      ...getPermissionSpecifications(),
      ///: BEGIN:ONLY_INCLUDE_IF(preinstalled-snaps,external-snaps)
      ...getSnapPermissionSpecifications(initMessenger, {
        addNewKeyring: keyringController.addNewKeyring.bind(keyringController),
      }),
      ///: END:ONLY_INCLUDE_IF
    } as any,
    unrestrictedMethods,
  });

  return {
    controller,
  };
};
