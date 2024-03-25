import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useShowErrorMessage from "../../../hooks/useShowErrorMessage";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useGetPurchaseFormQuery } from "../../../redux/features/policy/policyApiSlice";
import { usePurchaseFormSubmitMutation } from "../../../redux/features/purchase/purchaseApiSlice";
import SkeletonInputFiled from "../../Shared/SkeletonInputFiled";
import { Formik } from "formik";
import {
  personalFormValidationSchema,
  travelFormValidationSchema,
} from "../../../utils/FormikFormValidation";
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
import NextButton from "../../Buttons/NextButton";
import { setPurchaseFormInfo } from "../../../redux/features/purchase/purchaseSlice";
import {
  selectTravelInformation,
  setTravelInformation,
} from "../../../redux/features/purchase/NomineeSlice";
//
const readOnlyFields = ["country_of_visit", "departure_date", "return_date"];

const readOnlyPresentAddressFields = [
  "present_country",
  "present_district",
  "present_thana",
];

const readOnlyAddressFields = [
  "permanent_address",
  "permanent_country",
  "permanent_district",
  "permanent_postal_code",
  "permanent_thana",
];

export default function TravelInformationForm({
  premCalculate,
  authUser,
  currentItem,
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
  // state
  // get Purchase Form
  const {
    data: purchaseForm,
    isLoading,
    isSuccess,
  } = useGetPurchaseFormQuery({
    slug: currentItem?.slug,
    type,
    code,
  });

  // set purchase form
  useEffect(() => {
    dispatch(setPurchaseFormInfo(purchaseForm?.data));
  }, [isSuccess]);
  //
  const travelInformation = useSelector(selectTravelInformation);

  // itemsData
  const itemsData = {
    travelInformation: purchaseForm?.data?.Travel_Information || [],
  };

  // travelInfoFormFields
  const travelInfoFormFields = [...(itemsData?.travelInformation || [])];

  // formFields
  let formFields = []
    .concat(travelInfoFormFields?.map((item) => item))
    ?.map((item) => item?.field_name)
    ?.reduce(
      (a, v) => ({
        ...a,
        [v]: travelInformation?.[v] ?? "",
      }),
      {}
    );
  //

  // premCalculate
  if (!travelInformation && premCalculate) {
    formFields.country_of_visit = premCalculate?.request?.country;
    formFields.departure_date = premCalculate?.request?.duration_from;
    formFields.return_date = premCalculate?.request?.duration_to;
  }

  const [createOrder, { isLoading: createOrderIsLoading }] =
    usePurchaseFormSubmitMutation();
  const submitPersonalInformation = async (data) => {
    try {
      const inputData = {
        userId: authUser?.id,
        formType: "travel_information",
        policySlug: currentItem?.slug,
        items: data,
      };

      const formData = new FormData();

      formData.append("formType", inputData?.formType);
      formData.append("userId", inputData?.userId);
      formData.append("policySlug", inputData?.policySlug);
      if (purchasePolicyUid !== undefined) {
        formData.append("purchasePolicyUid", purchasePolicyUid);
      }
      for (let pData of Object.keys(inputData?.items)) {
        formData.append(`${pData}`, inputData?.items[pData]);
      }
      // return;
      //
      const response = await createOrder(formData).unwrap();
      toast(response?.message);

      // set data
      dispatch(setTravelInformation(inputData?.items));

      // navigation
      navigation.navigate("InformationPreview");
    } catch (error) {
      toast(error?.message, "error");
      console.log(error, "Error");
    }
  };
  //

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
              validationSchema={travelFormValidationSchema(
                formFields,
                travelInfoFormFields,
                errorMessage,
                translate,
                authUser
              )}
              onSubmit={submitPersonalInformation}
            >
              {(props) => (
                <>
                  {itemsData && Object.keys(itemsData)?.length > 0 ? (
                    <>
                      {Object.keys(itemsData)?.map((item, index) => {
                        //
                        return (
                          itemsData &&
                          itemsData[item]?.length > 0 &&
                          itemsData[item] && (
                            <>
                              <AccordionItem
                                title={language?.travelInfoTitle}
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
                                          ) !== -1
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
                                            ) !== -1
                                              ? true
                                              : false
                                          }
                                        />
                                      )}
                                    {field?.field_type === "select" &&
                                      field?.field_name !== "gender" && (
                                        <>
                                          <FormikInputForm
                                            formik={props}
                                            type="hidden"
                                            name={"country_name"}
                                            value={
                                              field?.field_type === "select" &&
                                              field?.field_name ===
                                                "country_of_visit"
                                                ? field?.field_options?.find(
                                                    (country) =>
                                                      country?.value ===
                                                      props?.values
                                                        ?.country_of_visit
                                                  )?.label
                                                : ""
                                            }
                                          />
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
                                            required={
                                              field.field_required == "1"
                                            }
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
                                        {/* present_address */}
                                        {field?.field_name ===
                                          "present_address" && (
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
                                                  "presentAddressPlaceholder"
                                                ]
                                              }
                                            </Text>
                                          </View>
                                        )}
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
                                          // variant="outlined"
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
                                    {field?.field_type === "email" && (
                                      <FormikInputForm
                                        formik={props}
                                        label={showLabel(field, translate)}
                                        placeholder={showPlaceholder(
                                          field,
                                          translate
                                        )}
                                        name={field?.field_name}
                                        // keyboard={"number-pad"}
                                        // variant="outlined"
                                        // type={"number"}
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
                                  </View>
                                ))}
                              </AccordionItem>
                              {/* next  */}
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
                      })}
                      {/*  */}
                    </>
                  ) : (
                    <DataNotFound mt={rh(25)} />
                  )}
                </>
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
