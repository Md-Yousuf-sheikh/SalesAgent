import { StyleSheet } from "react-native";
import React from "react";
import AccordionItem from "../../According/AccordionItem";
import PreviewDetails from "./PreviewDetails";
import { useSelector } from "react-redux";
import {
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";

export default function NomineeInfoPreview({ memberInfo, nomineeInfo, data }) {
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const nominee = nomineeInfo || [];
  const members = memberInfo || [];

  return (
    <>
      {nominee &&
        nominee?.length > 0 &&
        nominee?.map((item, index) => {
          return (
            <AccordionItem
              key={index}
              title={`${language?.nominee} (${index + 1})`}
              ph={1}
            >
              {Object.entries(item).map(([key, value]) => {
                if (
                  key !== "same_as_owner_address" &&
                  key !== "same_as_present_address" &&
                  value
                ) {
                  return (
                    <PreviewDetails left={translate?.[key]} right={value} />
                  );
                }
              })}
            </AccordionItem>
          );
        })}

      {/* member */}
      {members &&
        members?.length > 0 &&
        members?.map((item, index) => {
          return (
            <AccordionItem
              key={index}
              title={`${language?.members} (${index + 1})`}
              ph={1}
            >
              {Object.entries(item).map(([key, value]) => {
                if (
                  key !== "same_as_owner_address" &&
                  key !== "same_as_present_address" &&
                  value
                ) {
                  return (
                    <PreviewDetails left={translate?.[key]} right={value} />
                  );
                }
              })}
            </AccordionItem>
          );
        })}
    </>
  );
}

const styles = StyleSheet.create({});
