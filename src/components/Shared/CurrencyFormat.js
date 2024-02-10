export default function CurrencyFormat(num) {
  // Ensure num is a number or can be converted to a number
  if (typeof num === "number" || !isNaN(Number(num))) {
    const numericValue = Number(num);
    const formattedNumber = numericValue.toString();
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "";
  }
}
