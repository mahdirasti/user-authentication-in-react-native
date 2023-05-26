import { createContext, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
})

export default AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState()

  const authenticate = async (token) => {
    try {
      await AsyncStorage.setItem("@token", token)
      setAuthToken(token)
    } catch (e) {}
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token")
      setAuthToken(null)
    } catch (e) {}
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
