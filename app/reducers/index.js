import { combineReducers } from 'redux';

import issueReducer from './issue-reducer';

const reducers = combineReducers({
    issueState: issueReducer,
});

export default reducers;
