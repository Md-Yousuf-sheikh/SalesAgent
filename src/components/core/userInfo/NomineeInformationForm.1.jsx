import { View } from "react-native";
import React, { useEffect, useState } from "react";
import useShowErrorMessage from "../../../hooks/useShowErrorMessage";
import useShowToastMessage from "../../../hooks/useShowToastMessage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  codeSelector,
  languageSelector,
  translateSelector,
} from "../../../redux/features/language/languageSlice";
import {
  useLazyGetAddressByPostalCodeQuery,
  usePurchaseFormSubmitMutation,
} from "../../../redux/features/purchase/purchaseApiSlice";
import IsRequiredField from "../../../utils/IsRequiredField";
import { showLabel, showPlaceholder } from "../../../utils/showLabel";
import {
  CHARACTER_NUMBER_REGEX,
  CHARACTER_SPACE_REGEX,
  NUMBER_REGEX,
  PHONE_REGEX,
} from "../../../utils/Regex";
import NomineeAddButton from "../../Buttons/NomineeAddButton";
import AccordionItem from "../../According/AccordionItem";
import DatePicker, {
  FileUploader,
  FormInputText,
  GenderSelector,
  NomineeSelectCheckbox,
  PhoneNumber,
  SinglePicker,
} from "../../Form/FormikInputForm";
import FormLabel from "../../According/FormLabel";
import FormErrorMessage from "../../According/FormErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NextButton from "../../Buttons/NextButton";
import { NIDValidation } from "../../../utils/IdentityValidation";
import { toSnakeCase } from "../../../utils";
import {
  selectMemberInformation,
  selectNomineeInformation,
  selectPersonalInformation,
  setMemberInformation,
  setNomineeInformation,
} from "../../../redux/features/purchase/NomineeSlice";
import { purchasePolicyUidSelector } from "../../../redux/features/InsuranceBuy/InsuranceBuyApiSlice";
import { maxDateOnlyFields, readOnlyFields } from "./NomineeInformationForm";

export default function NomineeInformationForm({
  items: { nominee, member },
  currentPolicy,
  premCalculate,
  authUser,
  purchasePolicyUid,
}) {
  const errorMessage = useShowErrorMessage();
  const toast = useShowToastMessage();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const translate = useSelector(translateSelector);
  const language = useSelector(languageSelector);
  const code = useSelector(codeSelector);
  const ppid = useSelector(purchasePolicyUidSelector);

  // API
  const [getAddressByPostalCode, {}] = useLazyGetAddressByPostalCodeQuery();
  const [createOrder, { isLoading }] = usePurchaseFormSubmitMutation();

  // pending data
  const nomineeInformation = useSelector(selectNomineeInformation);
  const memberInformation = useSelector(selectMemberInformation);
  const personalInformation = useSelector(selectPersonalInformation);
  // initial Inputs
  const initialNomineeInputs = nominee
    ?.map((item) => item?.field_name)
    ?.reduce((a, v) => ({ ...a, [v]: "" }), {});

  const initialMemberInputs = member
    ?.map((item) => item?.field_name)
    ?.reduce((a, v) => ({ ...a, [v]: "" }), {});

  // state
  const [nomineeInputs, setNomineeInputs] = useState(
    nomineeInformation ?? [
      { ...initialNomineeInputs, contribution_percentage: 100 },
    ]
  );
  const [nomineeErrors, setNomineeErrors] = useState([
    nomineeInformation ?? initialNomineeInputs,
  ]);
  const [memberInputs, setMemberInputs] = useState(memberInformation ?? []);
  const [memberErrors, setMemberErrors] = useState(memberInformation ?? []);
  const [nomineePercentage, setNomineePercentage] = useState(0);
  const [memberPercentage, setMemberPercentage] = useState(0);

  //  function
  const handelNomineeOnChange = (target, input, inputIndex) => {
    // console.log(value, input, inputIndex);
    setNomineeInputs((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [input]: target,
            }
          : { ...prevInput }
      );
    });

    handelNomineeError("", input, inputIndex);
  };

  const handelNomineeError = (message, input, inputIndex) => {
    setNomineeErrors((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [input]: message,
            }
          : { ...prevInput }
      );
    });
  };

  const handelMemberOnChange = (target, input, inputIndex) => {
    // console.log(value, input, inputIndex);
    setMemberInputs((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [input]: target,
            }
          : { ...prevInput }
      );
    });

    handelMemberError("", input, inputIndex);
  };

  const handelMemberError = (message, input, inputIndex) => {
    setMemberErrors((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [input]: message,
            }
          : { ...prevInput }
      );
    });
  };

  const addMoreNomineeInput = () => {
    setNomineeInputs([...nomineeInputs, initialNomineeInputs]);
    setNomineeErrors([...nomineeErrors, initialNomineeInputs]);
  };

  const removeNomineeInput = (inputIndex) => {
    setNomineeInputs((prevInputs) =>
      prevInputs.filter(
        (prevInput, prevInputIndex) => prevInputIndex !== inputIndex
      )
    );
    setNomineeErrors((prevInputs) =>
      prevInputs.filter(
        (prevInput, prevInputIndex) => prevInputIndex !== inputIndex
      )
    );
  };

  const addMoreMemberInput = () => {
    setMemberInputs([...memberInputs, { ...initialMemberInputs }]);
    setMemberErrors([...memberErrors, { ...initialMemberInputs }]);
  };

  const removeMemberInput = (inputIndex) => {
    setMemberInputs((prevInputs) =>
      prevInputs.filter(
        (prevInput, prevInputIndex) => prevInputIndex !== inputIndex
      )
    );
    setMemberErrors((prevInputs) =>
      prevInputs.filter(
        (prevInput, prevInputIndex) => prevInputIndex !== inputIndex
      )
    );
  };

  // contribution_percentage
  useEffect(() => {
    setNomineePercentage(
      nomineeInputs?.reduce(
        (partialSum, a) => partialSum + parseInt(a?.contribution_percentage),
        0
      )
    );

    setMemberPercentage(
      memberInputs?.reduce(
        (partialSum, a) =>
          partialSum +
          (a?.member_as_nominee === true
            ? parseInt(a?.contribution_percentage)
            : 0),
        0
      )
    );
  }, [nomineeInputs, memberInputs]);

  //    validation
  const formValidate = async () => {
    let valid = true;
    let fielsName = "";
    nomineeInputs.map((input, inputIndex) => {
      if (
        !input?.name &&
        IsRequiredField(nominee, "name")?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "name")?.field_title
            } fields is required`,
            `${showLabel(IsRequiredField(nominee, "name"), translate)} আবশ্যক`
          ),
          "name",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!CHARACTER_SPACE_REGEX.test(input?.name)) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "name")?.field_title
            } Only characters and spaces are allowed`,
            `${showLabel(
              IsRequiredField(nominee, "name"),
              translate
            )} শুধুমাত্র অক্ষর এবং স্পেস দেওয়া যাবে`
          ),
          "name",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.relationship &&
        IsRequiredField(nominee, "relationship")?.field_required?.toString() ===
          "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "relationship")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(nominee, "relationship"),
              translate
            )}  ${
              IsRequiredField(nominee, "relationship")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "relationship",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!CHARACTER_SPACE_REGEX.test(input?.relationship)) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "relationship")?.field_title
            } Only characters and spaces are allowed`,
            `${showLabel(
              IsRequiredField(nominee, "relationship"),
              translate
            )} শুধুমাত্র অক্ষর এবং স্পেস দেওয়া যাবে`
          ),
          "relationship",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.contribution_percentage &&
        IsRequiredField(
          nominee,
          "contribution_percentage"
        )?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "contribution_percentage")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(nominee, "contribution_percentage"),
              translate
            )}  ${
              IsRequiredField(nominee, "contribution_percentage")
                ?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "contribution_percentage",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!NUMBER_REGEX.test(input?.contribution_percentage)) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "contribution_percentage")?.field_title
            } Only number allowed`,
            `${showLabel(
              IsRequiredField(nominee, "contribution_percentage"),
              translate
            )} শুধুমাত্র অক্ষর দেওয়া যাবে`
          ),
          "contribution_percentage",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.dob &&
        IsRequiredField(nominee, "dob")?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${IsRequiredField(nominee, "dob")?.field_title} field is required`,
            `${showLabel(IsRequiredField(nominee, "dob"), translate)}  ${
              IsRequiredField(nominee, "dob")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "dob",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }
      if (
        !input?.mobile &&
        IsRequiredField(nominee, "mobile")?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "mobile")?.field_title
            } field is required`,
            `${showLabel(IsRequiredField(nominee, "mobile"), translate)}  ${
              IsRequiredField(nominee, "mobile")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "mobile",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!PHONE_REGEX.test(input?.mobile)) {
        handelNomineeError(
          errorMessage(
            `Please input your valid mobile number. When you claim this mobile number will needed`,
            "আপনার বৈধ মোবাইল নম্বর লিখুন। আপনি যখন দাবি করবেন তখন এই মোবাইল নম্বরের প্রয়োজন হবে।"
          ),
          "mobile",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (input?.mobile?.length < 13 || input?.mobile?.length > 13) {
        handelNomineeError(
          errorMessage(
            `Please input your valid mobile number. When you claim this mobile number will needed`,
            "আপনার বৈধ মোবাইল নম্বর লিখুন। আপনি যখন দাবি করবেন তখন এই মোবাইল নম্বরের প্রয়োজন হবে।"
          ),
          "mobile",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.gender &&
        IsRequiredField(nominee, "gender")?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "gender")?.field_title
            } field is required`,
            `${showLabel(IsRequiredField(nominee, "gender"), translate)}  ${
              IsRequiredField(nominee, "gender")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "gender",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.identity_type &&
        IsRequiredField(
          nominee,
          "identity_type"
        )?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "identity_type")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(nominee, "identity_type"),
              translate
            )}  ${
              IsRequiredField(nominee, "identity_type")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "identity_type",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.identity_number &&
        IsRequiredField(
          nominee,
          "identity_number"
        )?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "identity_number")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(nominee, "identity_number"),
              translate
            )}  ${
              IsRequiredField(nominee, "identity_number")?.field_type ===
              "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "identity_number",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!CHARACTER_NUMBER_REGEX.test(input?.identity_number)) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "identity_number")?.field_title
            } Only characters and spaces are allowed`,
            `${showLabel(
              IsRequiredField(nominee, "identity_number"),
              translate
            )} শুধুমাত্র অক্ষর এবং স্পেস দেওয়া যাবে`
          ),
          "identity_number",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (
        input?.identity_type === "NID" &&
        !NIDValidation(input?.identity_number)
      ) {
        console.log(nominee, input, "type");
        handelNomineeError(
          errorMessage(
            "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
            "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
          ),
          "identity_number",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.address &&
        IsRequiredField(nominee, "address")?.field_required?.toString() === "1"
      ) {
        handelNomineeError(
          errorMessage(
            `${
              IsRequiredField(nominee, "address")?.field_title
            } field is required`,
            `${showLabel(IsRequiredField(nominee, "address"), translate)}  ${
              IsRequiredField(nominee, "address")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "address",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }
    });
    console.log("member");
    memberInputs.map((input, inputIndex) => {
      if (
        !input?.name &&
        IsRequiredField(member, "name")?.field_required?.toString() === "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "name")?.field_title
            } fields is required`,
            `${showLabel(IsRequiredField(member, "name"), translate)} আবশ্যক`
          ),
          "name",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!CHARACTER_SPACE_REGEX.test(input?.name)) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "name")?.field_title
            } Only characters and spaces are allowed`,
            `${showLabel(
              IsRequiredField(member, "name"),
              translate
            )} শুধুমাত্র অক্ষর এবং স্পেস দেওয়া যাবে`
          ),
          "name",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.relationship &&
        IsRequiredField(member, "relationship")?.field_required?.toString() ===
          "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "relationship")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(member, "relationship"),
              translate
            )}  ${
              IsRequiredField(member, "relationship")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "relationship",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!CHARACTER_SPACE_REGEX.test(input?.relationship)) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "relationship")?.field_title
            } Only characters and spaces are allowed`,
            `${showLabel(
              IsRequiredField(member, "relationship"),
              translate
            )} শুধুমাত্র অক্ষর এবং স্পেস দেওয়া যাবে`
          ),
          "relationship",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.dob &&
        IsRequiredField(member, "dob")?.field_required?.toString() === "1"
      ) {
        handelMemberError(
          errorMessage(
            `${IsRequiredField(member, "dob")?.field_title} field is required`,
            `${showLabel(IsRequiredField(member, "dob"), translate)}  ${
              IsRequiredField(member, "dob")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "dob",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.mobile &&
        IsRequiredField(member, "mobile")?.field_required?.toString() === "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "mobile")?.field_title
            } field is required`,
            `${showLabel(IsRequiredField(member, "mobile"), translate)}  ${
              IsRequiredField(member, "mobile")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "mobile",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!PHONE_REGEX.test(input?.mobile)) {
        handelMemberError(
          errorMessage(
            `Please input your valid mobile number. When you claim this mobile number will needed`,
            "আপনার বৈধ মোবাইল নম্বর লিখুন। আপনি যখন দাবি করবেন তখন এই মোবাইল নম্বরের প্রয়োজন হবে।"
          ),
          "mobile",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (input?.mobile?.length < 13 || input?.mobile?.length > 13) {
        handelMemberError(
          errorMessage(
            `Please input your valid mobile number. When you claim this mobile number will needed`,
            "আপনার বৈধ মোবাইল নম্বর লিখুন। আপনি যখন দাবি করবেন তখন এই মোবাইল নম্বরের প্রয়োজন হবে।"
          ),
          "mobile",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.gender &&
        IsRequiredField(member, "gender")?.field_required?.toString() === "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "gender")?.field_title
            } field is required`,
            `${showLabel(IsRequiredField(member, "gender"), translate)}  ${
              IsRequiredField(member, "gender")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "gender",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.identity_type &&
        IsRequiredField(member, "identity_type")?.field_required?.toString() ===
          "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "identity_type")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(member, "identity_type"),
              translate
            )}  ${
              IsRequiredField(member, "identity_type")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "identity_type",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.identity_number &&
        IsRequiredField(
          member,
          "identity_number"
        )?.field_required?.toString() === "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "identity_number")?.field_title
            } field is required`,
            `${showLabel(
              IsRequiredField(member, "identity_number"),
              translate
            )}  ${
              IsRequiredField(member, "identity_number")?.field_type ===
              "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "identity_number",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (!CHARACTER_NUMBER_REGEX.test(input?.identity_number)) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "identity_number")?.field_title
            } Only characters and spaces are allowed`,
            `${showLabel(
              IsRequiredField(member, "identity_number"),
              translate
            )} শুধুমাত্র অক্ষর এবং স্পেস দেওয়া যাবে`
          ),
          "identity_number",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      } else if (
        input?.identity_type === "NID" &&
        !NIDValidation(input?.identity_number)
      ) {
        console.log(member, input, "type");
        handelMemberError(
          errorMessage(
            "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
            "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
          ),
          "identity_number",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }

      if (
        !input?.address &&
        IsRequiredField(member, "address")?.field_required?.toString() === "1"
      ) {
        handelMemberError(
          errorMessage(
            `${
              IsRequiredField(member, "address")?.field_title
            } field is required`,
            `${showLabel(IsRequiredField(member, "address"), translate)}  ${
              IsRequiredField(member, "address")?.field_type === "select"
                ? "সিলেক্ট করুন"
                : "আবশ্যক"
            }`
          ),
          "address",
          inputIndex
        );
        fielsName = input?.name;
        valid = false;
      }
      if (input?.member_as_nominee) {
        if (
          input?.contribution_percentage <= 0 &&
          input?.contribution_percentage > 100
        ) {
          handelMemberError(
            errorMessage(
              `Choose nominee percentage`,
              "মনোনীত শতাংশ নির্বাচন করুন"
            ),
            "contribution_percentage",
            inputIndex
          );
          fielsName = input?.name;
          valid = false;
        }
      }
    });

    if (valid) {
      submitForm();
    }
  };

  //    submit
  const submitForm = async () => {
    console.log("dddddddddd");
    // return ;
    if (memberInputs?.length <= 0) {
      // console.log('no member', nomineePercentage, memberPercentage);
      if (nomineePercentage < 100) {
        // console.log('np <');
        toast("Nominee percentage can not be less then 100%", "error");

        return;
      } else if (nomineePercentage > 100) {
        // console.log('np >');
        toast("Nominee percentage can not be more then 100%", "error");
        return;
      }
    }

    if (memberInputs?.length > 0) {
      if (nomineePercentage + memberPercentage < 100) {
        // console.log('np, mp <');
        toast("Nominee percentage can not be less then 100%", "error");
        return;
      } else if (nomineePercentage + memberPercentage > 100) {
        // console.log('np, mp >');
        toast("Nominee percentage can not be more then 100%", "error");
        return;
      }
    }
    //
    try {
      const inputData = {
        userId: authUser?.id,
        formType: "nominee_information",
        policySlug: currentPolicy?.slug,
        purchasePolicyUid: purchasePolicyUid,
        nominees: nomineeInputs ? JSON.stringify(nomineeInputs) : "",
        members: memberInputs ? JSON.stringify(memberInputs) : "",
      };

      const formData = new FormData();
      formData.append("formType", inputData?.formType);
      formData.append("policySlug", inputData?.policySlug);
      formData.append("purchasePolicyUid", inputData?.purchasePolicyUid);
      formData.append("userId", inputData?.userId);
      formData.append("nominees", inputData?.nominees);
      formData.append("members", inputData?.members);

      const response = await createOrder(formData).unwrap();
      navigate("InformationPreview");

      // set data
      dispatch(setNomineeInformation(nomineeInputs));
      dispatch(setMemberInformation(memberInputs));
      // input Data
      if (inputData) {
        await AsyncStorage.setItem(
          "nomineeInformation",
          JSON.stringify(inputData?.nominees)
        );
        await AsyncStorage.setItem(
          "memberInformation",
          JSON.stringify(inputData?.members)
        );
        //
      }
      // dispatch()
      //
      toast(response?.message);
    } catch (error) {
      toast(error?.message, "error");
      console.log(error, "Error");
    }
  };

  //    address value set
  const handelAddress = async (
    data,
    nominee,
    index,
    inputIndex,
    handelChange
  ) => {
    // console.log(nominee, index, inputIndex, "response");
    try {
      let response = await getAddressByPostalCode(data).unwrap();
      if (response) {
        handelChange(response?.thana, "thana", inputIndex);
        handelChange(response?.district, "district", inputIndex);
        handelChange(response?.country, "country", inputIndex);
      }
      console.log(response, "response");
    } catch (error) {}
  };
  // handelSameAsOwnerPresentAddress
  const handelSameAsOwnerPresentAddress = async (
    handelChange,
    isChecked,
    inputIndex
  ) => {
    try {
      if (isChecked) {
        if (personalInformation !== undefined) {
          // set data
          handelChange(
            personalInformation?.present_postal_code,
            "postal_code",
            inputIndex
          );
          handelChange(personalInformation?.present_thana, "thana", inputIndex);
          handelChange(
            personalInformation?.present_district,
            "district",
            inputIndex
          );
          handelChange(
            personalInformation?.present_country,
            "country",
            inputIndex
          );
          handelChange(
            personalInformation?.present_address,
            "address",
            inputIndex
          );
        }
      } else {
        handelChange("", "postal_code", inputIndex);
        handelChange("", "address", inputIndex);
        handelChange("", "thana", inputIndex);
        handelChange("", "district", inputIndex);
        handelChange("", "country", inputIndex);
      }
    } catch (error) {}
  };
  //
  return (
    <View>
      <NomineeAddButton
        title={language?.nominee}
        onPress={addMoreNomineeInput}
        disabled={
          nomineeInputs?.length >= (currentPolicy?.number_of_nominee || 1)
        }
      />
      {/*  */}
      {nomineeInputs && nomineeInputs?.length > 0 && (
        <>
          {nomineeInputs?.length &&
            nomineeInputs?.map(
              (input, inputIndex) =>
                Object.keys(input)?.length > 0 && (
                  <AccordionItem
                    title={`${language?.nominee} (${inputIndex + 1})`}
                  >
                    {/* DatePicker */}
                    {Object.keys(input)?.map((item, index) => (
                      <>
                        {/* date */}
                        {nominee[index]?.field_type === "date" && (
                          <View>
                            <FormLabel
                              title={showLabel(nominee[index], translate)}
                            />
                            <DatePicker
                              placeholder={nominee[index]?.field_placeholder}
                              value={
                                nomineeInputs[inputIndex][
                                  nominee[index]?.field_name
                                ]
                              }
                              setValue={(target) => {
                                handelNomineeOnChange(
                                  target,
                                  nominee[index]?.field_name,
                                  inputIndex
                                );
                              }}
                              maxDate={
                                maxDateOnlyFields?.includes(
                                  nominee[index]?.field_name
                                )
                                  ? new Date()
                                  : null
                              }
                              error={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                            <FormErrorMessage
                              message={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                          </View>
                        )}
                        {/* Phone */}
                        {nominee[index]?.field_type === "phone" && (
                          <View>
                            <FormLabel
                              title={showLabel(nominee[index], translate)}
                            />
                            <PhoneNumber
                              label={nominee[index]?.field_title}
                              //placeholder={nominee[index]?.field_placeholder}
                              value={
                                nomineeInputs[inputIndex][
                                  nominee[index]?.field_name
                                ]
                              }
                              setValue={(target) => {
                                handelNomineeOnChange(
                                  target,
                                  nominee[index]?.field_name,
                                  inputIndex
                                );
                              }}
                              error={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                            <FormErrorMessage
                              message={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                          </View>
                        )}
                        {/* text */}
                        {nominee[index]?.field_type === "text" && (
                          <View>
                            <FormLabel
                              title={showLabel(nominee[index], translate)}
                            />

                            <FormInputText
                              value={
                                nomineeInputs[inputIndex][
                                  nominee[index]?.field_name
                                ]
                              }
                              //placeholder={nominee[index]?.field_placeholder}
                              setValue={(target) => {
                                handelNomineeOnChange(
                                  target,
                                  nominee[index]?.field_name,
                                  inputIndex
                                );
                              }}
                              disabled={
                                (readOnlyFields?.indexOf(
                                  nominee[index]?.field_name
                                ) !== -1 &&
                                  nomineeInputs[inputIndex]["postal_code"]) ||
                                (nominee[index]?.field_name === "address" &&
                                  nomineeInputs[inputIndex][
                                    "same_as_owner_address"
                                  ])
                                  ? true
                                  : false
                              }
                              error={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />

                            <FormErrorMessage
                              message={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                          </View>
                        )}
                        {/*  select or gender */}
                        {nominee[index]?.field_type === "select" &&
                          (nominee[index]?.field_name === "gender" ? (
                            <View>
                              <FormLabel
                                title={showLabel(nominee[index], translate)}
                              />
                              <GenderSelector
                                //placeholder={nominee[index]?.field_placeholder}
                                value={
                                  nomineeInputs[inputIndex][
                                    nominee[index]?.field_name
                                  ]
                                }
                                setValue={(target) => {
                                  handelNomineeOnChange(
                                    target,
                                    nominee[index]?.field_name,
                                    inputIndex
                                  );
                                }}
                                error={
                                  nomineeErrors[inputIndex]?.[
                                    nominee[index]?.field_name
                                  ]
                                }
                              />
                              <FormErrorMessage
                                message={
                                  nomineeErrors[inputIndex]?.[
                                    nominee[index]?.field_name
                                  ]
                                }
                              />
                            </View>
                          ) : (
                            <View>
                              <FormLabel
                                title={showLabel(nominee[index], translate)}
                              />
                              <SinglePicker
                                //placeholder={nominee[index]?.field_placeholder}
                                data={nominee[index]?.field_options?.map(
                                  (option) => ({
                                    value: option?.value,
                                    label:
                                      translate?.[
                                        toSnakeCase(
                                          option?.label?.trim()?.toLowerCase()
                                        )
                                      ] ?? option?.label,
                                  })
                                )}
                                value={
                                  nomineeInputs[inputIndex][
                                    nominee[index]?.field_name
                                  ]
                                }
                                setValue={(data) => {
                                  handelNomineeOnChange(
                                    data?.value,
                                    nominee[index]?.field_name,
                                    inputIndex
                                  );
                                  // postal code
                                  if (
                                    nominee[index]?.field_name === "postal_code"
                                  ) {
                                    handelAddress(
                                      data?.value,
                                      nominee,
                                      index,
                                      inputIndex
                                    );
                                  }
                                }}
                                error={
                                  nomineeErrors[inputIndex]?.[
                                    nominee[index]?.field_name
                                  ]
                                }
                              />
                              <FormErrorMessage
                                message={
                                  nomineeErrors[inputIndex]?.[
                                    nominee[index]?.field_name
                                  ]
                                }
                              />
                            </View>
                          ))}
                        {/* file */}
                        {nominee[index]?.field_type === "file" && (
                          <View>
                            <FormLabel
                              title={showLabel(nominee[index], translate)}
                            />
                            <FileUploader
                              //placeholder={nominee[index]?.field_placeholder}
                              value={
                                nomineeInputs[inputIndex][
                                  nominee[index]?.field_name
                                ]
                              }
                              setValue={(target) => {
                                handelNomineeOnChange(
                                  target,
                                  nominee[index]?.field_name,
                                  inputIndex
                                );
                              }}
                              error={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                            <FormErrorMessage
                              message={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                          </View>
                        )}
                        {/* file */}
                        {nominee[index]?.field_type === "checkbox" && (
                          <View>
                            {/* <FormLabel
                                                  title={showLabel(
                                                    nominee[index]?.field_title,
                                                    translate
                                                  )}
                                                /> */}
                            <NomineeSelectCheckbox
                              placeholder={showPlaceholder(
                                nominee[index],
                                translate
                              )}
                              value={
                                nomineeInputs[inputIndex][
                                  nominee[index]?.field_name
                                ]
                              }
                              setValue={(target) => {
                                handelNomineeOnChange(
                                  target,
                                  nominee[index]?.field_name,
                                  inputIndex
                                );
                                //
                                handelSameAsOwnerPresentAddress(
                                  handelNomineeOnChange,
                                  target,
                                  inputIndex
                                );
                              }}
                              error={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                            <FormErrorMessage
                              message={
                                nomineeErrors[inputIndex]?.[
                                  nominee[index]?.field_name
                                ]
                              }
                            />
                          </View>
                        )}
                        {/*  */}
                      </>
                    ))}
                    {/* remove */}
                    {inputIndex !== 0 && (
                      <NextButton
                        title={"Remove"}
                        type="remove"
                        onPress={() => removeNomineeInput(inputIndex)}
                      />
                    )}
                  </AccordionItem>
                )
            )}
        </>
      )}

      {/* Member Add Button */}
      {member &&
        Object?.keys(member)?.length > 0 &&
        currentPolicy?.number_of_insured > 1 && (
          <>
            <NomineeAddButton
              title={language?.members}
              onPress={addMoreMemberInput}
              disabled={
                nomineeInputs?.length >= (currentPolicy?.number_of_nominee || 1)
              }
            />
            {memberInputs && memberInputs?.length > 0 && (
              <>
                {memberInputs?.length > 0 &&
                  memberInputs?.map((memberInput, inputIndex) => (
                    <AccordionItem
                      title={`${language?.members} (${inputIndex + 1})`}
                    >
                      {/* filed */}
                      {Object.keys(memberInput)?.length > 0 &&
                        Object.keys(memberInput)?.map((item, index) => (
                          <>
                            {/* date */}
                            {member[index]?.field_type === "date" && (
                              <View>
                                <FormLabel
                                  title={showLabel(member[index], translate)}
                                />
                                <DatePicker
                                  // placeholder={showPlaceholder(
                                  //   member[index],
                                  //   translate
                                  // )}
                                  value={
                                    memberInputs[inputIndex][
                                      member[index]?.field_name
                                    ]
                                  }
                                  setValue={(target) => {
                                    handelMemberOnChange(
                                      target,
                                      member[index]?.field_name,
                                      inputIndex
                                    );
                                  }}
                                  maxDate={
                                    maxDateOnlyFields?.includes(
                                      member[index]?.field_nam
                                    )
                                      ? new Date()
                                      : null
                                  }
                                  error={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                                <FormErrorMessage
                                  message={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                              </View>
                            )}
                            {/* Phone */}
                            {member[index]?.field_type === "phone" && (
                              <View>
                                <FormLabel
                                  title={showLabel(member[index], translate)}
                                />
                                <PhoneNumber
                                  label={member[index]?.field_title}
                                  // placeholder={member[index]?.field_placeholder}
                                  value={
                                    memberInputs[inputIndex][
                                      member[index]?.field_name
                                    ]
                                  }
                                  setValue={(target) => {
                                    handelMemberOnChange(
                                      target,
                                      member[index]?.field_name,
                                      inputIndex
                                    );
                                  }}
                                  error={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                                <FormErrorMessage
                                  message={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                              </View>
                            )}
                            {/* text */}
                            {member[index]?.field_type === "text" && (
                              <View>
                                <FormLabel
                                  title={showLabel(member[index], translate)}
                                />
                                <FormInputText
                                  value={
                                    memberInputs[inputIndex][
                                      member[index]?.field_name
                                    ]
                                  }
                                  // placeholder={member[index]?.field_placeholder}
                                  setValue={(target) => {
                                    handelMemberOnChange(
                                      target,
                                      member[index]?.field_name,
                                      inputIndex
                                    );
                                  }}
                                  disabled={
                                    (readOnlyFields?.indexOf(
                                      member[index]?.field_name
                                    ) !== -1 &&
                                      memberInputs[inputIndex][
                                        "postal_code"
                                      ]) ||
                                    (member[index]?.field_name === "address" &&
                                      memberInputs[inputIndex][
                                        "same_as_owner_address"
                                      ])
                                      ? true
                                      : false
                                  }
                                  error={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />

                                <FormErrorMessage
                                  message={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                              </View>
                            )}
                            {/* text */}
                            {member[index]?.field_type === "number" && (
                              <View>
                                <FormLabel title={member[index]?.field_title} />

                                <FormInputText
                                  value={
                                    memberInputs[inputIndex][
                                      member[index]?.field_name
                                    ]
                                  }
                                  // placeholder={member[index]?.field_placeholder}
                                  setValue={(target) => {
                                    handelMemberOnChange(
                                      target,
                                      member[index]?.field_name,
                                      inputIndex
                                    );
                                  }}
                                  disabled={
                                    (readOnlyFields?.indexOf(
                                      member[index]?.field_name
                                    ) !== -1 &&
                                      memberInputs[inputIndex][
                                        "postal_code"
                                      ]) ||
                                    (member[index]?.field_name === "address" &&
                                      memberInputs[inputIndex][
                                        "same_as_owner_address"
                                      ])
                                      ? true
                                      : false
                                  }
                                  error={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />

                                <FormErrorMessage
                                  message={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                              </View>
                            )}
                            {/* Select or gender */}
                            {member[index]?.field_type === "select" &&
                              member[index]?.field_name !==
                                "contribution_percentage" &&
                              (member[index]?.field_name === "gender" ? (
                                <View>
                                  <FormLabel
                                    title={member[index]?.field_title}
                                  />
                                  <GenderSelector
                                    // placeholder={
                                    //   member[index]?.field_placeholder
                                    // }
                                    value={
                                      memberInputs[inputIndex][
                                        member[index]?.field_name
                                      ]
                                    }
                                    setValue={(target) => {
                                      handelMemberOnChange(
                                        target,
                                        member[index]?.field_name,
                                        inputIndex
                                      );
                                    }}
                                    error={
                                      memberErrors[inputIndex]?.[
                                        member[index]?.field_name
                                      ]
                                    }
                                  />
                                  <FormErrorMessage
                                    message={
                                      memberErrors[inputIndex]?.[
                                        member[index]?.field_name
                                      ]
                                    }
                                  />
                                </View>
                              ) : (
                                <View>
                                  <FormLabel
                                    title={member[index]?.field_title}
                                  />
                                  <SinglePicker
                                    // placeholder={
                                    //   member[index]?.field_placeholder
                                    // }
                                    data={member[index]?.field_options}
                                    value={
                                      memberInputs[inputIndex][
                                        member[index]?.field_name
                                      ]
                                    }
                                    setValue={(data) => {
                                      handelMemberOnChange(
                                        data?.value,
                                        member[index]?.field_name,
                                        inputIndex
                                      );
                                      // postal code
                                      if (
                                        member[index]?.field_name ===
                                        "postal_code"
                                      ) {
                                        handelAddress(
                                          data?.value,
                                          member,
                                          index,
                                          inputIndex,
                                          handelMemberOnChange
                                        );
                                      }
                                    }}
                                    error={
                                      memberErrors[inputIndex]?.[
                                        member[index]?.field_name
                                      ]
                                    }
                                  />
                                  <FormErrorMessage
                                    message={
                                      memberErrors[inputIndex]?.[
                                        member[index]?.field_name
                                      ]
                                    }
                                  />
                                </View>
                              ))}
                            {/* same as nominee */}
                            {memberInputs[inputIndex]?.member_as_nominee ===
                              true &&
                              member[index]?.field_name ===
                                "contribution_percentage" && (
                                <View>
                                  <FormLabel
                                    title={member[index]?.field_title}
                                  />
                                  <SinglePicker
                                    // placeholder={
                                    //   member[index]?.field_placeholder
                                    // }
                                    data={member[index]?.field_options}
                                    value={
                                      memberInputs[inputIndex][
                                        member[index]?.field_name
                                      ]
                                    }
                                    setValue={(data) => {
                                      handelMemberOnChange(
                                        data?.value,
                                        member[index]?.field_name,
                                        inputIndex
                                      );
                                      // postal code
                                      if (
                                        member[index]?.field_name ===
                                        "postal_code"
                                      ) {
                                        handelAddress(
                                          data?.value,
                                          member,
                                          index,
                                          inputIndex,
                                          handelMemberOnChange
                                        );
                                      }
                                    }}
                                    error={
                                      memberErrors[inputIndex]?.[
                                        member[index]?.field_name
                                      ]
                                    }
                                  />
                                  <FormErrorMessage
                                    message={
                                      memberErrors[inputIndex]?.[
                                        member[index]?.field_name
                                      ]
                                    }
                                  />
                                </View>
                              )}
                            {/* file */}
                            {member[index]?.field_type === "file" && (
                              <View>
                                <FormLabel title={member[index]?.field_title} />
                                <FileUploader
                                  // placeholder={member[index]?.field_placeholder}
                                  value={
                                    memberInputs[inputIndex][
                                      member[index]?.field_name
                                    ]
                                  }
                                  setValue={(target) => {
                                    handelMemberOnChange(
                                      target,
                                      member[index]?.field_name,
                                      inputIndex
                                    );
                                  }}
                                  error={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                                <FormErrorMessage
                                  message={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                              </View>
                            )}
                            {/* file */}
                            {member[index]?.field_type === "checkbox" && (
                              <View>
                                <FormLabel title={member[index]?.field_title} />
                                <NomineeSelectCheckbox
                                  placeholder={member[index]?.field_placeholder}
                                  value={
                                    memberInputs[inputIndex][
                                      member[index]?.field_name
                                    ]
                                  }
                                  setValue={(target) => {
                                    handelMemberOnChange(
                                      target,
                                      member[index]?.field_name,
                                      inputIndex
                                    );
                                    // s
                                    if (
                                      member[index]?.field_name ===
                                      "same_as_owner_address"
                                    ) {
                                      handelSameAsOwnerPresentAddress(
                                        handelMemberOnChange,
                                        target,
                                        inputIndex
                                      );
                                    }
                                  }}
                                  error={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                                <FormErrorMessage
                                  message={
                                    memberErrors[inputIndex]?.[
                                      member[index]?.field_name
                                    ]
                                  }
                                />
                              </View>
                            )}
                          </>
                        ))}
                      <NextButton
                        title={"Remove"}
                        onPress={() => removeMemberInput(inputIndex)}
                      />
                    </AccordionItem>
                  ))}
              </>
            )}
            {/*  */}
          </>
        )}

      <NextButton
        title={language?.nextButtonText}
        isLoading={isLoading}
        onPress={formValidate}
      />
    </View>
  );
}
