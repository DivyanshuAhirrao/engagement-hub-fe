import React from "react";
import { Dialog, Bar, Button } from "@ui5/webcomponents-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      headerText={title}
      footer={
        <Bar
          endContent={
            <>
              <Button onClick={onCancel}>Cancel</Button>
              <Button design="Emphasized" onClick={onConfirm}>
                Confirm
              </Button>
            </>
          }
        />
      }
    >
      <div style={{ padding: "1rem" }}>{message}</div>
    </Dialog>
  );
};

export default ConfirmDialog;
