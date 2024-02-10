import {
  CHARACTER_NUMBER_REGEX,
  CHARACTER_SPACE_DASH_REGEX,
  CHARACTER_SPACE_REGEX,
  CUSTOM_REGEX,
  NUMBER_REGEX,
  PHONE_REGEX,
} from "./Regex";
import * as Yup from "yup";
import IsRequiredField from "./IsRequiredField";
import { showLabel } from "./showLabel";
import { NIDValidation } from "./IdentityValidation";
// Personal Form Validation
export const personalFormValidationSchema = (
  object,
  requiredFields = [] || {},
  errorMessage = () => {},
  translate = {},
  authUser = {}
) => {
  const schema = {};

  for (const key in object) {
    // Define validation rules for each field based on its type or other conditions
    if (key === "full_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field allow only characters and space.`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key)
                  )}  শুধুমাত্র অক্ষর এবং স্থান অনুমতি দেয়.`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allow only characters and space.`
            );
    } else if (key === "contact_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .typeError(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                }Contact number must be required`
              )
              .max(
                13,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be at most 13 characters`
              )
              .matches(
                PHONE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } should be Bangladeshi format start with +880`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .typeError(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be required`
              )
              .max(
                13,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be at most 13 characters`
              )
              .matches(
                PHONE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } should be Bangladeshi format start with +880`
              );
    } else if (key === "email") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .email(
                errorMessage("Must be a valid email", "সঠিক ই-মেইল হতে হবে")
              )
              .max(255)
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .email(
                errorMessage("Must be a valid email", "সঠিক ই-মেইল হতে হবে")
              )
              .max(255);
    } else if (key === "gender") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "dob") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "father_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } name field is required`
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "mother_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "nationality") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "educational_qualification") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "place_of_birth") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "blood_group") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "profession") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "marital_status") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "spouse_name") {
      schema[key] = Yup.string().when(
        "marital_status",
        (marital_status, schema) => {
          if (
            marital_status.toString() !== "" &&
            marital_status.toString().toLocaleLowerCase() !== "single"
          ) {
            return Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              );
          } else {
            return Yup.string()
              .nullable()
              .notRequired()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              );
          }
        }
      );
    } else if (key === "identity_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
          : Yup.string();
    } else if (key === "identity_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .when("identity_type", (identity_type, schema) => {
                // console.log(identity_type, "identity_type");
                if (
                  identity_type &&
                  identity_type?.length > 0 &&
                  identity_type[0] === "NID"
                ) {
                  return Yup.string()
                    .matches(
                      /^\d+$/,
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      )
                    )
                    .min(
                      10,
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      )
                    )
                    .max(
                      17,
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      )
                    )
                    .test(
                      "NID Validation",
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      ),
                      NIDValidation
                    );
                }
                return schema;
              })
              .matches(
                CHARACTER_NUMBER_REGEX,
                `${IsRequiredField(requiredFields, key)?.field_title} `
              )
              .required(
                errorMessage(
                  `${IsRequiredField(requiredFields, key)?.field_title} `,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_NUMBER_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field is required`
            );
    } else if (key === "account_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "account_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be a number`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } must be a number`
            );
    } else if (key === "branch_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .nullable()
              .notRequired()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .nullable()
              .notRequired()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              );
    } else if (key === "routing_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .nullable()
              .notRequired()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be a number`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .nullable()
              .notRequired()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be a number`
              );
    } else if (key === "same_as_present_address") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
          : Yup.string();
    } else if (key === "present_address") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string().required(
                      `${
                        IsRequiredField(requiredFields, key)?.field_title
                      } field is required`
                    );
                  }
                  return schema;
                }
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().when(
              "same_as_present_address",
              (same_as_present_address, schema) => {
                if (same_as_present_address.toString() === "true") {
                  return Yup.string().required(
                    `${
                      IsRequiredField(requiredFields, key)?.field_title
                    } field is required`
                  );
                }
                return schema;
              }
            );
    } else if (key === "present_country") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().when(
              "same_as_present_address",
              (same_as_present_address, schema) => {
                if (same_as_present_address.toString() === "true") {
                  return Yup.string().required(
                    `${
                      IsRequiredField(requiredFields, key)?.field_title
                    } field is required`
                  );
                } else {
                  return Yup.string().matches(
                    CHARACTER_SPACE_REGEX,
                    `${
                      IsRequiredField(requiredFields, key)?.field_title
                    } field allows only characters and spaces.`
                  );
                }
              }
            );
    } else if (key === "present_district") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string().required(
                      `${
                        IsRequiredField(requiredFields, key)?.field_title
                      } field is required`
                    );
                  }
                  return schema;
                }
              )
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string().required(
                      `${
                        IsRequiredField(requiredFields, key)?.field_title
                      } field is required`
                    );
                  }
                  return schema;
                }
              )
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              );
    } else if (key === "present_postal_code") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string()
                      .matches(
                        NUMBER_REGEX,
                        `${
                          IsRequiredField(requiredFields, key)?.field_title
                        } must be a number`
                      )
                      .required(
                        `${
                          IsRequiredField(requiredFields, key)?.field_title
                        } field is required'`
                      );
                  }
                  return schema;
                }
              )
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be a number`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string()
                      .matches(
                        NUMBER_REGEX,
                        `${
                          IsRequiredField(requiredFields, key)?.field_title
                        } must be a number`
                      )
                      .required(
                        `${
                          IsRequiredField(requiredFields, key)?.field_title
                        } field is required`
                      );
                  }
                  return schema;
                }
              )
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } must be a number`
              );
    } else if (key === "present_thana") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string().required(
                      `${
                        IsRequiredField(requiredFields, key)?.field_title
                      } field is required`
                    );
                  }
                  return schema;
                }
              )
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .when(
                "same_as_present_address",
                (same_as_present_address, schema) => {
                  if (same_as_present_address.toString() === "true") {
                    return Yup.string().required(
                      `${
                        IsRequiredField(requiredFields, key)?.field_title
                      } field is required`
                    );
                  }
                  return schema;
                }
              )
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              );
    } else if (key === "permanent_address") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "permanent_country") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "permanent_district") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "permanent_postal_code") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(NUMBER_REGEX, "Postal Code must be a number")
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(NUMBER_REGEX, "Postal Code must be a number");
    } else if (key === "permanent_thana") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "organization_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "business_nature") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "designation") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "daily_duties") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "business_address") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "orsganization_owner") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "owner_dob") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "owner_profession") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "owner_organization_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "owner_business_nature") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "owner_daily_duties") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "owner_business_address") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "owner_relationship") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "correspondence_address") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "pp_photo") {
      let validation = Yup.mixed();
      if (
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
      ) {
        validation.required(
          `${
            IsRequiredField(requiredFields, key)?.field_title
          } field is required`
        );
      }

      schema[key] = validation;
    } else if (key === "annual_income") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "special_request") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "special_request_details") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "bank_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "branch") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "account") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "routing") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "tin") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "premium_mode") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "with_term") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "face_amount") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "supplementary_contract") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                PHONE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } should be Bangladeshi format start with +880`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              PHONE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } should be Bangladeshi format start with +880`
            );
    } else if (key === "policy_id") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "company") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "face_amount") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "relationship") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "age") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "alive_deceased") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "age_living_death") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "height") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "weight") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "weight_changed") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "personal_physician") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_7") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_8") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_9") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_10") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_11") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_12") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_13") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_14") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_15") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_16") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_17") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_18") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_19") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_20") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_21") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_22") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_23") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_24") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_25") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_26") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_27") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_28") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_29") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_30") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_38") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "q_39") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "year_issued") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .max(4)
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "question_no") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
              )
            );
    } else if (key === "name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allows only characters and spaces.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allows only characters and spaces.`
            );
    } else if (key === "attachment_front") {
      // schema[key] = Yup.mixed().test(
      //   "custom",
      //   errorMessage("Attachment required", "ছবি অথবা ফাইল যুক্ত করুন "),
      //   (value) => {
      //     return value;
      //   }
      // );
    } else if (key === "attachment_back") {
      // schema[key] = Yup.mixed();
      // let findAttachment = authUser?.identities?.find((identity) => {
      //   if (
      //     formik &&
      //     formik?.values &&
      //     (name === "attachment_front" || name === "attachment_back")
      //   ) {
      //     return identity.identity_type === formik?.values["identity_type"];
      //   } else {
      //     return false;
      //   }
      // });
      // .test(
      //   "custom",
      //   errorMessage("Attachment required", "ছবি অথবা ফাইল যুক্ত করুন "),
      //   (value) => {
      //     return value;
      //   }
      // );
    } else {
      // schema[key] = Yup.string()
      //   .nullable()
      //   .test(
      //     "custom",
      //     errorMessage("Attachment required", "ছবি অথবা ফাইল যুক্ত করুন "),
      //     (value) => {
      //       return value;
      //     }
      //   );
    }
  }

  return Yup.object().shape(schema);
};

// Calculator Form Validation
export const calculatorFormValidationSchema = (
  object,
  requiredFields = [] || {},
  errorMessage = () => {},
  translate = {}
) => {
  const schema = {};
  for (const key in object) {
    // Define validation rules for each field based on its type or other conditions
    // console.log(object, IsRequiredField(requiredFields, key), key);

    if (key === "country") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field allow only number.`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key)
                  )}  শুধুমাত্র অক্ষর অনুমতি দেয়.`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allow only numbe.`
            );
    } else if (key === "dob") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "duration_from") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "duration_to") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "price") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "claim_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field is required.`
            );
    } else if (key === "claim_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field is required.`
            );
    } else if (key === "term") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "sum_assured") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "installment_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required and characters, space and dash`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র অক্ষর, স্থান এবং ড্যাশ অনুমতি দেয়।`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required and characters, space and dash`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র অক্ষর, স্থান এবং ড্যাশ অনুমতি দেয়।`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "seat") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "category") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required and characters, space and dash`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র অক্ষর, স্থান এবং ড্যাশ অনুমতি দেয়।`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "category_value") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else {
      schema[key] = Yup.string().nullable();
    }
  }

  return Yup.object().shape(schema);
};

// Device Form Validation
export const deviceFormValidationSchema = (
  object,
  requiredFields = [] || {},
  errorMessage = () => {},
  translate = {}
) => {
  const schema = {};
  for (const key in object) {
    // Define validation rules for each field based on its type or other conditions
    // console.log(object, IsRequiredField(requiredFields, key), key);

    if (key === "device_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_REGEX,
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number.`
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field allow only numbe.`
            );
    } else if (key === "purchase_date") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "brand_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CHARACTER_SPACE_DASH_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required and characters, space and dash`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র অক্ষর, স্থান এবং ড্যাশ অনুমতি দেয়।`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_SPACE_DASH_REGEX,
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required and characters, space and dash`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  শুধুমাত্র অক্ষর, স্থান এবং ড্যাশ অনুমতি দেয়।`
              )
            );
    } else if (key === "model") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                CUSTOM_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required and characters, space and dash`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র অক্ষর, স্থান এবং ড্যাশ অনুমতি দেয়।`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CUSTOM_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "imei") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "upload_purchase_invoice") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.mixed().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.mixed();
    } else {
      schema[key] = Yup.string().nullable();
    }
  }

  return Yup.object().shape(schema);
};

// Travel Form Validation
export const travelFormValidationSchema = (
  object,
  requiredFields = [] || {},
  errorMessage = () => {},
  translate = {}
) => {
  const schema = {};
  for (const key in object) {
    // Define validation rules for each field based on its type or other conditions
    // console.log(object, IsRequiredField(requiredFields, key), key);

    if (key === "purpose_of_visit") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "country_of_visit") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "departure_date") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field is required and characters, spach and dash`
            )
          : Yup.string();
    } else if (key === "return_date") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else {
      schema[key] = Yup.string().nullable();
    }
  }

  return Yup.object().shape(schema);
};

// Motor Form Validation
export const motorFormValidationSchema = (
  object,
  requiredFields = [] || {},
  errorMessage = () => {},
  translate = {}
) => {
  const schema = {};
  for (const key in object) {
    // Define validation rules for each field based on its type or other conditions
    // console.log(object, IsRequiredField(requiredFields, key), key);

    if (key === "vehicle_name") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "vehicle_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "driver") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required and only number allowed`
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "passenger") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "helper") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "vehicle_category") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "category_value") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "price") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "registration_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              NUMBER_REGEX,

              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field allow only number`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )} শুধুমাত্র সংখ্যা অনুমতি দেয়`
              )
            );
    } else if (key === "identity_type") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "identity_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .when("identity_type", (identity_type, schema) => {
                console.log(identity_type, "identity_type");
                if (
                  identity_type &&
                  identity_type?.length > 0 &&
                  identity_type[0] === "NID"
                ) {
                  return Yup.string()
                    .matches(
                      /^\d+$/,
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      )
                    )
                    .min(
                      10,
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      )
                    )
                    .max(
                      17,
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      )
                    )
                    .test(
                      "NID Validation",
                      errorMessage(
                        "Invalid NID Number. NID must be contained within 10 or 13 or 17 digits",
                        "ভুল এনআইডি নম্বর। এনআইডি নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে"
                      ),
                      NIDValidation
                    );
                }
                return schema;
              })
              .matches(
                CHARACTER_NUMBER_REGEX,
                `${IsRequiredField(requiredFields, key)?.field_title} `
              )
              .required(
                errorMessage(
                  `${IsRequiredField(requiredFields, key)?.field_title} `,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string().matches(
              CHARACTER_NUMBER_REGEX,
              `${
                IsRequiredField(requiredFields, key)?.field_title
              } field is required`
            );
    } else if (key === "comprehensive_insurance") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else if (key === "comprehensive_insurance_number") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string()
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              )
              .max(3)
              .required(
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } field is required`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  ${
                    IsRequiredField(requiredFields, key)?.field_type ===
                    "select"
                      ? "সিলেক্ট করুন"
                      : "আবশ্যক"
                  }`
                )
              )
          : Yup.string()
              .max(3)
              .matches(
                NUMBER_REGEX,
                errorMessage(
                  `${
                    IsRequiredField(requiredFields, key)?.field_title
                  } only number`,
                  `${showLabel(
                    IsRequiredField(requiredFields, key),
                    translate
                  )}  শুধুমাত্র সংখ্যা দেয়া যাবে`
                )
              );
    } else if (key === "tracking_device") {
      schema[key] =
        IsRequiredField(requiredFields, key)?.field_required?.toString() === "1"
          ? Yup.string().required(
              errorMessage(
                `${
                  IsRequiredField(requiredFields, key)?.field_title
                } field is required`,
                `${showLabel(
                  IsRequiredField(requiredFields, key),
                  translate
                )}  ${
                  IsRequiredField(requiredFields, key)?.field_type === "select"
                    ? "সিলেক্ট করুন"
                    : "আবশ্যক"
                }`
              )
            )
          : Yup.string();
    } else {
      schema[key] = Yup.string().nullable();
    }
  }

  return Yup.object().shape(schema);
};
