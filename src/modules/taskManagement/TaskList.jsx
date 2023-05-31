import React from "react";
import { useDispatch } from "react-redux";
import { openModalAction } from "../../store/taskModal/slice";
import EditTask from "./EditTask";
import { Avatar } from "antd";
import { taskServiceActions } from "../../store/task/slice";
import parse from "html-react-parser";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { editStatus } from "../../store/task/thunkAction";

const TaskList = (props) => {
  const dispatch = useDispatch();
  const handleDragEnd = (result) => {
    console.log(result);
    let{source,destination}=result
    if(!result.destination) {
      return;
    }
    if(source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    const projectStatus = {
      taskId: Number(result.draggableId),
      statusId: destination.droppableId ,
    }
    dispatch(editStatus(projectStatus))
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="main-broad grid md:grid-cols-4 md:gap-6  ">
        {props.projectDetail?.lstTask.map((item) => {
          return (
            <Droppable key={item.statusId} droppableId={item.statusId}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    key={item.statusId}
                    className="w-full p-2 bg-gray-100 min-h-[300px] h-auto rounded-md shadow-md"
                  >
                    <div>
                      <h1>{item.statusName}</h1>
                    </div>
                    <div>
                      {item?.lstTaskDeTail.map((task, i) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={i}
                            draggableId={task.taskId.toString()}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={i}
                                  className=" bg-sky-50 hover:bg-sky-100 task-item bg-x mt-2 rounded-md p-1 hover:shadow-lg  transition-all cursor-pointer"
                                  onClick={() => {
                                    dispatch(openModalAction.openEditTask());
                                    dispatch(
                                      taskServiceActions.getTaskId(task.taskId)
                                    );
                                  }}
                                >
                                  <span>{parse(task.taskName)}</span>
                                  <div className="mt-3 flex justify-between">
                                    {task.priorityTask.priority}{" "}
                                    <div>
                                      {task.assigness.map((user) => {
                                        return (
                                          <Avatar
                                            className="mx-1"
                                            key={user.id}
                                          >
                                            {user.name
                                              .slice(0, 2)
                                              .toUpperCase()}
                                          </Avatar>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          );
        })}
        <EditTask id={props.projectDetail?.id} members={props.projectDetail?.members}/>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
