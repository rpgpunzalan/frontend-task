import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Select from "../common/Select";
import IUserFilter from "../../interfaces/IUserFilter";
import types from "../../enums/types";
import ScoreTypeModal from "../ScoreTypeModal";

interface Props {
  userFilter: IUserFilter;
  index: number;
  onDelete: (key: number) => void;
  onChange: (fieldToUpdate:string, value:string, idx: number) => void;
}

const FilterItem: React.FC<Props> = ({ userFilter, index, onDelete, onChange }) => {

  const [isScoreTypeModalOpen, setIsScoreTypeModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(index);
  };

  const handleOnChange = (fieldToUpdate:string, value:string) => {
    onChange(fieldToUpdate, value, index)
    if(value==="Score") {
      onChange('scoreType', "Average", index)
    }
  }
  return (
    <div className="filter-item">
      <ScoreTypeModal open={isScoreTypeModalOpen} setOpen={setIsScoreTypeModalOpen} scoreType={userFilter.scoreType} onConfirm={handleOnChange} />
      <div>
        <FontAwesomeIcon icon={"grip-vertical"} className="ml-2" />
      </div>
      <div className="w-50">
        <span className="filter-name-container w-100">{userFilter.name}</span>
      </div>
      <div className="d-flex align-items-center">
        <span className="pr-3">Type</span>
        {/* <Select /> */}
        <select className="w-100 p-2 pr-3" onChange={(e) => handleOnChange('type', e.target.value)}>
          {types.map((type, idx) => (
            <option key={idx} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{width: '50px'}}>
        <div className="border-1">
          {
            userFilter.type === "Score" && 
            <button className="" onClick={()=>{setIsScoreTypeModalOpen(true)}}>
              <FontAwesomeIcon icon={"cog"} />
            </button>
          }
        </div>
      </div>
      <div>
        <button className="" onClick={handleDelete}>
          <FontAwesomeIcon icon={"trash"} color="red" />
        </button>
      </div>
    </div>
  );
};

export default FilterItem;
