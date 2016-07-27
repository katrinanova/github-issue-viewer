import React from 'react';
import NameAndAvatar from './name-and-avatar';


export default React.createClass({
  render: function(){
    return (
      <div className='convo-cell-container group'>
        <NameAndAvatar user={this.props.user}/>
        <p className='convo-cell-body' dangerouslySetInnerHTML={{ __html: this.props.body}}></p>
      </div>
    )
  }
})
