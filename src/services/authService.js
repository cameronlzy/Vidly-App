import http from "./httpService";
import config from '../config.json'
import jwtDecode from "jwt-decode"

const apiEndpoint = config.apiUrl + "/auth"

export function getJWT () {
    return localStorage.getItem("token")
}
http.setJWT(getJWT())

export function login (email,password) {
    return http.post(apiEndpoint,{email,password})
};

export function loginWithJWT (jwt){
    localStorage.setItem("token", jwt)
}

export function logout () {
    localStorage.removeItem("token")
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token")
        return jwtDecode(jwt)
    } catch(ex) {
        return null
    }
}


export default {
    login,
    loginWithJWT,
    logout,
    getCurrentUser,
    getJWT,
}
