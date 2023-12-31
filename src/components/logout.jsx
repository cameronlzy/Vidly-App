import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../services/authService"

const Logout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    logout()
    navigate("/movies")
    window.location.reload()
  })
  return null
}

export default Logout
