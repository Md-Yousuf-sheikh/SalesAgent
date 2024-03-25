import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ROW, rh, rw } from "../../theme/Theme";
import { ToggleAnimation } from "../../Animation/ToggleAnimation";
import Text from "../Text/Text";

export default function AccordionItem({
  children,
  title,
  styleCardBody,
  ph,
  onChange,
}) {
  const [showContent, setShowContent] = useState(true);
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    // Animated timing
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(ToggleAnimation);
    setShowContent((prv) => !prv);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "90deg"],
  });
  //
  React.useEffect(() => {
    if (onChange) {
      const config = {
        duration: 300,
        toValue: showContent ? 0 : 1,
        useNativeDriver: true,
      };
      // Animated timing
      Animated.timing(animationController, config).start();
      LayoutAnimation.configureNext(ToggleAnimation);
      setShowContent((prv) => !prv);
    }
  }, [onChange]);

  return (
    <View style={styles.card}>
      {/* header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem();
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" style={styles.cardTitle}>
            {title}
          </Text>
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
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#2196F3" />
        </Animated.View>
      </TouchableOpacity>

      {/* Body */}
      {showContent && (
        <View
          style={[
            styles.cardBody,
            styleCardBody,
            ph && {
              paddingHorizontal: ph,
            },
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#e0e6fe",
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e0e6fe",
    paddingVertical: rh(1.2),
    paddingHorizontal: rw(4),
  },
  cardBody: {
    paddingHorizontal: rw(4),
    paddingBottom: 10,
  },
});
