import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Layout from './components/layout';

import IssueListContainer from './components/issue-list-container';
import IssueDetailsContainer from './components/issue-details-container';


export default (
  <Router history={browserHistory}>
    <Route component={Layout}>
      <Route path="/:owner/:repo/issues" component={IssueListContainer} />
      <Route path="/:owner/:repo/issues/:number" component={IssueDetailsContainer} />
    </Route>
  </Router>
);
