import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import { rf, rh, RSC, rw } from "../../../theme/Theme";
import { toSnakeCase } from "../../../utils";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function ItemCard({ title, LText, RText, isArray, isImage }) {
  const language = useSelector(languageSelector);
  return (
    <View>
      <Text preset="SL" style={styles.title}>
        {title}
      </Text>
      <View style={styles.container}>
        <View style={RSC}>
          <View
            style={[styles.box, { borderRightWidth: 1, borderColor: "#ddd" }]}
          >
            {isImage ? (
              <>
                <Image
                  source={{
                    uri: RText,
                  }}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </>
            ) : (
              <>
                {isArray ? (
                  typeof LText === "string" && LText.trim() !== "" ? (
                    JSON.parse(LText)?.map((item, index) => (
                      <Text preset="SL" style={styles.text} key={index}>
                        {language?.[toSnakeCase(item)] ?? item}
                      </Text>
                    ))
                  ) : (
                    <Text preset="SL" style={styles.text}>
                      {"N/A"}
                    </Text>
                  )
                ) : (
                  <Text preset="SL" style={styles.text}>
                    {LText}
                  </Text>
                )}
              </>
            )}
          </View>
          <View
            style={[styles.box, { borderLeftWidth: 1, borderColor: "#ddd" }]}
          >
            {isImage ? (
              <>
                <Image
                  source={{
                    uri: LText,
                  }}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </>
            ) : (
              <>
                {isArray ? (
                  typeof RText === "string" && RText.trim() !== "" ? (
                    JSON.parse(RText)?.map((item, index) => (
                      <Text preset="SL" style={styles.text} key={index}>
                        {language?.[toSnakeCase(item)] ?? item}
                      </Text>
                    ))
                  ) : (
                    <Text preset="SL" style={styles.text}>
                      {"N/A"}
                    </Text>
                  )
                ) : (
                  <Text preset="SL" style={styles.text}>
                    {RText}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: rh(1.25),
    borderRadius: 10,
    paddingVertical: rh(2),
    shadowColor: "#4F4F4F",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: rf(1.8),
    color: "#4F4F4F",
    lineHeight: 20,
    paddingVertical: 5,
    textAlign: "center",
  },
  text: {
    color: "#646464",
    textAlign: "center",
  },
  box: {
    width: rw(40),
  },
});
