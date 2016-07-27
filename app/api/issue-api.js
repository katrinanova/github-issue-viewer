import store from '../store';
import { loadingIssues, currentPageLoaded, issuesError } from '../actions/issue-actions';

const API_URL_ISSUES = "https://api.github.com/repos"
const SHOW_PER_PAGE = 10



export function fetchAndLoadIssues(owner, repo, query, newRepo){
  console.log("fetchAndLoadIssues query: ", query);
  console.log("fetchAndLoadIssues true: ",  (query && query.page));
  let currentPageNum = (query && query.page) ? query.page : 1;
  currentPageNum = parseInt(currentPageNum);
  let lastPageNum;

  const url = generateApiUrl(owner, repo, query);
  store.dispatch(loadingIssues());
  fetch(url)
  .then(response => {
    console.log('response1: ', response);
    console.log('response-hhh: ', response.headers.get("Link"));
    if (response.headers.get("Link")){
      const link = response.headers.get("Link");
      lastPageNum = getLastPageNumber(link) || currentPageNum;
    }

    return response.json();

  })
  .then(response => {
    console.log("response.json(), ", response);
    if (response.message){
      console.log("error here: ");
      store.dispatch(issuesError(response.message));
    } else {
      console.log('lastPageNum111: ', lastPageNum);
      console.log('CCCcurrentPageNum ', currentPageNum);
      store.dispatch(currentPageLoaded(response, currentPageNum, lastPageNum));
    }
  })
}

export function generateAppUrl(owner, repo, query){
  var pageNum = (query && query.page) ? query.page : 1
  return path(owner, repo) + "?page=" + pageNum
}


function generateApiUrl(owner, repo, query = {}){
  let params = {
    per_page: SHOW_PER_PAGE,
    page: 1,
    state: "all"
  }

  params = Object.assign(params, query);
  return API_URL_ISSUES + path(owner, repo) + "?" + queryString(params);
}

function path(owner, repo){
  return "/" + owner + "/" + repo + "/issues"
}



function queryString(params) {
    return Object.keys(params).map(function(key) {
        return [key, params[key]].map(encodeURIComponent).join("=");
    }).join("&");
}

function getLastPageNumber(link){
  const linksArr = link.split(",").map(el => el.split(";"));
  let lastPageNum;
  for (let i = 0; i < linksArr.length; i++){
    if (linksArr[i][1] === ' rel="last"'){
      lastPageNum = linksArr[i][0].split("&page=")[1];
    }
  }

  if (lastPageNum) return parseInt(lastPageNum);
}
