// @ts-nocheck - TODO: Add proper types as part of ongoing JS→TS migration
export function addBookmark(bookmark) {
  return {
    type: 'ADD_BOOKMARK',
    bookmark,
  };
}

export function removeBookmark(bookmark) {
  return {
    type: 'REMOVE_BOOKMARK',
    bookmark,
  };
}
