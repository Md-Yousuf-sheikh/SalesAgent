import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabBg } from '../../svg'
import { COLOR, rf, rh, rw } from '../../theme/Theme'
import Text from '../Text/Text'
import { useNavigation } from '@react-navigation/native'
import { Svg } from 'react-native-svg'
import { Path } from 'victory-native'
import { useSelector } from 'react-redux'
import { IS_IPHONE_X } from '../../utils'

export const TabBarAdvancedButton = ({ bgColor, style, ...props }) => {
  const navigation = useNavigation()
  const languageState = useSelector(
    state => state.language.language.finalLanguage?.data
  )
  const [keyboardShow, setKeyboardShow] = React.useState()
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardShow(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShow(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TabBg color={bgColor} style={styles.background} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            backgroundColor: navigation.isFocused() ? '#3369B3' : '#575a57',
          },
          keyboardShow && {
            top: 0,
          },
        ]}
        onPress={props.onPress}
      >
        <Svg width={18} height={18} fill="none">
          <Path
            d="M9.777.33a1.124 1.124 0 0 0-1.59 0L.316 8.2a1.124 1.124 0 0 0 1.59 1.59l.33-.33v7.407A1.124 1.124 0 0 0 3.36 17.99h2.248a1.124 1.124 0 0 0 1.125-1.124v-2.25a1.125 1.125 0 0 1 1.124-1.124h2.25a1.124 1.124 0 0 1 1.124 1.125v2.249a1.124 1.124 0 0 0 1.124 1.124h2.25a1.124 1.124 0 0 0 1.124-1.124V9.46l.329.33a1.125 1.125 0 0 0 1.59-1.59L9.777.328Z"
            fill="#fff"
          />
        </Svg>
      </TouchableOpacity>
      <Text
        style={{
          top: IS_IPHONE_X ? rh(4.4) : rh(4.4),
          position: 'absolute',
          color: navigation.isFocused() ? '#3369B3' : '#4F4F4F',
          fontSize: rh(1.6),
        }}
      >
        {languageState.bottomTabThirdTitleText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: rw(16.3),
    alignItems: 'center',
    // backgroundColor: '#fd050500',
    // borderTopWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 4.65,
    // elevation: 2,
  },
  background: {
    position: 'absolute',
    // backgroundColor: '#fd050500',
    // borderBottomWidth: 1,
    // borderBottomColor: COLOR.black,
    // top: 0,
    // paddingBottom: 20,
  },
  button: {
    top: rh(-2.9),
    justifyContent: 'center',
    alignItems: 'center',
    width: rh(6.2),
    height: rh(6.2),
    borderRadius: rh(6.2),
    backgroundColor: '#3369B3',
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 5,
  },
  buttonIcon: {
    fontSize: rf(1.6),
    color: '#F6F7EB',
  },
})
