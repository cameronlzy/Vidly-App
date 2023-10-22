import _ from "lodash"
import React from "react"
import Like from "./like"
const TableBody = ({ content, onDelete, onLike, headers, user }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item)

    return _.get(item, column.path)
  }

  const createKey = (item, column) => {
    return item._id + (column.path || column.key)
  }

  return (
    <React.Fragment>
      <tbody>
        {content.map((data) => (
          <tr key={data._id}>
            {headers.map((header) => (
              <td key={createKey(data, header)}>{renderCell(data, header)}</td>
            ))}
            {user && user.isAdmin && (
              <td>
                <button
                  onClick={() => {
                    onDelete(data)
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            )}
            <td>
              <Like
                liked={data.liked}
                onLike={() => {
                  onLike(data)
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </React.Fragment>
  )
}

export default TableBody
