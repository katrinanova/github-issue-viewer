import React from 'react';
import NameAndAvatar from './name-and-avatar'
import Labels from './labels'


export default React.createClass({

  render: function(){
    const issue = this.props.issue;

    return (
      <div
        className='item-container group'
        onClick={this.props.redirectToIssueDetails.bind(null, this.props.issue.number)}>
        <NameAndAvatar user={issue.user}/>
        <section className='item-issue-info'>
          <h2>{issue.title} <span className='issue-number'>#{issue.number}</span></h2>
          <p>{this.props.resizedBody}</p>
          <Labels labels={issue.labels}/>
        </section>
      </div>
    );
  }
})
