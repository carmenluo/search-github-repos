import React from 'react';
import './App.scss';
import Search from './Search';
import Repo from './Repo';
import useSearchHandlers from './useSearchHandlers'
import Status from './Status';
import ReposPage from './ReposPage';

function App() {

  const {
    state,
    setSearchValue,
    onSubmit,
    setPage
  } = useSearchHandlers()
  return <div className='container'>
    <Search onChange={setSearchValue} onSubmit={onSubmit} value={state.searchValue}></Search>

    <div className="repos__container">
      {state.loading && !state.errorMessage ? (
        <Status message="Loading"></Status>
      ) : state.errorMessage ? (
        <div className="errorMessage">{state.errorMessage}</div>
      ) : (
            <ReposPage
              repos={state.repos}
              currentRepos={state.currentRepos}
              currentPageNo={state.currentPageNo}
              setPage={setPage}
            ></ReposPage>
          )}
    </div>
  </div>
}

export default App;
