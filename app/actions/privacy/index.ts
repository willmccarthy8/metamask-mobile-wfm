export enum PrivacyActionType {
  APPROVE_HOST = 'APPROVE_HOST',
  REJECT_HOST = 'REJECT_HOST',
  CLEAR_HOSTS = 'CLEAR_HOSTS',
  RECORD_SRP_REVEAL_TIMESTAMP = 'RECORD_SRP_REVEAL_TIMESTAMP',
}

export interface ApproveHostAction {
  type: PrivacyActionType.APPROVE_HOST;
  hostname: string;
}

export interface RejectHostAction {
  type: PrivacyActionType.REJECT_HOST;
  hostname: string;
}

export interface ClearHostsAction {
  type: PrivacyActionType.CLEAR_HOSTS;
}

export interface RecordSRPRevealTimestampAction {
  type: PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP;
  timestamp: string | number;
}

export type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | ClearHostsAction
  | RecordSRPRevealTimestampAction;

export function approveHost(hostname: string): ApproveHostAction {
  return {
    type: PrivacyActionType.APPROVE_HOST,
    hostname,
  };
}

export function rejectHost(hostname: string): RejectHostAction {
  return {
    type: PrivacyActionType.REJECT_HOST,
    hostname,
  };
}

export function recordSRPRevealTimestamp(
  timestamp: string | number,
): RecordSRPRevealTimestampAction {
  return {
    type: PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP,
    timestamp,
  };
}
