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
import { IEquipmentDetail } from "../../interfaces/equipment-interface";
import { IUserDetail } from "../../interfaces/user-interfaces";
import { TRootState } from "../../stores/reducers";
import Modal from "../modal/Modal";
import { getEquipmentAction } from "../../stores/actions/equipment-actions";
import { EEquipmentActions } from "../../stores/actions/equipment-actions/constants";
import Pagination from "@mui/material/Pagination";
import SearchButton from "../search-button/SearchButton";
import _ from "lodash";

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
  const isLoading = useSelector(
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <SearchButton onSearch={debounceSearch} />
                  {searchText && <p>Searching '{searchText}'...</p>}
                </div>
                <Pagination
                  defaultPage={page}
                  count={totalPage}
                  color="primary"
                  onChange={handleChangePage}
                />
              </div>

              {equipments.map((equip: IEquipmentDetail) => (
                <div style={{ marginBottom: "12px" }}>
                  <EquipmentCard
                    details={equip}
                    isLoading={isLoading}
                    isData
                    handleGetEquipments={handleGetEquipment}
                  />
                </div>
              ))}
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

export const equipmentColumn: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "ownerId",
    headerName: "Owner",
    width: 300,
    renderCell: (params: GridRenderCellParams<IEquipmentDetail>) => (
      <OwnerColumn userId={params.value} />
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
