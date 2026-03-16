export enum AlertActionType {
  SHOW_ALERT = 'SHOW_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
}

export interface DismissAlertAction {
  type: AlertActionType.HIDE_ALERT;
}

export interface ShowAlertAction {
  type: AlertActionType.SHOW_ALERT;
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: unknown;
}

export type AlertAction = DismissAlertAction | ShowAlertAction;

export function dismissAlert(): DismissAlertAction {
  return {
    type: AlertActionType.HIDE_ALERT,
  };
}

export function showAlert({
  isVisible,
  autodismiss,
  content,
  data,
}: {
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: unknown;
}): ShowAlertAction {
  return {
    type: AlertActionType.SHOW_ALERT,
    isVisible,
    autodismiss,
    content,
    data,
  };
}
