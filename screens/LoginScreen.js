import { useContext, useState } from "react"

import { Alert } from "react-native"
import AuthContent from "../components/Auth/AuthContent"
import { AuthContext } from "../store/AuthContext"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { loginUser } from "../util/auth"

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authContext = useContext(AuthContext)

  const loginUserHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const token = await loginUser(email, password)
      authContext.authenticate(token)
    } catch (e) {
      Alert.alert("Something went wrong", "Please check your credentials!")
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging you in ..."} />
  }

  return <AuthContent isLogin onAuthenticate={loginUserHandler} />
}

export default LoginScreen
