import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EEquipmentModalType,
  IEquipmentDetail,
} from "../../interfaces/equipment-interface";
import EquipmentModal from "../../pages/equipment/modal/EquipmentModal";
import HistoryModal from "../../pages/equipment/modal/HistoryModal";
import {
  deleteEquipmentAction,
  getEquipmentAction,
  updateEquipmentAction,
} from "../../stores/actions/equipment-actions";
import { TRootState } from "../../stores/reducers";
import { Skeleton } from "@mui/lab";
import "./EquipmentCard.scss";

interface IEquipmentCardProps {
  details: IEquipmentDetail;
  isData?: boolean;
  isLoading?: boolean;
  onClickTransfer?: (id: number) => void;
  handleGetEquipments?: () => void;
}

const EquipmentCard = ({
  details,
  isData,
  isLoading,
  onClickTransfer,
  handleGetEquipments,
}: IEquipmentCardProps) => {
  const dispatch = useDispatch();
  const owner = useSelector((state: TRootState) => state.user.users).find(
    (user) => user.id === details.ownerId
  );
  const [isOpenEquipmentModal, setIsOpenEquipmentModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [equipmentModalType, setEquipmentModalType] = useState(
    EEquipmentModalType.UPDATE_EQUIPMENT
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEquipment = (id: number) => {
    dispatch(deleteEquipmentAction(id, handleGetEquipments));
  };

  const handleUpdateEquipment = (values: any) => {
    console.log(values);
    dispatch(updateEquipmentAction(values, handleGetEquipments));
  };

  const handleClickHistory = () => {
    setIsOpenHistoryModal(true);
  };

  return (
    <div className="EquipmentCard">
      <div className="EquipmentCard__img">
        {!isLoading ? (
          <img src={details.imageUrl} />
        ) : (
          <Skeleton variant="rectangular" width={210} height={120} />
        )}
      </div>
      {!isLoading ? (
        <div className="EquipmentCard__info">
          <div className="EquipmentCard__name">{details.name}</div>
          <div className="EquipmentCard__desc">
            The morning air was crisp and sharp as Sean walked down the road.
            The pavement was slippery and cold beneath his feet, like a slimy,
            wet fish. For more information about words that help describe
            people, places and things, look at the topic on describing words
            (Adjectives).
          </div>
          <div className="EquipmentCard__owner">
            <label style={{ fontWeight: "bold" }}>Owner:</label>{" "}
            {owner?.firstName} {owner?.lastName}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <Skeleton width="40%" height={20} />
          <Skeleton height={100} />
        </div>
      )}

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
          {!isData && (
            <MenuItem
              onClick={() => {
                onClickTransfer?.(details.id);
                handleClose();
              }}
            >
              Transfer
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              handleClose();
              setIsOpenEquipmentModal(true);
            }}
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleDeleteEquipment(details.id);
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleClickHistory();
            }}
          >
            History
          </MenuItem>
        </Menu>
      </div>
      <EquipmentModal
        isOpenModal={isOpenEquipmentModal}
        equipmentModalType={equipmentModalType}
        handleCloseModal={() => setIsOpenEquipmentModal(false)}
        onUpdateEquipment={handleUpdateEquipment}
        selectedEquipment={details}
      />
      <HistoryModal
        isOpenModal={isOpenHistoryModal}
        onCloseModal={() => setIsOpenHistoryModal(false)}
        transferredUserIds={details.transferredUserIds}
      />
    </div>
  );
};

export default EquipmentCard;
