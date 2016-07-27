import React from 'react';
import { browserHistory } from 'react-router';
import IssueItem from './issue-item'

export default React.createClass({

  redirectToIssueDetails: function(number){
    const path = "/" + this.props.repoInfo.owner + "/" + this.props.repoInfo.repo + "/issues";
    browserHistory.push(path + "/" + number);
  },



  render: function(){
    return (
      <IssueItem {...this.props} redirectToIssueDetails={this.redirectToIssueDetails}/>
    )
  }
})
