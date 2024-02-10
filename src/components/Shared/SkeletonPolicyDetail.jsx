import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR, rh, ROW, rw, rf, RSC, WIDTH } from "../../theme/Theme";
import Skeleton from "../Skeleton/Skeleton";

export default function SkeletonPolicyDetail() {
  return (
    <View>
      <View style={styles.headerSection}>
        {/* Title */}
        <View style={RSC}>
          <View>
            <Skeleton width={rw(50)} height={10} style={styles.title} />
            <Skeleton width={rw(30)} height={10} style={styles.title} />
          </View>
        </View>
        {/* details */}
        <Skeleton
          width={rw(90)}
          height={10}
          style={[
            styles.title,
            {
              marginTop: 15,
            },
          ]}
        />
        <Skeleton width={rw(80)} height={10} style={styles.title} />
        <Skeleton width={rw(50)} height={10} style={styles.title} />
      </View>
      {/* Detail section */}
      <View style={styles.ItemDetailsSection}>
        {/*Item Details Container  */}
        <View style={styles.ItemDetailsContainer}>
          <Skeleton width={80} height={5} style={styles.imageStyle} />
          <View
            style={{
              width: rw(65),
              paddingTop: 5,
            }}
          >
            <Skeleton width={rw(65)} height={14} style={styles.title} />
            <Skeleton width={rw(65)} height={14} style={styles.title} />
            <Skeleton width={rw(50)} height={14} style={styles.title} />
            <Skeleton width={rw(65)} height={7} style={styles.title} />
            <Skeleton width={rw(35)} height={7} style={styles.title} />
          </View>
        </View>
        {/* Item List  */}
        <View style={styles.ItemListContainer}>
          {/* list item Coverage */}
          <View style={styles.ItemDetailsList}>
            <Skeleton width={rw(16)} height={8} style={styles.title} />
            <Skeleton width={rw(16)} height={7} style={styles.title} />
          </View>
          <View style={styles.ItemDetailsList}>
            <Skeleton width={rw(16)} height={8} style={styles.title} />
            <Skeleton width={rw(16)} height={7} style={styles.title} />
          </View>
          <View style={styles.ItemDetailsList}>
            <Skeleton width={rw(16)} height={8} style={styles.title} />
            <Skeleton width={rw(16)} height={7} style={styles.title} />
          </View>
          <View style={styles.ItemDetailsList}>
            <Skeleton width={rw(16)} height={8} style={styles.title} />
            <Skeleton width={rw(16)} height={7} style={styles.title} />
          </View>
        </View>
      </View>
      {/* Button */}
      <Skeleton
        width={rw(90)}
        height={rh(6)}
        style={{
          marginVertical: 2,
          borderRadius: 30,
          alignSelf: "center",
        }}
      />
      {/* Key features */}
      <View style={styles.keyFeaturesContainer}>
        <Skeleton width={rw(35)} height={14} style={styles.title} />
        {/* list */}
        <View style={styles.keyFeaturesListContainer}>
          {/* list 01 */}
          <View style={styles.keyFeaturesBox}>
            <Skeleton width={10} height={10} style={styles.keyFeaturesImage} />
            <View>
              <Skeleton width={rw(15)} height={10} />
              <Skeleton
                width={rw(15)}
                height={10}
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          </View>
          {/* list 01 */}
          <View style={styles.keyFeaturesBox}>
            <Skeleton width={10} height={10} style={styles.keyFeaturesImage} />
            <View>
              <Skeleton width={rw(15)} height={10} />
              <Skeleton
                width={rw(15)}
                height={10}
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          </View>
          {/* list 01 */}
          <View style={styles.keyFeaturesBox}>
            <Skeleton width={10} height={10} style={styles.keyFeaturesImage} />
            <View>
              <Skeleton width={rw(15)} height={10} />
              <Skeleton
                width={rw(15)}
                height={10}
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          </View>
          {/* list 01 */}
          <View style={styles.keyFeaturesBox}>
            <Skeleton width={10} height={10} style={styles.keyFeaturesImage} />
            <View>
              <Skeleton width={rw(15)} height={10} />
              <Skeleton
                width={rw(15)}
                height={10}
                style={{
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
      </View>
      {/*  Drop button */}
      {/* Button */}
      <Skeleton
        width={rw(100)}
        height={rh(7.5)}
        style={{
          marginVertical: 10,
          alignSelf: "center",
        }}
      />
      <Skeleton
        width={rw(100)}
        height={rh(7.5)}
        style={{
          marginVertical: 10,
          alignSelf: "center",
        }}
      />
      <Skeleton
        width={rw(100)}
        height={rh(7.5)}
        style={{
          marginVertical: 10,
          alignSelf: "center",
        }}
      />
      {/* Botton  */}
      <View style={RSC}>
        <Skeleton
          width={rw(35)}
          height={rh(6)}
          style={{
            marginVertical: 10,
            alignSelf: "center",
            borderRadius: 30,
            marginLeft: 10,
          }}
        />
        <Skeleton
          width={rw(55)}
          height={rh(6)}
          style={{
            marginVertical: 10,
            alignSelf: "center",
            borderRadius: 30,
            marginRight: 10,
          }}
        />
      </View>

      {/*  Policy List */}
      <Skeleton
        width={rw(55)}
        height={15}
        style={{
          marginVertical: 10,
          borderRadius: 30,
          marginLeft: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: rh(1.8),
    paddingBottom: rh(9),
  },
  //
  headerSection: {
    paddingHorizontal: rw(4),
  },
  title: {
    marginBottom: 10,
    borderRadius: 5,
  },
  hartIcon: {
    backgroundColor: COLOR.lightGray50,
    padding: 10,
    borderRadius: 30,
  },
  //  ItemDetailsSection
  ItemDetailsSection: {
    padding: rw(4),
    backgroundColor: COLOR.lightGray50,
    marginVertical: rh(1.7),
    width: WIDTH,
  },
  ItemDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //
  },
  cardTitle: {
    paddingHorizontal: rw(3),
  },
  lineSmall: {
    width: 5,
    height: 2,
    backgroundColor: "#3F3F3F",
    marginLeft: 15,
    marginRight: 4,
    marginTop: 5,
  },
  lineBig: {
    width: 50,
    height: 2,
    backgroundColor: "#3F3F3F",
    marginTop: 5,
  },
  imageStyle: {
    width: rw(20),
    height: rw(20),
    resizeMode: "contain",
    backgroundColor: "#dddddd84",
  },
  itemDetailsTitle: {
    //
    // fontWeight: "700",
    // fontFamily: "Roboto-Regular",
    lineHeight: 22,
  },
  //
  ItemListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ItemDetailsList: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0000000d",
    marginVertical: 15,
    width: rw(22),
    justifyContent: "center",
    alignItems: "center",
  },
  ItemDetailsListTitle: {
    // lineHeight: 26,
    fontWeight: "700",
    marginTop: rh(0.7),
  },
  //  buttonStyle
  buttonContainer: {
    paddingHorizontal: rw(4),
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rh(3),
  },
  buttonStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#2253A5",
  },
  compareButton: {
    backgroundColor: "#F5F7FF",
    paddingHorizontal: rh(1.2),
    paddingVertical: rh(0.9),
    marginRight: rh(0.7),
    borderRadius: 5,
  },
  //   keyFeaturesContainer
  keyFeaturesContainer: {
    marginVertical: 15,
    paddingHorizontal: rw(4),
  },
  keyFeaturesListContainer: {
    paddingVertical: rh(1.2),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keyFeaturesBox: {
    width: rw(45),
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  keyFeaturesImage: {
    width: rh(4),
    height: rh(4),
    resizeMode: "contain",
    marginRight: 10,
  },
  keyFeaturesTitle: {},
  keyFeaturesInfo: {
    fontWeight: "700",
  },
  // Popular Insurance
  featuredPoliciesContainer: {
    paddingHorizontal: rw(2),
    paddingVertical: rh(2),
  },
});
