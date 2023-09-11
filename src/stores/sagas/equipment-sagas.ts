import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  IEquipmentDetail,
  IGetEquipmentResponse,
} from "../../interfaces/equipment-interface";
import {
  createEquipment,
  deleteEquipment,
  getEquipment,
  updateEquipment,
} from "../../services/equipment-service";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import {
  createEquipmentFailureAction,
  createEquipmentRequestAction,
  createEquipmentSuccessAction,
  deleteEquipmentFailureAction,
  deleteEquipmentRequestAction,
  deleteEquipmentSuccessAction,
  updateEquipmentFailureAction,
  updateEquipmentRequestAction,
  updateEquipmentSuccessAction,
} from "../actions/equipment-actions";
import { EEquipmentActions } from "../actions/equipment-actions/constants";
import {
  TCreateEquipmentAction,
  TDeleteEquipmentAction,
  TGetEquipmentAction,
  TUpdateEquipmentAction,
} from "../actions/equipment-actions/types";
import {
  getEquipmentFailureAction,
  getEquipmentRequestAction,
  getEquipmentSuccessAction,
} from "./../actions/equipment-actions/index";

function* createEquipmentSaga({ payload, cb }: TCreateEquipmentAction) {
  try {
    yield put(createEquipmentRequestAction());
    yield call(createEquipment, payload);
    yield put(createEquipmentSuccessAction());
    cb?.();
    toastSuccess("Create equipment success!!");
  } catch (error: any) {
    yield put(createEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Create equipment failure!!");
  }
}

function* getEquipmentSaga({ payload }: TGetEquipmentAction) {
  try {
    yield put(getEquipmentRequestAction());
    if (payload) {
      const response: IGetEquipmentResponse = yield call(getEquipment, payload);
      yield put(getEquipmentSuccessAction(response));
    } else {
      const response: IEquipmentDetail[] = yield call(getEquipment);
      yield put(getEquipmentSuccessAction(response));
    }
  } catch (error: any) {
    yield put(getEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get equipment failure!!");
  }
}

function* updateEquipmentSaga({ payload, cb }: TUpdateEquipmentAction) {
  try {
    yield put(updateEquipmentRequestAction());
    yield call(updateEquipment, payload);
    yield put(updateEquipmentSuccessAction());
    cb?.();
    toastSuccess("Update equipment success!!");
  } catch (error: any) {
    yield put(updateEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Update equipment failure!!");
  }
}

function* deleteEquipmentSaga({ payload, cb }: TDeleteEquipmentAction) {
  try {
    yield put(deleteEquipmentRequestAction());
    yield call(deleteEquipment, payload);
    yield put(deleteEquipmentSuccessAction());
    cb?.();
    toastSuccess("Delete equipment success!!");
  } catch (error: any) {
    yield put(deleteEquipmentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Delete equipment failure!!");
  }
}

function* watchOnAuth() {
  yield takeLatest(EEquipmentActions.CREATE_EQUIPMENT, createEquipmentSaga);
  yield takeLatest(EEquipmentActions.GET_EQUIPMENT, getEquipmentSaga);
  yield takeLatest(EEquipmentActions.UPDATE_EQUIPMENT, updateEquipmentSaga);
  yield takeLatest(EEquipmentActions.DELETE_EQUIPMENT, deleteEquipmentSaga);
}

export default function* equipmentSaga() {
  yield all([fork(watchOnAuth)]);
}
