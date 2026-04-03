/**
 * This file contains all the actions related to the in app (old/v1) notification system.
 */
import type { Action as ReduxAction } from 'redux';
import { ACTIONS } from '../../reducers/notification';

export interface HideCurrentNotificationAction
  extends ReduxAction<typeof ACTIONS.HIDE_CURRENT_NOTIFICATION> {}

export interface HideNotificationByIdAction
  extends ReduxAction<typeof ACTIONS.HIDE_NOTIFICATION_BY_ID> {
  id: string | number;
}

export interface ModifyOrShowTransactionNotificationAction
  extends ReduxAction<typeof ACTIONS.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION> {
  autodismiss: number;
  transaction: Record<string, unknown>;
  status: string;
}

export interface ModifyOrShowSimpleNotificationAction
  extends ReduxAction<typeof ACTIONS.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION> {
  autodismiss: number;
  title: string;
  description: string;
  status: string;
}

export interface ReplaceNotificationByIdAction
  extends ReduxAction<typeof ACTIONS.REPLACE_NOTIFICATION_BY_ID> {
  notification: NotificationItem;
  id: string | number;
}

export interface RemoveNotificationByIdAction
  extends ReduxAction<typeof ACTIONS.REMOVE_NOTIFICATION_BY_ID> {
  id: string | number;
}

export interface RemoveCurrentNotificationAction
  extends ReduxAction<typeof ACTIONS.REMOVE_CURRENT_NOTIFICATION> {}

export interface RemoveNotVisibleNotificationsAction
  extends ReduxAction<typeof ACTIONS.REMOVE_NOT_VISIBLE_NOTIFICATIONS> {}

export interface ShowSimpleNotificationAction
  extends ReduxAction<typeof ACTIONS.SHOW_SIMPLE_NOTIFICATION> {
  id: string | number;
  autodismiss: number | boolean;
  title: string;
  description: string;
  status: string;
}

export interface ShowTransactionNotificationAction
  extends ReduxAction<typeof ACTIONS.SHOW_TRANSACTION_NOTIFICATION> {
  autodismiss: number;
  transaction: Record<string, unknown>;
  status: string;
}

export interface NotificationItem {
  id: string | number;
  isVisible: boolean;
  autodismiss?: number;
  title?: string;
  description?: string;
  transaction?: Record<string, unknown>;
  status?: string;
  type?: string;
}

export type NotificationActionTypes =
  | HideCurrentNotificationAction
  | HideNotificationByIdAction
  | ModifyOrShowTransactionNotificationAction
  | ModifyOrShowSimpleNotificationAction
  | ReplaceNotificationByIdAction
  | RemoveNotificationByIdAction
  | RemoveCurrentNotificationAction
  | RemoveNotVisibleNotificationsAction
  | ShowSimpleNotificationAction
  | ShowTransactionNotificationAction;

export function hideCurrentNotification(): HideCurrentNotificationAction {
  return {
    type: ACTIONS.HIDE_CURRENT_NOTIFICATION,
  };
}

export function hideNotificationById(
  id: string | number,
): HideNotificationByIdAction {
  return {
    type: ACTIONS.HIDE_NOTIFICATION_BY_ID,
    id,
  };
}

export function modifyOrShowTransactionNotificationById({
  autodismiss,
  transaction,
  status,
}: {
  autodismiss: number;
  transaction: Record<string, unknown>;
  status: string;
}): ModifyOrShowTransactionNotificationAction {
  return {
    type: ACTIONS.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION,
    autodismiss,
    transaction,
    status,
  };
}

export function modifyOrShowSimpleNotificationById({
  autodismiss,
  title,
  description,
  status,
}: {
  autodismiss: number;
  title: string;
  description: string;
  status: string;
}): ModifyOrShowSimpleNotificationAction {
  return {
    type: ACTIONS.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION,
    autodismiss,
    title,
    description,
    status,
  };
}

export function replaceNotificationById(
  notification: NotificationItem,
): ReplaceNotificationByIdAction {
  return {
    type: ACTIONS.REPLACE_NOTIFICATION_BY_ID,
    notification,
    id: notification.id,
  };
}

export function removeNotificationById(
  id: string | number,
): RemoveNotificationByIdAction {
  return {
    type: ACTIONS.REMOVE_NOTIFICATION_BY_ID,
    id,
  };
}

export function removeCurrentNotification(): RemoveCurrentNotificationAction {
  return {
    type: ACTIONS.REMOVE_CURRENT_NOTIFICATION,
  };
}

export function showSimpleNotification({
  autodismiss,
  title,
  description,
  status,
  id,
}: {
  autodismiss: number | boolean;
  title: string;
  description: string;
  status: string;
  id: string | number;
}): ShowSimpleNotificationAction {
  return {
    id,
    type: ACTIONS.SHOW_SIMPLE_NOTIFICATION,
    autodismiss,
    title,
    description,
    status,
  };
}

export function showTransactionNotification({
  autodismiss,
  transaction,
  status,
}: {
  autodismiss: number;
  transaction: Record<string, unknown>;
  status: string;
}): ShowTransactionNotificationAction {
  return {
    type: ACTIONS.SHOW_TRANSACTION_NOTIFICATION,
    autodismiss,
    transaction,
    status,
  };
}

export function removeNotVisibleNotifications(): RemoveNotVisibleNotificationsAction {
  return {
    type: ACTIONS.REMOVE_NOT_VISIBLE_NOTIFICATIONS,
  };
}
