import React from 'react';
import { connect } from 'react-redux';
import IssueList from './issue-list';
import store from '../store';
import { browserHistory } from 'react-router';
import * as issueApi from '../api/issue-api';
import { changeCurrentPage } from '../actions/issue-actions';

const IssueListContainer = React.createClass({

  componentWillMount: function(){
    console.log('IssueListContainer component will mount, this.props: ', this.props);

    issueApi.fetchAndLoadIssues(this.props.params.owner, this.props.params.repo, this.props.location.query);
  },


  render: function() {
    const repoInfo = {
      owner: this.props.params.owner,
      repo: this.props.params.repo
    }

    return (
      <IssueList
        issues={this.props.issues}
        error={this.props.error}
        loading={this.props.loadingIssues}
        repoInfo={repoInfo}/>
    );
  },
});


const mapStateToProps = function(store){
  return {
    issues: store.issueState.getIn(["pages", "current"]),
    error: store.issueState.get("loadingError"),
    loadingIssues: store.issueState.get("loadingIssues")
  };
}
export default connect(mapStateToProps)(IssueListContainer);
