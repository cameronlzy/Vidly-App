import React, { useState } from "react"
import Joi from "joi-browser"
import Form from "./common/form"
import { login, loginWithJWT } from "../services/authService"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const accountProperties = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password" },
  ]
  const [account, setAccount] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({ username: "", password: "" })

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  }
  const navigate = useNavigate()
  const option = { abortEarly: false }
  const path = "/movies"
  const doSubmit = async () => {
    try {
      const { data: jwt } = await login(account.username, account.password)
      loginWithJWT(jwt)
      navigate(path)
      window.location.reload()
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        console.log(ex)
        const oldErrors = { ...errors }
        oldErrors.username = ex.response.data
        setErrors(oldErrors)
      }
    }

    // CALL SERVER
    console.log("Submitted")
  }

  return (
    <React.Fragment>
      <h1>Login</h1>
      <Form
        dataProperties={accountProperties}
        option={option}
        data={account}
        errors={errors}
        setData={setAccount}
        setErrors={setErrors}
        schema={schema}
        onSubmit={doSubmit}
      />
    </React.Fragment>
  )
}

export default LoginForm
