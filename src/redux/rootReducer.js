import { combineReducers } from "redux";
import tableDataReducer from "./TableData/table.data.reducer";

const rootReducer = combineReducers({
  table: tableDataReducer,
});

export default rootReducer;
