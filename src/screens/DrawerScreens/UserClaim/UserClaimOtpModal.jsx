import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginsHeaderSection from '../../../components/Shared/LoginsHeaderSection'
import { COLOR, rh, RSC, rw } from '../../../theme/Theme'
import MediumButton from '../../../components/Buttons/MediumButton'
import { OTP } from 'react-native-otp-form'

export default function UserClaimOtpModal({
  setOtpModalOpen,
  setNumberVerify,
}) {
  const [filedError, setFiledError] = useState('')
  const [otp, setOtp] = useState('')
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(0)
  const [ReSent, setReSent] = useState(false)
  // use effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds, ReSent])
  const handelVerify = () => {
    if (otp?.length <= 4) {
      setFiledError(true)
    } else {
      setOtpModalOpen((prv) => !prv)
      setNumberVerify(true)
      setFiledError(false)
    }
  }
  //

  useEffect(() => {
    if (otp?.length == 4 && seconds <= 0 && minutes <= 0) {
      setFiledError(true)
    } else {
      setFiledError(false)
    }
  }, [otp])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setOtpModalOpen((prv) => !prv)
        }}
        style={{
          height: '100%',
        }}
      ></TouchableOpacity>
      <View style={styles.modalContainer}>
        <Text preset="h3" style={[styles.title]} color={COLOR.black}>
          OTP Verification
        </Text>
        <Text preset="h4" style={[styles.subTitle]}>
          We have sent the verification code to {'\n'} your mobile number
        </Text>

        <Text preset="h5" style={styles.number}>
          {/* {country?.number} {phone} */} +8801311000222
        </Text>
        <OTP
          codeCount={5}
          containerStyle={{ marginTop: rh(0.9) }}
          otpStyles={[
            styles.otpInputStyle,
            filedError && {
              borderColor: 'red',
            },
          ]}
          onTyping={(item) => {
            setOtp(item)
          }}
          keyboardType={'number-pad'}
        />
        <Text preset="h4" style={styles.expireTime}>
          {seconds > 0 || minutes > 0 ? (
            <Text preset="h4" style={styles.expireTime}>
              Expires in : {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds} minutes
            </Text>
          ) : (
            <View style={RSC}>
              <Text preset="h4">Didn't receive code? </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setMinutes(2)
                  setReSent(true)
                }}
              >
                <Text>Re-sent</Text>
              </TouchableOpacity>
            </View>
          )}
        </Text>
        <MediumButton
          // stylesButton={[
          //   otp?.length <= 4 && {
          //     backgroundColor: COLOR.buttonDisable,
          //   },
          //   !(seconds > 0 || minutes > 0) && {
          //     backgroundColor: COLOR.buttonDisable,
          //   },
          // ]}
          onPress={handelVerify}
          title={'Verify'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000027',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffff',
    width: '100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingBottom: 20,
  },
  number: {
    marginTop: rh(2),
    alignSelf: 'center',
    letterSpacing: 1.5,
    color: COLOR.gray400,
    marginBottom: rh(1.2),
    fontSize: 13,
  },
  // otpInputStyle
  otpInputStyle: {
    borderColor: COLOR.blue600,
    color: COLOR.gray400,
    maxHeight: rh(7),
  },
  expireTime: {
    alignSelf: 'center',
    color: '#595959',
    marginTop: rh(2.4),
  },
  //
  title: {
    textAlign: 'center',
    marginBottom: rh(3),
    marginTop: rh(6),
    fontWeight: '800',
    fontSize: 18,
  },
  subTitle: {
    color: COLOR.gray400,
    textAlign: 'left',
    marginBottom: rh(1),
    textAlign: 'center',
  },
})
