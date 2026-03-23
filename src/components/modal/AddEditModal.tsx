import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface AddEditModalPropTypes {
   open: boolean;
  handleClose: () => void;
  handleAddEditName: (inputText: string) => void;
  isDisableLoading: boolean;
  label: string;
  confirmBtnText?: string;
  value: string;
  setValue: (val: string) => void;
}

const AddEditModal: React.FC<AddEditModalPropTypes> = ({
  handleClose,
  open,
  handleAddEditName,
  isDisableLoading,
  label,
  confirmBtnText = "Reject",
  value,
  setValue
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!value.trim()) {
      alert("Name is required");
      return;
    }

    handleAddEditName(value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 450,
          height: 230,
          maxWidth: "none",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 18 }}>{label}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
          <TextField
            autoFocus
            required
            margin="dense"
            name="inputText"
            label={`Enter ${label} Name`}
            type="text"
            fullWidth
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type="submit"
          form="subscription-form"
          disabled={isDisableLoading}
        >
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditModal;
