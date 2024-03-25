import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR, rh, rw } from '../../theme/Theme'
import Text from '../Text/Text'

export default function LoginsHeaderSection({
  title,
  subText,
  subTextB,
  styleTitle,
  image,
}) {
  return (
    <View>
      {!image && (
        <Image
          source={require('../../../assets/images/logos/appLogo.png')}
          style={styles.logo}
        />
      )}
      {title && (
        <View style={[styles.line, styleTitle]}>
          <Text preset="h3" style={[styles.title]} color={COLOR.black}>
            {title}
          </Text>
        </View>
      )}
      {subText && (
        <Text preset="h4" style={[styles.subTitle, subTextB]}>
          {subText}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginVertical: rh(1),
    width: rw(55),
    resizeMode: 'contain',
    alignSelf: 'center',
    // backgroundColor: "red",
    height: rw(24),
    marginTop: rh(8),
  },
  title: {
    textAlign: 'center',
    marginBottom: rh(0.4),
  },
  subTitle: {
    color: COLOR.gray400,
    // textAlign: 'left',
    marginTop: rh(3.4),
    marginBottom: rh(3),
    textAlign: 'center',
    // width: rw(90),
  },
  line: {
    alignSelf: 'center',
    borderBottomWidth: rh(0.15),
    borderBottomColor: COLOR.black,
  },
})
