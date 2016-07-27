import * as types from '../actions/action-types';
import { Map } from 'immutable';

const initialState = Map({
  issue: '',
  issueError: '',
  comments: null,
  commentsError: ''
})

export default (state = initialState, action) => {


  switch(action.type) {
    // should I clear comments error?

    case types.ISSUE_LOADED:
    console.log('reducer ISSUE_LOADED: ', action.issues);
      return state.set('issue', action.issue);

    case types.ISSUE_ERROR:
      return state.set('issue', '').set('issueError', action.errorMessage);

    case types.COMMENTS_LOADED:
      console.log('reducer COMMENTS_LOADED: ', action.comments);
      return state.set('comments', action.comments);

    case types.COMMENT_ERROR:
      return state.set('comments', null).set('commentsError', action.errorMessage);

    case types.CLEAR_COMMENTS:
      return state.set('comments', null).set('commentsError', null);

  }

  return state;
}
