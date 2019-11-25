import { useReducer } from 'react'
import { reducer, SET_SEARCH_VALUE, SUBMIT_SEARCH, SET_REPOS, SET_ERROR_MESSAGE, SET_PAGE } from '../reducers/reducer'
import axios from 'axios'
const initState = {
  searchValue: '',
  userName: null,
  loading: false,
  repos: [],
  errorMessage: null,
  currentRepos: [],
  reposPerPage: 10,
  totalPages: null,
  currentPageNo: 1
}
const useSearchHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  // Set Search bar value
  const setSearchValue = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: SET_SEARCH_VALUE, searchValue: searchValue })
  }
  //Github return 100 items one page, so recursive retrieve all items
  const retrievedRepo = (url, repos, resolve, reject, githubPages) => {
    axios.get(`${url}&page=${githubPages}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          dispatch({ type: SET_REPOS, res: res.data, loading:true, userName: state.searchValue })
          dispatch({ type: SET_PAGE, page: state.currentPageNo })
          if (res.data.length === 0) {
            dispatch({ type: SET_REPOS, res: res.data,loading:false, userName: state.searchValue })
            dispatch({ type: SET_PAGE, page: state.currentPageNo })
          } else {
            githubPages++;
            retrievedRepo(url, repos, resolve, reject, githubPages)
          }
        }
      })
  }
  // when click submit, 4 considerations:
  // 1. Requesting, loading state
  // 2. unique user exists, return repo infos
  // 3. many users have that name, show error message "too many users"
  // 4. Not user found, show error message 'User Record Not Found'
  // 5. TODO: github api limit 100 items per page. Need to get all repos
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SUBMIT_SEARCH, loading: true, errorMessage: '' })
    //init the first-time search for that name
    axios.get(`https://api.github.com/search/users?q=user:${state.searchValue}`)
      .then((res) => {
        if (res.data.total_count === 1) {
          let githubPages = 1;
          let url = `https://api.github.com/users/${state.searchValue}/repos?per_page=100`
          retrievedRepo(`${url}`, [], null, null, githubPages)
        } else if (res.data.total_count === 0) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage: "User Record Not Found", loading: false })
        } else {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage: "User Records Too Many", loading: false })
        }
      })
      .catch(err => {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage: "User Record Not Found", loading: false })
      })
  }
  const setPage = (page, e) => {
    e.preventDefault();
    dispatch({ type: SET_PAGE, page: page })
  }
  return (
    {
      state,
      setSearchValue,
      onSubmit,
      setPage
    })
}
export default useSearchHandlers;