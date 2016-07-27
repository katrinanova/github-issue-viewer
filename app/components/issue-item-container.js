import React from 'react';
import { browserHistory } from 'react-router';
import IssueItem from './issue-item';
import { XmlEntities } from 'html-entities';


export default React.createClass({

  redirectToIssueDetails: function(number){
    const path = '/' + this.props.repoInfo.owner + '/' + this.props.repoInfo.repo + '/issues';
    browserHistory.push(path + '/' + number);
  },

  resizeString(string, num){
    // rid of 'marked' tags
    string = string.replace(/(<.*?>)/g, '');
    string = string.split(/\s/).join(' ');
    string = XmlEntities.decode(string);
    if (string.length < num) return string;
    let result = '';
    let word = '';
    for (let i = 0; i < num + 1; i++){
      if (string[i] === ' '){
        result = result + word + ' ';
        word = '';
      } else {
        word += string[i];
      }
    }
    return result.trim() + '...';
  },


  render: function(){
    let resizedBody = this.props.issue.body;
    resizedBody = this.resizeString(resizedBody, 140);

    return (
      <IssueItem {...this.props}
        resizedBody={resizedBody}
        redirectToIssueDetails={this.redirectToIssueDetails}/>
    );
  }
})
