import { StyleSheet, TouchableOpacity, Image, View, Modal } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Path, Svg } from 'react-native-svg'
import { FontAwesome } from '@expo/vector-icons'
import Text from '../Text/Text'
import { rw } from '../../theme/Theme'
import SvgMarkIcon from '../../svg/SvgMarkIcon'
//
export const getFileInfo = async fileURI => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI)
  return fileInfo
}
//
const bytesToSize = bytes => {
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}
export default function ImagePickerCamera({ setImage, title }) {
  const [document, setDocument] = useState(null)

  // documentPicker
  const ImagePickers = async () => {
    let result
    const results = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    })
    //  result success
    if (!results.canceled) {
      // fileSize
      const fileInfo = await getFileInfo(results?.assets[0]?.uri)
      const fileSize = bytesToSize(fileInfo?.size)
      result = result = results?.assets[0]?.uri
      const filename = result?.split('/').pop()
      let imageResult = {
        name: filename,
        image: results?.assets[0]?.uri,
        fileSize: fileSize,
      }
      setImage(imageResult)
      setDocument(imageResult)
    }

    //  camera
    // let result;
    // if (type === "camera") {
    //   const results = await ImagePicker.launchCameraAsync({
    //     quality: 0.7,
    //     allowsEditing: true,
    //   });
    //   //  result success
    //   if (!results.canceled) {
    //     // fileSize
    //     const fileInfo = await getFileInfo(results?.assets[0]?.uri);
    //     const fileSize = bytesToSize(fileInfo?.size);
    //     result = result = results?.assets[0]?.uri;
    //     const filename = result?.split("/").pop();
    //     let imageResult = {
    //       name: filename,
    //       image: results?.assets[0]?.uri,
    //       fileSize: fileSize,
    //     };
    //     setImage(imageResult);
    //   }

    //   result = results?.assets[0]?.uri;
    // } else {
    //   let results = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     quality: 1,
    //   });
    //   if (!results.canceled) {
    //     result = result = results?.assets[0]?.uri;
    //     const filename = result?.split("/").pop();
    //     let imageResult = {
    //       name: filename,
    //       image: results?.assets[0]?.uri,
    //     };
    //     setImage(imageResult);
    //   }
    // }
  }
  //

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          ImagePickers()
        }}
        activeOpacity={0.8}
        style={styles.container}
      >
        <View style={styles.titleContainer}>
          <Text preset="h3" color={'#646464'} style={styles.title}>
            {title}
          </Text>
          <SvgMarkIcon fill={document == null ? '#898A8D' : '#03B10A'} />
        </View>
        {/* button */}

        {/* Image */}
        {document == null ? (
          <View style={styles.cardButton}>
            <Text style={styles.cardBtnTitle}>Capture</Text>
            <Svg width={18} height={18} fill="none">
              <Path
                d="M13 17h2a2 2 0 0 0 2-2v-2M1 5V3a2 2 0 0 1 2-2h2L1 5Zm0 8v2a2 2 0 0 0 2 2h2l-4-4ZM13 1h2a2 2 0 0 1 2 2v2l-4-4ZM9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="#4F4F4F"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        ) : (
          <Image source={{ uri: document?.image }} style={styles.image} />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd8f',
    height: 125,
    width: 165,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  title: {
    fontWeight: '700',
    fontSize: 12,
  },
  cardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: '#E5EAFF',
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image: {
    width: 130,
    height: 85,
    resizeMode: 'contain',
    overflow: 'hidden',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
})
