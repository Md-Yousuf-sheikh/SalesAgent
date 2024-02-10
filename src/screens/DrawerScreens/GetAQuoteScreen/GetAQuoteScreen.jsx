import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { COLOR, CONTAINER, rh, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import MediumButton from "../../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  useGetAQuoteFormQuery,
  usePostAQuoteMutation,
  usePostIdentityTypeMutation,
} from "../../../redux/features/policy/policyApiSlice";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import DataNotFound from "../../../components/Shared/DataNotFound";
import { showLabel, showPlaceholder } from "../../../utils/showLabel";
import { toSnakeCase } from "../../../utils";
import { FormikInputForm } from "../../../components/Form/FormikInputForm";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import SkeletonInputFiled from "../../../components/Shared/SkeletonInputFiled";
import Toast from "react-native-root-toast";

export default function GetAQuoteScreen() {
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const translate = useSelector(translateSelector);
  const authUser = useSelector((state) => state?.user?.myData);
  const toast = useShowToastMessage();
  const navigation = useNavigation();
  //
  const [handelQuote, { isLoading: isLoadingSubmit }] = usePostAQuoteMutation();
  const { data, isLoading, isSuccess } = useGetAQuoteFormQuery(code);

  // all name
  let formFields = []
    .concat(...Object.keys(data || [])?.map((item) => data?.[item]))
    ?.map((item) => item?.field_name)
    ?.reduce(
      (a, v) => ({
        ...a,
        [v]: "",
      }),
      {}
    );
  //
  const handelSubmit = async (data) => {
    try {
      const inputData = {
        items: { ...data },
        userId: authUser?.agent?.id,
      };

      const formData = new FormData();
      formData.append("user_Id", inputData?.userId);

      for (let pData of Object.keys(inputData?.items)) {
        formData.append(`${pData}`, inputData?.items[pData]);
      }

      // return;
      const res = await handelQuote(data).unwrap();
      toast(res?.message, "error");
      if (res?.data?.length > 0) {
        navigation.navigate("SuggestedPolicy", {
          data: res?.data,
        });
      }
    } catch (error) {
      console.log("error", error);
      toast(error?.data?.message, "error");
    }
  };
  //

  return (
    <>
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.getAQuote} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
      >
        <View style={styles.container}>
          {/* <Text
            preset="h1"
            fontWeight={800}
            color={"#595959"}
            style={styles.title}
          >
            {language?.findBestSFY}
          </Text> */}

          {/* formik */}
          {data?.length > 0 ? (
            <Formik
              initialValues={formFields}
              validationSchema={Yup.object().shape({
                full_name: Yup.string()
                  .max(255)
                  .required(`${language?.full_name_field_is_required}`),
                gender: Yup.string().required(
                  `${language?.gender_field_is_required}`
                ),
                dob: Yup.date().required(
                  `${language?.date_of_birth_field_is_required}`
                ),
                profession: Yup.string().required(
                  `${language?.profession_field_is_required}`
                ),
                others_profession: Yup.string().when(
                  "profession",
                  (profession, schema) => {
                    if (
                      profession &&
                      profession?.length > 0 &&
                      profession[0] === "Others"
                    ) {
                      return Yup.string().required(
                        `${language?.others_profession_field_is_required}`
                      );
                    }
                  }
                ),
                category_id: Yup.string().required(
                  `${language?.category_field_is_required}`
                ),
                total_coverage: Yup.number().required(
                  `${language?.total_coverage_field_is_required}`
                ),
                term_type: Yup.string().required(
                  `${language?.term_type_field_is_required}`
                ),
                term: Yup.number().required(
                  `${language?.term_field_is_required}`
                ),
                payment_frequency: Yup.string().required(
                  `${language?.frequency_of_payment_field_is_required}`
                ),
              })}
              onSubmit={handelSubmit}
            >
              {(props) => (
                <>
                  {data?.map((field, index) => (
                    <>
                      {field?.field_type === "date" && (
                        <FormikInputForm
                          formik={props}
                          label={showLabel(field, translate)}
                          placeholder={showPlaceholder(field, translate)}
                          name={field?.field_name}
                          type={"date"}
                          required={field.field_required == "1"}
                          // variant="outlined"
                          maxDate={new Date()}
                        />
                      )}
                      {field?.field_type === "select" &&
                        field?.field_name === "gender" && (
                          <FormikInputForm
                            formik={props}
                            label={showLabel(field, translate)}
                            placeholder={showPlaceholder(field, translate)}
                            name={field?.field_name}
                            type={"gender"}
                            required={field.field_required == "1"}
                            // variant="outlined"
                          />
                        )}
                      {field?.field_type === "select" &&
                        field?.field_name !== "gender" && (
                          <FormikInputForm
                            formik={props}
                            label={showLabel(field, translate)}
                            placeholder={showLabel(field, translate)}
                            name={field?.field_name}
                            type={"select"}
                            // data={field.field_options}
                            data={field?.field_options?.map((option) => ({
                              value: option?.value,
                              label:
                                translate?.[
                                  toSnakeCase(
                                    option?.label?.trim()?.toLowerCase()
                                  )
                                ] ?? option?.label,
                            }))}
                            required={field.field_required == "1"}
                          />
                        )}
                      {field?.field_type === "textarea" && (
                        <FormikInputForm
                          formik={props}
                          label={showLabel(field, translate)}
                          placeholder={showPlaceholder(field, translate)}
                          name={field?.field_name}
                          description={true}
                          required={field.field_required == "1"}
                          // variant="outlined"
                        />
                      )}
                      {field?.field_type === "text" && (
                        <FormikInputForm
                          formik={props}
                          label={showLabel(field, translate)}
                          placeholder={showLabel(field, translate)}
                          name={field?.field_name}
                          required={field.field_required == "1"}
                          // variant="outlined"
                        />
                      )}
                      {field?.field_type === "number" && (
                        <FormikInputForm
                          formik={props}
                          label={showLabel(field, translate)}
                          placeholder={showPlaceholder(field, translate)}
                          name={field?.field_name}
                          keyboard={"number-pad"}
                          // variant="outlined"
                          type={"number"}
                          required={field.field_required == "1"}
                        />
                      )}
                      {field?.field_type === "phone" && (
                        <FormikInputForm
                          formik={props}
                          label={showLabel(field, translate)}
                          placeholder={showPlaceholder(field, translate)}
                          name={field?.field_name}
                          keyboard={"number-pad"}
                          // variant="outlined"
                          type={"phoneSelect"}
                          required={field.field_required == "1"}
                        />
                      )}
                      {/* ooo */}
                      {props.values["profession"] === "Others" && (
                        <>
                          {field?.children?.map((child, childIndex) => (
                            <>
                              {child?.field_type === "text" && (
                                <>
                                  <FormikInputForm
                                    formik={props}
                                    label={showLabel(child, translate)}
                                    placeholder={showPlaceholder(
                                      child,
                                      translate
                                    )}
                                    name={child?.field_name}
                                    required={child.field_required == "1"}
                                    // variant="outlined"
                                  />
                                </>
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  ))}

                  <MediumButton
                    title={language?.submitButtonText}
                    onPress={() => {
                      props?.handleSubmit();
                    }}
                    isLoading={isLoadingSubmit}
                    stylesButton={{
                      width: rw(90),
                    }}
                  />
                </>
              )}
            </Formik>
          ) : isLoading ? (
            <>
              <SkeletonInputFiled />
              <SkeletonInputFiled />
              <SkeletonInputFiled />
              <SkeletonInputFiled />
              <SkeletonInputFiled />
              <SkeletonInputFiled />
              <SkeletonInputFiled />
            </>
          ) : (
            <DataNotFound mt={rh(25)} />
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: rh(9),
  },
  title: {
    paddingTop: 10,
  },
  smallText: {
    lineHeight: 21,
    fontWeight: "400",
    width: "95%",
  },

  uploadTitle: {
    color: "#676767",
    fontWeight: "800",
    lineHeight: 17,
    marginTop: 10,
  },
});
