import * as types from './action-types';


export function loadingIssues(){
  return {
    type: types.LOADING_ISSUES
  }
}

export function currentPageLoaded(issues, currentPageNum, lastPageNum){
  return {
    type: types.CURRENT_PAGE_LOADED,
    issues,
    currentPageNum,
    lastPageNum
  }
}

export function issuesError(errorMessage){
  return {
    type: types.ISSUES_ERROR,
    errorMessage
  }
}
