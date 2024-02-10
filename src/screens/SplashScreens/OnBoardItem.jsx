import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../components/Text/Text'
import { HEIGHT, rf, rh, rw, WIDTH } from '../../theme/Theme'

export default function OnBoardItem({ item }) {
  const { image, name, about } = item?.item
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <Text preset="h1" style={styles.title}>
        {name}
      </Text>
      <Text preset="h5" style={styles.about}>
        {about}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
    width: WIDTH,
    marginBottom: rh(10),
  },
  image: {
    overflow: 'hidden',
    resizeMode: 'contain',
    height: rw(50),
    width: rw(60),
  },
  title: {
    fontSize: rf(3),
    color: '#575757',
    paddingTop: '2.5%',
  },
  about: {
    textAlign: 'center',
    color: '#737373',
    // lineHeight: rh(2.1),
    paddingHorizontal: rh(5),
    paddingTop: rh(5),
  },
})
