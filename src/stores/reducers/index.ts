import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import loadingReducer from "./loading-reducer";
import equipmentReducer from "./equipment-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  equipment: equipmentReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
