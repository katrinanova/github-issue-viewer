import expect from 'expect';
import issueReducer from '../../app/reducers/issue-details-reducer';
import * as types from '../../app/actions/action-types';
import { Map } from 'immutable';

const issue1 = {body: 'body', title: 'title'};
const issue2 = {body: 'body2', title: 'title2'};
const comments1 = [{userName: "bobby", body: "+1"}];
const comments2 = [{userName: "billy", body: "help!"}];

const initialReducer = Map({
  issue: null,
  issueError: null,
  comments: null,
  commentsError: null
})

const filledReducer = Map({
  issue: issue1,
  issueError: null,
  comments: comments1,
  commentsError: null
})





describe('issueReducer', () => {

  it('should handle ISSUE_LOADED', () => {
    expect(
      issueReducer(filledReducer, {
        type: types.ISSUE_LOADED,
        issue: issue2
      })
    ).toEqual(
      filledReducer.set('issue', issue2)
    )
  })

  it('should handle ISSUE_ERROR', () => {
    expect(
      issueReducer(filledReducer, {
        type: types.ISSUE_ERROR,
        errorMessage: "Not Found"
      })
    ).toEqual(
      Map({
        issue: null,
        issueError: 'Not Found',
        comments: null,
        commentsError: null
      })
    )
  })

  it('should handle COMMENTS_LOADED', () => {
    expect(
      issueReducer(filledReducer, {
        type: types.COMMENTS_LOADED,
        comments: comments2
      })
    ).toEqual(
      filledReducer.set("comments", comments2)
    )
  })

  it('should handle COMMENTS_ERROR', () => {
    expect(
      issueReducer(filledReducer, {
        type: types.COMMENTS_ERROR,
        errorMessage: "Not Found"
      })
    ).toEqual(
      Map({
        issue: issue1,
        issueError: null,
        comments: null,
        commentsError: "Not Found"
      })
    )
  })

  it('should handle CLEAR_COMMENTS', () => {
    expect(
      issueReducer(filledReducer, {
        type: types.CLEAR_COMMENTS,
      })
    ).toEqual(
      Map({
        issue: issue1,
        issueError: null,
        comments: null,
        commentsError: null
      })
    )
  })
})
