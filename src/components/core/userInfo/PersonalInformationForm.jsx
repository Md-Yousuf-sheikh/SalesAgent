import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { personalFormValidationSchema } from "../../../utils/FormikFormValidation";
import AccordionItem from "../../According/AccordionItem";
import { FormikInputForm } from "../../Form/FormikInputForm";
import { showLabel, showPlaceholder } from "../../../utils/showLabel";
import { snakeToCamel, toSnakeCase } from "../../../utils";
import DataNotFound from "../../Shared/DataNotFound";
import NextButton from "../../Buttons/NextButton";
import { setPurchaseFormInfo } from "../../../redux/features/purchase/purchaseSlice";
import {
  selectPersonalInformation,
  setPersonalInformation,
} from "../../../redux/features/purchase/NomineeSlice";

import { addPurchasePolicyUid } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";

//
const readOnlyFields = [
  "full_name",
  "email",
  "gender",
  "dob",
  "contact_number",
  "fathers_name",
  "mothers_name",
  "place_of_birth",
  "premium_mode",
  "with_term",
  "face_amount",
];

const readOnlyPresentAddressFields = [
  "present_country",
  "present_district",
  "present_thana",
  "permanent_thana",
  "permanent_country",
  "permanent_district",
];

const readOnlyAddressFields = [
  "permanent_address",
  "permanent_country",
  "permanent_district",
  "permanent_postal_code",
  "permanent_thana",
];
const maxDateOnlyFields = ["dob"];

export default function PersonalInformationForm({
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
  // api
  const { data: campaignPolicy } = useGetCampaignPolicyQuery();
  //
  const personalInformation = useSelector(selectPersonalInformation);
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

  // itemsData
  const itemsData = {
    personal_info: purchaseForm?.data?.Personal_Information || [],
    details_of_life_insurance:
      purchaseForm?.data?.Details_of_Life_Insurance || [],
    existing_life_insurance: purchaseForm?.data?.Existing_Life_Insurance || [],
    family_record: purchaseForm?.data?.Family_Record || [],
    health_statement: purchaseForm?.data?.Health_Statement || [],
  };

  // personalInfoFormFields
  const personalInfoFormFields = [
    ...(itemsData?.personal_info || []),
    ...(itemsData?.details_of_life_insurance || []),
    ...(itemsData?.existing_life_insurance || []),
    ...(itemsData?.family_record || []),
    ...(itemsData?.health_statement || []),
  ];
  const userDataAutoFile = {
    ...authUser,
    ...personalInformation,
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
  //

  const [createOrder, { isLoading: createOrderIsLoading }] =
    usePurchaseFormSubmitMutation();
  //
  const submitPersonalInformation = async (data) => {
    try {
      const inputData = {
        userId: authUser?.id,
        formType: "personal_information",
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
      if (currentItem?.category?.id?.toString() !== "1" && premCalculate) {
        formData.append("calculator", JSON.stringify(premCalculate));
      }

      for (let pData of Object.keys(inputData?.items)) {
        formData.append(`${pData}`, inputData?.items[pData]);
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
      // return;
      //
      const response = await createOrder(formData).unwrap();
      toast(response?.message);
      // console.log("response", response);
      // set data
      dispatch(setPersonalInformation(inputData?.items));

      // set personal information
      dispatch(addPurchasePolicyUid(response?.purchasePolicyUid));
      // setCredentials;
      // navigation
      navigation.navigate("NomineeInformation");
    } catch (error) {
      toast(error?.message, "error");
      console.log(error, "Error");
    }
  };
  //

  return (
    <View>
      <>
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
              initialValues={{ ...formFields }}
              validationSchema={personalFormValidationSchema(
                {
                  ...formFields,
                },
                personalInfoFormFields,
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
                                title={
                                  index?.toString() === "0"
                                    ? language?.personalInfoTitle
                                    : translate
                                    ? translate[snakeToCamel?.(item)]
                                    : item
                                }
                                key={index}
                                onChange={authUser}
                              >
                                {/* Assuming item is an array */}
                                {itemsData[item]?.map((field, fieldIndex) => (
                                  <View key={fieldIndex}>
                                    {field?.field_type === "hidden" && (
                                      <FormikInputForm
                                        formik={props}
                                        name={field?.field_name}
                                        type={"hidden"}
                                        value={field?.field_value}
                                      />
                                    )}
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
                                        maxDate={
                                          maxDateOnlyFields?.includes(
                                            field?.field_name
                                          )
                                            ? new Date()
                                            : null
                                        }
                                        isDisabled={
                                          readOnlyFields?.indexOf(
                                            field?.field_name
                                          ) !== -1 &&
                                          authUser[field?.field_name]
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
                                            authUser[field?.field_name]
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
                                              (readOnlyFields?.indexOf(
                                                field?.field_name
                                              ) !== -1 &&
                                                authUser[field?.field_name]) ||
                                              (props.values
                                                ?.same_as_present_address &&
                                                readOnlyAddressFields?.indexOf(
                                                  field?.field_name
                                                ) !== -1)
                                                ? true
                                                : false
                                            }
                                          />
                                          {field?.field_name === "profession" &&
                                            props?.values[field?.field_name]
                                              ?.toString()
                                              ?.toLowerCase() === "others" &&
                                            field?.children?.map(
                                              (child, childIndex) => (
                                                <>
                                                  <FormikInputForm
                                                    formik={props}
                                                    name={child?.field_name}
                                                    label={showLabel(
                                                      child,
                                                      translate
                                                    )}
                                                    placeholder={
                                                      child?.field_placeholder
                                                    }
                                                    required={
                                                      field?.field_name ===
                                                        "profession" &&
                                                      props?.values[
                                                        field?.field_name
                                                      ]
                                                        ?.toString()
                                                        ?.toLowerCase() ===
                                                        "others" &&
                                                      child?.field_required > 0
                                                    }
                                                    // isDisabled={false}
                                                    value={
                                                      props?.values[
                                                        child?.field_name
                                                      ]
                                                    }
                                                  />
                                                </>
                                              )
                                            )}
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
                                          ) !== -1 &&
                                          authUser[field?.field_name]
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
                                            (readOnlyFields?.indexOf(
                                              field?.field_name
                                            ) !== -1 &&
                                              authUser[field?.field_name]) ||
                                            (props.values
                                              ?.same_as_present_address &&
                                              readOnlyAddressFields?.indexOf(
                                                field?.field_name
                                              ) !== -1) ||
                                            (readOnlyPresentAddressFields?.indexOf(
                                              field?.field_name
                                            ) !== -1 &&
                                              props?.values[
                                                field?.field_name
                                              ] &&
                                              props?.values[
                                                "present_postal_code"
                                              ])
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
                                          ) !== -1 &&
                                          authUser[field?.field_name]
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
                                          ) !== -1 &&
                                          authUser[field?.field_name]
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
                                          ) !== -1 &&
                                          authUser[field?.field_name]
                                            ? true
                                            : false
                                        }
                                      />
                                    )}
                                    {/* checkbox */}
                                    {field?.field_type === "file" && (
                                      <>
                                        {props?.values["identity_type"] ===
                                        "Birth Certificate" ? (
                                          field?.field_name ===
                                            "attachment_front" && (
                                            <FormikInputForm
                                              formik={props}
                                              label={showLabel(
                                                field,
                                                translate
                                              )}
                                              placeholder={showPlaceholder(
                                                field,
                                                translate
                                              )}
                                              name={field?.field_name}
                                              // variant="outlined"
                                              type={"file"}
                                              required={
                                                field.field_required == "1"
                                              }
                                              isDisabled={
                                                props?.values[field?.field_name]
                                                  ? true
                                                  : false
                                              }
                                            />
                                          )
                                        ) : (
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
                                            required={
                                              field.field_required == "1"
                                            }
                                            isDisabled={
                                              (field?.field_name ===
                                                "attachment_front" ||
                                                field?.field_name ===
                                                  "attachment_back") &&
                                              props?.values[field?.field_name]
                                                ? true
                                                : false
                                            }
                                          />
                                        )}
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
                              {/* next  */}
                            </>
                          )
                        );
                      })}
                      {/*  */}
                      <NextButton
                        title={language?.nextButtonText}
                        onPress={() => {
                          props?.handleSubmit();
                        }}
                        isLoading={createOrderIsLoading}
                      />
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
