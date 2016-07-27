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

  componentWillReceiveProps: function(newProps){
    console.log('IssueListContainer component receive new props: ', newProps);
    console.log('IssueListContainer component receive old props: ', this.props);

    const oldPage = parseInt(this.props.location.query.page || 1);

    const newPage = parseInt(newProps.location.query.page || 1);

    // some props update, not redirect to new route
    if (this.props.location.key === newProps.location.key){
      console.log("early return from list comp will receive props");
      return;
    }

    let place;
    if (oldPage - newPage === 1){
      place = "prev";
    } else if (newPage - oldPage === 1){
      place = "next";
    } else if (newPage === 1){
      place = "first";
    } else if (newPage === this.props.lastPageNum){
      place = "last";
    }

    console.log("ppplace: ", place);

    if (newProps.params.owner !== this.props.params.owner || newProps.params.repo !== this.props.params.repo || !place){
      console.log("page is NOY cashed");

      issueApi.fetchAndLoadIssues(newProps.params.owner, newProps.params.repo, newProps.location.query);
    } else {
      console.log("page is cashed, new page: ", newPage);
      // the page is cashed
      issueApi.fetchSurroundingPages(newProps.params.owner, newProps.params.repo, newPage, this.props.lastPageNum);
      store.dispatch(changeCurrentPage(place, newPage));
    }
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
    lastPageNum: store.issueState.get("lastPageNum"),
    error: store.issueState.get("loadingError"),
    loadingIssues: store.issueState.get("loadingIssues")
  };
}
export default connect(mapStateToProps)(IssueListContainer);
