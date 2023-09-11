import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { TRootState } from "../../stores/reducers";
import { Button } from "@mui/material";

// export const equipmentColumn: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 250,
//   },
//   { field: "description", headerName: "Description", width: 300 },
//   {
//     field: "owner",
//     headerName: "Owner",
//     width: 300,
//     renderCell: (params: GridRenderCellParams<Date>) => (
//       <Button
//         variant="contained"
//         size="small"
//         style={{ marginLeft: 16 }}
//         tabIndex={params.hasFocus ? 0 : -1}
//       >
//         Open
//       </Button>
//     ),
//   },
// ];
