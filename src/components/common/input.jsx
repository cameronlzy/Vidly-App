import React from "react"
const Input = ({ onChange, name, value, label, error, placeHolder }) => {
  //   console.log(error)
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        onChange={onChange}
        value={value || ""}
        autoFocus
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

export default Input
