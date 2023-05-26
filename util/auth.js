import axios from "axios"

const API_KEY = `AIzaSyBQ4yRcGqqOEsX65CUyy28BdjKxdMpMyWQ`

export async function authenticate(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  )

  const token = response.data.idToken

  return token
}

export async function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password)
}

export async function createUser(email, password) {
  return authenticate("signUp", email, password)
}
