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

export function changeCurrentPage(place, currentPageNum){
  return {
    type: types.CHANGE_PAGE,
    place,
    currentPageNum
  }
}

export function pageLoaded(issues, place, lastPageNum){
  return {
    type: types.PAGE_LOADED,
    issues,
    place,
    lastPageNum
  }
}
