import { useContext, useState } from "react"

import AuthContent from "../components/Auth/AuthContent"
import { AuthContext } from "../store/AuthContext"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { createUser } from "../util/auth"

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authContext = useContext(AuthContext)

  const createUserHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authContext.authenticate(token)
    } catch (e) {
      console.error(e)
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }

  return <AuthContent onAuthenticate={createUserHandler} />
}

export default SignupScreen
