import { FlatList, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { CONTAINER, rw } from '../../../theme/Theme'
import DrawerHeader from '../../../components/Headers/DrawerHeader'
import BlogNewsCard from './BlogNewsCard'
import Text from '../../../components/Text/Text'

export default function BlogNewsScreen() {
  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={'#2253a5'} barStyle={'light-content'} />
      <DrawerHeader title={'Blog & News'} />
      <View style={styles.container}>
        <Text preset="h1" color={'#595959'} style={styles.title}>
          Blog & News
        </Text>
        <FlatList
          data={data}
          keyExtractor={item => item?.id}
          renderItem={item => {
            return <BlogNewsCard item={item?.item} />
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
  title: {
    fontSize: 20,
    // lineHeight: 50,
  },
})

const data = [
  {
    id: '012452',
    title:
      'Impact Of Extrinsic Motivation OnIntrinsc Motivation sed do eiusmod',
    date: '22 Oct 2018',
    image: require('../../../../assets/images/blogImage.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor unt ut labore et dolore magna ',
  },
  {
    id: '0125652',
    title:
      'Impact Of Extrinsic Motivation OnIntrinsc Motivation sed do eiusmod',
    date: '22 Oct 2018',
    image: require('../../../../assets/images/blogImage.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor unt ut labore et dolore magna ',
  },
  {
    id: '0145252',
    title:
      'Impact Of Extrinsic Motivation OnIntrinsc Motivation sed do eiusmod',
    date: '22 Oct 2018',
    image: require('../../../../assets/images/blogImage.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor unt ut labore et dolore magna ',
  },
  {
    id: '016457522',
    title:
      'Impact Of Extrinsic Motivation OnIntrinsc Motivation sed do eiusmod',
    date: '22 Oct 2018',
    image: require('../../../../assets/images/blogImage.png'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor unt ut labore et dolore magna ',
  },
]
