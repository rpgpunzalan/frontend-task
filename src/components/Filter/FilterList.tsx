import React from "react";
import IUserFilter from "../../interfaces/IUserFilter";
import FilterItem from "./FilterItem";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DroppableId
} from "react-beautiful-dnd";

interface Props {
  userFilters: IUserFilter[];
  setUserFilters: React.Dispatch<React.SetStateAction<IUserFilter[]>>;
}

const FilterList: React.FC<Props> = ({ userFilters, setUserFilters }) => {
  const handleOnChange: (
    fieldToUpdate: string,
    value: string,
    idx: number
  ) => void = (fieldToUpdate: string, value: string, idx: number) => {
    console.log(fieldToUpdate, value, idx);
    const updatedFilters = userFilters;
    let updatedUserFilter = userFilters[idx];
    updatedUserFilter = {
      ...updatedUserFilter,
      [fieldToUpdate]: value,
    };

    console.log(updatedUserFilter);
    updatedFilters.splice(idx, 1, updatedUserFilter);

    setUserFilters([...updatedFilters]);
  };

  const droppableId:DroppableId = "filter-list";

  const handleDeleteFilter: (key: number) => void = (key: number) => {
    const newFilterArray = userFilters;
    console.log(key);
    newFilterArray.splice(key, 1);
    setUserFilters([...newFilterArray]);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log(destination, source)
     if (!destination) return;
     if (
       destination.droppableId === source.droppableId &&
       destination.index === source.index
     )
       return;
     const dest = destination.index;
     const src = source.index;
     const toBeMoved = userFilters[src];
     //going up
     if (dest < src) {
       userFilters.splice(src, 1);
       userFilters.splice(dest, 0, toBeMoved);
     }
     // going down
     else {
       userFilters.splice(dest + 1, 0, toBeMoved);
       userFilters.splice(src, 1);
     }

     setUserFilters([...userFilters]);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={droppableId}
        children={(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="filter-list"
          >
            {userFilters.map((userFilter, idx) => (
              <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    className=""
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <FilterItem
                      key={idx}
                      index={idx}
                      userFilter={userFilter}
                      onDelete={handleDeleteFilter}
                      onChange={handleOnChange}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      />
    </DragDropContext>
  );
};

export default FilterList;
