import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import Table, { userColumn } from "../../../components/table/Table";
import { IUserDetail } from "../../../interfaces/user-interfaces";
import { TRootState } from "../../../stores/reducers";
import { EUserActions } from "../../../stores/actions/user-actions/constants";
import { Button } from "@mui/material";
import { transferService } from "../../../services/user-service";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onTransfer: (userId: number) => void;
}

const EquipmentTransferModal = ({
  isOpenModal,
  onCloseModal,
  onTransfer,
}: IProps) => {
  const userData = useSelector((state: TRootState) => state.user.users);
  const isLoadingGetUsers = useSelector(
    (state: TRootState) => state.loading[EUserActions.GET_USERS]
  );
  const [selectedUser, setSelectedUser] = useState<IUserDetail[]>();

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={() => {
        onCloseModal();
        setSelectedUser([]);
      }}
      title="Transfer Modal"
    >
      <div>
        <Table
          columns={userColumn}
          rows={userData}
          setSelection={setSelectedUser}
          isLoading={isLoadingGetUsers}
        />

        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
            gap: "12px",
          }}
        >
          <Button
            variant="contained"
            disabled={!selectedUser?.length || selectedUser?.length > 1}
            onClick={() => {
              selectedUser && onTransfer(selectedUser[0].id);
              onCloseModal();
            }}
          >
            Transfer
          </Button>
          {!!selectedUser?.length && selectedUser?.length > 1 && (
            <div
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
              }}
              className="EquipmentTransferModal__warning"
            >
              <ReportGmailerrorredIcon /> Trust select 1 user to transfer!!!
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EquipmentTransferModal;
