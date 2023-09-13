import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table, { userColumn } from "../../components/table/Table";
import {
  EUserModalType,
  IUserDetail,
  TCreateUserRequest,
  TUpdateUserRequest,
} from "../../interfaces/user-interfaces";
import { getEquipmentAction } from "../../stores/actions/equipment-actions";
import {
  createUserAction,
  deleteUserAction,
  getUsersAction,
  transferEquipmentAction,
  updateUserAction,
} from "../../stores/actions/user-actions";
import { EUserActions } from "../../stores/actions/user-actions/constants";
import { TRootState } from "../../stores/reducers";
import "./UserPage.scss";
import UserModal from "./modal/UserModal";
import UserTransferModal from "./modal/UserTransferModal";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData: IUserDetail[] = useSelector(
    (state: TRootState) => state.user.users
  );
  const isLoadingGetUsers: boolean = useSelector(
    (state: TRootState) => state.loading[EUserActions.GET_USERS]
  );
  const [selectedUser, setSelectedUser] = useState<IUserDetail[]>([]);
  const [UserModalType, setUserModalType] = useState<EUserModalType>();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenCreateModal(false);
    setIsOpenUpdateModal(false);
  };

  const handleGetUsers = () => {
    dispatch(getUsersAction());
  };

  const handleCreateUser = (values: TCreateUserRequest) => {
    dispatch(createUserAction(values, handleGetUsers));
  };

  const handleUpdateUser = (values: TUpdateUserRequest) => {
    console.log(values);
    dispatch(updateUserAction(values, handleGetUsers));
  };

  const handleDeleteUser = () => {
    const selectedUserIds = selectedUser.map((user: IUserDetail) => user.id);
    dispatch(deleteUserAction(selectedUserIds, handleGetUsers));
  };

  const handleClickTransfer = () => {
    setIsOpenTransferModal(true);
  };

  const handleGetEquipments = () => {
    dispatch(getEquipmentAction());
  };

  const handleTransferEquipment = (equipmentIds: number[]) => {
    console.log(equipmentIds);
    dispatch(
      transferEquipmentAction(
        { userId: selectedUser[0].id, equipmentIds },
        () => {
          handleGetEquipments();
          handleGetUsers();
        }
      )
    );
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="UserPage">
      <div className="UserPage__actions">
        <div className="UserPage__transfer">
          <Button
            variant="contained"
            color="secondary"
            disabled={selectedUser.length === 0 || selectedUser.length > 1}
            onClick={handleClickTransfer}
          >
            Transfer Equipment
          </Button>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenCreateModal(true);
              setUserModalType(EUserModalType.CREATE_USER);
            }}
          >
            Create User
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpenUpdateModal(true);
              setUserModalType(EUserModalType.UPDATE_USER);
            }}
            disabled={selectedUser.length === 0 || selectedUser.length > 1}
          >
            Update User
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteUser}
            disabled={selectedUser.length === 0}
          >
            Delete User
          </Button>
        </div>
      </div>
      <div className="UserPage__table">
        <Table
          columns={userColumn}
          rows={userData}
          setSelection={setSelectedUser}
          isLoading={isLoadingGetUsers}
        />
      </div>
      <UserModal
        isOpenModal={isOpenCreateModal || isOpenUpdateModal}
        handleCloseModal={handleCloseModal}
        UserModalType={UserModalType}
        selectedUser={selectedUser[0]}
        onCreateUser={handleCreateUser}
        onUpdateUser={handleUpdateUser}
      />
      <UserTransferModal
        selectedUser={selectedUser[0]}
        isOpenModal={isOpenTransferModal}
        onCloseModal={() => setIsOpenTransferModal(false)}
        onTransfer={handleTransferEquipment}
      />
    </div>
  );
};

export default UserPage;
