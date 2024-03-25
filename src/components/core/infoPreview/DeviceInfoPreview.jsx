import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AccordionItem from "../../According/AccordionItem";
import PreviewDetails from "./PreviewDetails";
import { useSelector } from "react-redux";
import {
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";

export default function DeviceInfoPreview({ deviceInfo }) {
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const device = deviceInfo;

  return (
    <>
      {device && (
        <AccordionItem title={language?.deviceInfoTitle} ph={1}>
          {Object.entries(device).map(([key, value]) => {
            if (value) {
              return (
                <>
                  <PreviewDetails
                    left={translate?.[key]}
                    right={value}
                    key={key}
                  />
                </>
              );
            }
            return null;
          })}
        </AccordionItem>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
