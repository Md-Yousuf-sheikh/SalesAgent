import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StatusBar } from "react-native";
import PremiumAmountModal from "./PremiumAmountModal";
import DrawerHeader from "../../../components/Headers/DrawerHeader";
import { CONTAINER, rf, rh, rw } from "../../../theme/Theme";
import MediumButton from "../../../components/Buttons/MediumButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useGetPurchaseFormQuery,
  useGetPoliciesByCategoryQuery,
} from "../../../redux/features/policy/policyApiSlice";
import { useCalculatePremiumMutation } from "../../../redux/features/premiumCal/premiumCalApiSlice";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";
import { showLabel, showPlaceholder } from "../../../utils/showLabel";
import DataNotFound from "../../../components/Shared/DataNotFound";
import {
  FormikInputForm,
  SinglePicker,
} from "../../../components/Form/FormikInputForm";
import SkeletonInputFiled from "../../../components/Shared/SkeletonInputFiled";
import useShowErrorMessage from "../../../hooks/useShowErrorMessage";
import CompareModal from "../HomeScreen/CompareModal";
import { toSnakeCase } from "../../../utils";
import { calculatorFormValidationSchema } from "../../../utils/FormikFormValidation";
import {
  addBuyNow,
  addCalBuyItem,
} from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import FormLabel from "../../../components/According/FormLabel";
import { setRestFormData } from "../../../redux/features/purchase/NomineeSlice";
import { setSelectedCustomer } from "../../../redux/features/customer/customerSlice";

export default function IndependentPremiumCal() {
  const dispatch = useDispatch();
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const errorMessage = useShowErrorMessage();
  const toast = useShowToastMessage();
  const categoriesData = useSelector(
    (state) => state?.policy?.allCategoriesDatas
  );

  // Select Category
  const [selectedValue, setSelectedValue] = React.useState(""); // Initialize with an empty string or default value
  const [selectPolicy, setSelectPolicy] = useState(null);
  const filteredData = categoriesData
    ? categoriesData?.slice(0, 5).filter((item) => item.id !== 1)
    : {};

  // All Form
  const { data: policyList } = useGetPoliciesByCategoryQuery({
    slug: selectedValue?.value || "",
    code,
  });

  // Buy Item
  const buyItem = selectPolicy?.value;
  let type = 4;
  const { isLoading, data } = useGetPurchaseFormQuery({
    slug: buyItem?.slug || "",
    type,
    code,
  });
  const premium_calculators = data?.data?.[""];

  //
  const maxDateOnlyFields = ["dob"];
  const minDateOnlyFields = ["duration_to", "duration_from"];
  const readOnlyFields = [""];
  const redOnlyValue = {
    dob: "",
  };

  // Form Fields
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

  // Open Modal
  const [Modal, setModal] = useState(false);
  const [premiumVal, setPremiumVal] = useState("0");
  const [compareModal, setCompareModal] = useState(false);
  // Calculate Premium
  const [calculatePremium, { isLoading: calPremLoading }] =
    useCalculatePremiumMutation();

  // Handel Submit
  const handelCalculatePremium = async (items) => {
    dispatch(setSelectedCustomer(null));
    dispatch(setRestFormData());
    //
    try {
      const formData = {
        ...items,
        slug: selectPolicy?.value?.slug,
      };

      const res = await calculatePremium(formData).unwrap();
      console.log("res", res);
      setPremiumVal(res?.data);
      dispatch(addCalBuyItem(res?.data));
      setModal(true);
    } catch (error) {
      console.log("error->>", error);
      toast(error?.data?.message, "error");
    }
  };
  //

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
      <DrawerHeader startIcon={false} title={language?.premiumCalHeader} />
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
        {/*  */}
        <FormLabel title={language.premiumCalDetailText} />
        <SinglePicker
          data={filteredData.map((item) => ({
            label: item.title,
            value: item.slug,
          }))}
          value={selectedValue}
          setValue={(data) => {
            dispatch(addBuyNow(null));
            setSelectPolicy(null);
            setSelectedValue(data);
          }}
        />
        {selectedValue && (
          <>
            <FormLabel title={language.policyNameTitle} />
            <SinglePicker
              data={
                policyList?.items
                  ? policyList?.items?.map((item) => ({
                      label: item?.name,
                      value: item,
                    }))
                  : []
              }
              value={selectPolicy}
              setValue={(data) => {
                setSelectPolicy(null);
                dispatch(addBuyNow(data?.value));
                setSelectPolicy(data);
              }}
            />
          </>
        )}

        {/* filed lode... */}
        {selectPolicy && premium_calculators?.length > 0 ? (
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
                      isLoading={calPremLoading}
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
