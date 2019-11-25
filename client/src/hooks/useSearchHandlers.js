import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { reducer, SET_SEARCH_VALUE, SUBMIT_SEARCH, SET_REPOS, SET_ERROR_MESSAGE, SET_PAGE} from './reducer'
const initState = {
  searchValue: '',
  loading: false,
  repos: []
}
const useSearchHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setSearchValue = (e) => {
    const searchValue = e.target.value;
    dispatch({ type: SET_SEARCH_VALUE, searchValue: searchValue })
  }
 
  return (
    {
      state,
      setSearchValue
    })
}
export default useSearchHandlers;