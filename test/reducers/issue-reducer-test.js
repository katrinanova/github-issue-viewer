import expect from 'expect';
import issueReducer from '../../app/reducers/issue-reducer';
import * as types from '../../app/actions/action-types';
import { Map } from 'immutable';

const issues1 = [{body: 'body', title: 'title'}, {body: 'body2', title: 'title2'}];
const issues2 = [{body: '2body2', title: '2title2'}, {body: '2body2', title: '2title2'}];
const issues3 = [{body: '3body2', title: '3title2'}, {body: '3body2', title: '3title2'}];
const issues4 = [{body: '4body2', title: '4title2'}, {body: '4body2', title: '4title2'}];


const initialReducer = Map({
  currentPageNum: 1,
  lastPageNum: null,
  pages: Map({
    first: null,
    prev: null,
    current: null,
    next: null,
    last: null,
  }),
  loadingError: null,
  loadingIssues: false
});


const filledReducer = Map({
  currentPageNum: 3,
  lastPageNum: 20,
  pages: Map({
    first: null,
    prev: issues1,
    current: issues2,
    next: issues3,
    last: null,
  }),
  loadingError: null,
  loadingIssues: false
});


describe('issueReducer', () => {
  it('should return the initial state', () => {
    expect(
      issueReducer(undefined, {})
    ).toEqual(initialReducer)
  })

  it('should handle LOADING_ISSUES', () => {
    expect(
      issueReducer(initialReducer, {
        type: types.LOADING_ISSUES
      })
    ).toEqual(
      initialReducer.set('loadingIssues', true)
    )
  })

  it('should handle CURRENT_PAGE_LOADED', () => {
    expect(
      issueReducer(initialReducer, {
        type: types.CURRENT_PAGE_LOADED,
        issues: issues1,
        currentPageNum: 3,
        lastPageNum: 20
      })
    ).toEqual(
      Map({
        currentPageNum: 3,
        lastPageNum: 20,
        pages: Map({
          first: null,
          prev: null,
          current: issues1,
          next: null,
          last: null,
        }),
        loadingError: null,
        loadingIssues: false
      })
    )
  })

  it('should handle ISSUES_ERROR', () => {
    expect(
      issueReducer(initialReducer, {
        type: types.ISSUES_ERROR,
        errorMessage: 'Not Found'
      })
    ).toEqual(
      initialReducer.set('loadingError', 'Not Found')
    )
  })

  it('should handle CHANGE_PAGE', () => {
    expect(
      issueReducer(filledReducer, {
        type: types.CHANGE_PAGE,
        place: 'next',
        currentPageNum: 4
      })
    ).toEqual(
      Map({
        currentPageNum: 4,
        lastPageNum: 20,
        pages: Map({
          first: null,
          prev: issues2,
          current: issues3,
          next: null,
          last: null,
        }),
        loadingError: null,
        loadingIssues: false
      })
    )
  })
})

it('should handle PAGE_LOADED', () => {
  expect(
    issueReducer(filledReducer, {
      type: types.PAGE_LOADED,
      issues: issues4,
      place: 'next',
      lastPageNum: 21
    })
  ).toEqual(
    Map({
      currentPageNum: 3,
      lastPageNum: 21,
      pages: Map({
        first: null,
        prev: issues1,
        current: issues2,
        next: issues4,
        last: null,
      }),
      loadingError: null,
      loadingIssues: false
    })
  )
})
