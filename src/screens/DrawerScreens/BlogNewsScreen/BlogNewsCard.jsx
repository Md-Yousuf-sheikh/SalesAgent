import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '../../../components/Text/Text'

export default function BlogNewsCard({ item }) {
  const { date, description, image, title } = item
  //   console.log("item", item);
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text preset="h6" style={styles.title}>
          {title}
        </Text>
        <Text preset="SL" style={styles.date}>
          Date: {date}
        </Text>
        <Text preset="SL" style={styles.description}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#dddddd68',
    marginBottom: 0,
  },
  content: {
    marginLeft: 5,
  },
  title: {
    color: '#595959',
    // lineHeight: 15,
    paddingRight: 10,
    marginBottom: 5,
  },
  date: {
    color: '#999999',
    // lineHeight: 14.5,
    marginBottom: 5,
  },
  description: {
    color: '#737373',
    // lineHeight: 14.5,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
})
