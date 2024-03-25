import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import DrawerHeader from '../../../components/Headers/DrawerHeader'
import { CONTAINER, rh, ROW, rw } from '../../../theme/Theme'
import Text from '../../../components/Text/Text'
import SvgSearchIcon from '../../../svg/SvgSearchIcon'
import { MaterialIcons } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import SuggestedPolicyCard from './SuggestedPolicyCard'
import { categoriesData } from '../../../dummy/DummyData'
import PopularInsuranceCard from '../HomeScreen/PopularInsuranceCard'
// import PopularInsuranceCard from './SuggestedPolicyCard'

export default function SuggestedPolicy({ route }) {
  const { data } = route?.params
  const [selectedCategory, setSelectedCategory] = useState(catagoriesData[0])

  const [filterUserData, setFilterUserData] = useState(data)

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data?.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item?.name
          ? item?.name?.toUpperCase()
          : ''.toUpperCase()

        const textData = text.toUpperCase()

        return itemData.indexOf(textData) > -1
      })
      console.log('newData', newData)
      setFilterUserData(newData)
      // setSearch(text)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      // setFilteredDataSource(masterDataSource)
      setFilterUserData(data)

      // setSearch(text)
    }
  }
  return (
    <>
      <DrawerHeader title={'Suggested Policy'} />
      <View style={CONTAINER}>
        <View style={styles.container}>
          {/* List  catagories */}
          {/* <View>
            <FlatList
              data={catagoriesData}
              horizontal
              renderItem={(item, index) => {
                console.log(item?.item?.name)
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      {
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      },
                      selectedCategory?.name === item?.item?.name && {
                        borderBottomWidth: 1.5,
                        borderColor: '#3369B3',
                      },
                    ]}
                    onPress={() => {
                      setSelectedCategory(item?.item)
                    }}
                  >
                    <Text preset="h6" color={'#646464'}>
                      {item?.item?.name}
                    </Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View> */}
          {/* search filed */}
          <View style={styles.searchFilterContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                onChangeText={val => searchFilterFunction(val)}
                placeholder="Search here..."
                style={styles.searchInput}
              />
              <TouchableOpacity style={styles.searchInputButton}>
                <SvgSearchIcon />
              </TouchableOpacity>
            </View>
          </View>
          {/* List items */}
          <View
            style={
              {
                // paddingBottom: rh(28),
                // alignItems: 'center',
                // alignSelf: 'center',
                // width: '90%',
                // marginLeft: rh(2),
                // marginHorizontal: rh(2),
              }
            }
          >
            <FlatList
              data={filterUserData}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?.id}
              renderItem={(item, index) => {
                return <PopularInsuranceCard item={item?.item} />
              }}
            />
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(3),
    // paddingBottom: rh(10),
  },
  //
  searchFilterContainer: {
    paddingTop: rh(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    // paddingHorizontal: rw(4),
  },
  searchInputContainer: {
    flexDirection: 'row',
  },
  searchInput: {
    borderWidth: 1,
    height: 50,
    borderColor: '#E5EAFF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: rw(80),
    paddingHorizontal: 10,
    fontSize: 12,
    borderRightWidth: 0,
    backgroundColor: '#F5F7FF',
  },
  searchInputButton: {
    borderWidth: 1,
    height: 50,
    borderColor: '#E5EAFF',
    paddingRight: 8,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0,
    backgroundColor: '#F5F7FF',
  },
  flexDirection: 'row',
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2253a5',
    height: 46,
    borderRadius: 3,
    width: rw(25),
    justifyContent: 'center',
  },
})
// catagoriesData
const catagoriesData = [
  {
    id: '1',
    name: 'Life',
  },
  {
    id: '2',
    name: 'Health',
  },
  {
    id: '3',
    name: 'Travel',
  },
  {
    id: '4',
    name: 'Motor',
  },
  {
    id: '5',
    name: 'Device',
  },
]

//  popularInsurance
const popularInsurance = [
  {
    id: 1,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 2,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 3,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 4,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 5,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 6,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 7,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
  {
    id: 8,
    title: 'Shanti-Amra Sobai',
    image: require('../../../../assets/images/popularInImage.png'),
    coverage: 100000,
    term: 5,
    members: 'Self',
    premium: 540,
    status: 'NEW',
  },
]
