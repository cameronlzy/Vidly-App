import React from "react"
import Form from "./common/form"
import Joi from "joi-browser"
import { useState } from "react"
import * as userService from "../services/userService"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const userProperties = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password" },
    { name: "name", label: "Name" },
  ]
  const navigate = useNavigate()
  const [user, setUser] = useState({ username: "", password: "", name: "" })
  const [errors, setErrors] = useState({ username: "", password: "", name: "" })
  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  }
  const option = { abortEarly: false }
  const path = "/movies"
  const doSubmit = async () => {
    try {
      const {
        headers: { "x-auth-token": jwt },
      } = await userService.register(user)
      localStorage.setItem("token", jwt)

      navigate("/movies")
      window.location.reload()
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        const oldErrors = { ...errors }
        oldErrors.username = ex.response.data
        setErrors(() => oldErrors)
      }
    }
  }

  return (
    <React.Fragment>
      <h1>Register</h1>
      <Form
        dataProperties={userProperties}
        option={option}
        data={user}
        errors={errors}
        setData={setUser}
        setErrors={setErrors}
        schema={schema}
        onSubmit={doSubmit}
      />
    </React.Fragment>
  )
}

export default RegisterForm
