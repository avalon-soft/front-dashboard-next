import React from 'react'
import './Pagination.sass'
import Chevron from '../Icons/Chevron'
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = []

  // left chevron
  pages.push(
    <button
      key='prev'
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className='pagination__button'
    >
      <Chevron />
    </button>
  )

  // first pages
  for (let i = 1; i <= Math.min(3, totalPages); i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`pagination__button ${i === currentPage ? 'active' : ''}`}
      >
        {i}
      </button>
    )
  }

  // dots
  if (totalPages > 3 && currentPage > 3) {
    pages.push(
      <span key='dots1' className='pagination__dots'>
        ...
      </span>
    )
  }

  // end pages
  for (
    let i = Math.max(4, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`pagination__button ${i === currentPage ? 'active' : ''}`}
      >
        {i}
      </button>
    )
  }

  // dots
  if (totalPages > 3 && currentPage < totalPages - 2) {
    pages.push(
      <span key='dots2' className='pagination__dots'>
        ...
      </span>
    )
  }

  // last page
  if (totalPages > 3) {
    pages.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`pagination__button ${totalPages === currentPage ? 'active' : ''}`}
      >
        {totalPages}
      </button>
    )
  }

  // Right chevrob
  pages.push(
    <button
      key='next'
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className='pagination__button'
    >
      <Chevron className='rotate-180' />
    </button>
  )

  return <div className='pagination__container'>{pages}</div>
}

export default Pagination
