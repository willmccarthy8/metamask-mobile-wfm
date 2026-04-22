/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export function addBookmark(bookmark: any) {
  return {
    type: 'ADD_BOOKMARK',
    bookmark,
  };
}

export function removeBookmark(bookmark: any) {
  return {
    type: 'REMOVE_BOOKMARK',
    bookmark,
  };
}
