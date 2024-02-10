import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, CONTAINER, rh, rw } from '../../theme/Theme'
import MediumButton from '../../components/Buttons/MediumButton'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputText from '../../components/Inputs/InputText'
import LoginsHeaderSection from '../../components/Shared/LoginsHeaderSection'
import { useSelector } from 'react-redux'
import { useForgotPasswordMutation } from '../../redux/features/auth/authApiSlice'
import { useRef } from 'react'
import { validationCheck } from '../../utils/validation'
import Toast from 'react-native-root-toast'

export default function ForgetPassword() {
  const navigation = useNavigation()
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  )
  const [forgotPass, { isLoading }] = useForgotPasswordMutation()
  const [email, setEmail] = useState('')
  const otpRef = useRef()
  const [filedError, setFiledError] = useState('')
  const handelReset = async () => {
    if (validationCheck(email, 'email')) {
      const data = {
        email: email,
      }
      try {
        const res = await forgotPass(data).unwrap()
        console.log('allData', res)
        otpRef.current = res?.data?.otp
        navigation.navigate('EmailOtpVer', {
          email: email,
        })
        setFiledError(false)
      } catch (error) {
        // Toast.show(error?.data?.message, Toast.LONG)
        Toast.show(`${error?.data?.message}`, {
          duration: 1500,
          backgroundColor: 'red',
          shadow: true,
          position: rh(80),
          textColor: COLOR.white,
          opacity: 2,
          animation: true,
        })
        setFiledError(true)
        console.log(error, 'Error')
      }
    } else {
      setFiledError(true)
      console.log('Error')
    }
  }
  return (
    <KeyboardAwareScrollView style={CONTAINER}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLOR.white} />
      <View style={styles.container}>
        <>
          {/* <LanguageToggleButton /> */}
          <LoginsHeaderSection
            title={languageState.restPass}
            subText={languageState.resetPassDetailText}
          />
          <InputText
            placeholder={languageState.emailPlaceHolderText}
            setValue={setEmail}
            value={email}
            type="email"
            error={filedError}
          />
          <MediumButton
            title={languageState.resetButtonText}
            loader={isLoading}
            // disabled={email == null && true}
            onPress={handelReset}
            stylesButton={styles.button}
          />
        </>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: rw(4),
    justifyContent: 'space-evenly',
  },
  button: {
    // backgroundColor: "red",
  },
  footer: {},
})
