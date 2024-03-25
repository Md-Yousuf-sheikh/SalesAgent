import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StatusBar, StyleSheet } from "react-native";

import PremiumAmountModal from "./PremiumAmountModal";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { COLOR, CONTAINER, rf, rh, rw } from "../../../theme/Theme";
import MediumButton from "../../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DemoTextInput from "../../../components/Inputs/DemoTextInput";
import { useGetPurchaseFormQuery } from "../../../redux/features/policy/policyApiSlice";
import { useCalculatePremiumMutation } from "../../../redux/features/premiumCal/premiumCalApiSlice";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";
import { showLabel, showPlaceholder } from "../../../utils/showLabel";
import DataNotFound from "../../../components/Shared/DataNotFound";
import { FormikInputForm } from "../../../components/Form/FormikInputForm";
import SkeletonInputFiled from "../../../components/Shared/SkeletonInputFiled";
import Text from "../../../components/Text/Text";
import useShowErrorMessage from "../../../hooks/useShowErrorMessage";
import CompareModal from "../HomeScreen/CompareModal";
import { toSnakeCase } from "../../../utils";
import { calculatorFormValidationSchema } from "../../../utils/FormikFormValidation";
import { addCalBuyItem } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import useShowToastMessage from "../../../hooks/useShowToastMessage";

export default function PremiumCalculator({ route }) {
  const dispatch = useDispatch();
  const item = route?.params?.item ? route?.params?.item : null;
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const errorMessage = useShowErrorMessage();
  const toast = useShowToastMessage();
  const buyItem = item?.item;
  const { slug } = buyItem;
  let type = 4;

  const { isLoading, data } = useGetPurchaseFormQuery({ slug, type, code });
  const premium_calculators = data?.data?.[""];
  //
  const maxDateOnlyFields = ["dob"];
  const minDateOnlyFields = ["duration_to", "duration_from"];
  const readOnlyFields = [""];
  const redOnlyValue = {
    dob: "",
  };

  //
  let formFields =
    premium_calculators &&
    []
      .concat(premium_calculators?.map((item) => item))
      ?.map((item) => item?.field_name)
      ?.reduce(
        (a, v) => ({
          ...a,
          [v]: redOnlyValue[v] ?? "",
        }),
        {}
      );
  // open modal
  const [Modal, setModal] = useState(false);
  const [premiumVal, setPremiumVal] = useState("0");
  const [compareModal, setCompareModal] = useState(false);
  //
  const [calculatePremium, { isLoading: calPremLoading }] =
    useCalculatePremiumMutation();

  // handelSubmit
  const handelCalculatePremium = async (items) => {
    try {
      const formData = {
        ...items,
        slug: slug,
      };
      const res = await calculatePremium(formData).unwrap();
      console.log("res", res);
      setPremiumVal(res?.data);
      dispatch(addCalBuyItem(res?.data));
      setModal(true);
    } catch (error) {
      // console.log("error->>", error?.data?.message);
      toast(error?.data?.message, "error");
    }
  };
  //
  // console.log("premium_calculators", premium_calculators);
  return (
    <>
      <CompareModal modal={compareModal} setModal={setCompareModal} />
      <PremiumAmountModal
        setModal={setModal}
        modal={Modal}
        compareModal={compareModal}
        setCompareModal={setCompareModal}
        item={buyItem ?? ""}
        premiumVal={premiumVal}
      />
      <StatusBar backgroundColor={"#2253a5"} barStyle={"light-content"} />
      <DrawerHeader title={language?.premiumCalHeader} />
      <KeyboardAwareScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={CONTAINER}
        contentContainerStyle={{
          paddingHorizontal: rw(4),
          paddingBottom: rh(10),
          paddingTop: 10,
        }}
      >
        <Text preset="LM" color={"#2253A5"} style={styles.title}>
          {buyItem?.category?.title}
        </Text>
        <Text preset="h5">{buyItem?.name}</Text>
        <Text preset="h5" color={"#595959"} style={styles.smallText}>
          {language.premiumCalDetailText}
        </Text>
        {/* filed lode... */}
        {premium_calculators?.length > 0 ? (
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
            <>
              {/* demo filed */}
              {/* <DemoTextInput
                label={language?.policyCategory}
                value={buyItem?.category?.title}
              />
              <DemoTextInput
                label={language?.policyName}
                value={buyItem?.name}
              /> */}

              {/* formik */}
              <Formik
                initialValues={formFields}
                validationSchema={calculatorFormValidationSchema(
                  {
                    ...formFields,
                  },
                  premium_calculators,
                  errorMessage,
                  translate
                )}
                onSubmit={(value) => {
                  handelCalculatePremium(value);
                }}
              >
                {(props) => (
                  <ScrollView>
                    {premium_calculators?.map((field, index) => (
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
                            maxDate={
                              maxDateOnlyFields?.includes(field?.field_name)
                                ? new Date()
                                : null
                            }
                            // minDateOnlyFields
                            minDate={
                              minDateOnlyFields?.includes(field?.field_name)
                                ? new Date()
                                : null
                            }
                            isDisabled={
                              readOnlyFields?.indexOf(field?.field_name) !== -1
                                ? true
                                : false
                            }
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
                              placeholder={showPlaceholder(field, translate)}
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
                      </>
                    ))}

                    <MediumButton
                      title={language?.calculateButtonText}
                      onPress={() => {
                        props?.handleSubmit();
                      }}
                      loader={calPremLoading}
                      stylesButton={{
                        width: rw(90),
                        marginTop: rh(5),
                      }}
                    />
                  </ScrollView>
                )}
              </Formik>
            </>
          )
        ) : (
          !isLoading && <DataNotFound mt={rh(25)} />
        )}
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 5,
  },
  subTitle: {
    paddingVertical: 5,
  },
});
