import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AccordionItem from "../../According/AccordionItem";
import PreviewDetails from "./PreviewDetails";
import { useSelector } from "react-redux";
import {
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";

export default function PersonalInfoPreview({ filedData }) {
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const personal = filedData;
  //
  console.log("full_name", translate?.data?.full_name);
  return (
    <>
      {personal && (
        <AccordionItem title={language?.personalInfoTitle} ph={1}>
          {Object.entries(personal).map(([key, value]) => {
            // console.log("translate", );
            if (
              key !== "same_as_owner_address" &&
              key !== "same_as_present_address" &&
              value
            ) {
              return (
                <PreviewDetails left={translate?.[key] ?? key} right={value} />
              );
            }
          })}
        </AccordionItem>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
