import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useShowErrorMessage from "../../../hooks/useShowErrorMessage";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useGetPurchaseFormQuery } from "../../../redux/features/policy/policyApiSlice";
import { usePurchaseFormSubmitMutation } from "../../../redux/features/purchase/purchaseApiSlice";
import SkeletonInputFiled from "../../Shared/SkeletonInputFiled";
import { Formik } from "formik";
import { deviceFormValidationSchema } from "../../../utils/FormikFormValidation";
import AccordionItem from "../../According/AccordionItem";
import { FormikInputForm } from "../../Form/FormikInputForm";
import { showLabel, showPlaceholder } from "../../../utils/showLabel";
import { snakeToCamel, toSnakeCase } from "../../../utils";
import DataNotFound from "../../Shared/DataNotFound";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";
import {
  selectDeviceInformation,
  setDeviceInformation,
} from "../../../redux/features/purchase/NomineeSlice";
import NextButton from "../../Buttons/NextButton";

//
const readOnlyFields = ["purchase_date"];
const maxDateOnlyFields = ["dob", "purchase_date"];
const minDateOnlyFields = ["duration_to", "duration_from"];

export default function DeviceInformationForm({
  premCalculate,
  currentItem,
  authUser,
  pendingPolicy,
  purchasePolicyUid,
}) {
  const errorMessage = useShowErrorMessage();
  const toast = useShowToastMessage();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  //
  const type = 2;
  // get Purchase Form
  const { data: purchaseForm, isLoading } = useGetPurchaseFormQuery({
    slug: currentItem?.slug,
    type,
    code,
  });
  // itemsData
  const itemsData = {
    deviceInformation: purchaseForm?.data?.Device_Information || [],
  };
  //
  const deviceInformation = useSelector(selectDeviceInformation);

  // personalInfoFormFields
  const personalInfoFormFields = [...(itemsData?.deviceInformation || [])];
  const userDataAutoFile = {
    ...authUser,
  };

  // formFields
  let formFields = []
    .concat(personalInfoFormFields?.map((item) => item))
    ?.map((item) => item?.field_name)
    ?.reduce(
      (a, v) => ({
        ...a,
        [v]: deviceInformation ? deviceInformation?.[v] : "",
      }),
      {}
    );
  //

  const [createOrder, { isLoading: createOrderIsLoading }] =
    usePurchaseFormSubmitMutation();
  const submitDeviceInformation = async (data) => {
    try {
      const inputData = {
        userId: authUser?.id,
        formType: "device_information",
        policySlug: currentItem?.slug,
        items: data,
      };

      const formData = new FormData();

      formData.append("formType", inputData?.formType);
      formData.append("userId", inputData?.userId);
      formData.append("policySlug", inputData?.policySlug);
      if (premCalculate) {
        formData.append("calculator", JSON.stringify(premCalculate));
      }
      if (purchasePolicyUid !== undefined) {
        formData.append("purchasePolicyUid", purchasePolicyUid);
      }
      for (let pData of Object.keys(inputData?.items)) {
        formData.append(`${pData}`, inputData?.items[pData]);
      }
      //
      const response = await createOrder(formData).unwrap();
      toast(response?.message);

      //  set data
      dispatch(setDeviceInformation(inputData?.items));

      // navigation
      navigation.navigate("InformationPreview");
    } catch (error) {
      toast(error?.message, "error");
      console.log(error, "Error");
    }
  };

  return (
    <View>
      <>
        {/* filed lode... */}

        {isLoading ? (
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
            <Formik
              enableReinitialize={true}
              initialValues={formFields}
              validationSchema={deviceFormValidationSchema(
                formFields,
                personalInfoFormFields,
                errorMessage,
                translate,
                authUser
              )}
              onSubmit={submitDeviceInformation}
            >
              {(props) => (
                <ScrollView>
                  {itemsData && Object.keys(itemsData)?.length > 0 ? (
                    Object.keys(itemsData)?.map((item, index) => {
                      //
                      return (
                        itemsData &&
                        itemsData[item]?.length > 0 &&
                        itemsData[item] && (
                          <AccordionItem
                            title={language?.deviceInfoTitle}
                            key={index}
                          >
                            {/* Assuming item is an array */}
                            {itemsData[item]?.map((field, fieldIndex) => (
                              <View key={fieldIndex}>
                                {field?.field_type === "date" && (
                                  <FormikInputForm
                                    formik={props}
                                    label={showLabel(field, translate)}
                                    placeholder={showPlaceholder(
                                      field,
                                      translate
                                    )}
                                    name={field?.field_name}
                                    type={"date"}
                                    required={field.field_required == "1"}
                                    isDisabled={
                                      readOnlyFields?.indexOf(
                                        field?.field_name
                                      ) !== -1 && authUser[field?.field_name]
                                        ? true
                                        : false
                                    }
                                    maxDate={
                                      maxDateOnlyFields?.includes(
                                        field?.field_name
                                      )
                                        ? new Date()
                                        : null
                                    }
                                    minDate={
                                      field?.field_name === "purchase_date"
                                        ? new Date(
                                            new Date().setDate(
                                              new Date().getDate() - 2
                                            )
                                          )
                                        : null
                                    }
                                  />
                                )}
                                {field?.field_type === "select" &&
                                  field?.field_name === "gender" && (
                                    <FormikInputForm
                                      formik={props}
                                      label={showLabel(field, translate)}
                                      placeholder={showPlaceholder(
                                        field,
                                        translate
                                      )}
                                      name={field?.field_name}
                                      type={"gender"}
                                      required={field.field_required == "1"}
                                      // variant="outlined"
                                      isDisabled={
                                        readOnlyFields?.indexOf(
                                          field?.field_name
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                    />
                                  )}
                                {field?.field_type === "select" &&
                                  field?.field_name !== "gender" && (
                                    <FormikInputForm
                                      formik={props}
                                      label={showLabel(field, translate)}
                                      placeholder={showPlaceholder(
                                        field,
                                        translate
                                      )}
                                      name={field?.field_name}
                                      type={"select"}
                                      // data={field.field_options}
                                      data={field?.field_options?.map(
                                        (option) => ({
                                          value: option?.value,
                                          label:
                                            translate?.[
                                              toSnakeCase(
                                                option?.label
                                                  ?.trim()
                                                  ?.toLowerCase()
                                              )
                                            ] ?? option?.label,
                                        })
                                      )}
                                      required={field.field_required == "1"}
                                      // variant="outlined"
                                      isDisabled={
                                        readOnlyFields?.indexOf(
                                          field?.field_name
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                    />
                                  )}
                                {field?.field_type === "textarea" && (
                                  <FormikInputForm
                                    formik={props}
                                    label={showLabel(field, translate)}
                                    placeholder={showPlaceholder(
                                      field,
                                      translate
                                    )}
                                    name={field?.field_name}
                                    description={true}
                                    required={field.field_required == "1"}
                                    // variant="outlined"
                                    isDisabled={
                                      readOnlyFields?.indexOf(
                                        field?.field_name
                                      ) !== -1
                                        ? true
                                        : false
                                    }
                                  />
                                )}
                                {field?.field_type === "text" && (
                                  <>
                                    <FormikInputForm
                                      formik={props}
                                      label={showLabel(field, translate)}
                                      placeholder={showPlaceholder(
                                        field,
                                        translate
                                      )}
                                      name={field?.field_name}
                                      required={field.field_required == "1"}
                                      // variant="outlined"
                                      isDisabled={
                                        readOnlyFields?.indexOf(
                                          field?.field_name
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                    />
                                  </>
                                )}
                                {field?.field_type === "number" && (
                                  <FormikInputForm
                                    formik={props}
                                    label={showLabel(field, translate)}
                                    placeholder={showPlaceholder(
                                      field,
                                      translate
                                    )}
                                    name={field?.field_name}
                                    keyboard={"number-pad"}
                                    // variant="outlined"
                                    type={"number"}
                                    required={field.field_required == "1"}
                                    isDisabled={
                                      readOnlyFields?.indexOf(
                                        field?.field_name
                                      ) !== -1
                                        ? true
                                        : false
                                    }
                                  />
                                )}
                                {field?.field_type === "phone" && (
                                  <FormikInputForm
                                    formik={props}
                                    label={showLabel(field, translate)}
                                    placeholder={showPlaceholder(
                                      field,
                                      translate
                                    )}
                                    name={field?.field_name}
                                    keyboard={"number-pad"}
                                    // variant="outlined"
                                    type={"phoneSelect"}
                                    required={field.field_required == "1"}
                                    isDisabled={
                                      readOnlyFields?.indexOf(
                                        field?.field_name
                                      ) !== -1
                                        ? true
                                        : false
                                    }
                                  />
                                )}
                                {/* checkbox */}
                                {field?.field_type === "file" && (
                                  <>
                                    <FormikInputForm
                                      formik={props}
                                      label={showLabel(field, translate)}
                                      placeholder={showPlaceholder(
                                        field,
                                        translate
                                      )}
                                      name={field?.field_name}
                                      // variant="outlined"
                                      type={"file"}
                                      required={field.field_required == "1"}
                                      isDisabled={
                                        readOnlyFields?.indexOf(
                                          field?.field_name
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                    />
                                  </>
                                )}
                                {field?.field_type === "checkbox" && (
                                  <>
                                    <FormikInputForm
                                      formik={props}
                                      // label={showLabel(field, translate)}
                                      placeholder={showPlaceholder(
                                        field,
                                        translate
                                      )}
                                      name={field?.field_name}
                                      // variant="outlined"
                                      type={"checkbox"}
                                      required={field.field_required == "1"}
                                      isDisabled={
                                        readOnlyFields?.indexOf(
                                          field?.field_name
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                    />
                                  </>
                                )}
                              </View>
                            ))}
                          </AccordionItem>
                        )
                      );
                    })
                  ) : (
                    <DataNotFound mt={rh(25)} />
                  )}

                  <NextButton
                    title={language?.nextButtonText}
                    onPress={() => {
                      props?.handleSubmit();
                    }}
                    isLoading={createOrderIsLoading}
                  />
                </ScrollView>
              )}
            </Formik>
          </>
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    alignSelf: "flex-end",
    width: 100,
  },
});
