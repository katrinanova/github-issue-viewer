import { combineReducers } from 'redux';

import issueReducer from './issue-reducer';

var reducers = combineReducers({
    issueState: issueReducer,
});

export default reducers;
