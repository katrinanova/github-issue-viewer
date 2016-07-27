import React from 'react';
import { browserHistory } from 'react-router';


export default React.createClass({
  redirectToUser: function(e){
    e.stopPropagation();
    location = this.props.user.userUrl
  },

  render: function(){
    return(
      <div
        className="avatar-container"
        onClick={this.redirectToUser}
      >
        <img className="avatar-image" src={this.props.user.avatarUrl}></img>
        <p className="avatar-name">{this.props.user.name}</p>
      </div>
    )
  }
})
