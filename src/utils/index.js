import { Dimensions, Platform } from "react-native";
import { BACKEND_BASE_IMAGE_URL } from "./config";

const { height: D_HEIGHT, width: D_WIDTH } = (() => {
  const { width, height } = Dimensions.get("window");
  if (width >= 0 && height >= 0) {
    return Dimensions.get("screen");
  }
  return { width, height };
})();

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const IS_IPHONE_X = (() => {
  if (Platform.OS === "web") {
    return false;
  }
  return (
    (Platform.OS === "ios" &&
      ((D_HEIGHT >= X_HEIGHT && D_WIDTH >= X_WIDTH) ||
        (D_HEIGHT >= X_WIDTH && D_WIDTH >= X_HEIGHT))) ||
    (D_HEIGHT >= XSMAX_HEIGHT && D_WIDTH >= XSMAX_WIDTH) ||
    (D_HEIGHT >= XSMAX_WIDTH && D_WIDTH >= XSMAX_HEIGHT)
  );
})();

export const rnd = (max = 256) => Math.random() * max;

export const generateColor = () => `rgb(${rnd()},${rnd()},${rnd()})`;

export const moneyFormat = (money, digit) => {
  // return new Intl.NumberFormat('en-IN', {
  //   maximumSignificantDigits: 5,
  // }).format(money);
  return money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function KMoneyFormat(num) {
  if (Math.abs(num) >= 1000) {
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export const toSnakeCase = (str) => {
  // Replace spaces and special characters with underscores
  var snakeCaseStr = str
    ?.replace("'s", "s")
    ?.replace("(", "")
    ?.replace(")", "")
    ?.replace(",", "")
    ?.replace(":", "")
    ?.replace(/\W+/g, "_");

  // Convert to lowercase
  snakeCaseStr = snakeCaseStr?.toLowerCase();

  return snakeCaseStr;
};

export const snakeToCamel = (strName) => {
  return strName
    ?.toLowerCase()
    .replace(/(_\w)/g, (w) => w.toUpperCase().substr(1));
};

export const toEnNum = (n) =>
  n?.toString()?.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));

export const toBnNum = (n, lang = null) => {
  return lang === "bn"
    ? n?.toString()?.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d])
    : n;
};

export const pascalCaseToSnakeCase = (inputString) => {
  return inputString.replace(/([a-z\d])([A-Z])/g, "$1_$2").toLowerCase();
};

export const limitText = (str, limit = 5) => {
  return str.length > limit ? (str = str.substring(0, limit)) + "..." : str;
};

export const separateDigitsWithSpaces = (inputNumber) => {
  // Convert the number to a string
  const numberString = inputNumber.toString();

  // Use a regular expression to insert a space every 4 digits
  const formattedNumber = numberString.replace(/(\d{4})/g, "$1 ");

  // Remove any trailing space
  return formattedNumber.trim();
};

export function getCostValues(costTypeArray, costValues) {
  const result = {};
  let totalSum = 0;

  for (const costType of costTypeArray) {
    // Convert costType to a key format (e.g., "Medical Investigation" => "medical_investigation")
    const key = costType.toLowerCase().replace(/\s+/g, "_");

    if (costValues.hasOwnProperty(key)) {
      const value = costValues[key];
      result[costType] = value;
      totalSum += value;
    }
  }

  return { matchedCostValues: result, totalSum };
}

export function isCurrentTimeInRange(config) {
  const currentTime = new Date();
  const startTime = new Date(currentTime?.toDateString() + " " + config?.start);
  const endTime = new Date(currentTime?.toDateString() + " " + config?.end);
  // Check if the current time is equal to or after the start time
  // and equal to or before the end time.
  return currentTime >= startTime && currentTime <= endTime;
}

export function CurrencyFormatToFixed(num) {
  // Ensure num is a number or can be converted to a number
  if (typeof num === "number" || !isNaN(Number(num))) {
    const numericValue = Number(num);
    const formattedNumber = numericValue.toFixed(2).toString();
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "";
  }
}

export const isPDFChecker = (value) => {
  if (typeof value === "object") {
    return value?.uri?.toLowerCase().endsWith(".pdf");
  } else {
    return value?.toLowerCase().endsWith(".pdf");
  }
};
export const isImageChecker = (value) => {
  if (typeof value === "object") {
    return !value?.uri?.toLowerCase().endsWith(".pdf");
  } else {
    return !value?.toLowerCase().endsWith(".pdf");
  }
};

export const isImageSource = (value) => {
  return value !== undefined && value !== null && value !== ""
    ? typeof value === "object"
      ? value?.uri
      : String(value).indexOf("http://") == 0 ||
        String(value).indexOf("https://") == 0 ||
        String(value).indexOf("images/") == 0
      ? `${BACKEND_BASE_IMAGE_URL}/${value}`
      : value
    : null;
};

export const isDeleteImage = ({ value, item }) => {
  if (!value || !item) {
    console.error("Invalid arguments");
    return null;
  }
  const newValue = value?.filter((v) => {
    const itemUri = item.uri || item;

    if (typeof v === "object") {
      return v.uri !== itemUri;
    } else {
      const normalizedV =
        String(v).indexOf("http://") == 0 ||
        String(v).indexOf("https://") == 0 ||
        String(v).indexOf("images/") == 0
          ? v
          : `${BACKEND_BASE_IMAGE_URL}/${v}`;

      return normalizedV !== itemUri;
    }
  });

  return newValue;
};

const months = [
  { en: "January", bn: "জানুয়ারি" },
  { en: "February", bn: "ফেব্রুয়ারি" },
  { en: "March", bn: "মার্চ" },
  { en: "April", bn: "এপ্রিল" },
  { en: "May", bn: "মে" },
  { en: "June", bn: "জুন" },
  { en: "July", bn: "জুলাই" },
  { en: "August", bn: "অগাস্ট" },
  { en: "September", bn: "সেপ্টেম্বর" },
  { en: "October", bn: "অক্টোবর" },
  { en: "November", bn: "নভেম্বর" },
  { en: "December", bn: "ডিসেম্বর" },
];
export const isCurrentMonth = (code) => {
  const d = new Date();
  return code == "bn" ? months[d.getMonth()]?.bn : months[d.getMonth()]?.en;
};

export function formatNumber(value) {
  const formattedValue = parseFloat(value).toFixed(2);
  return formattedValue.endsWith(".00") ? parseInt(value, 10) : formattedValue;
}
