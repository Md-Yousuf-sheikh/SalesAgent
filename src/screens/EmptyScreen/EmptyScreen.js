import React, { useMemo } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'

export const EmptyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        data={colors}
        renderItem={({item: color}) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: color,
              },
            ]}
          />
        )}
        keyExtractor={(item, idx) => `item_${idx}`}
      /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  item: {
    margin: 10,
    height: 90,
    borderRadius: 10,
  },
})
