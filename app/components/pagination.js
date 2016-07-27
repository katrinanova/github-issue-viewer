import React from 'react';
import { Link } from 'react-router';
import * as issueApi from '../api/issue-api';



export default React.createClass({

  render: function(){
    const page = this.props.currentPageNum;
    const owner = this.props.repoInfo.owner;
    const repo = this.props.repoInfo.repo;
    return (
      <div className="pagination-list-container group">
        <ul className="pagination-list group">
          <li>
            <Link to={issueApi.generateAppUrl(owner, repo, {page: 1})}>
              first
            </Link>
          </li>
          <li>
            <Link
              to={issueApi.generateAppUrl(owner, repo, {page: page - 1})}
              className={this.props.pages.get('prev') ? 'active' : 'disabled'}>
              prev
            </Link>
          </li>
          <li>{page} of {this.props.lastPageNum}</li>
          <li>
            <Link
              to={issueApi.generateAppUrl(owner, repo, {page: page + 1})}
              className={this.props.pages.get('next') ? 'active' : 'disabled'}>
              next
            </Link>
          </li>
          <li>
            <Link
              to={issueApi.generateAppUrl(owner, repo, {page: this.props.lastPageNum})}>
              last
            </Link>
          </li>
        </ul>
      </div>
    )
  }
})
