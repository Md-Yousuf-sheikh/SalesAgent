import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Text from "../Text/Text";
import { COLOR, rf, rh, rw } from "../../theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import languageSlice, {
  inPress,
  listOpen,
  selectLanguage,
  setAllLanguageType,
  setFinalLanguageDatas,
} from "../../redux/features/language/languageSlice";
import {
  useGetLanguagesQuery,
  useGetLanguageTextsQuery,
  useLazyGetLanguageTextsQuery,
} from "../../redux/features/language/languageApiSlice";
import useFetchLanguageTexts from "../../hooks/useFetchLanguageTexts";
import { useRef } from "react";

export default function LanguageToggleButton({
  buttonContainerStyle,
  listContainerStyle,
  mainContainerStyle,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.language);
  const languageType = useSelector(
    (state) => state?.language?.language?.languagesType
  );
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  const [Open, setOpen] = useState(false);
  const [toggleIsLoading, setToggleIsLoading] = useState(false);
  const codeRef = useRef();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetLanguagesQuery();
  useEffect(() => {
    if (languageType) {
      if (data && data?.length > 0 && data?.length !== languageType.length)
        dispatch(setAllLanguageType(data));
    }
  }, [data]);

  const { data: languageData } = useGetLanguageTextsQuery([
    state?.language.finalLanguage.code,
    "agentApp",
  ]);

  const { getLanguageTexts, languageTexts, languageTextsSucceed } =
    useFetchLanguageTexts(codeRef.current);

  const handelSelect = async (datas) => {
    codeRef.current = datas?.code;
    const fData = state?.language?.totalLanguages?.filter(
      (item) => item?.code === datas?.code
    )[0];
    if (fData && fData?.code === datas?.code) {
      setToggleIsLoading(true);
      dispatch(setFinalLanguageDatas(fData));
      setToggleIsLoading(false);
      setOpen((prv) => !prv);
    } else {
      setToggleIsLoading(true);
      try {
        const langData = await getLanguageTexts([datas?.code, "agentApp"]);
        if (langData) {
          const finalData = {
            code: datas?.code,
            name: datas?.name,
            status: datas?.status,
            data: langData.data.data,
          };
          dispatch(selectLanguage(finalData));
          dispatch(setFinalLanguageDatas(finalData));
        }
        setToggleIsLoading(false);
        setOpen((prv) => !prv);
      } catch (error) {
        setToggleIsLoading(false);
        setOpen((prv) => !prv);
      }
    }
  };

  return (
    <View style={[styles.container, mainContainerStyle]}>
      <View style={[styles.buttonContainer, buttonContainerStyle]}>
        <TouchableOpacity
          onPress={() => {
            // dispatch(listOpen())
            setOpen((prv) => !prv);
          }}
          style={styles.button}
        >
          {/* <Image source={state?.language?.flag} style={styles.flag} /> */}

          <Text style={styles.buttonText}>
            {state?.language?.finalLanguage.name}
          </Text>
        </TouchableOpacity>
      </View>
      {/* List  */}
      {Open && (
        <View
          style={[
            styles.listContainer,
            listContainerStyle ? listContainerStyle : { right: rh(0.8) },
          ]}
        >
          {toggleIsLoading ? (
            <ActivityIndicator color={COLOR.black} />
          ) : (
            languageType?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handelSelect(item);
                  }}
                  style={[
                    styles.listButton,
                    state?.inPress == index && styles.inPress,
                  ]}
                  key={index}
                  // onPressIn={() => {
                  //   dispatch(inPress(index))
                  // }}
                  // onPressOut={() => {
                  //   dispatch(inPress(null))
                  // }}
                >
                  <View style={styles.imageContainer}>
                    {/* <Image source={item.flag} style={styles.flag} /> */}
                    <Text
                      style={[
                        styles.number,
                        state?.inPress == index && { color: COLOR.white },
                      ]}
                    >
                      {item?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: rh(0.5),
    zIndex: 10,
    marginRight: rh(0.5),
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  button: {
    justifyContent: "center",
    borderRadius: rh(7),
    borderWidth: rh(0.1),
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: rh(1),
    // paddingVertical: rh(0.2),
    borderColor: "#0089ED",
    backgroundColor: "#ffff",
    marginRight: rh(1.5),
    height: rh(4.2),
    width: rw(20),
  },
  buttonText: {
    fontSize: rf(1.9),
    // marginLeft: rh(0.5),
  },
  //   list select style
  listContainer: {
    position: "absolute",
    borderRadius: rh(2),
    backgroundColor: COLOR.white,
    paddingVertical: rh(1),
    zIndex: 10,
    marginTop: rh(4.5),
    minHeight: rh(10),
    width: rw(23),

    //shadow
    shadowColor: COLOR.blue400,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 2.5,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: rw(4.4),
    height: rw(4.4),
    resizeMode: "contain",
    borderRadius: rw(8),
  },
  title: {
    marginLeft: 15,
  },
  number: {
    marginLeft: rh(1),
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rh(0.5),
    paddingHorizontal: rh(1.6),
  },
  //   markIcon
  markIcon: {
    position: "absolute",
    right: 15,
    zIndex: 5,
  },
  inPress: {
    backgroundColor: COLOR.lightGray200,
  },
  language: {},
});

//
// language
const data = [
  {
    id: 1,
    language: "বাংলা",
    number: "+880",
    flag: require("../../../assets/icons/Flag/bd.png"),
    digits: 11,
  },
  {
    id: 2,
    language: "Hindi",
    number: "+91",
    flag: require("../../../assets/icons/Flag/in.png"),
    digits: 10,
  },
  {
    id: 3,
    language: "English",
    number: "+44",
    flag: require("../../../assets/icons/Flag/usa.png"),
    digits: 11,
  },
  {
    id: 4,
    language: "Nepali",
    number: "+997",
    flag: require("../../../assets/icons/Flag/np.png"),
    digits: 13,
  },
];
