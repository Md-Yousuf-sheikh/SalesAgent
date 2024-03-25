import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Text from '../Text/Text'
import { COLOR, rf, rh, ROW } from '../../theme/Theme'
import { MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'

export default function DrawerButton({
  name,
  icon,
  nav,
  onPress,
  style,
  loader,
}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={ROW}>
        <View style={styles.icon}>{icon}</View>
        <Text preset="h4" color={COLOR.white} style={styles.name}>
          {name}
        </Text>
        {loader && (
          <ActivityIndicator
            color={COLOR.white}
            style={{ marginLeft: rh(0.6) }}
          />
        )}
      </View>
      <MaterialIcons name="arrow-forward-ios" size={15} color="#ffffff" />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rh(0.7),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ddd',
    width: rh(4),
    height: rh(4),
    borderRadius: rh(4),
    // marginRight: 10,
    marginTop: rh(1.2),
  },
  name: {
    fontSize: rf(1.9),
    // fontWeight: "600",
    paddingLeft: rh(1),
  },
})
