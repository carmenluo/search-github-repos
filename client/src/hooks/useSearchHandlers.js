import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { reducer, SET_SEARCH_VALUE, SUBMIT_SEARCH, SET_REPOS, SET_ERROR_MESSAGE, SET_PAGE} from './reducer'
import axios from 'axios'
const initState = {
  searchValue: '',
  loading: false,
  repos: [],
  errorMessage: null,
  currentRepos: [],
  reposPerPage: 10,
  totalPages: null,
  currentPageNo: 1
}

// const onChange = (e) => {
//   const query = e.target.value;
//   dispatch({ type: 'load', query })
// }
const useSearchHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setSearchValue = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: SET_SEARCH_VALUE, searchValue: searchValue })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    // alert(`Submitting search`)
    dispatch({ type: SUBMIT_SEARCH, loading: true, errorMessage: '' })
    axios.get(`https://api.github.com/users/${state.searchValue}/repos?per_page=100`)
      .then((res) => {
        console.log(res)
        if (res.status >= 200 && res.status < 300) {
          dispatch({ type: SET_REPOS, res: res.data, loading: false })
          dispatch({ type: SET_PAGE, page:state.currentPageNo })
        } else {
          console.log(`${res.status}`)
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage: res.status, loading: false })
        }
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage: "no result", loading: false })
      })
  }
  const setPage = (page, e) =>{
    e.preventDefault();
    console.log(page-1)
    dispatch({ type: SET_PAGE, page:page })
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