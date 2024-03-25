import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Image,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { rf, rh, ROW, RSC, rw } from '../../../theme/Theme'
import Text from '../../../components/Text/Text'
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { ToggleAnimation } from '../../../Animation/ToggleAnimation'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function InformationCollapse({
  title,
  data,
  listData,
  nav,
  item,
}) {
  const state = useSelector(state => state)
  const language = state?.language?.selectedLng?.data
  const navigation = useNavigation()

  //
  const [showContent, setShowContent] = useState(false)
  //  animation
  const animationController = useRef(new Animated.Value(0)).current
  const toggleListItem = () => {
    // config  animdton
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    }
    // Animated timing
    Animated.timing(animationController, config).start()
    LayoutAnimation.configureNext(ToggleAnimation)
    setShowContent(!showContent)
  }
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  })
  // start
  const handelEdit = () => {
    if (nav === 'UserInfoScreen') {
      const data = {
        item: item,
        type: 2,
      }
      navigation.navigate(nav, {
        item: data,
      })
    } else {
      navigation.navigate(nav, {
        item: item,
      })
    }
  }

  return (
    <View style={styles.card}>
      {/* card head */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem()
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" style={styles.cardTitle}>
            {title}
          </Text>
        </View>

        <View style={[ROW]}>
          <TouchableOpacity onPress={handelEdit} style={[ROW]}>
            {/* <Text preset="h3" color="#3182CE">
            {language.smallEditButtonText}
          </Text> */}
            {/* <MaterialCommunityIcons
            name="comment-edit"
            size={19}
            color="#3182CE"
            style={{
              marginHorizontal: 5,
              marginTop: 4,
            }}
          /> */}
            {/* <Text preset="h6" color="#3182CE">
            {language.smallEditButtonText}
          </Text> */}
            <AntDesign name="edit" size={20} color="#3182CE" />
          </TouchableOpacity>
          {/* <Animated.View
            style={{
              transform: [
                {
                  rotateZ: arrowTransform,
                },
              ],
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={32}
              color="#2196F3"
            />
          </Animated.View> */}
          {showContent ? (
            <MaterialIcons name="keyboard-arrow-up" size={32} color="#2196F3" />
          ) : (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={32}
              color="#2196F3"
            />
          )}
        </View>
      </TouchableOpacity>
      {/* List open */}
      {showContent && (
        <View style={styles.container}>
          <View style={styles.table}>
            {data?.map((item, index) => {
              return listData?.map((nitem, index) => {
                return (
                  nitem[item?.field_name] && (
                    <View key={index} style={[styles.tableText]}>
                      <Text preset="h6" style={styles.tableTextLeft}>
                        {item?.field_title}
                      </Text>
                      {item?.field_type === 'file' ? (
                        <Image
                          style={styles.cardNidImage}
                          source={{ uri: nitem[item?.field_name]?.url }}
                        />
                      ) : (
                        <Text preset="h6" style={styles.tableTextRight}>
                          {nitem[item?.field_name]}
                        </Text>
                      )}
                    </View>
                  )
                )
              })
            })}
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  cardTitle: {
    fontSize: 17,
    color: '#4F4F4F',
  },
  card: {
    marginVertical: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#F5F7FF',
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F7FF',
    paddingVertical: 10,
    paddingHorizontal: rw(4),
  },
  cardNidImage: {
    width: 43,
    height: 28,
    resizeMode: 'cover',
    // marginRight: 10,
  },
  // Table
  table: {
    // marginVertical: 15,
    backgroundColor: '#f3f5ff58',
    // borderRadius: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tableText: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  tableTextRight: {
    fontSize: rf(1.8),
    color: '#646464',
    fontWeight: '800',
    width: rw(40),
    textAlign: 'right',
  },
  tableTextLeft: {
    fontSize: rf(1.8),
    color: '#646464',
    fontWeight: '800',
    width: rw(40),
    textAlign: 'left',
  },
})
