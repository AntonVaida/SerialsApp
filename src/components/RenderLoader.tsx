import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "../assents/colors/colors";

export const RenderLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={colors.MAIN_HEADING_COLOR_TWO} />
    </View>
  )
}

const styles = StyleSheet.create({
    loader: {
      alignItems: 'center',
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 25,
    }
});