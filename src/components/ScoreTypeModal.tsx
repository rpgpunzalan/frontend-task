import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import scoreTypes from "../enums/scoreTypes";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scoreType?: string | null;
  onConfirm: (fieldToUpdate:string, value:string) => void;
}

const ScoreTypeModal: React.FC<Props> = ({ open, setOpen, scoreType, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [selectedValue, setSelectedValue] = useState(scoreType);

  const toggle = () => {
    const newValue = !open;
    setOpen(newValue);
    setIsOpen(newValue);
  };

  const handleConfirm = () => {
	
	onConfirm('scoreType', selectedValue || "")
	toggle();

  }

  const handleSelectChange = (e: any) => {
    setSelectedValue(e.target.value)
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Filter</ModalHeader>
      <ModalBody>
        <div>
          <span>Score Type</span>
          <select value={selectedValue || 'Average'} onChange={handleSelectChange}>
            {scoreTypes.map((st) => (
              <option value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirm}>
          Save
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default ScoreTypeModal;
