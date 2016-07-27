import * as types from '../actions/action-types';
import { Map } from 'immutable';

const initialState = Map({
  currentPageNum: 1,
  lastPageNum: null,
  pages: Map({
    first: null,
    prev: null,
    current: null,
    next: null,
    last: null,
  }),
  loadingError: null,
  loadingIssues: false
});

export default (state = initialState, action) => {

  switch(action.type) {

    case types.LOADING_ISSUES:
      return state.set("loadingIssues", true)

    case types.CURRENT_PAGE_LOADED:

      return (
        state
          .setIn(["pages", "current"], action.issues)
          .set("currentPageNum", action.currentPageNum)
          .set("lastPageNum", action.lastPageNum)
          .set("loadingError", null)
          .set("loadingIssues", false)
      )


    case types.ISSUES_ERROR:
      return state.set("loadingError", action.errorMessage)

  }

  return state;

}
