import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface PopupModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onConfirmModal: () => void;
  onCloseModal: () => void;
}

function PopupModal(props: PopupModalProps) {
  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);

  return (
    <>
      <Dialog open={props.isOpen} size={"sm"}>
        <DialogHeader>{props.title}</DialogHeader>
        <DialogBody>{props.children}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => props.onCloseModal()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => props.onConfirmModal()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default PopupModal;
