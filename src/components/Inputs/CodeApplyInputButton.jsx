import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputText from "./InputText";
import MediumButton from "../Buttons/MediumButton";
import { RSBC, rw } from "../../theme/Theme";
import { TouchableOpacity } from "react-native";

export default function CodeApplyInputButton({
  open,
  setOpen,
  onPress,
  label,
  title,
  buttonTitle,
  setCode,
}) {
  const [inputValue, setInputValue] = useState();
  return (
    <View>
      <>
        <>
          {!open && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setOpen(true);
              }}
              style={{ paddingVertical: 15 }}
            >
              <Text preset="h4" style={{ fontSize: 16 }} color={"#4A4A4A"}>
                {"Do you have any promo code?"}{" "}
                <Text color={"#0089ED"} preset="h4" style={{ fontSize: 16 }}>
                  {/* {languageState.enterItButtonText} */}
                  enterItButtonText
                </Text>
              </Text>
            </TouchableOpacity>
          )}

          {open && (
            <>
              <Text preset="h5" color={"#646464"} style={styles.smallText}>
                {label}
              </Text>
              <View style={RSBC}>
                <InputText
                  markHide={true}
                  setValue={setInputValue}
                  styleInput={{
                    width: rw(55),
                  }}
                  placeholder={label}
                />
                <MediumButton
                  title={buttonTitle}
                  stylesButton={{
                    width: rw(30),
                    marginVertical: 0,
                    borderRadius: 30,
                  }}
                  type={"sec"}
                  onPress={() => {
                    onPress(inputValue);
                  }}
                />
              </View>
            </>
          )}
        </>
      </>
    </View>
  );
}

const styles = StyleSheet.create({});
