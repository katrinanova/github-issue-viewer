import { combineReducers } from 'redux';

import issueReducer from './issue-reducer';
import issueDetailsReducer from './issue-details-reducer';

const reducers = combineReducers({
    issueState: issueReducer,
    issueDetailsState: issueDetailsReducer
});

export default reducers;
