import React from 'react';
import Labels from './labels'
import ConversationCell from './conversation-cell'


export default React.createClass({

  render: function(){
    const issue = this.props.issue;
    if (this.props.issueError){
      return (
        <div className='error-container'>
          <h3 className='error'>{this.props.issueError}</h3>
        </div>
      )
    }
    if (!issue || (issue.comments && !this.props.comments)){
      return <h1 className="loading">Loading...</h1>;
    }

    let comments;
    if (this.props.comments){
      comments = (
          <ul>
            {this.props.comments.map((comment,i) => {
              return (
                <li key={i}>
                  <ConversationCell body={comment.body} user={comment.user}/>
                </li>
              )
            })}
          </ul>
      );
    } else {
      comments = null;
    }

    const color = issue.state === 'open' ? 'green' : 'red'
    return (
      <div>
        <h2 className='issue-details-title'>{this.props.issue.title} <span className='issue-number'>#{issue.number}</span><span className='issue-state' style={{backgroundColor: color}}>{issue.state}</span></h2>
        <Labels labels={issue.labels}/>

        <ConversationCell body={issue.body} user={issue.user}/>

        {comments}
      </div>
    )
  }
})
