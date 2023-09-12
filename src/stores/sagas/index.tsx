import { all, fork } from "redux-saga/effects";
import equipmentSaga from "./equipment-sagas";
import userSagas from "./user-sagas";
import authSaga from "./auth-sagas";

export default function* rootSaga() {
  yield all([fork(userSagas)]);
  yield all([fork(equipmentSaga)]);
  yield all([fork(authSaga)]);
}
