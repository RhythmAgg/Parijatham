import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Closed() {
  return (
    <Image
      source={require('../../assets/closed.png')}
      style={styles.image}
    ></Image>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
})
