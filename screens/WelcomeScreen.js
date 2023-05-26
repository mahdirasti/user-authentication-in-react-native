import { StyleSheet, Text, View } from "react-native"
import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../store/AuthContext"
import axios from "axios"

function WelcomeScreen() {
  const { token } = useContext(AuthContext)

  const [message, setMessage] = useState()
  useEffect(() => {
    axios
      .get(
        `https://react-native-authenticat-d36aa-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((res) => {
        setMessage(res.data)
      })
  }, [])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8
  }
})
