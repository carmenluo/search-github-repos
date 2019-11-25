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
 
      return {
        ...state, 
        loading: action.loading,
        errorMessage: action.errorMessage,
        repos: action.repos,
        currentPageNo: action.currentPageNo
      }
    case SET_REPOS:
      let repos = state.repos.concat(action.res)
      return {
        ...state, 
        loading: action.loading,
        repos: repos,
        userName: action.userName,
      }
    case SET_ERROR_MESSAGE:
      return {...state, loading: action.loading, errorMessage: action.errorMessage,searchValue: ''}
    case SET_PAGE:
      let startIndex = state.reposPerPage * (action.page - 1);
      let endIndex = startIndex + state.reposPerPage;
      let currentRepos = state.repos.slice().slice(startIndex, endIndex)
      return {...state, currentRepos, currentPageNo: action.page}
    }
}
export { reducer, SET_SEARCH_VALUE, SUBMIT_SEARCH, SET_REPOS, SET_ERROR_MESSAGE,SET_PAGE }