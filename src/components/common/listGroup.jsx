import React from "react"
const ListGroup = ({ items, onitemToggle, currentItem }) => {
  return (
    <div className="list-group">
      {items.map((item) => (
        <a
          className={
            item == currentItem
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          key={item.name}
          onClick={() => {
            onitemToggle(item)
          }}
        >
          {item.name}
        </a>
      ))}
    </div>
  )
}

export default ListGroup
