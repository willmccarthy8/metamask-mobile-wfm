// @ts-nocheck
import {
  Caip25CaveatType,
  Caip25EndowmentPermissionName,
} from '@metamask/chain-agnostic-permission';
import { createSelector } from 'reselect';

/**
 * This file contains selectors for PermissionController selector event
 * subscriptions, used to detect whenever a subject's accounts change so that
 * we can notify the subject via the `accountsChanged` provider event.
 */

interface Caveat {
  type: string;
  value: Record<string, unknown>;
}

interface Permission {
  caveats?: Caveat[];
}

interface Subject {
  origin?: string;
  permissions?: Record<string, Permission>;
}

interface PermissionControllerState {
  subjects: Record<string, Subject>;
}

interface Caip25CaveatValue {
  requiredScopes: Record<string, unknown>;
  optionalScopes: Record<string, unknown>;
  sessionProperties: Record<string, unknown>;
}

const getSubjects = (state: PermissionControllerState): Record<string, Subject> => state.subjects;

/**
 * Get the authorized CAIP-25 scopes for the subject.
 * The returned value is an immutable value from the PermissionController state,
 * or an empty Caip25CaveatValue if no authorization exists.
 *
 * @param origin - The origin to match the subject state from.
 * @returns The current authorization or undefined if no authorization exists.
 */
export const getAuthorizedScopes = (origin: string) =>
  createSelector(getSubjects, (subjects: Record<string, Subject>): Caip25CaveatValue => {
    const subject = subjects[origin];

    const emptyPermission: Caip25CaveatValue = {
      requiredScopes: {},
      optionalScopes: {},
      sessionProperties: {},
    };

    if (!subject) {
      return emptyPermission;
    }

    const caveats =
      subject.permissions?.[Caip25EndowmentPermissionName]?.caveats || [];

    const caveat = caveats.find(({ type }: Caveat) => type === Caip25CaveatType);

    return (caveat?.value as Caip25CaveatValue) ?? emptyPermission;
  });
