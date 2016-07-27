import React from 'react';


export default React.createClass({

  render: function(){
    const issue = this.props.issue;

    return (
      <div
        onClick={this.props.redirectToIssueDetails.bind(null, this.props.issue.number)}>
        <section className='item-issue-info'>
          <h2>{issue.title} <span className='issue-number'>#{issue.number}</span></h2>
          <p>{this.props.resizedBody}</p>
        </section>
      </div>
    );
  }
})
