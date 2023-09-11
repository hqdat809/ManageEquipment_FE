import { all, fork } from "redux-saga/effects";
import userSagas from "./user-sagas";
import equipmentSaga from "./equipment-sagas";

export default function* rootSaga() {
  yield all([fork(userSagas)]);
  yield all([fork(equipmentSaga)]);
}
