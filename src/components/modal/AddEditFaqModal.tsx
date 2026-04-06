import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CustomFormLabel from "@/theme-components/forms/CustomFormLabel";

interface AddEditFaqModalPropTypes {
  open: boolean;
  handleClose: () => void;
  handleSubmitFaq: (question: string, answer: string) => void;
  isDisableLoading: boolean;
  title: string;
  confirmBtnText?: string;
  question: string;
  answer: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const AddEditFaqModal: React.FC<AddEditFaqModalPropTypes> = ({
  handleClose,
  open,
  handleSubmitFaq,
  isDisableLoading,
  title,
  confirmBtnText = "Save",
  answer,
  question,
  setAnswer,
  setQuestion,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert("Both question and answer are required");
      return;
    }

    handleSubmitFaq(question, answer);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 500,
          maxWidth: "100%",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>{title}</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          id="faq-form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          {/* Question */}
          <CustomFormLabel>Question</CustomFormLabel>
          <TextField
            fullWidth
            required
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Answer */}
          <CustomFormLabel>Answer</CustomFormLabel>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            placeholder="Enter the answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="faq-form"
          variant="contained"
          disabled={isDisableLoading}
        >
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditFaqModal;
