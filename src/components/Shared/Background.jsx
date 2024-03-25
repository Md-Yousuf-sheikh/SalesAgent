import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NetInfo from "@react-native-community/netinfo";

export default function Background({
  children,
  ph,
  pv,
  pb,
  onRefresh,
  refreshIsOpen = false,
  scrollEnabled = true,
  scrollView = true,
  onResponderEnd = () => {},
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  //
  const handleOnRefresh = useCallback(() => {
    onRefresh?.();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [onRefresh]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
      return setIsConnected(isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      {scrollView ? (
        <KeyboardAwareScrollView
          scrollEnabled={scrollEnabled}
          refreshControl={
            refreshIsOpen ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleOnRefresh}
              />
            ) : undefined
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: "#fff",
            position: "relative",
          }}
          contentContainerStyle={{
            paddingHorizontal: ph,
            paddingVertical: pv,
            paddingBottom: pb,
          }}
          onResponderEnd={onResponderEnd}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            position: "relative",
            paddingHorizontal: ph,
            paddingVertical: pv,
            paddingBottom: pb,
          }}
        >
          {children}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
