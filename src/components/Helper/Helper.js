export const ToEnNum = (n) =>
  n?.toString()?.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));

//
export const ToBnNum = (n, lang = null) => {
  return lang === "bn"
    ? n?.toString()?.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d])
    : n;
};

export const MoneyFormat = (money, digit) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: digit,
  }).format(money);
};
