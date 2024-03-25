import { toSnakeCase } from ".";

export const showLabel = (item = {}, translate = {}) => {
  let label = item?.field_title;

  if (translate) {
    label = translate[toSnakeCase(item?.field_name)]
      ? translate[toSnakeCase(item?.field_name)]
      : item?.field_title;
  } else {
    label = item?.field_title;
  }

  return label;
};

export const showPlaceholder = (item = {}, translate = {}) => {
  let placeholder = item?.field_placeholder;
  if (translate) {
    placeholder = translate[toSnakeCase(item?.field_placeholder)]
      ? translate[toSnakeCase(item?.field_placeholder)]
      : item?.field_placeholder;
  } else {
    placeholder = item?.field_placeholder;
  }

  return placeholder;
};
