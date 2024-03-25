export const NIDValidation = (value) => {
  if (value === "" || value === undefined) {
    return true;
  } else if (value?.length < 10) {
    return false;
  } else if (value?.length > 10 && value?.length < 13) {
    return false;
  } else if (value?.length > 13 && value?.length < 17) {
    return false;
  }

  const numDigits = value?.length;

  if (numDigits === 10) {
    return true;
  } else if (numDigits === 13) {
    return true;
  } else if (numDigits === 17) {
    return true;
  }

  return false;
};
