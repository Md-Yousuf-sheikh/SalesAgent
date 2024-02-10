import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { rf, rh, rw } from "../../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Path } from "react-native-svg";
import {
  compareModal,
  selectCompareItems,
} from "../../redux/features/insuranceCompare/insuranceComApiSlice";

export default function FloatingCompare() {
  const dispatch = useDispatch();
  const compareList = useSelector(selectCompareItems);

  return (
    <>
      {compareList?.length >= 1 && (
        <TouchableOpacity
          onPress={() => {
            dispatch(compareModal());
          }}
          style={{
            position: "absolute",
            right: 0,
            bottom: rh(50),
            zIndex: 999,
            opacity: 0.5,
          }}
        >
          <View
            style={{
              borderColor: "rgba(22, 181, 204, 1)",
              borderWidth: 3,
              backgroundColor: "rgba(244, 212, 30, 1)",
              zIndex: 9999,
              height: rh(2.5),
              width: rh(2.5),
              borderRadius: rh(2),
              top: rh(1.5),
              right: rh(0.5),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: rf(1.4),
                fontWeight: "bold",
                color: "rgba(22, 181, 204, 1)",
              }}
            >
              {compareList?.length}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "rgba(22, 181, 204, 1)",
              height: rh(6),
              width: rw(14),
              borderBottomLeftRadius: rh(1),
              borderTopLeftRadius: rh(1),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <>
              <Svg width={25} height={25} fill="none">
                <Path
                  d="M10.235 16.911a1.015 1.015 0 0 0-.492-.228 1.1 1.1 0 0 0-.556.048.945.945 0 0 0-.431.306.757.757 0 0 0-.162.463v1.667H7.392c-.447 0-.875-.154-1.19-.427a1.367 1.367 0 0 1-.493-1.031V7.083c.74-.355 1.325-.912 1.663-1.585.339-.673.411-1.424.207-2.136-.205-.712-.674-1.346-1.337-1.803A4.226 4.226 0 0 0 3.916.834a4.26 4.26 0 0 0-2.355.652C.88 1.922.384 2.54.15 3.246a2.918 2.918 0 0 0 .117 2.14c.31.683.87 1.258 1.596 1.637v10.686c.001 1.27.584 2.488 1.62 3.386 1.037.899 2.443 1.404 3.909 1.405h1.202v1.667c0 .165.056.326.162.463a.946.946 0 0 0 .431.307 1.1 1.1 0 0 0 .556.047c.186-.032.357-.111.492-.228l3.846-3.333a.781.781 0 0 0 .281-.59.781.781 0 0 0-.281-.588l-3.846-3.334ZM3.845 2.5c.381 0 .753.097 1.07.28.316.184.562.444.708.749.145.304.183.64.11.963-.075.323-.258.62-.527.853a2.03 2.03 0 0 1-.985.456 2.2 2.2 0 0 1-1.111-.095 1.89 1.89 0 0 1-.863-.614 1.514 1.514 0 0 1-.324-.926c0-.442.202-.866.563-1.178.36-.313.85-.488 1.36-.488Zm19.232 15.449V7.292c-.002-1.27-.585-2.489-1.621-3.387-1.037-.899-2.442-1.404-3.908-1.405h-1.202V.833a.757.757 0 0 0-.162-.463.945.945 0 0 0-.432-.307 1.1 1.1 0 0 0-.555-.047 1.015 1.015 0 0 0-.492.228l-3.846 3.333a.781.781 0 0 0-.282.59c0 .22.101.432.282.588l3.846 3.334c.134.116.306.196.492.228a1.1 1.1 0 0 0 .555-.048.945.945 0 0 0 .432-.306.757.757 0 0 0 .162-.463V5.833h1.202c.446 0 .874.154 1.19.427.315.274.493.645.493 1.032v10.657c-.734.366-1.307.933-1.63 1.61a2.92 2.92 0 0 0-.162 2.14c.219.708.702 1.334 1.373 1.781a4.243 4.243 0 0 0 2.342.689c.846 0 1.67-.242 2.341-.689.672-.447 1.155-1.073 1.374-1.782a2.92 2.92 0 0 0-.162-2.138c-.324-.678-.897-1.244-1.63-1.611ZM21.154 22.5c-.38 0-.752-.097-1.069-.28a1.742 1.742 0 0 1-.708-.749 1.461 1.461 0 0 1-.11-.963c.075-.323.258-.62.527-.853a2.03 2.03 0 0 1 .985-.456 2.2 2.2 0 0 1 1.11.095c.352.126.652.34.864.614.211.274.324.596.324.926 0 .442-.203.866-.563 1.178-.361.313-.85.488-1.36.488Z"
                  fill="#fff"
                />
              </Svg>
            </>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
