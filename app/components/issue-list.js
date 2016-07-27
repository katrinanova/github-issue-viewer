import React from 'react';
import PaginationContainer from "./pagination-container"


export default React.createClass({

  render: function(){
    console.log("props.issues from issue list: ", this.props.issues)
    console.log("loadinggg: ", this.props.loading)
    if (this.props.error){
      return (
        <div className="error-container">
          <h3 className="error">{this.props.error}</h3>
        </div>
      )
    // XXX get some gif
  } else if (!this.props.issues || this.props.loading){
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <PaginationContainer repoInfo={this.props.repoInfo}/>
          <ul className="issue-list">
            {this.props.issues.map(issue => {
              return (
                <li key={issue.id}> issue={issue.title} />
                </li>
              )
            })}
          </ul>
          <PaginationContainer repoInfo={this.props.repoInfo}/>
        </div>
      );
    }

  }
})
