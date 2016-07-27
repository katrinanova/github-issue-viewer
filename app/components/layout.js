import React from 'react';
import NewRepoFormContainer from './new-repo-form-container'


export default React.createClass({

  render: function(){
    console.log('Layout iiner component will render')

    return (
      <div className='layout-container'>
        <NewRepoFormContainer location={this.props.location}/>


        {this.props.children && React.cloneElement(this.props.children, {
          location: this.props.location
        })}
      </div>
    )
  }
})
