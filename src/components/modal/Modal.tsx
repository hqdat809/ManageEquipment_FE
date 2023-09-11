import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Modal as ModalMUI, ModalProps } from "@mui/material";
import { ReactElement } from "react";
import "./Modal.scss";
interface IModalProps extends ModalProps {
  open: boolean;
  handleCloseModal?: () => void;
  children: ReactElement;
  title?: string;
}

const Modal = ({
  title,
  children,
  open,
  handleCloseModal,
  ...rest
}: IModalProps) => {
  return (
    <div>
      <ModalMUI
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="Modal">
          <div className="Modal__header">
            <div className="Modal__header-title">{title}</div>
            <div className="Modal__header-close" onClick={handleCloseModal}>
              <CloseRoundedIcon sx={{ width: "16px", height: "16px" }} />
            </div>
          </div>
          <div className="Modal__content">{children}</div>
        </div>
      </ModalMUI>
    </div>
  );
};

export default Modal;
