import React from 'react';
import { connect } from 'react-redux';
import NewRepoForm from './new-repo-form';
import store from '../store';
import { browserHistory } from 'react-router';
import * as issueApi from '../api/issue-api';

export default React.createClass({

  getInitialState: function(){
    return ({
      errorMessage: null
    });
  },

  componentWillReceiveProps: function(){
    this.setState({errorMessage: null});
  },

  fetchNewRepoIssues: function(event) {
    console.log('fetching new repo');
    event.preventDefault();
    const ownerAndRepo = this.refs.child.getOwnerAndRepo();

    if (ownerAndRepo.owner && ownerAndRepo.repo){
      const query = {};
      console.log('pushing to browserHistory: ', ownerAndRepo.owner + '/' + ownerAndRepo.repo + '/issues');
      browserHistory.push('/' + ownerAndRepo.owner + '/' + ownerAndRepo.repo + '/issues');
      // issueApi.fetchAndLoadIssues(ownerAndRepo.owner, ownerAndRepo.repo, query, newRepo);
    } else {
      let errorMessage;
      if (!ownerAndRepo.owner && !ownerAndRepo.repo){
        this.setState({errorMessage: 'Owner or Repo can not be blank'});
      } else if (!ownerAndRepo.owner){
        this.setState({errorMessage: 'Owner can not be blank'});
      } else {
        this.setState({errorMessage: 'Repo can not be blank'});
      }
    }
  },

  render: function() {
    console.log('this.props.location.pathname: ', this.props.location.pathname);
    const params = this.props.location.pathname.split('/');
    const repoInfo = {
      owner: params[1],
      repo: params[2]
    }
    return (
      <NewRepoForm repoInfo={repoInfo} fetchNewRepoIssues={this.fetchNewRepoIssues} errorMessage={this.state.errorMessage} ref='child'/>
    );
  }
})
