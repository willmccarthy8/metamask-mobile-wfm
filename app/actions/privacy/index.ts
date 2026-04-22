/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export function approveHost(hostname: any) {
  return {
    type: 'APPROVE_HOST',
    hostname,
  };
}

export function rejectHost(hostname: any) {
  return {
    type: 'REJECT_HOST',
    hostname,
  };
}

export function recordSRPRevealTimestamp(timestamp: any) {
  return {
    type: 'RECORD_SRP_REVEAL_TIMESTAMP',
    timestamp,
  };
}
