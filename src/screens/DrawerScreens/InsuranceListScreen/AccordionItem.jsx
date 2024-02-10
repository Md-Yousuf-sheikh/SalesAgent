import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useRef, useState } from "react";
import { rf, rh, ROW, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import RenderHTML from "react-native-render-html";

export default function AccordionItem({ title, description }) {
  const [showContent, setShowContent] = useState(false);
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
    outputRange: ["90deg", "0deg"],
  });

  let source = {
    html: `<div style="color:#4A4A4A" >${description}</div>`,
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem();
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" color={"#2253A5"} style={styles.cardTitle}>
            {title}
          </Text>
          {/* <View style={styles.lineSmall} />
          <View style={styles.lineBig} /> */}
        </View>

        <Animated.View
          style={{
            transform: [
              {
                rotateZ: arrowTransform,
              },
            ],
          }}
        >
          <Feather
            name={!showContent ? "plus" : "minus"}
            size={24}
            color="black"
          />
        </Animated.View>
      </TouchableOpacity>
      {/* List open */}
      {showContent && (
        // <Text preset="SM" style={styles.cardDescription}>
        //   {description}
        // </Text>
        <View style={{ paddingHorizontal: rh(1.5), paddingVertical: rh(2) }}>
          <RenderHTML width={rw(50)} source={source} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  //
  cardTitle: {},
  lineSmall: {
    width: 5,
    height: 2,
    backgroundColor: "#2253A5",
    marginLeft: 15,
    marginRight: 4,
    marginTop: 5,
  },
  lineBig: {
    width: 50,
    height: 2,
    backgroundColor: "#2253A5",
    marginTop: 5,
  },
  card: {
    marginVertical: 10,
    overflow: "hidden",
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    paddingVertical: rh(1.7),
    paddingHorizontal: rw(4),
  },
  cardDescription: {
    lineHeight: 17,
    fontSize: rf(1.7),
    paddingHorizontal: rw(4),
    backgroundColor: "#F5F7FF",
    paddingVertical: 15,
    color: "#737373",
  },
});
