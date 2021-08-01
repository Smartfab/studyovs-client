import React from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 50px;

  button {
    outline: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 5px 10px;
    .icon {
      color: #c00;
      font-size: 25px;
    }
    :hover {
      background: #c5c5c5;
    }
  }
  span {
    padding: 5px;
    color: inherit;
  }
`

export default function QueryPagination({
  nextPage,
  prevPage,
  hasMore,
  currentPage,
  totalPages,
  isFetching,
}) {
  return (
    <>
      {totalPages > 1 ? (
        <Styles>
          <button type="button" onClick={() => prevPage()}>
            <HiArrowNarrowLeft className="icon" style={{ color: currentPage === 1 && 'gray' }} />
          </button>
          {isFetching ? (
            <div style={{ paddingTop: '5px' }}>
              <Loader type="TailSpin" color="#c00" height={20} width={20} />
            </div>
          ) : null}
          <span>{currentPage}</span> of
          <span style={{ color: '#c00' }}>{totalPages}</span>
          <button type="button" onClick={() => nextPage()}>
            <HiArrowNarrowRight className="icon" style={{ color: !hasMore && 'gray' }} />
          </button>
        </Styles>
      ) : null}
    </>
  )
}
