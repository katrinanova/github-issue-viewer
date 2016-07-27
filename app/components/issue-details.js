import React from 'react';


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
                <li key={i} dangerouslySetInnerHTML={{ __html: comment.body}}>
                </li>
              )
            })}
          </ul>
      );
    } else {
      console.log('issue detail else');
      comments = null;
    }

    console.log('about to render issue detail');
    return (
      <div>
        <p dangerouslySetInnerHTML={{ __html: this.props.issue.body}}></p>
        {comments}
      </div>
    )
  }
})
