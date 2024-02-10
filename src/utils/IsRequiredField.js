const IsRequiredField = (data, fieldName) => {
  if (data && Array.isArray(data)) {
    return data?.find((item) => item?.field_name === fieldName);
  } else if (data && typeof data === "object") {
    return data;
  } else {
    return 0;
  }
};

export default IsRequiredField;
