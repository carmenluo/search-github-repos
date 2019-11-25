import React from 'react';
import useSearchHandlers from './useSearchHandlers';
import Search from './components/Search'

function App() {
  return <div className='container'>
    <Search onChange={setSearchValue} onSubmit={onSubmit} value={state.searchValue}></Search>
    </div>
}

export default App;