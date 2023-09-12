import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import loadingReducer from "./loading-reducer";
import equipmentReducer from "./equipment-reducer";
import authReducer from "./auth-reducers";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  equipment: equipmentReducer,
  authUser: authReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
