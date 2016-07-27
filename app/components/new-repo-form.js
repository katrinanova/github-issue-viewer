import React from 'react';


export default React.createClass({

  getInitialState: function(){
    return ({
      owner: this.props.repoInfo.owner,
      repo: this.props.repoInfo.repo
    })
  },

  componentWillReceiveProps: function(newProps){
    this.setState({
      owner: newProps.repoInfo.owner,
      repo: newProps.repoInfo.repo
    })
  },

  getOwnerAndRepo: function(){
    return {
      owner: this.refs.owner.value,
      repo: this.refs.repo.value,
    };
  },

  changeOwner: function(e){
    this.setState({ owner: e.target.value});
  },

  changeRepo: function(e){
    this.setState({ repo: e.target.value});
  },

  render: function(){
    let errorMessage;
    if (this.props.errorMessage){
      errorMessage = <h3 className='error-form-not-filled'>{this.props.errorMessage}</h3>;
    } else {
      errorMessage = null;
    }

    return (
      <header className='group'>
        <h1 className='header-title'>View issues in</h1>

        <form
          className='header-form'
          onSubmit={this.props.fetchNewRepoIssues}>

          <label>owner:</label>
          <input
            type='text'
            value={this.state.owner}
            onChange={this.changeOwner}
            ref='owner'/>
          <label>repo:</label>
          <input
            type='text'
            value={this.state.repo}
            onChange={this.changeRepo}
            ref='repo'/>
          <button>load</button>
          
        </form>
        {errorMessage}
      </header>
    );
  }
})
