import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Select: React.FC = ({ ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="light" caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem>Some Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Select;
