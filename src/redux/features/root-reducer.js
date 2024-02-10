import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import languageSlice from "./language/languageSlice";
const rootReducer = combineReducers({
  selectLanguage: languageSlice,
});

export const useAppSelector = useSelector;

export default rootReducer;
