import React from 'react';
import PaginationContainer from './pagination-container';
import IssueItemContainer from './issue-item-container'


export default React.createClass({

  render: function(){
    if (this.props.error){
      return (
        <div className='error-container'>
          <h3 className='error'>{this.props.error}</h3>
          <h4>Common causes of failure:</h4>
          <ul className="error-list">
            <li>Owner's name is correct</li>
            <li>Repo's title is correct</li>
            <li>Repo is private</li>
            <li>If excided API rate limit, please consider <a href="https://developer.github.com/v3/#authentication">authentification</a></li>
          </ul>
        </div>
      );
  } else if (!this.props.issues || this.props.loading){
      return <h1 className="loading">Loading...</h1>;
    } else {
      return (
        <div>
          <PaginationContainer repoInfo={this.props.repoInfo}/>
          <ul className='issue-list'>
            {this.props.issues.map(issue => {
              return (
                <li key={issue.id}>
                  <IssueItemContainer issue={issue} repoInfo={this.props.repoInfo} />
                </li>
              );
            })}
          </ul>
          <PaginationContainer repoInfo={this.props.repoInfo}/>
        </div>
      );
    }
  }
})
