import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Text from "../../Text/Text";
import { rf, rw } from "../../../theme/Theme";
import { isImageSource } from "../../../utils";
import { ImageOrPdfViewModal } from "../../Form/FormikInputForm";

export default function PreviewDetails({ left, right }) {
  const [isVisible, setIsVisible] = useState(false);
  const isPDF =
    (right !== null &&
      typeof right === "string" &&
      right.toLowerCase().endsWith(".pdf")) ||
    (right !== null &&
      typeof right === "object" &&
      right?.uri?.toLowerCase().endsWith(".pdf"));
  // image
  const imageExtensionsRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  const isImage =
    (right !== null &&
      typeof right === "string" &&
      imageExtensionsRegex.test(right)) ||
    (right !== null &&
      typeof right === "object" &&
      right?.uri &&
      typeof right.uri === "string" &&
      imageExtensionsRegex.test(right.uri));
  //
  const source = isImageSource(right);
  return (
    <>
      <ImageOrPdfViewModal
        isPDF={isPDF}
        isImage={isImage}
        value={source}
        onClose={() => setIsVisible?.((prv) => !prv)}
        isVisible={isVisible}
      />
      {/* context */}
      <View style={styles.itemContainer}>
        <Text preset="h5" style={styles.tableTextLeft}>
          {left ? left : ""}
        </Text>
        <Text preset="h5" style={styles.tableTextRight}>
          {isImage || isPDF ? (
            <View>
              <TouchableOpacity onPress={() => setIsVisible?.((prv) => !prv)}>
                {isImage && (
                  <>
                    <Image
                      source={{
                        uri: source ?? null,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "center",
                      }}
                    />
                  </>
                )}
                {isPDF && (
                  <Image
                    source={require("../../../../assets/pdf-icon.png")}
                    style={{
                      width: 50,
                      height: 30,
                      resizeMode: "center",
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : right == true || false ? (
            right == true ? (
              "Yes"
            ) : (
              "No"
            )
          ) : (
            right
          )}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f3f5ff58",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 15,
    paddingHorizontal: rw(4),
  },
  // Table
  table: {},
  tableText: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  tableTextRight: {
    color: "#000000",
    textAlign: "right",
    maxWidth: "50%",
  },
  tableTextLeft: {
    color: "#000000",
    textAlign: "left",
    maxWidth: "50%",
  },
});
