import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { FormProvider } from "../../../common/form-provider";
import { Controller, useForm } from "react-hook-form";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 2,
  py: 1,
  borderRadius: 2,
};

export function AddNewBoardModal({ data, setData }: any): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const methods = useForm<any>();
  const { handleSubmit, control, reset } = methods;
  function onSubmit(values: any): void {
    const newBoard = {
      id: Math.random(),
      name: values.boardName,
      shortDescription: values.desription,
    };
    setData([...data, newBoard]);
    reset();
    handleClose();
  }
  return (
    <>
      {" "}
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        sx={{ borderRadius: 5 }}
      >
        Add Board
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6">
              Add New Board
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <Controller
                name="boardName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Board Name"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="desription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                )}
              />

              <Stack direction="row-reverse" spacing={2}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: 5 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{ borderRadius: 5 }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
}
