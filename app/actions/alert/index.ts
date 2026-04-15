export const AlertActionTypes = {
  HIDE_ALERT: 'HIDE_ALERT',
  SHOW_ALERT: 'SHOW_ALERT',
} as const;

interface DismissAlertAction {
  type: typeof AlertActionTypes.HIDE_ALERT;
}

interface ShowAlertAction {
  type: typeof AlertActionTypes.SHOW_ALERT;
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: unknown | null;
}

export type AlertAction = DismissAlertAction | ShowAlertAction;

export function dismissAlert(): DismissAlertAction {
  return {
    type: AlertActionTypes.HIDE_ALERT,
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
  data: unknown | null;
}): ShowAlertAction {
  return {
    type: AlertActionTypes.SHOW_ALERT,
    isVisible,
    autodismiss,
    content,
    data,
  };
}
