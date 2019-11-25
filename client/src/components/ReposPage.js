import React from 'react';
import Repo from './Repo';
// helper function return pages array
const range = (from, to) => {
  let i = from;
  const range = [];
  while (i < to) {
    range.push(i);
    i++
  }
  return range;
}

const ReposPage = (props) => {
//When click, set page numer and return repos infos
  const setPage = (page, e) => {
    e.preventDefault();
    props.setPage(page, e);
  }

  let repos = props.currentRepos.map((repo, index) => {
    return <Repo key={index} repo={repo}></Repo>
  })
  let totalPages = Math.ceil(props.repos.length / 10);
  let pages = range(1, totalPages + 1);
  let pageBar = pages.map((page, index) => {
    return <li key={index}><a href='#' onClick={e => setPage(page, e)}>{page}</a></li>
  })
  return (
    <div>
      {props.repos.length > 0 &&
        <div className='repo__navpage'>
          <div className='repo__navpage-sum'>{props.userName}: {props.repos.length} repos found</div>
          <div className='repo__navpage-pages'>Page :{props.currentPageNo} / {totalPages}</div>
          <div className="repo__navpage-page">
            {pageBar}
          </div>
        </div>
      }
      <div className='repos'>
        {repos}
      </div>
    </div>
  )
}
export default ReposPage