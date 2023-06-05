import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Notfound() {
  return (
    <Image
      source={require('../../assets/notFound.png')}
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
