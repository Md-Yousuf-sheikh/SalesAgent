import { StatusBar, StyleSheet, View, Image } from "react-native";
import React from "react";
import { COLOR, CONTAINER, rw, rf, rh, RSC } from "../../theme/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import DrawerHeader from "../../components/Headers/DrawerHeader";
import { useSelector } from "react-redux";
import {
  useGetFormByCategoryQuery,
  useSubmitCategoryFormMutation,
} from "../../redux/features/policy/policyApiSlice";
import MediumButton from "../../components/Buttons/MediumButton";
import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { showLabel, showPlaceholder } from "../../utils/showLabel";
import { FormikInputForm } from "../../components/Form/FormikInputForm";
import DataNotFound from "../../components/Shared/DataNotFound";
import * as Yup from "yup";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../redux/features/language/languageSlice";
import SkeletonInputFiled from "../../components/Shared/SkeletonInputFiled";
import { toSnakeCase } from "../../utils";
import SwitchButton from "../../components/Buttons/SwitchButton";
import { EMAIL_REGEX, PHONE_REGEX } from "../../utils/Regex";
import useShowErrorMessage from "../../hooks/useShowErrorMessage";

const readOnlyFields = ["name", "email", "phone"];

export default function CategoryPurchase({ route }) {
  const navigation = useNavigation();
  const errorMessage = useShowErrorMessage();
  const code = useSelector(codeSelector);
  const language = useSelector(languageSelector);
  const translate = useSelector(translateSelector);

  const { data, isLoading } = useGetFormByCategoryQuery([code]);
  const fromDataArray = data?.Other_Policy_Categories ?? [];
  //  api call
  const [categoriesForm, { isLoading: formSubmitLoading }] =
    useSubmitCategoryFormMutation();
  //
  // const user_data = {};
  // all name
  let formFields = []
    .concat(
      ...Object.keys(fromDataArray || [])?.map((item) => fromDataArray?.[item])
    )
    ?.map((item) => item?.field_name)
    ?.reduce(
      (a, v) => ({
        ...a,
        [v]: "",
      }),
      {}
    );

  // formFields.name = user_data?.data?.full_name;
  // formFields.email = user_data?.data?.email;
  // formFields.phone = user_data?.data?.contact_number;
  formFields.policy_for = "Individual";
  // const redOnlyUserValue = {
  //   email: user_data?.data?.email,
  //   name: user_data?.data?.full_name,
  //   phone: user_data?.data?.contact_number,
  // };

  //
  //    handel submit
  const handleSubmitForm = async (data) => {
    const formData = new FormData();
    formData.append(`categorySlug`, route?.params?.item?.slug);
    for (let pData of Object.keys(data)) {
      formData.append(`${pData}`, data[pData]);
    }
    //
    try {
      const res = await categoriesForm(formData).unwrap();
      console.log("res", res);
      Toast.show(res?.message, {
        duration: 500,
        backgroundColor: "rgba(51, 105, 179, 1)",
        shadow: true,
        position: rh(80),
        textColor: COLOR.white,
        opacity: 2,
        animation: true,
      });
      navigation.goBack();
    } catch (error) {
      Toast.show(error?.data?.message, {
        duration: 500,
        backgroundColor: "rgba(51, 105, 179, 1)",
        shadow: true,
        position: rh(80),
        textColor: COLOR.white,
        opacity: 2,
        animation: true,
      });
    }
  };

  return (
    <>
      {/* Modal */}
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={route?.params?.item?.title} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
      >
        <View style={styles.container}>
          {/*  */}
          {fromDataArray?.length > 0 ? (
            isLoading ? (
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
              <Formik
                initialValues={{
                  ...formFields,
                  designation: "",
                  name: "",
                  organization_name: "",
                  policy_for: "Individual",
                }}
                validationSchema={Yup.object().shape({
                  description: Yup.string(),
                  policy_for: Yup.string()
                    .max(255)
                    .required(
                      errorMessage(
                        "Policy For field is required",
                        "বীমার ধরণ সিলেক্ট করুন"
                      )
                    ),
                  name: Yup.string()
                    .max(255)
                    .required(
                      errorMessage(
                        "Full Name field is required",
                        "পুরো নাম লিখুন"
                      )
                    ),
                  organization_name: Yup.string()
                    .when("policy_for", (policy_for, schema) => {
                      if (policy_for && policy_for[0] === "Organization") {
                        return Yup.string().required(
                          errorMessage(
                            `Organization name field is required`,
                            `প্রতিষ্ঠানের নাম লিখুন`
                          )
                        );
                      }
                    })
                    .max(255),
                  designation: Yup.string()
                    .when("policy_for", (policy_for, schema) => {
                      if (policy_for && policy_for[0] === "Organization") {
                        return Yup.string().required(
                          errorMessage(
                            `Designation field is required`,
                            `পদবী নাম লিখুন`
                          )
                        );
                      }
                    })
                    .max(255),

                  email: Yup.string()
                    .email(
                      errorMessage(
                        "Must be a valid email",
                        "সঠিক ইমেইল হতে হবে"
                      )
                    )
                    .matches(
                      EMAIL_REGEX,
                      errorMessage(
                        "Must be a valid email",
                        "সঠিক ইমেইল হতে হবে"
                      )
                    )
                    .max(255)
                    .required(
                      errorMessage("Email is required", "ই-মেইল এড্রেস লিখুন")
                    ),
                  phone: Yup.string()
                    .max(
                      13,
                      errorMessage(
                        "Mobile Number must be at most 13 characters",
                        "মোবাইল নম্বরটি অবশ্যই সর্বাধিক ১৩টি অক্ষরের হতে হবে"
                      )
                    )
                    .matches(
                      PHONE_REGEX,
                      errorMessage("Invalid mobile number", "ভুল মোবাইল নম্বর")
                    )
                    .required(
                      errorMessage(
                        "Mobile number field is required",
                        "মোবাইল নম্বর লিখুন"
                      )
                    ),
                })}
                onSubmit={(values) => {
                  handleSubmitForm(values);
                }}
              >
                {(props) => (
                  <>
                    <SwitchButton
                      titleActColor={"#ffffff"}
                      titleColor={"#595959"}
                      title1={
                        translate?.[
                          toSnakeCase("Individual"?.trim()?.toLowerCase())
                        ] ?? "Individual"
                      }
                      title2={
                        translate?.[
                          toSnakeCase("Organization"?.trim()?.toLowerCase())
                        ] ?? "Organization"
                      }
                      bg={"#E5EAFF"}
                      bgA1={"#0089ED"}
                      bgA2={"#0089ED"}
                      onPress={(val) => {
                        if (val) {
                          props.setFieldValue("policy_for", "Organization");
                        } else {
                          // formFields.policy_for = "Individual";
                          props.setFieldValue("policy_for", "Individual");
                        }
                      }}
                    />
                    {/* {console.log("props", props?.errors)} */}
                    {fromDataArray?.map((field, index) => (
                      <>
                        {console.log("field-->", field.field_name)}
                        {field?.field_type === "date" && (
                          <FormikInputForm
                            formik={props}
                            label={showLabel(field, translate)}
                            placeholder={showPlaceholder(field, translate)}
                            name={field?.field_name}
                            type={"date"}
                            required={field.field_required == "1"}
                            // variant="outlined"
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
                          field?.field_name !== "gender" &&
                          field?.field_name !== "policy_for" && (
                            <FormikInputForm
                              formik={props}
                              label={showLabel(field, translate)}
                              placeholder={showPlaceholder(field, translate)}
                              name={field?.field_name}
                              type={"select"}
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
                              // variant="outlined"
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
                            placeholder={showPlaceholder(field, translate)}
                            name={field?.field_name}
                            required={field.field_required == "1"}
                            // variant="outlined"
                            // isDisabled={
                            //   readOnlyFields?.indexOf(field?.field_name) !==
                            //     -1 && redOnlyUserValue[field?.field_name]
                            //     ? true
                            //     : false
                            // }
                          />
                        )}
                        {field?.field_type === "phone" && (
                          <FormikInputForm
                            formik={props}
                            label={showLabel(field, translate)}
                            placeholder={showPlaceholder(field, translate)}
                            name={field?.field_name}
                            keyboard={"number-pad"}
                            type={"phoneSelect"}
                            required={field.field_required == "1"}
                            // variant="outlined"
                            // isDisabled={
                            //   readOnlyFields?.indexOf(field?.field_name) !==
                            //     -1 && redOnlyUserValue[field?.field_name]
                            //     ? true
                            //     : false
                            // }
                          />
                        )}
                        {props?.values[field?.field_name] === "Organization" &&
                          field?.children &&
                          field?.children?.length > 0 && (
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
                        console.log("click buttonnn");
                      }}
                      isLoading={formSubmitLoading}
                      stylesButton={{
                        width: rw(90),
                      }}
                    />
                  </>
                )}
              </Formik>
            )
          ) : (
            <DataNotFound mt={rh(25)} />
          )}
          {/*  */}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(4),
    paddingBottom: rh(7),
    paddingTop: 10,
  },
});
