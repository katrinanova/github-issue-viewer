import * as types from './action-types';

export function issueLoaded(issue){
  return {
    type: types.ISSUE_LOADED,
    issue
  }
}

export function issueError(errorMessage){
  return {
    type: types.ISSUE_ERROR,
    errorMessage
  }
}

export function commentsLoaded(comments){
  return {
    type: types.COMMENTS_LOADED,
    comments
  }
}

export function commentsError(errorMessage){
  return {
    type: types.COMMENTS_ERROR,
    errorMessage
  }
}

export function clearComments(){
  return {
    type: types.CLEAR_COMMENTS
  }
}
