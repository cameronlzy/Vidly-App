import React from "react"
const TableHeader = ({ headers, onColumn, sortColumn }) => {
  const column = { ...sortColumn }
  const handleSort = (path) => {
    if (column.path == path) {
      column.order = column.order == "asc" ? "desc" : "asc"
    } else {
      column.path = path
      column.order = "asc"
    }
    return column
  }
  return (
    <thead>
      <tr key="head">
        {headers.map((header) => (
          <th
            key={header.name}
            onClick={() => {
              onColumn(handleSort(header.path))
            }}
            style={{ cursor: "pointer" }}
          >
            {header.name}
            <i
              className={
                column.order == "asc" && column.path == header.path
                  ? "fa fa-solid fa-sort-up"
                  : "fa fa-solid fa-sort-down"
              }
            />
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
