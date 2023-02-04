import React from "react";
import { IconButton, Typography, Dialog, Button, DialogActions, DialogContent, DialogTitle, Box, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Modal({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
  len,
}) {
  const theme = useTheme();
  const handleClick = () => {
    handleSave();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose} style={{marginBottom: "15px"}} >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          disabled={len === 0}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: theme.shape.borderRadius,
            fontSize: "12px",
          }}
          onClick={handleClick}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}