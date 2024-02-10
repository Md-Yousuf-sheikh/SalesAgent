import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";
import { rw } from "../../theme/Theme";

export default function SkeletonSendNotifaction() {
  return (
    <>
      <>
        <Skeleton width={rw(15)} height={8} mt={10} rounded={4} />
        <Skeleton width={rw(90)} height={50} mt={10} rounded={5} />
      </>
      <>
        <Skeleton width={rw(15)} height={8} mt={10} rounded={4} />
        <Skeleton width={rw(90)} height={50} mt={10} rounded={5} />
      </>
      <>
        <Skeleton width={rw(15)} height={8} mt={10} rounded={4} />
        <Skeleton width={rw(90)} height={50} mt={10} rounded={5} />
      </>
      <Skeleton width={rw(90)} height={50} mt={30} rounded={10} />
    </>
  );
}

const styles = StyleSheet.create({});
