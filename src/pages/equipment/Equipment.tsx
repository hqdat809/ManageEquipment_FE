import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EquipmentCard from "../../containers/equipment-card/EquipmentCard";
import {
  EEquipmentModalType,
  IEquipmentDetail,
} from "../../interfaces/equipment-interface";
import {
  createEquipmentAction,
  deleteEquipmentAction,
  getEquipmentAction,
  updateEquipmentAction,
} from "../../stores/actions/equipment-actions";
import { EEquipmentActions } from "../../stores/actions/equipment-actions/constants";
import { transferEquipmentAction } from "../../stores/actions/user-actions";
import { TRootState } from "../../stores/reducers";
import "./Equipment.scss";
import EquipmentModal from "./modal/EquipmentModal";
import EquipmentTransferModal from "./modal/EquipmentTransferModal";
import SearchButton from "../../components/search-button/SearchButton";
import _ from "lodash";
import Table, { equipmentColumn } from "../../components/table/Table";
import ConfirmModal from "../../components/modal/ConfirmModal";

const Equipment = () => {
  const dispatch = useDispatch();

  const isLoadingEquipment = useSelector(
    (state: TRootState) => state.loading[EEquipmentActions.GET_EQUIPMENT]
  );
  const equipments = useSelector(
    (state: TRootState) => state.equipment.equipments
  );
  const totalPage = useSelector(
    (state: TRootState) => state.equipment.totalPages
  );
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  const [isOpenEquipmentModal, setIsOpenEquipmentModal] = useState(false);
  const [transferEquipmentId, setTransferEquipmentId] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentDetail[]>();
  const [equipmentModalType, setEquipmentModalType] =
    useState<EEquipmentModalType>();

  const handleCloseEquipmentModal = () => {
    setIsOpenEquipmentModal(false);
  };

  const handleClickDelete = () => {
    setIsDeleting(true);
  };

  const handleCreateEquipment = (values: any) => {
    dispatch(createEquipmentAction(values, handleGetEquipments));
  };

  const handleUpdateEquipment = (values: any) => {
    console.log(values);
    dispatch(updateEquipmentAction(values, handleGetEquipments));
  };

  const handleGetEquipments = () => {
    if (userData?.role.name === "USER") {
      dispatch(
        getEquipmentAction({
          ownerId: userData?.id,
          name: searchText,
          pageNo: page - 1,
          pageSize: 5,
        })
      );
    } else {
      dispatch(getEquipmentAction());
    }
  };

  const handleClickTransfer = () => {
    setIsOpenModalTransfer(true);
    const selectedEquipmentIds = selectedEquipment?.map((equip) => equip.id);
    setTransferEquipmentId(selectedEquipmentIds || []);
  };

  const handleTransfer = (userId: number) => {
    dispatch(
      transferEquipmentAction(
        { userId, equipmentIds: transferEquipmentId },
        handleGetEquipments
      )
    );
  };

  const getEquipmentDebounce = useCallback((value: string) => {
    setSearchText(value.trim());
  }, []);

  const handleDeleteEquipment = () => {
    const selectedEquipmentIds = selectedEquipment?.map((equip) => equip.id);
    if (selectedEquipmentIds) {
      dispatch(
        deleteEquipmentAction(selectedEquipmentIds, handleGetEquipments)
      );
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    handleGetEquipments();
  }, [searchText, page]);

  return (
    <div className="Equipment">
      <div className="Equipment__actions">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClickTransfer()}
            disabled={!selectedEquipment?.length}
          >
            Transfer Equipments
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            disabled={!selectedEquipment?.length}
            onClick={handleClickDelete}
          >
            Delete Equipment
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenEquipmentModal(true);
              setEquipmentModalType(EEquipmentModalType.CREATE_EQUIPMENT);
            }}
          >
            Create Equipment
          </Button>
        </div>
      </div>
      <div className="Equipment__list">
        <Table
          columns={equipmentColumn}
          rows={equipments}
          setSelection={setSelectedEquipment}
          isLoading={isLoadingEquipment}
        />
      </div>
      <EquipmentModal
        isOpenModal={isOpenEquipmentModal}
        equipmentModalType={equipmentModalType}
        handleCloseModal={handleCloseEquipmentModal}
        onCreateEquipment={handleCreateEquipment}
        onUpdateEquipment={handleUpdateEquipment}
        selectedEquipment={selectedEquipment}
      />
      <EquipmentTransferModal
        isOpenModal={isOpenModalTransfer}
        onCloseModal={() => setIsOpenModalTransfer(false)}
        onTransfer={handleTransfer}
      />
      <ConfirmModal
        isOpen={isDeleting}
        title="Do you want delete this equipment?"
        onConfirm={handleDeleteEquipment}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
};

export default Equipment;
