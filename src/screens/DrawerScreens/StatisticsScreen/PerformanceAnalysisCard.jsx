import { StyleSheet, View } from "react-native";
import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryTheme,
} from "victory-native";
import { COLOR, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { useSelector } from "react-redux";
import { languageSelector } from "../../../redux/features/language/languageSlice";
export default function PerformanceAnalysisCard({
  mainData,
  performanceAnalysis,
}) {
  const language = useSelector(languageSelector);

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num) / 1000 + "k";
  }

  function YFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)
      : Math.sign(num) * Math.abs(num);
  }
  let data;

  if (mainData !== undefined && Object.keys(mainData).length > 0) {
    data = {
      planned: [
        {
          x: "April",
          y: YFormatter(parseInt(mainData?.target)),
          label: kFormatter(parseInt(mainData?.target)),
        },
        {
          x: "May",
          y: YFormatter(parseInt(mainData?.target)),
          label: kFormatter(parseInt(mainData?.target)),
        },
        {
          x: "June",
          y: YFormatter(parseInt(mainData?.target)),
          label: kFormatter(parseInt(mainData?.target)),
        },
      ],
      actual: [
        {
          x: "April",
          y: YFormatter(parseInt(mainData?.achieve)),
          label: kFormatter(parseInt(mainData?.achieve)),
        },
        {
          x: "May",
          y: YFormatter(parseInt(mainData?.achieve)),
          label: kFormatter(parseInt(mainData?.achieve)),
        },
        {
          x: "June",
          y: YFormatter(parseInt(mainData?.achieve)),
          label: kFormatter(parseInt(mainData?.achieve)),
        },
      ],
    };
  }

  //   theme={VictoryTheme.material}
  return (
    <View style={styles.container}>
      <Text preset="h1" color={"#2253A5"} style={styles.title}>
        {language.performanceAnalysisTitle}
      </Text>
      {/*  chart */}
      <VictoryChart
        padding={{ top: 90, bottom: 30, left: rw(16), right: rw(25) }}
        height={270}
        // animate={{
        //   duration: 1000,
        //   easing: 'circle',
        // }}
      >
        <VictoryLegend
          x={rw(70)}
          // y={-20}
          data={[
            {
              name: language.target,
              symbol: { fill: "#2253A5", type: "square" },
            },
            {
              name: language.achieved,
              symbol: { fill: "#019E1A", type: "square" },
            },
          ]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `${x}k`}
        />
        <VictoryAxis />
        <VictoryGroup offset={rw(8)}>
          <VictoryBar
            data={performanceAnalysis?.actual}
            style={{
              data: {
                fill: "#019E1A",
                width: rw(7),
                // strokeWidth: 15,
                // strokeLinejoin: 'round',
              },
              labels: { fill: "#7E7E7E" },
            }}
          />
          <VictoryBar
            data={performanceAnalysis?.planned}
            style={{
              data: {
                fill: "#2253A5",
                width: rw(7),
                // strokeLinejoin: 'round',
                // strokeWidth: 15,
              },
              labels: { fill: "#7E7E7E" },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    borderRadius: rh(1),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 3.3,
    marginVertical: 10,
    paddingVertical: rh(4),
    paddingHorizontal: rw(4),
    // marginHorizontal: rw(4),
    // marginRight: rh(3),
    // left: rh(2),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#c7c7c74c",
  },
  title: {
    fontSize: 20,
    paddingBottom: 25,
  },
});
