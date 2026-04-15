import {
  Bookmark,
  BookmarksAction,
  BookmarkActionTypes,
} from '../../actions/bookmarks';

export type BookmarksState = Bookmark[];

export const initialState: BookmarksState = [];

const bookmarksReducer = (
  state: BookmarksState = initialState,
  action: BookmarksAction,
): BookmarksState => {
  switch (action.type) {
    case BookmarkActionTypes.ADD_BOOKMARK:
      return [...state, action.bookmark];
    case BookmarkActionTypes.REMOVE_BOOKMARK:
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};
export default bookmarksReducer;
