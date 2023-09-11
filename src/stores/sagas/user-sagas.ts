import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { EUserActions } from "../actions/user-actions/constants";
import {
  createUserRequestAction,
  createUserSuccessAction,
  deleteUserFailureAction,
  deleteUserRequestAction,
  deleteUserSuccessAction,
  getUserFailureAction,
  getUserRequestAction,
  getUserSuccessAction,
  transferEquipmentFailureAction,
  transferEquipmentRequestAction,
  transferEquipmentSuccessAction,
  updateUserFailureAction,
  updateUserRequestAction,
  updateUserSuccessAction,
} from "./../actions/user-actions/index";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import {
  createUser,
  deleteUser,
  getUsers,
  transferService,
  updateUser,
} from "../../services/user-service";
import { IUserDetail } from "../../interfaces/user-interfaces";
import {
  TCreateUserAction,
  TDeleteUserAction,
  TTransferEquipmentAction,
  TUpdateUserAction,
} from "../actions/user-actions/types";

function* getUserSaga() {
  try {
    yield put(getUserRequestAction());
    const response: IUserDetail[] = yield call(getUsers);
    yield put(getUserSuccessAction(response));
  } catch (error: any) {
    yield put(getUserFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get user failure");
  }
}

function* createUserSaga({ payload, cb }: TCreateUserAction) {
  try {
    yield put(createUserRequestAction());
    yield call(createUser, payload);
    yield put(createUserSuccessAction());
    cb?.();
    toastSuccess("Create user success!!");
  } catch (error: any) {
    yield put(getUserFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Create user failure");
  }
}

function* updateUserSaga({ payload, cb }: TUpdateUserAction) {
  try {
    yield put(updateUserRequestAction());
    yield call(updateUser, payload);
    yield put(updateUserSuccessAction());
    cb?.();
    toastSuccess("Update user success!!");
  } catch (error: any) {
    yield put(updateUserFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Update user failure");
  }
}

function* deleteUserSaga({ payload, cb }: TDeleteUserAction) {
  try {
    yield put(deleteUserRequestAction());
    yield call(deleteUser, payload);
    yield put(deleteUserSuccessAction());
    cb?.();
    toastSuccess("Delete user success!!");
  } catch (error: any) {
    yield put(deleteUserFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Update user failure");
  }
}

function* transferEquipmentSaga({ payload, cb }: TTransferEquipmentAction) {
  try {
    yield put(transferEquipmentRequestAction());
    yield call(transferService, payload);
    yield put(transferEquipmentSuccessAction());
    cb?.();
    toastSuccess("Transfer equipment success!!");
  } catch (error: any) {
    yield put(transferEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Transfer equipment failure!!");
  }
}

function* watchOnAuth() {
  yield takeLatest(EUserActions.GET_USERS, getUserSaga);
  yield takeLatest(EUserActions.CREATE_USER, createUserSaga);
  yield takeLatest(EUserActions.UPDATE_USER, updateUserSaga);
  yield takeLatest(EUserActions.DELETE_USER, deleteUserSaga);
  yield takeLatest(EUserActions.TRANSFER_EQUIPMENT, transferEquipmentSaga);
}

export default function* userSagas() {
  yield all([fork(watchOnAuth)]);
}
