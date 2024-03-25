import { StyleSheet } from "react-native";
import React from "react";
import AccordionItem from "../../According/AccordionItem";
import PreviewDetails from "./PreviewDetails";
import { useSelector } from "react-redux";
import {
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";
import { showLabel } from "../../../utils/showLabel";

export default function MotorInfoPreview({ motorInfo, data }) {
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const motor = motorInfo;
  console.log('motorInfo',motorInfo);
  return (
    <>
      {motor && (
        <AccordionItem title={language?.motorInformation} ph={1}>
          {Object.entries(motor).map(([key, value]) => {
            const field = data?.find((item) => item.field_name === key);
            if (field) {
              return (
                <PreviewDetails
                  left={showLabel(field, translate)}
                  right={value}
                  key={key}
                />
              );
            }
            return null;
          })}
        </AccordionItem>
      )}
    </>
  );
}
