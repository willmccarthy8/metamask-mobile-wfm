export function dismissAlert() {
  return {
    type: 'HIDE_ALERT' as const,
  };
}

export function showAlert({ isVisible, autodismiss, content, data }: { isVisible: boolean; autodismiss: number | null; content: string | null; data: unknown }) {
  return {
    type: 'SHOW_ALERT',
    isVisible,
    autodismiss,
    content,
    data,
  };
}
