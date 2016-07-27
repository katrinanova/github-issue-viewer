import fetch from 'isomorphic-fetch';
import store from '../store';
import { loadingIssues, currentPageLoaded, issuesError, pageLoaded } from '../actions/issue-actions';
import marked from 'marked'


const API_URL_ISSUES = 'https://api.github.com/repos'
const SHOW_PER_PAGE = 10


export function fetchAndLoadIssues(owner, repo, query, newRepo){
  let currentPageNum = (query && query.page) ? query.page : 1;
  currentPageNum = parseInt(currentPageNum);
  let lastPageNum;
  const url = generateApiUrl(owner, repo, query);
  store.dispatch(loadingIssues());

  fetch(url)
  .then(response => {
    if (response.headers.get('Link')){
      const link = response.headers.get('Link');
      lastPageNum = getLastPageNumber(link) || currentPageNum;
      fetchSurroundingPages(owner, repo, currentPageNum, lastPageNum)
    }
    return response.json();
  })
  .then(response => {
    if (response.message){
      store.dispatch(issuesError(response.message));
    } else {
      store.dispatch(currentPageLoaded(parseIssues(response), currentPageNum, lastPageNum));
    }
  })
}


export function fetchSurroundingPages(owner, repo, currentPageNum, lastPageNum){
  if (currentPageNum > 1){
    fetchPage(generateApiUrl(owner, repo, {page: currentPageNum - 1}), 'prev');
  }
  if (currentPageNum < lastPageNum){
    fetchPage(generateApiUrl(owner, repo, {page: currentPageNum + 1}), 'next');
  }
  fetchPage(generateApiUrl(owner, repo, {page: 1}), 'first');
  fetchPage(generateApiUrl(owner, repo, {page: lastPageNum}), 'last');
}


function fetchPage(url, place){
  let lastPageNum;
  fetch(url)
  .then(response => {
    // get last page once for every call of fetchSurroundingPages
    if (place === 'first'){
      const link = response.headers.get('Link');
      lastPageNum = getLastPageNumber(link);
    }
    return response.json();
  }).then(response => {
    if (response.message){
      store.dispatch(issuesError(response.message));
    } else {
      store.dispatch(pageLoaded(parseIssues(response), place, lastPageNum));
    }
  })
}

export function parseIssues(issues){
  if (!Array.isArray(issues)){
    issues = [issues];
    var unpack = true;
  }

  let parsedIssues = [];
  issues.forEach(issue => {
    let parsedIssue = {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: marked(issue.body, {breaks: true}),
      labels: issue.labels,
      state: issue.state,
      user: {
        name: issue.user.login,
        avatarUrl: issue.user.avatar_url,
        userUrl: issue.user.html_url,
      },
      comments: issue.comments,
      commentsUrl: issue.comments_url
    }
    parsedIssues.push(parsedIssue)
  })

  return unpack? parsedIssues[0] : parsedIssues;
}


export function generateAppUrl(owner, repo, query){
  const pageNum = (query && query.page) ? query.page : 1;
  return path(owner, repo) + '?page=' + pageNum;
}


function generateApiUrl(owner, repo, query = {}){
  let params = {
    per_page: SHOW_PER_PAGE,
    page: 1,
    state: 'all'
  }

  params = Object.assign(params, query);
  return API_URL_ISSUES + path(owner, repo) + '?' + queryString(params);
}


function path(owner, repo){
  return '/' + owner + '/' + repo + '/issues';
}


function queryString(params) {
    return Object.keys(params).map(function(key) {
        return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');
}


function getLastPageNumber(link){
  const linksArr = link.split(',').map(el => el.split(';'));
  let lastPageNum;
  for (let i = 0; i < linksArr.length; i++){
    if (linksArr[i][1] === ' rel="last"'){
      lastPageNum = linksArr[i][0].split('&page=')[1];
    }
  }

  if (lastPageNum) return parseInt(lastPageNum);
}
