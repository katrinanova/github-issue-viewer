import fetch from 'isomorphic-fetch';
import store from '../store';
import { issueLoaded, issueError, commentsLoaded, commentsError } from '../actions/issue-details-actions';
import { parseIssues } from './issue-api'
import marked from 'marked'



const API_URL_ISSUES = 'https://api.github.com/repos';
const API_URL_USERS = 'https://api.github.com/users/';
const GITHUB_URL = 'https://github.com/';
const USERNAME_REGEX = /(@[a-zA-Z0-9_]{2,38})/g;



export function fetchComments(url){
  console.log('about to fetch comments url: ', url);
  fetch(url)
  .then(response => response.json())
  .then(response => {
    if (response.message){
      store.dispatch(commentsError(response.message));
    } else {
      console.log('comments response: ', response);
      parseForUserLinks(parseComments(response));
    }
  })
}

export function fetchIssue(params){
  const url = API_URL_ISSUES + '/' + params.owner + '/' + params.repo + '/issues' + '/' + params.number;
  fetch(url)
  .then(response => response.json())
  .then(response => {
    if (response.message){
      store.dispatch(issueError(response.message));
    } else {
      parseForUserLinks(parseIssues(response));
    }
    if (response.comments) {
      fetchComments(response.comments_url);
    }
  })
}

// authour of the issues and all the commenters
const presentUsers = new Set();

function parseForUserLinks(response){
  let responseType;
  if (Array.isArray(response)){
    responseType = 'comments';
    console.log('comments parsinng!');
  } else {
    responseType = 'issue';
    response = [response];
    console.log('im issue: ', response);
  }

  let potentialUserLinks = new Set();

  response.forEach(object => {
    // store author's name to not test the link to it if it will appear in comments
    presentUsers.add(object.user.name);
    console.log('presentUsers: ', presentUsers);

    const matches = object.body.match(USERNAME_REGEX);
    if (matches) potentialUserLinks.add(...matches);
    console.log('matched array: ', potentialUserLinks);
  })



  const callback = parseAndDispatch.bind(null, response, responseType);

  console.log('before generateReplacers response: ', response, ' potentialUserLinks: ', potentialUserLinks);


  generateReplacers(potentialUserLinks, callback);
}


function generateReplacers(potentialUserLinks, callback){
  console.log('generating');
  let linksLeft = potentialUserLinks.size;
  let replacers = {};

  if (!linksLeft) callback(replacers);

  potentialUserLinks.forEach(link => {
    if (presentUsers.has(link.slice(1))){
      replacers[link] = userNameToLink(link);
      linksLeft--;
      if (!linksLeft) console.log('2 called dispatch!'); callback(replacers);
    } else {
      const url = API_URL_USERS + link.slice(1);
      fetch(url)
      .then(response => {
        console.log('status: ', response.status);
        if (response.status === 200){
          replacers[link] = userNameToLink(link);
          console.log('mmatchlink: ', link);
        } else {
          replacers[link] = link;
        }
        linksLeft--;
        if (!linksLeft) console.log('3 called dispatch!'); callback(replacers);

      })
    }
  })
}

function parseAndDispatch(response, responseType, replacers){

  response.forEach(function(object){
    object.body = object.body.replace(USERNAME_REGEX, (matched => replacers[matched]));
  })
  if (responseType === 'issue'){
    store.dispatch(issueLoaded(response[0]));
  } else {
    store.dispatch(commentsLoaded(response));
  }
}

function userNameToLink(userName){
  return '<a href="' + GITHUB_URL + userName.slice(1) + '">' + userName + '</a>';
}

function parseComments(comments){
  let parsedComments = [];
  for (let comment of comments){
    let parsedComment = {
      body: marked(comment.body, {breaks: true}),
      user: {
        name: comment.user.login,
        avatarUrl: comment.user.avatar_url,
        userUrl: comment.user.html_url,
      },
    }
    parsedComments.push(parsedComment);
  }
  console.log('parsedComments: ', parsedComments);
  return parsedComments;
}
