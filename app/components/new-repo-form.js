import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  getInitialState: function(){
    console.log('form get init state');
    return ({
      owner: this.props.repoInfo.owner,
      repo: this.props.repoInfo.repo
    })
  },

  componentWillReceiveProps: function(newProps){
    console.log('form will receive props');
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
    // console.log('rendering new repo form this.props.repoInfo.get(owner): ', this.props.repoInfo.get('owner'));
    let errorMessage;
    if (this.props.errorMessage){
      errorMessage = <h3 className='error-form-not-filled'>{this.props.errorMessage}</h3>;
    } else {
      errorMessage = null;
    }

    return (
        <header className='group'>
          <h1 className='header-title'>View issues in</h1>
          <form className='header-form' onSubmit={this.props.fetchNewRepoIssues}>
            <label>owner:</label>
            <input type='text' value={this.state.owner} onChange={this.changeOwner} ref='owner'/>
            <label>repo:</label>
            <input type='text' value={this.state.repo} onChange={this.changeRepo} ref='repo'/>
            <button>load</button>
          </form>
          {errorMessage}
        </header>

    );
  }
})
