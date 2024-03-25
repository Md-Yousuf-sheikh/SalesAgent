import { StyleSheet, TouchableOpacity, Image, View, Modal } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import { FontAwesome } from '@expo/vector-icons'
import Text from '../Text/Text'
//
// export const getFileInfo = async (fileURI) => {
//   const fileInfo = await FileSystem.getInfoAsync(fileURI);
//   return fileInfo;
// };
//
// const bytesToSize = (bytes) => {
//   let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
//   if (bytes == 0) return "0 Byte";
//   let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
//   return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
// };
export default function ImageDocumentPicker({ setDocument }) {
  // documentPicker
  const documentPicker = async () => {
    let result
    let results = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'], // type
      multiple: false,
    })
    result = results.uri
    if (results?.type === 'success') {
      setDocument(result)
    }
  }
  // "mimeType": "image/jpeg"
  // name // uri
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          documentPicker()
        }}
        activeOpacity={0.8}
        style={styles.cardButton}
      >
        <Text style={styles.cardBtnTitle}>Upload from mobile</Text>
        <FontAwesome name="upload" size={18} color="#4F4F4F" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardBtnTitle: {
    paddingHorizontal: 15,
    fontSize: 12,
  },
  cardButton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: '#E5EAFF',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
})
