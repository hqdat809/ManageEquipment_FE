import { useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import Table, { userColumn } from "../../../components/table/Table";
import { TRootState } from "../../../stores/reducers";

interface IHistoryModalProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  transferredUserIds: number[];
}

const HistoryModal = ({
  isOpenModal,
  onCloseModal,
  transferredUserIds,
}: IHistoryModalProps) => {
  const userData = useSelector((state: TRootState) =>
    state.user.users.filter((user) =>
      transferredUserIds.some((id: number) => id === user.id)
    )
  );

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={() => {
        onCloseModal();
      }}
      title="History transferred user modal"
    >
      <div>
        <Table columns={userColumn} rows={userData} notCheckBoxSelection />
      </div>
    </Modal>
  );
};

export default HistoryModal;
