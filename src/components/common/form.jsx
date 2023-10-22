import React from "react"
import Joi from "joi-browser"
import Input from "./input"
import { useNavigate } from "react-router-dom"
import Select from "./select"
import { property } from "lodash"
const Form = ({
  dataProperties,
  data,
  errors,
  setData,
  setErrors,
  schema,
  path,
  option,
  idHandler,
  onSubmit,
  userHandler,
}) => {
  const navigate = useNavigate()
  const validate = () => {
    const { error } = Joi.validate(data, schema, option)
    // console.log(error)
    if (!error) return null
    // console.log(result)
    const formErrors = {}
    for (let item of error.details) {
      formErrors[item.path[0]] = item.message
    }

    return formErrors
  }

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const fieldSchema = { [name]: schema[name] }
    const { error } = Joi.validate(obj, fieldSchema, option)

    return error ? error.details[0].message : null
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const submitionErrors = validate()
    if (submitionErrors) {
      setErrors(() => {
        return submitionErrors
      })
      return
    }
    onSubmit(data)
  }

  const handleChange = ({ currentTarget: input }) => {
    const cloneErrors = { ...errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) {
      cloneErrors[input.name] = errorMessage
      setErrors(() => {
        return cloneErrors
      })
    } else {
      delete cloneErrors[input.name]
      setErrors(() => {
        return cloneErrors
      })
    }
    const cloneData = { ...data }
    cloneData[input.name] = input.value
    setData(() => {
      return cloneData
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {dataProperties.map((property) => {
        if (property.dropdown) {
          return (
            <Select
              key={property.name}
              onChange={handleChange}
              name={property.name}
              label={property.label}
              value={data[property.name]}
              error={errors[property.name]}
              options={property.options}
              idHandler={idHandler}
            />
          )
        } else {
          return (
            <Input
              key={property.name}
              onChange={handleChange}
              name={property.name}
              label={property.label}
              value={data[property.name]}
              error={errors[property.name]}
            />
          )
        }
      })}

      <button
        disabled={validate()}
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  )
}

export default Form
