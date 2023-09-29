import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import EquipmentCard from "../../containers/equipment-card/EquipmentCard";
import {
  EEquipmentModalType,
  IEquipmentDetail,
} from "../../interfaces/equipment-interface";
import { IUserDetail } from "../../interfaces/user-interfaces";
import { TRootState } from "../../stores/reducers";
import Modal from "../modal/Modal";
import {
  getEquipmentAction,
  updateEquipmentAction,
} from "../../stores/actions/equipment-actions";
import { EEquipmentActions } from "../../stores/actions/equipment-actions/constants";
import Pagination from "@mui/material/Pagination";
import SearchButton from "../search-button/SearchButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import EquipmentModal from "../../pages/equipment/modal/EquipmentModal";
import HistoryModal from "../../pages/equipment/modal/HistoryModal";

interface IOwnerEquipmentProps {
  userId: number;
}

const OwnerColumn = ({ userId }: IOwnerEquipmentProps) => {
  const userOwner = useSelector((state: TRootState) =>
    state.user.users.find((u: IUserDetail) => u.id === userId)
  );
  return (
    <div>
      {userOwner?.firstName} {userOwner?.lastName}
    </div>
  );
};

const EquipmentColumn = (userId: number) => {
  const dispatch = useDispatch();
  const loadingEquipment = useSelector(
    (state: TRootState) => state.loading[EEquipmentActions.GET_EQUIPMENT]
  );
  const totalPage = useSelector(
    (state: TRootState) => state.equipment.totalPages
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const equipments = useSelector(
    (state: TRootState) => state.equipment.equipments
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setPage(value);
  };

  const handleGetEquipment = () => {
    dispatch(
      getEquipmentAction({
        ownerId: userId,
        name: searchText,
        pageNo: 0,
        pageSize: 5,
      })
    );
  };

  const handleClickCheck = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenModal(true);
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const getEquipmentDebounce = useCallback((value: string) => {
    setSearchText(value.trim());
  }, []);

  const debounceSearch = _.debounce(getEquipmentDebounce, 800);

  useEffect(() => {
    if (isOpenModal) {
      handleGetEquipment();
    }
  }, [isOpenModal, searchText, page]);

  return (
    <div>
      <Button variant="contained" onClick={(e) => handleClickCheck(e)}>
        Check
      </Button>
      <Modal
        open={isOpenModal}
        handleCloseModal={handleClose}
        title="Equipment is transferred for this user"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {equipments.length ? (
            <div>
              <Table
                columns={equipmentColumn}
                rows={equipments}
                isLoading={loadingEquipment}
                notCheckBoxSelection
              />
              {/* {equipments.map((equip: IEquipmentDetail) => (
                <div style={{ marginBottom: "12px" }}>
                  <EquipmentCard
                    details={equip}
                    isLoading={isLoading}
                    isData
                    handleGetEquipments={handleGetEquipment}
                  />
                </div>
              ))} */}
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              No Equipment
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

const ActionColumn = ({ equipment }: { equipment: IEquipmentDetail }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetEquipments = () => {
    dispatch(getEquipmentAction());
  };

  const handleUpdateEquipment = (values: any) => {
    console.log(values);
    dispatch(updateEquipmentAction(values, handleGetEquipments));
  };

  return (
    <div className="EquipmentCard__menu">
      <MoreVertIcon onClick={(e) => handleClick(e)} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenUpdateModal(true);
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenHistoryModal(true);
          }}
        >
          History
        </MenuItem>
      </Menu>
      <EquipmentModal
        isOpenModal={isOpenUpdateModal}
        equipmentModalType={EEquipmentModalType.UPDATE_EQUIPMENT}
        handleCloseModal={() => setIsOpenUpdateModal(false)}
        onUpdateEquipment={handleUpdateEquipment}
        selectedEquipment={equipment}
      />
      <HistoryModal
        isOpenModal={isOpenHistoryModal}
        onCloseModal={() => setIsOpenHistoryModal(false)}
        transferredUserIds={equipment.transferredUserIds}
      />
    </div>
  );
};

export const equipmentColumn: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <img
        src={params.value}
        style={{ objectFit: "cover", height: "70px", objectPosition: "center" }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },

  {
    field: "description",
    headerName: "Description",
    width: 400,
    valueGetter: (params: GridValueGetterParams) => {
      return "The morning air was crisp and sharp as Sean walked down the road. The pavement was slippery and cold beneath his feet, like a slimy, wet fish. For more information about words that help describe people, places and things, look at the topic on describing words (Adjectives).";
    },
  },
  {
    field: "ownerId",
    headerName: "Owner",
    width: 150,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <OwnerColumn userId={params.value} />
    ),
  },
  {
    field: "a",
    headerName: "",
    width: 50,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <ActionColumn equipment={params.row} />
    ),
  },
];

export const userColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 250,
    valueGetter: (params: GridValueGetterParams) => {
      const str = `${params.row.firstName} ${params.row.lastName}`;

      return str;
    },
  },
  { field: "address", headerName: "Address", minWidth: 220 },
  { field: "email", headerName: "Email", minWidth: 300 },
  {
    field: "id",
    headerName: "Equipments",
    minWidth: 200,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) =>
      EquipmentColumn(params.value),
  },
];

export const historyColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 250,
    valueGetter: (params: GridValueGetterParams) => {
      const str = `${params.row.firstName} ${params.row.lastName}`;

      return str;
    },
  },
  { field: "address", headerName: "Address", minWidth: 220 },
  { field: "email", headerName: "Email", minWidth: 300 },
];

interface ITableProps {
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  notCheckBoxSelection?: boolean;
  setSelection?: (selection: any[]) => void;
}

export default function Table({
  setSelection,
  rows,
  columns,
  isLoading,
  notCheckBoxSelection,
}: ITableProps) {
  return (
    <div style={{ height: 550, width: "100%", maxWidth: "100%" }}>
      <DataGrid
        rows={!isLoading ? rows || [] : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        onRowSelectionModelChange={(ids) => {
          const selectedRowsData = ids.map((id) =>
            rows?.find((row) => row.id === id)
          );
          setSelection?.(selectedRowsData);
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={!notCheckBoxSelection}
        loading={isLoading}
      />
    </div>
  );
}
