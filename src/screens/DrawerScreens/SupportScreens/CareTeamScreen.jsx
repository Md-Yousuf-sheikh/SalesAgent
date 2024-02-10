import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CONTAINER, rw } from "../../../theme/Theme";
import DrawerHeader from "../../../components/Headers/DrawerHeader";

import { useDispatch, useSelector } from "react-redux";
import CareTeamWhatsUp from "./CareTeamWhatsUp";
import CareTeamPhone from "./CareTeamPhone";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { useGetCompanyDetailsQuery } from "../../../redux/features/policy/policyApiSlice";

export default function CareTeamScreen() {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const { data, isLoading } = useGetCompanyDetailsQuery([code]);
console.log('whatsNumber', JSON.stringify(data?.contactNumber));
  return (
    <View style={CONTAINER}>
      <DrawerHeader title={language.careTeamHeader} />
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={() => {
            dispatch(increment());
          }}
        >
          <Text>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(decrement());
          }}
        >
          <Text>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{count}</Text>
        </TouchableOpacity> */}

        {/*  */}
        <CareTeamWhatsUp number={data?.whatsNumber}  />
        <CareTeamPhone number={data?.whatsNumber} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
  },
});
