import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CONTAINER, rw } from '../../../theme/Theme'
import DrawerHeader from '../../../components/Headers/DrawerHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LanguageToggleButton from '../../../components/Buttons/LanguageToggleButton'

export default function LanguageScreen() {
  return (
    <>
      <DrawerHeader title={'Language'} />
      <StatusBar backgroundColor={'#2253a5'} b />
      <View style={CONTAINER}>
        <LanguageToggleButton />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    alignSelf: 'flex-start',
    width: 50,
  },
})
