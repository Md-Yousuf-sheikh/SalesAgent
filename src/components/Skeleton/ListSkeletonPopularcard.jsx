import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rf, rh, ROW, RSC, rw } from '../../theme/Theme'
import Skeleton from './Skeleton'

export default function ListCard({ item, tagColor }) {
  return (
    <View activeOpacity={0.9} style={styles.card}>
      {/* header */}
      <View style={styles.header}>
        <Skeleton width={50} height={5} style={styles.headerImage} />
        <Skeleton width={90} height={15} style={styles.headerTitle} />
        <Skeleton width={50} height={5} style={[styles.headerStatus]} />
      </View>
      {/* list Item Container */}
      <View style={styles.listItemContainer}>
        <View style={styles.listitem}>
          <Skeleton width={rw(15)} height={10} style={styles.listItemTitle} />
          <Skeleton width={rw(15)} height={10} style={styles.listItemText} />
        </View>
        <View style={styles.listitem}>
          <Skeleton width={rw(15)} height={10} style={styles.listItemTitle} />
          <Skeleton width={rw(15)} height={10} style={styles.listItemText} />
        </View>
        <View style={styles.listitem}>
          <Skeleton width={rw(15)} height={10} style={styles.listItemTitle} />
          <Skeleton width={rw(15)} height={10} style={styles.listItemText} />
        </View>
        <View style={styles.listitem}>
          <Skeleton width={rw(15)} height={10} style={styles.listItemTitle} />
          <Skeleton width={rw(15)} height={10} style={styles.listItemText} />
        </View>
      </View>
      {/*  Button list */}
      <View style={styles.buttonListContainer}>
        <Skeleton width={rw(15)} height={rw(8)} style={styles.compareButton} />
        <Skeleton width={rw(25)} height={rw(9)} style={styles.buyButton} />
        <Skeleton width={rw(25)} height={rw(9)} style={styles.buyButton} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginLeft: rh(1),
    // marginHorizontal: rh(0.5),
    backgroundColor: '#ffffff',
    paddingVertical: rh(1.6),
    borderRadius: rh(1.2),
    shadowColor: '#00000060',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    marginTop: rh(1.4),
    marginBottom: rh(1.4),
    borderWidth: 1,
    borderColor: '#dddddd61',
    height: rh(23.5),
    width: rw(90),
    // alignSelf: 'center',
  },
  // header
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rh(1.7),
    paddingBottom: rh(1.2),
  },
  headerImage: {
    height: rh(3.7),
    resizeMode: 'contain',
    borderRadius: 5,
  },
  headerTitle: {
    borderRadius: 10,
    marginLeft: 10,
  },
  headerStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
    height: rh(3.2),
    alignItems: 'center',
    justifyContent: 'center',
    width: rw(16),
  },
  headerStatusCarve: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    height: rh(3),
    width: rh(3),
    transform: [
      {
        rotate: '45deg',
      },
    ],
    left: rh(-2),
  },
  // list Item Container
  listItemContainer: {
    flexDirection: 'row',
    borderBottomWidth: rh(0.1),
    borderTopWidth: rh(0.1),
    borderColor: '#dddddd73',
    paddingVertical: rh(1.2),
    justifyContent: 'space-around',
    paddingHorizontal: rh(1.6),
  },
  listitem: {
    marginHorizontal: rh(0.6),
  },
  listItemTitle: {
    marginTop: 10,
    // marginBottom:
  },
  listItemText: {
    marginTop: 10,
    marginBottom: 5,
  },
  buttonListContainer: {
    paddingTop: rh(1.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rh(1.7),
  },
  compareButton: {
    paddingHorizontal: rh(1),
    paddingVertical: rh(0.5),
    marginRight: rh(0.7),
    borderRadius: rh(0.7),
    height: rh(4),
    width: rw(10),
  },
  buyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: rh(0.7),
    borderRadius: rh(3),
    paddingHorizontal: rh(1.7),
    marginHorizontal: rh(0.7),
    height: rh(4.5),
    minWidth: rw(25),
  },
})
