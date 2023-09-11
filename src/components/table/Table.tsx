import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EquipmentCard from "../../containers/equipment-card/EquipmentCard";
import { IEquipmentDetail } from "../../interfaces/equipment-interface";
import { IUserDetail } from "../../interfaces/user-interfaces";
import { getEquipmentAction } from "../../stores/actions/equipment-actions";
import { TRootState } from "../../stores/reducers";
import Modal from "../modal/Modal";

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

const EquipmentColumn = (equipmentIds: number[]) => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const totalPage = useSelector(
    (state: TRootState) => state.equipment.totalPages
  );
  const equipments = useSelector((state: TRootState) =>
    state.equipment.equipments.filter((equip: IEquipmentDetail) =>
      equipmentIds.some((equipmentId: number) => equip.id === equipmentId)
    )
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    dispatch(getEquipmentAction({ pageNo: value - 1, pageSize: 5 }));
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
            equipments.map((equip: IEquipmentDetail) => (
              <div>
                <EquipmentCard details={equip} isData />
              </div>
            ))
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
    field: "equipmentIds",
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
