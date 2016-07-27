import React from 'react';
import Labels from './labels'
import ConversationCell from './conversation-cell'


export default React.createClass({

  render: function(){
    const issue = this.props.issue;
    console.log('rendering issue details, props:', this.props);
    if (!issue || (issue.comments && !this.props.comments)){
      return (<h3>Loading...</h3>);
    }

    console.log('this.props.comments:' , this.props.comments);
    let comments;
    console.log('before if state');
    if (this.props.comments){
      console.log('issue has comments: ', this.props.comments);
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
      console.log('issue detail else');
      comments = null;
    }

    console.log('about to render issue detail')
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
