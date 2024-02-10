import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, CONTAINER, rh, ROW, rw } from '../../theme/Theme'
import Text from '../../components/Text/Text'
import MediumButton from '../../components/Buttons/MediumButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginsHeaderSection from '../../components/Shared/LoginsHeaderSection'
import InputText from '../../components/Inputs/InputText'
import LoginsFooter from '../../components/Footer/LoginsFooter'

export default function SingUp() {
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState(null)
  //  filed error
  const [filedError, setFiledError] = useState(false)
  //  handel submit
  const handelSubmit = () => {
    //
    if ((password === null) | (name === '') | (number === '')) {
      //
      setFiledError(true) // set error false
      // console.log("Error 5");
    } else {
      setFiledError(false) // set error true
      // console.log("Error");
    }
  }

  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={CONTAINER}
    >
      <StatusBar barStyle={'dark-content'} backgroundColor={COLOR.white} />
      <View style={styles.container}>
        {/* <LanguageToggleButton /> */}
        <LoginsHeaderSection
          title={'Sign Up'}
          styleTitle={{
            marginBottom: 50,
          }}
        />
        <InputText
          placeholder={'Full Name (as per NID)'}
          setValue={setName}
          type="name"
          error={filedError}
        />
        <InputText
          placeholder={'Mobile No'}
          secureTextEntry={true}
          setValue={setNumber}
          type="number"
          maxLength={11}
          keyboardType={'phone-pad'}
          error={filedError}
        />
        <InputText
          placeholder={'Password'}
          secureTextEntry={true}
          setValue={setPassword}
          type="password"
          error={filedError}
        />

        <View style={styles.termTextContainer}>
          <Text style={styles.termText}>
            By clicking Sign Up I agree to Waadaa.Insure{' '}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.termText, { color: COLOR.blue600 }]}>
              Terms and Condition
            </Text>
          </TouchableOpacity>
        </View>
        <MediumButton title={'Sign Up'} onPress={handelSubmit} />
      </View>
      <LoginsFooter />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    flex: 1,
  },
  //
  termTextContainer: {
    marginTop: rh(4),
  },
  termText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLOR.gray300,
  },
})
