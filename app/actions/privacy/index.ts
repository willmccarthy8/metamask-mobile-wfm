export const PrivacyActionTypes = {
  APPROVE_HOST: 'APPROVE_HOST',
  REJECT_HOST: 'REJECT_HOST',
  RECORD_SRP_REVEAL_TIMESTAMP: 'RECORD_SRP_REVEAL_TIMESTAMP',
} as const;

interface ApproveHostAction {
  type: typeof PrivacyActionTypes.APPROVE_HOST;
  hostname: string;
}

interface RejectHostAction {
  type: typeof PrivacyActionTypes.REJECT_HOST;
  hostname: string;
}

interface RecordSRPRevealTimestampAction {
  type: typeof PrivacyActionTypes.RECORD_SRP_REVEAL_TIMESTAMP;
  timestamp: number;
}

export type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | RecordSRPRevealTimestampAction;

export function approveHost(hostname: string): ApproveHostAction {
  return {
    type: PrivacyActionTypes.APPROVE_HOST,
    hostname,
  };
}

export function rejectHost(hostname: string): RejectHostAction {
  return {
    type: PrivacyActionTypes.REJECT_HOST,
    hostname,
  };
}

export function recordSRPRevealTimestamp(
  timestamp: number,
): RecordSRPRevealTimestampAction {
  return {
    type: PrivacyActionTypes.RECORD_SRP_REVEAL_TIMESTAMP,
    timestamp,
  };
}
