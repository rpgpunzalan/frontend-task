import React from "react";
import IFilterOption from "../../../interfaces/IFilterOption";

interface Props {
  optionDetails: IFilterOption;
  setShowTooltip: React.Dispatch<React.SetStateAction<Boolean>>;
  setTooltipDetails: React.Dispatch<React.SetStateAction<String[]>>;
  onClick: (optionDetails: IFilterOption) => void;
}

const FilterOption: React.FC<Props> = ({
  optionDetails,
  setShowTooltip,
  setTooltipDetails,
  onClick
}) => {
  const handleShowTooltip = () => {
    setShowTooltip(true);
	setTooltipDetails(optionDetails.sample)
  };
  const handleHideTooltip = () => {
    setShowTooltip(false);
  };

  const handleOnClick = () => {
	onClick(optionDetails)
  }
  return (
    <div
      className="filter-option-container"
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleHideTooltip}
	  onClick={handleOnClick}
    >
      <div className="filter-option">{optionDetails.sampleHeader}</div>
    </div>
  );
};

export default FilterOption;
