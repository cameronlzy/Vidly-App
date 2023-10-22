import React from "react"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"
const Table = ({
  onColumn,
  sortColumn,
  headers,
  content,
  onDelete,
  onLike,
  user,
}) => {
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader
          onColumn={onColumn}
          sortColumn={sortColumn}
          headers={headers}
        />
        <TableBody
          headers={headers}
          content={content}
          onDelete={onDelete}
          onLike={onLike}
          user={user}
        />
      </table>
    </React.Fragment>
  )
}

export default Table
