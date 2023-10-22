import React from "react"
import _ from "lodash"
import PropTypes from "prop-types"
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageToggle } = props
  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount == 1) return null
  const pages = _.range(1, pagesCount + 1)
  pages.unshift("All")
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page == currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              className="page-link"
              onClick={() => {
                onPageToggle(page)
              }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPageToggle: PropTypes.func.isRequired,
}

export default Pagination
