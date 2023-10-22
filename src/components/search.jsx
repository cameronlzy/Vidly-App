import React from "react"
import Input from "./common/input"
const Search = ({ onChange, value }) => {
  return (
    <div className="form-group">
      <input
        placeholder="Search..."
        onChange={(e) => onChange(e.currentTarget.value)}
        autoFocus
        value={value}
        id="Search"
        name="Search"
        type="text"
        className="form-control my-3"
      />
    </div>
  )
}

export default Search
