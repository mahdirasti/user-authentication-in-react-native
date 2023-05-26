import React, { useContext, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthContext } from "./store/AuthContext"
import AuthContextProvider from "./store/AuthContext"
import { Colors } from "./constants/styles"
import IconButton from "./components/ui/IconButton"
import LoadingOverlay from "./components/ui/LoadingOverlay"
import LoginScreen from "./screens/LoginScreen"
import { NavigationContainer } from "@react-navigation/native"
import SignupScreen from "./screens/SignupScreen"
import { StatusBar } from "expo-status-bar"
import WelcomeScreen from "./screens/WelcomeScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon={"exit"}
                color={tintColor}
                size={24}
                onPress={authContext.logout}
              />
            )
          }
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const [isFetchingToken, setIsFetchingToken] = useState(false)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    setIsFetchingToken(true)
    async function fetchToken() {
      try {
        const tokenFetched = await AsyncStorage.getItem("@token")

        if (!!tokenFetched) {
          authCtx.authenticate(tokenFetched)
        }
      } finally {
        setIsFetchingToken(false)
      }
    }

    fetchToken()
  }, [])

  if (isFetchingToken)
    return <LoadingOverlay message={"Loading Application ..."} />

  return <Navigation />
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}
