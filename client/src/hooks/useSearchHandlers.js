import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { reducer, SET_SEARCH_VALUE, SUBMIT_SEARCH, SET_REPOS, SET_ERROR_MESSAGE, SET_PAGE } from '../reducers/reducer'
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
const useSearchHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setSearchValue = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: SET_SEARCH_VALUE, searchValue: searchValue })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SUBMIT_SEARCH, loading: true, errorMessage: '' })
    axios.get(`https://api.github.com/search/users?q=${state.searchValue}`)
      .then((res) => {
        console.log(res)
        if (res.data.total_count == 1) {
          axios.get(`https://api.github.com/users/${state.searchValue}/repos?per_page=100`)
            .then((res) => {
              console.log(res)
              if (res.status >= 200 && res.status < 300) {
                dispatch({ type: SET_REPOS, res: res.data, loading: false })
                dispatch({ type: SET_PAGE, page: state.currentPageNo })
              } 
            })
      } else if (res.data.total_count == 0) {
          dispatch({ type: SET_ERROR_MESSAGE, errorMessage: "User Record Not Found", loading: false })
      }
      else {
        dispatch({ type: SET_ERROR_MESSAGE, errorMessage: "User Records Too Many", loading: false })
      }
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