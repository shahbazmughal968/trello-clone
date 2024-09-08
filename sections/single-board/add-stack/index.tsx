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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

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

export function AddStackModal({ data, setData }: any): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const methods = useForm<any>();
  const { handleSubmit, control, reset } = methods;
  function onSubmit(values: any): void {
    const newBoard = {
      id: `${Math.random()}`,
      stackName: values.stackName,
      tasks: [{ id: `${Math.random()}`, taskName: "Jira Ticket" }],
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
        variant="contained"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        sx={{ borderRadius: 5 }}
      >
        Add Stack
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
              Add Stack
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <Controller
                name="stackName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Stack Name"
                    variant="outlined"
                    fullWidth
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
