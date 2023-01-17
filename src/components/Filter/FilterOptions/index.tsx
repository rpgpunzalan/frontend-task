import React, { useState } from "react";
import FilterOption from "./FilterOption";
import IFilterOption from "../../../interfaces/IFilterOption";
import IUserFilter from "../../../interfaces/IUserFilter";

interface Props {
  optionsList: IFilterOption[];
  setUserFilters: React.Dispatch<React.SetStateAction<IUserFilter[]>>;
}

const FilterOptions: React.FC<Props> = ({ optionsList, setUserFilters }) => {
  const [showTooltip, setShowTooltip] = useState<Boolean>(false);
  const [tooltipDetails, setTooltipDetails] = useState<String[]>([]);

  const truncate = (str: String, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  const handleSelectFilter: (optionDetails: IFilterOption) => void = (
    optionDetails: IFilterOption
  ) => {
    setUserFilters((prev) => [
      ...prev,
      {
        name: optionDetails.sampleHeader,
        type: "Default",
        scoreType: null,
        order: prev.length,
      },
    ]);
    // setUserFilters()
  };
  return (
    <div className="d-flex">
      <div className="filter-options">
        {optionsList &&
          optionsList.map((option) => (
            <FilterOption
              optionDetails={option}
              setShowTooltip={setShowTooltip}
              setTooltipDetails={setTooltipDetails}
              onClick={handleSelectFilter}
            />
          ))}
      </div>
      {showTooltip && (
        <div className="filter-option-tooltip">
          <div className="">
            <h4>Sample data</h4>
            <div className="sample-data-container">
              {tooltipDetails.map((item) => (
                <div>{truncate(item, 100)}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
