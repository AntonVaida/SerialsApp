import React from "react"
import { StyleSheet, View } from "react-native"
import { AppNavigation } from "./AppNavigation"

export const AppConatiner = () => {
  return (
    <View style={styles.container}>
      <AppNavigation />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
})