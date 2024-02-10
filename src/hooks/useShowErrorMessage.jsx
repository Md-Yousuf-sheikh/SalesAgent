import { useSelector } from "react-redux";
import { codeSelector } from "../redux/features/language/languageSlice";

const useShowErrorMessage = () => {
  const currentLanguage = useSelector(codeSelector);

  const showErrorMessage = (enText = "", bnText = "") => {
    return currentLanguage == "bn" ? bnText : enText;
  };
  return showErrorMessage;
};

export default useShowErrorMessage;
