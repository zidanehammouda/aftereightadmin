import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EditCategoryTable = ({
  onDragEnd,
  Articles,
  updateFieldChanged,
  setShowPopUp,
  deleteArticle,
}) => {
  return (
    <table className="articles_table">
      <thead>
        <tr>
          <th style={{ width: "5%" }}></th>
          <th style={{ width: "55%" }}>Article</th>
          <th style={{ width: "20%" }}>Price</th>
          <th style={{ width: "10%" }}></th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {Articles.map((element, index) => (
                <Draggable
                  key={element._id}
                  draggableId={"draggable-" + element._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                          ? "0 0 .4rem #666"
                          : "none",
                      }}
                    >
                      <td className="Movebuttons">
                        <i
                          className="fa-solid fa-bars"
                          {...provided.dragHandleProps}
                        ></i>
                      </td>

                      <td>
                        <input
                          className="articles_table_input"
                          type="text"
                          id="name"
                          name="name"
                          value={element.name || ""}
                          onChange={updateFieldChanged(index)}
                        />
                      </td>
                      <td>
                        <input
                          className="noscroll articles_table_input"
                          type="number"
                          id="price"
                          name="price"
                          value={element.price || ""}
                          onChange={updateFieldChanged(index)}
                        />
                      </td>
                      <td>
                        <i
                          class="fa-regular fa-pen-to-square fa-lg"
                          style={{ color: "var(--color-secondary)" }}
                          onClick={() => setShowPopUp(index)}
                        ></i>
                      </td>
                      <td>
                        <i
                          class="fa-solid fa-trash fa-lg"
                          onClick={() => deleteArticle(index)}
                          style={{ color: "var(--color-dark)" }}
                        ></i>
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    </table>
  );
};
export default EditCategoryTable;
