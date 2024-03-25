import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../../components/Text/Text'
import { CircularProgressWithChild } from 'react-native-circular-progress-indicator'
import { COLOR, CONTAINER, rh, ROW, rw, TYPOGRAPHY } from '../../../theme/Theme'

export default function CircularProgressCard() {
  return (
    <View style={styles.container}>
      <CircularProgressWithChild
        value={75}
        radius={54}
        inActiveStrokeWidth={4}
        activeStrokeWidth={4}
        progressValueStyle={{
          fontFamily: TYPOGRAPHY.primary,
          fontSize: 22,
          lineHeight: 28,
          fontWeight: '900',
        }}
        titleStyle={{
          fontFamily: TYPOGRAPHY.primary,
          fontSize: 15,
          lineHeight: 28,
          fontWeight: '400',
        }}
        // activeStrokeColor={'#019E1A'}
        activeStrokeColor={'#019E1A'}
        inActiveStrokeColor={'#D70000'}
      >
        <View
          style={{
            backgroundColor: '#019E1A',
            height: rh(11),
            width: rh(11),
            borderRadius: rh(11),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text preset="h3" color={'#ffff'}>
            {'75%'}
          </Text>
          <Text preset="h5" color={'#ffff'}>
            {'Completed'}
          </Text>
        </View>
      </CircularProgressWithChild>
      <View>
        {/* 01 */}
        <View style={styles.listView}>
          <View style={ROW}>
            <View style={styles.box} />
            <Text preset="h5">Eider Khushi</Text>
          </View>
          <Text preset="h6">61%</Text>
        </View>
        {/* 01 */}
        <View style={styles.listView}>
          <View style={ROW}>
            <View style={[styles.box, { backgroundColor: '#FDB5BC' }]} />
            <Text preset="h5">Beat the Heat</Text>
          </View>
          <Text preset="h6">78%</Text>
        </View>
        {/* 01 */}
        <View style={styles.listView}>
          <View style={ROW}>
            <View style={[styles.box, { backgroundColor: '#A8D7FF' }]} />
            <Text preset="h5">Boishakhi Amej</Text>
          </View>
          <Text preset="h6">78%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderRadius: rh(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 0.5,
    marginVertical: 10,
    paddingVertical: rh(3),
    paddingHorizontal: rw(4),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c7c7c74c',
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: rw(50),
    borderBottomWidth: 1,
    borderColor: '#C7C7C7',
    paddingVertical: 5,
  },
  box: {
    backgroundColor: '#B1DE7C',
    height: 15,
    width: 15,
    borderRadius: 2,
    marginRight: 5,
  },
})
