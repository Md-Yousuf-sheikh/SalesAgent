import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../components/Text/Text";
import CurrencyFormat from "../../../components/Shared/CurrencyFormat";
import { rf, rh, rw } from "../../../theme/Theme";
import { useSelector } from "react-redux";
import {
  codeSelector,
  languageSelector,
} from "../../../redux/features/language/languageSlice";
import { ToEnNum } from "../../../components/Helper/Helper";

export default function CampaignDetailsTopCard({
  title,
  price,
  icon,
  bdt,
  customStyle,
  nothing,
}) {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  return (
    <View style={[styles.card, customStyle]}>
      <View style={styles.cardBody}>
        {/* <SvgTotalTarget /> */}
        {icon}
        <View style={{ width: rw(25) }}>
          <Text preset="h5" style={styles.cardTitle}>
            {title}
          </Text>
          {bdt ? (
            <Text preset="h6" style={styles.cardPrice}>
              {language?.bdt} {ToEnNum(CurrencyFormat(price), code)}
            </Text>
          ) : (
            <Text preset="h6" style={styles.cardPrice}>
              {price} {!nothing ? "%" : ""}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   topListContainer
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: rh(1),
  },
  //   topListItem
  cardBody: {
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: rf(1.7),
    color: "black",
  },
  cardPrice: {
    fontWeight: "800",
  },
});
