import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AccordionItem from "../../According/AccordionItem";
import PreviewDetails from "./PreviewDetails";
import { useSelector } from "react-redux";
import {
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";

export default function TravelInfoPreview({ travelInfo }) {
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const travel = travelInfo;

  return (
    <>
      {travel && (
        <AccordionItem title={language?.travelInfoTitle} ph={1}>
          {Object.entries(travel).map(([key, value]) => {
            if (key !== "country_of_visit" && value) {
              return <PreviewDetails left={translate?.[key]} right={value} />;
            }
            return;
          })}
        </AccordionItem>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
