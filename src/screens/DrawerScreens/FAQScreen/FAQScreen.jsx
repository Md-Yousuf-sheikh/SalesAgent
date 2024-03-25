import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { CONTAINER, rh, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import FAQToggleCard from "./FAQToggleCard";
import { useSelector } from "react-redux";
import { useGetFaqQuery } from "../../../redux/features/policy/policyApiSlice";
import FAQSkeleton from "./FAQSkeleton";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import Text from "../../../components/Text/Text";

export default function FAQScreen() {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);

  const { data: faqs, isLoading } = useGetFaqQuery(code);

  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language.faqHeader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.container}>
          {/* toggle */}
          <Text preset="h1" color={"#151515"} style={styles.title}>
            {language?.frequently_asked_questions}
          </Text>
          <FlatList
            data={faqs}
            keyExtractor={(item) => item?.item?.id}
            renderItem={(item, index) => {
              return <FAQToggleCard key={index} item={item?.item} />;
            }}
            ListEmptyComponent={
              isLoading ? (
                <>
                  <FAQSkeleton />
                  <FAQSkeleton />
                  <FAQSkeleton />
                  <FAQSkeleton />
                  <FAQSkeleton />
                </>
              ) : (
                <></>
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    lineHeight: 50,
  },
});
