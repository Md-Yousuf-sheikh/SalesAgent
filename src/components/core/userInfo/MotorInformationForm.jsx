import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useShowErrorMessage from "../../../hooks/useShowErrorMessage";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useGetPurchaseFormQuery } from "../../../redux/features/policy/policyApiSlice";
import {
  useGetCampaignPolicyQuery,
  usePurchaseFormSubmitMutation,
} from "../../../redux/features/purchase/purchaseApiSlice";
import SkeletonInputFiled from "../../Shared/SkeletonInputFiled";
import { Formik } from "formik";
import { motorFormValidationSchema } from "../../../utils/FormikFormValidation";
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
import { addPurchasePolicyUid } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import NextButton from "../../Buttons/NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  selectMotorInfoData,
  setMotorInformation,
} from "../../../redux/features/purchase/NomineeSlice";

//
const readOnlyFields = [
  "vehicle_type",
  "vehicle_category",
  "category_value",
  "price",
];

export default function MotorInformationForm({
  premCalculate,
  currentItem,
  authUser,
  purchasePolicyUid,
}) {
  const errorMessage = useShowErrorMessage();
  const toast = useShowToastMessage();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const type = 2;
  // API
  const { data: campaignPolicy } = useGetCampaignPolicyQuery();

  // get Purchase Form
  const { data: purchaseForm, isLoading } = useGetPurchaseFormQuery({
    slug: currentItem?.slug,
    type,
    code,
  });
  const motorInformation = useSelector(selectMotorInfoData);

  // itemsData
  const itemsData = {
    motor_Info: purchaseForm?.data?.[""] || [],
  };

  // personalInfoFormFields
  const personalInfoFormFields = [...(itemsData?.motor_Info || [])];
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
        [v]: userDataAutoFile?.[v] ?? "",
      }),
      {}
    );

  // premCalculate
  if (premCalculate) {
    formFields.vehicle_type = premCalculate?.request?.type;
    formFields.vehicle_category = premCalculate?.request?.category;
    formFields.category_value = premCalculate?.request?.category_value;
    formFields.price = premCalculate?.request?.price;
  }

  const [createOrder, { isLoading: createOrderIsLoading }] =
    usePurchaseFormSubmitMutation();
  const submitMotorInformation = async (data) => {
    // "motor_information"
    try {
      const inputData = {
        userId: authUser?.id,
        formType: "motor_information",
        policySlug: currentItem?.slug,
        items: data,
      };

      const formData = new FormData();

      formData.append("formType", inputData?.formType);
      formData.append("userId", inputData?.userId);
      formData.append("policySlug", inputData?.policySlug);
      if (purchasePolicyUid) {
        formData.append("purchasePolicyUid", purchasePolicyUid);
      }
      if (premCalculate) {
        formData.append("calculator", JSON.stringify(premCalculate));
      }
      for (let pData of Object.keys(inputData?.items)) {
        if (pData !== "attachment_front" && pData !== "attachment_back") {
          formData.append(`${pData}`, inputData?.items[pData]);
        }
      }

      // campaignPolicy
      if (campaignPolicy?.campaigns) {
        for (let itemm of campaignPolicy?.campaigns) {
          for (let policy of itemm?.policy) {
            if (policy?.id == currentItem?.id) {
              formData.append("campaign_id", itemm?.id);
              break;
            }
          }
        }
      }
      // console.log("formData", formData);
      // return;
      const response = await createOrder(formData).unwrap();
      toast(response?.message);

      // set data
      dispatch(setMotorInformation(inputData?.items));
      dispatch(addPurchasePolicyUid(response?.purchasePolicyUid));

      //
      try {
        if (inputData) {
          await AsyncStorage.setItem(
            "motorInformation",
            JSON.stringify(inputData)
          );
        }
        //
      } catch (error) {}
      navigation?.navigate("InformationPreview");
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
              validationSchema={motorFormValidationSchema(
                formFields,
                personalInfoFormFields,
                errorMessage,
                translate,
                authUser
              )}
              onSubmit={submitMotorInformation}
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
                          <>
                            <AccordionItem
                              title={
                                language ? language[snakeToCamel(item)] : item
                              }
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
                                        ) !== -1 &&
                                        premCalculate?.[field?.field_name]
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
                                          ) !== -1 &&
                                          premCalculate?.[field?.field_name]
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
                                      {/*  */}
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
                                          ) !== -1 &&
                                          authUser[field?.field_name]
                                            ? true
                                            : false
                                        }
                                      />
                                    </>
                                  )}
                                  {field?.field_type === "checkbox" && (
                                    <>
                                      <View
                                        style={{
                                          borderBottomWidth: 1,
                                          paddingVertical: 10,
                                          borderColor: "gray",
                                        }}
                                      >
                                        <Text preset="h3" fw={800}>
                                          {
                                            language?.[
                                              "permanentAddressPlaceholder"
                                            ]
                                          }
                                        </Text>
                                      </View>
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
                                          ) !== -1 &&
                                          authUser[field?.field_name]
                                            ? true
                                            : false
                                        }
                                      />
                                    </>
                                  )}
                                </View>
                              ))}
                            </AccordionItem>
                            <NextButton
                              title={language?.nextButtonText}
                              onPress={() => {
                                props?.handleSubmit();
                              }}
                              isLoading={createOrderIsLoading}
                            />
                          </>
                        )
                      );
                    })
                  ) : (
                    <DataNotFound mt={rh(25)} />
                  )}
                </ScrollView>
              )}
            </Formik>
          </>
        )}
      </>
    </View>
  );
}
