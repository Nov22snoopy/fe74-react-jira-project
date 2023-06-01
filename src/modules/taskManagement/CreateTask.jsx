import { Modal, Select, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction } from "../../store/taskModal/slice";
import { createTask, getPiority, getTaskType } from "../../store/task/thunkAction";
import { getALLUser } from "../../store/user/thunkAction";
import { useForm } from "react-hook-form";

const CreateTask = (props) => {
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const { onOpen } = useSelector((state) => state.OpenModal);
  const { taskType, priority, isLoading, newTask } = useSelector((state) => state.TaskService);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const onClose = () => {
    dispatch(openModalAction.closeModal());
  }; const { register, handleSubmit, setValue, reset } = useForm({
  
  });
  useEffect(() => {
    dispatch(getTaskType());
    dispatch(getALLUser());
    dispatch(getPiority());
    reset()
  }, [dispatch,isLoading,newTask,reset]);
 

  return (
    <Modal
      open={onOpen}
      onCancel={() => {
        onClose();
      }}
      okButtonProps={{
        ghost: true,
      }}
      style={{
        top: 30,
      }}
      width={"50%"}
      footer={null}
    >
      <h1 className="text-xl font-bold">Create Task</h1>
      <div className="container">
        <div className="form-group">
          <form onSubmit={handleSubmit((value)=>{
            const taskItem = {
              listUserAsign: value.listUserAsign,
              taskName: value.taskName,
              description:editorRef?.current.getContent(),
              statusId : '1',
              originalEstimate: Number(value.originalEstimate),
              timeTrackingSpent: Number(timeTracking.timeTrackingSpent),
              timeTrackingRemaining: Number(timeTracking.timeTrackingRemaining),
              projectId: props.projectDetail.id,
              typeId: Number(value.typeId),
              priorityId: Number(value.priorityId)
            };
            console.log(taskItem);
            dispatch(createTask(taskItem))
            onClose()
          })}>
            <div className="mb-6">
              <label
                htmlFor="taskName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Name
              </label>
              <input
                name="taskName"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Task name..."
                {...register('taskName')}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="taskType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task Type
                </label>
                <select
                  name="typeId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('typeId')}
                >
                  {taskType?.map((type) => {
                    return (
                      <option key={type.id} value={type.id}>
                        {type.taskType}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="priorityId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Piority
                </label>
                <select
                  name="piorityId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('priorityId')}
                >
                  {priority?.map((item) => {
                    return (
                      <option key={item.priorityId} value={item.priorityId}>
                        {item.description}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="listUserAsign"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Asign user
              </label>
              <Select
                fieldNames={"listUserAsign"}
                mode="multiple"
                size={"middle"}
                options={props.projectDetail?.members.map((item) => {
                  return { value: item.userId, label: item.name };
                })}
                optionFilterProp="label"
                onChange={(value)=>{
                  setValue('listUserAsign',value)
                }}
                onSearch={(value) => {
                  console.log(value);
                }}
                onSelect={(value) => {
                  console.log(value);
                }}
                placeholder="Please select"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6">
                <label
                  htmlFor="originalEstimate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Original estimate
                </label>
                <input
                  name="originalEstimate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  min={0}
                  {...register('originalEstimate')}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="timeTracking"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Time tracking
                </label>
                <Slider
                  defaultValue={30}
                  tooltip={true}
                  value={timeTracking.timeTrackingSpent}
                  max={
                    Number(timeTracking.timeTrackingSpent) +
                    Number(timeTracking.timeTrackingRemaining)
                  }
                />
                <div className="flex justify-between">
                  <div>
                    <p>Time tracking spend</p>
                    <input
                      name="timeTrackingSpent"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      min={0}
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingSpent: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p>Time tracking remaining</p>
                    <input
                      name="timeTrackingRemaining"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      min={0}
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingRemaining: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <Editor
                textareaName="description"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p></p>"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-2"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTask;
