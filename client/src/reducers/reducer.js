import axios from 'axios'
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
const SET_REPOS = 'SET_REPOS';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_PAGE = 'SET_PAGE';
const reducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.searchValue }
    case SUBMIT_SEARCH:
      return {...state, loading: action.loading}
    case SET_REPOS:
      return {...state, loading: action.loading, repos: action.res, searchValue: ''}
    case SET_ERROR_MESSAGE:
      return {...state, loading: action.loading, errorMessage: action.errorMessage,searchValue: ''}
    case SET_PAGE:
      let currentRepos = state.repos.slice()
      let startIndex = state.reposPerPage * action.page;
      let endIndex = startIndex + state.reposPerPage;
      console.log(`start:
      ${startIndex}
      end : ${endIndex}`)
      currentRepos = currentRepos.slice(startIndex, endIndex)
      console.log(`current repo:
      ${currentRepos}`)
      return {...state, currentRepos: currentRepos}
    }
}
export { reducer, SET_SEARCH_VALUE, SUBMIT_SEARCH, SET_REPOS, SET_ERROR_MESSAGE,SET_PAGE }