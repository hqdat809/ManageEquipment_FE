import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Skeleton } from "@mui/lab";
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
  updateEquipmentAction,
} from "../../stores/actions/equipment-actions";
import { TRootState } from "../../stores/reducers";
import "./EquipmentCard.scss";
import ConfirmModal from "../../components/modal/ConfirmModal";

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
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const [isOpenEquipmentModal, setIsOpenEquipmentModal] = useState(false);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEquipment = () => {
    dispatch(deleteEquipmentAction([details.id], handleGetEquipments));
    setIsDeleting(false);
  };

  const handleUpdateEquipment = (values: any) => {
    console.log(values);
    dispatch(updateEquipmentAction(values, handleGetEquipments));
  };

  const handleClickHistory = () => {
    setIsOpenHistoryModal(true);
  };

  const handleClickDelete = () => {
    setIsDeleting(true);
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
            <label style={{ fontWeight: "bold" }}>Owner: </label>
            {userData?.role.name == "ADMIN"
              ? ` ${owner?.firstName || ""} ${owner?.lastName || ""}`
              : ` ${userData?.firstName} ${userData?.lastName}`}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <Skeleton width="40%" height={20} />
          <Skeleton height={100} />
        </div>
      )}
      {userData?.role.name === "ADMIN" && (
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
                handleClickDelete();
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
      )}

      <EquipmentModal
        isOpenModal={isOpenEquipmentModal}
        equipmentModalType={EEquipmentModalType.UPDATE_EQUIPMENT}
        handleCloseModal={() => setIsOpenEquipmentModal(false)}
        onUpdateEquipment={handleUpdateEquipment}
        selectedEquipment={details}
      />
      <HistoryModal
        isOpenModal={isOpenHistoryModal}
        onCloseModal={() => setIsOpenHistoryModal(false)}
        transferredUserIds={details.transferredUserIds}
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

export default EquipmentCard;
