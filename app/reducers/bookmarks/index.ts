/* eslint-disable @typescript-eslint/default-param-last */
import {
  BookmarkActionType,
  type BookmarkActionTypes,
  type Bookmark,
} from '../../actions/bookmarks';

export type BookmarksState = Bookmark[];

export const initialState: BookmarksState = [];

const bookmarksReducer = (
  state: BookmarksState = initialState,
  action: BookmarkActionTypes,
): BookmarksState => {
  switch (action.type) {
    case BookmarkActionType.ADD_BOOKMARK:
      return [...state, action.bookmark];
    case BookmarkActionType.REMOVE_BOOKMARK:
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};
export default bookmarksReducer;
