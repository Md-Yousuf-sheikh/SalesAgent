import {
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import Text from "../../../components/Text/Text";
import { AntDesign } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import { COLOR, rh, rw } from "../../../theme/Theme";
import RenderHTML from "react-native-render-html";

export default function FAQToggleCard({ item }) {
  const [Open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  let source = {
    html: `<div style="color:#2b2a2a" >${item?.description}</div>`,
  };
  //  animation
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    //
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    //
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(ToggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          toggleListItem();
        }}
        activeOpacity={0.8}
        style={styles.button}
      >
        <View style={styles.buttonText}>
          <Text preset="h5" color={"#2a2a2a"} style={[styles.titleText]}>
            {item?.title}
          </Text>
          <Animated.View>
            <AntDesign
              name={showContent ? "minus" : "plus"}
              size={15}
              color="#646464"
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {showContent && (
        <View style={[styles.content]}>
          <RenderHTML width={rw(50)} source={source} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
  button: {
    paddingVertical: rh(0.7),
    backgroundColor: "#ffff",
  },
  buttonText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    lineHeight: 21,
    fontWeight: "400",
    width: "95%",
    paddingBottom: rh(1.7),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  smallText: {
    lineHeight: 21,
    fontWeight: "400",
    width: "95%",
  },
  content: {
    paddingBottom: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: COLOR.blue200,
  },
});
