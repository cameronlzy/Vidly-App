import React, { useEffect, useState } from "react"
const Select = ({
  name,
  options,
  label,
  error,
  onChange,
  idHandler,
  value,
}) => {
  const [original, setOriginal] = useState()
  useEffect(() => {
    const fetchOriginal = async () => {
      const result = await idHandler(value)
      setOriginal(() => {
        return result
      })
    }
    fetchOriginal()
  })
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        className="form-control"
      >
        <option value={""}></option>
        {options.map((option) => {
          if (option.name == original)
            return (
              <option selected key={option._id} value={option._id}>
                {option.name}
              </option>
            )
          else
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            )
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

export default Select
