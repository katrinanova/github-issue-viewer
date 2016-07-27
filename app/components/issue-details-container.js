import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import * as issueDetailsApi from '../api/issue-details-api';
import IssueDetails from './issue-details'
import { clearComments, issueLoaded } from '../actions/issue-details-actions'


const IssueDetailsContainer = React.createClass({
  componentWillMount: function(){
    store.dispatch(clearComments());
    console.log("issue detail comp will mout");
    // if (this.props.issues){
    if (store.getState().issueState.getIn(["pages", "current"])){
      let issue = this.getIssueFromStore(this.props.params.number);
      store.dispatch(issueLoaded(issue));
      if (issue.comments){
        console.log("issue.comments_url: ", issue.commentsUrl);
        issueDetailsApi.fetchComments(issue.commentsUrl);
      }
    } else {
      issueDetailsApi.fetchIssue(this.props.params);
    }
  },

  getIssueFromStore: function(number){
    number = parseInt(number);
    const issues = store.getState().issueState.getIn(["pages", "current"]);
    for (let i = 0; i < issues.length; i++){
      if (issues[i].number === number){
        console.log("getIssueFromStore issue: ", issues[i]);
        return issues[i];
      }
    }
  },

  render: function(){
    return (
      <IssueDetails {...this.props}/>
    );
  }
})


const mapStateToProps = function(store){
  return {
    issue: store.issueDetailsState.get("issue"),
    issueError: store.issueDetailsState.get("issueError"),
    comments: store.issueDetailsState.get("comments"),
    commentsError: store.issueDetailsState.get("commentsError"),
  };
}

export default connect(mapStateToProps)(IssueDetailsContainer);
