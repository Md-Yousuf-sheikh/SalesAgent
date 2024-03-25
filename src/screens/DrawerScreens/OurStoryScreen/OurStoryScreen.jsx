import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import OurStoryCard from "./OurStoryCard";

export default function OurStoryScreen() {
  return (
    <View style={CONTAINER}>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={"Our Story"} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text preset="h1" color={"#595959"} style={styles.title}>
          The Waadaa Story
        </Text>
        {/* toggle */}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: 25,
          }}
        >
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: rh(10),
            }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={(item) => {
              return <OurStoryCard item={item?.item} />;
            }}
          /> */}
          {data?.map((item) => {
            return <OurStoryCard key={item.id} item={item} />;
          })}
        </View>
        {/* 01 */}
        <Text
          preset="h5"
          color={"#646464"}
          style={[
            styles.smallText,
            {
              paddingBottom: 15,
            },
          ]}
        >
          Waadaa arose through a simple problem: insurance was just too
          complicated. We couldn’t deal with this anymore, this broken promise
          of safety. So we decided to fix it. Our goal is to be a reliable,
          transparent and simple insurance provider. No hassles, no fancy terms,
          no confusion. Waadaa aims to provide insurance services to every
          single citizen of Bangladesh with ease, access, and transparency.
          We’re here to support you may it be life insurance, health insurance,
          savings insurance or anything else.
        </Text>
        {/* 02 */}
        <Text
          preset="h5"
          color={"#646464"}
          style={[
            styles.smallText,
            {
              paddingBottom: 15,
            },
          ]}
        >
          Waadaa aims to provide insurance services to every single citizen of
          Bangladesh with ease, access, and transparency. It aims to do this
          through a digital first approach as each person equipped with a simple
          smartphone should have access to world class insurance. Waadaa’s a
          brand that is here to serve the consumer. Waadaa is a trustable
          reliable team here to support each Bangladeshi citizen through the
          daunting process of insurance without any hassle or worry. It’s built
          to serve.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
  title: {
    fontSize: 20,
    lineHeight: 50,
  },
  smallText: {
    lineHeight: 21,
    fontWeight: "400",
  },
});

const data = [
  {
    id: 1,
    name: "Reliable Insurance",
    image: require("../../../../assets/icons/ourStory/01.png"),
    description:
      "Waadaa’s whole mission is to provide reliable and trustworthy insurance to anyone and everyone that needs it",
  },
  {
    id: 2,
    name: "50,000 Valued Promises",
    image: require("../../../../assets/icons/ourStory/02.png"),
    description: "We have proudly served over 50,000 happy faces",
  },
  {
    id: 3,
    name: "No Paperwork's, No Worries",
    image: require("../../../../assets/icons/ourStory/03.png"),
    description:
      "Our dedicated digital service will craft the perfect insurance for you,faster and easier",
  },
  {
    id: 4,
    name: "24/7 Care Team",
    image: require("../../../../assets/icons/ourStory/01.png"),
    description:
      "Waadaa’s whole mission is to provide reliable and trustworthy insurance to anyone and everyone that needs it",
  },
];
