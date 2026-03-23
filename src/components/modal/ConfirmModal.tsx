import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

interface ConfirmModalPropsType {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  label:string
  isDisableLoading:boolean
}

const ConfirmModal: React.FC<Partial<ConfirmModalPropsType>> = ({
  handleClose,
  open,
  handleConfirm,
  isDisableLoading,
  label
}) => {
  const handlePress = () => {
    if (handleConfirm) {
      handleConfirm();
    }
  };
  return (
    <Dialog
      open={open!}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {label}
      </DialogTitle>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          No
        </Button>
        <Button variant="contained" autoFocus onClick={handlePress} disabled={isDisableLoading}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
