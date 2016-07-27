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
      return state.set('loadingIssues', true);

    case types.CURRENT_PAGE_LOADED:
      return (
        state
          .setIn(['pages', 'current'], action.issues)
          .set('currentPageNum', action.currentPageNum)
          .set('lastPageNum', action.lastPageNum)
          .set('loadingError', null)
          .set('loadingIssues', false)
      );

    case types.ISSUES_ERROR:
      return state.set('loadingError', action.errorMessage);

    case types.PAGE_LOADED:
      if (action.lastPageNum) {
        return (
          state
            .set('lastPageNum', action.lastPageNum)
            .setIn(['pages', action.place], action.issues)
          );
      } else {
        return state.setIn(['pages', action.place], action.issues);
      }

    case types.CHANGE_PAGE:

      const newPageIssues = state.getIn(['pages', action.place]);

      switch(action.place){
        case ('first'):
          return (
            state
            .set('currentPageNum', 1)
            .setIn(['pages', 'current'], newPageIssues)
            .setIn(['pages', 'next'], null)
            .setIn(['pages', 'prev'], null)
          );
        case ('prev'):
          return (
            state
            .set('currentPageNum', state.get('currentPageNum') - 1)
            .setIn(['pages', 'next'], state.getIn(['pages', 'current']))
            .setIn(['pages', 'current'], newPageIssues)
            .setIn(['pages', 'prev'], null)
          );
        case ('next'):
          return (
            state
            .set('currentPageNum', state.get('currentPageNum') + 1)
            .setIn(['pages', 'prev'], state.getIn(['pages', 'current']))
            .setIn(['pages', 'current'], newPageIssues)
            .setIn(['pages', 'next'], null)
          );
        case ('last'):
          return (
            state
            .set('currentPageNum', state.get('lastPageNum'))
            .setIn(['pages', 'current'], newPageIssues)
            .setIn(['pages', 'next'], null)
          );
      }
  }

  return state;

}
