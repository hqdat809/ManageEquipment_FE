import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EquipmentCard from "../../containers/equipment-card/EquipmentCard";
import {
  EEquipmentModalType,
  IEquipmentDetail,
} from "../../interfaces/equipment-interface";
import {
  createEquipmentAction,
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
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isOpenModalTransfer, setIsOpenModalTransfer] = useState(false);
  const [isOpenEquipmentModal, setIsOpenEquipmentModal] = useState(false);
  const [transferEquipmentId, setTransferEquipmentId] = useState<number[]>([]);
  const [selectedEquipment, setSelectedEquipment] =
    useState<IEquipmentDetail>();
  const [equipmentModalType, setEquipmentModalType] =
    useState<EEquipmentModalType>();

  const handleCloseEquipmentModal = () => {
    setIsOpenEquipmentModal(false);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setPage(value);
    dispatch(
      getEquipmentAction({ name: searchText, pageNo: value - 1, pageSize: 5 })
    );
  };

  const handleCreateEquipment = (values: any) => {
    dispatch(createEquipmentAction(values, handleGetEquipments));
  };

  const handleUpdateEquipment = (values: any) => {
    console.log(values);
    dispatch(updateEquipmentAction(values, handleGetEquipments));
  };

  const handleGetEquipments = () => {
    dispatch(
      getEquipmentAction({ name: searchText, pageNo: page - 1, pageSize: 5 })
    );
  };

  const handleClickTransfer = (equipmentId: number) => {
    setIsOpenModalTransfer(true);
    setTransferEquipmentId([equipmentId]);
  };

  const handleTransfer = (userId: number) => {
    dispatch(
      transferEquipmentAction(
        { userId, equipmentIds: transferEquipmentId },
        handleGetEquipments
      )
    );
  };

  const debounceSearch = _.debounce((value: string) => {
    setSearchText(value.trim());
    dispatch(
      getEquipmentAction({ name: value.trim(), pageNo: page - 1, pageSize: 5 })
    );
  }, 800);

  useEffect(() => {
    handleGetEquipments();
  }, []);

  return (
    <div className="Equipment">
      <div className="Equipment__actions">
        <SearchButton onSearch={debounceSearch} />
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
      <div className="Equipment__list">
        <div className="Equipment__pagination">
          <Pagination
            defaultPage={page}
            count={totalPage}
            color="primary"
            onChange={handleChangePage}
          />
        </div>
        {equipments?.map((equipment: IEquipmentDetail) => (
          <EquipmentCard
            isLoading={isLoadingEquipment}
            details={equipment}
            onClickTransfer={handleClickTransfer}
            handleGetEquipments={handleGetEquipments}
          />
        ))}
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
    </div>
  );
};

export default Equipment;
