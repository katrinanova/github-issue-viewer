import React from 'react';
import { Link } from 'react-router';
import * as issueApi from '../api/issue-api';




export default React.createClass({

  render: function(){
    var page = this.props.currentPageNum
    var owner = this.props.repoInfo.owner
    var repo = this.props.repoInfo.repo
    return (
      <div>
        <ul>
          <li><Link to={issueApi.generateAppUrl(owner, repo, {page: 1})}>first</Link></li>
          <li><Link to={issueApi.generateAppUrl(owner, repo, {page: page - 1})} className={this.props.pages.get("prev") ? "active" : "disabled"}>prev</Link></li>
          <li>{page} of {this.props.lastPageNum}</li>
          <li><Link to={issueApi.generateAppUrl(owner, repo, {page: page + 1})} className={this.props.pages.get("next") ? "active" : "disabled"}>next</Link></li>
          <li><Link to={issueApi.generateAppUrl(owner, repo, {page: this.props.lastPageNum})}>last</Link></li>
        </ul>
      </div>
    )
  }
})