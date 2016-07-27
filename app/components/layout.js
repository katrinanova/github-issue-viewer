import React from 'react';

export default React.createClass({

  render: function(){
    console.log('Layout iiner component will render')

    return (
      <div className="layout-container">
        {this.props.children && React.cloneElement(this.props.children, {
          location: this.props.location
        })}
      </div>
    )
  }
})
