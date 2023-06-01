import { Avatar, Dropdown, Modal, Popconfirm, Slider, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction } from "../../store/taskModal/slice";
import {
  assignUserTask,
  editDescription,
  editEstimate,
  editPriority,
  editStatus,
  editTimeTracking,
  getPiority,
  getStatus,
  getTaskDetail,
  removeTask,
  removeUserTask,
} from "../../store/task/thunkAction";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import Comment from "./Comment";

const EditTask = (props) => {
  const [viewDesc, setViewDesc] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { onOpenEdit } = useSelector((state) => state.OpenModal);
  const { taskDetail, taskId, status, priority, isLoading } = useSelector(
    (state) => state.TaskService
  );

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(openModalAction.closeEditTask());
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const editorRef = useRef(null);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (onOpenEdit) {
      dispatch(getTaskDetail(taskId));
    }
    dispatch(getStatus());
    dispatch(getPiority());
  }, [dispatch, taskId, isLoading,onOpenEdit]);
  const items = props.members
    ?.filter((member) => {
      let index = taskDetail?.assigness.findIndex(
        (user) => user.id === member.userId
      );
      if (index !== -1) {
        return false;
      }
      return true;
    })
    .map((user, index) => {
      return { key: user.userId, label: user.name, icon: <UserOutlined /> };
    });
  const handleMenuClick = (e) => {
    const user = {
      taskId: taskId,
      userId: Number(e.key),
    };
    dispatch(assignUserTask(user));
  };
  return (
    <Modal
      open={onOpenEdit}
      style={{ top: 30 }}
      onCancel={() => {
        onClose();
      }}
      width={"50%"}
      footer={null}
    >
      <div className="form-group  ">
        <form action="">
          <div className="taskId flex justify-between">
            <p className="text-gray-500">Task-{taskId}</p>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              okType="default"
              onConfirm={() => {
                dispatch(removeTask(taskId));
                onClose();
              }}
              // onClick={() => {
              //   dispatch(removeTask(taskId));
              //   onClose();
              // }}
              className="  mr-[45px] relative  transition-all "
            >
              <DeleteOutlined className="absolute top-[-4.5px] text-lg bg-gray-10 hover:bg-gray-200 px-1 pb-1 cursor-pointer transition-all" />
            </Popconfirm>
          </div>
          <div className=" grid md:grid-cols-3 md:gap-6">
            <div className=" form-left mb-6 col-span-2">
              <div className="taskName">
                <h1 className="text-2xl font-bold">{taskDetail?.taskName}</h1>
              </div>
              <div className="mb-6 mt-6 description">
                <label
                  htmlFor="description"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <div className="cursor-pointer">
                  {viewDesc ? (
                    <div>
                      <Editor
                        textareaName="description"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={taskDetail?.description}
                        init={{
                          height: 400,
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
                      <div className=" mt-1 flex">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            const editedDescription = {
                              taskId: taskId,
                              description: editorRef?.current.getContent(),
                            };
                            console.log(editedDescription);
                            dispatch(editDescription(editedDescription));
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={() => {
                            setViewDesc(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setViewDesc(true);
                      }}
                    >
                      {taskDetail?.description
                        ? parse(taskDetail.description)
                        : ""}
                    </div>
                  )}
                </div>

                {/* <Editor
                  textareaName="description"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p></p>"
                  init={{
                    height: 500,
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
                /> */}
              </div>
              <div className="mb-6 mt-6 comment">
                <Comment taskId={taskId} />
              </div>
            </div>
            <div className="form-right">
              <div className="mb-6 statusId">
                <label
                  htmlFor="statusId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  name="statusId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    const editedStatus = {
                      taskId: taskId,
                      statusId: e.target.value,
                    };
                    console.log(editedStatus);
                    dispatch(editStatus(editedStatus));
                    onClose();
                  }}
                >
                  {status?.map((item) => {
                    if (taskDetail?.statusId === item.statusId) {
                      return (
                        <option
                          selected
                          value={item.statusId}
                          key={item.statusId}
                        >
                          {item.statusName}
                        </option>
                      );
                    } else {
                      return (
                        <option value={item.statusId} key={item.statusId}>
                          {item.statusName}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className="mb-6 listUserAsign ">
                <label
                  htmlFor="listUserAsign"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Assignees
                </label>
                {/* <Select
                  fieldNames={"listUserAsign"}
                  mode="multiple"
                  size={"middle"}
                  optionFilterProp="label"
                  onChange={(value) => {
                    console.log(value);
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
                /> */}
                <div className="grid md:grid-cols-3 md:gap-6">
                  {taskDetail?.assigness.map((user) => {
                    return (
                      <div
                        className="bg-gray-100 rounded-lg flex items-center"
                        key={user.id}
                      >
                        <Avatar className="mx-1" key={user.id}>
                          {user.name.slice(0, 2).toUpperCase()}
                        </Avatar>
                        <span className="ml-auto mr-2 cursor-pointer">
                          <DeleteOutlined
                            className="text-xl"
                            onClick={() => {
                              const deletedUser = {
                                taskId: taskId,
                                userId: user.id,
                              };
                              dispatch(removeUserTask(deletedUser));
                            }}
                          />
                        </span>
                      </div>
                    );
                  })}
                  <Dropdown
                    menu={{
                      items,
                      onClick: handleMenuClick,
                    }}
                    trigger={["click"]}
                  >
                    <Space>
                      <span className="text-blue-500 cursor-pointer hover:underline transition-all mt-1">
                        +Add user
                      </span>
                    </Space>
                  </Dropdown>
                </div>
              </div>
              <div className="mb-6 piorityId">
                <label
                  htmlFor="piorityId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Piority
                </label>
                <select
                  name="piorityId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    const editedPiority = {
                      taskId: taskId,
                      priorityId: Number(e.target.value),
                    };
                    dispatch(editPriority(editedPiority));
                    onClose();
                  }}
                >
                  {priority?.map((item) => {
                    if (taskDetail?.priorityId === item.priorityId) {
                      return (
                        <option
                          selected
                          value={item.priorityId}
                          key={item.priorityId}
                        >
                          {item.priority}
                        </option>
                      );
                    } else {
                      return (
                        <option value={item.priorityId} key={item.priorityId}>
                          {item.priority}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className="mb-6 estimate">
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
                  defaultValue={taskDetail?.originalEstimate}
                  min={0}
                  onChange={(e) => {
                    const editedEstimate = {
                      taskId: taskId,
                      originalEstimate: Number(e.target.value),
                    };
                    dispatch(editEstimate(editedEstimate));
                  }}
                />
              </div>
              <div className="mb-6 timeTracking">
                <label
                  htmlFor="timeTracking"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Time tracking
                </label>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <Slider
                    value={taskDetail?.timeTrackingSpent}
                    max={
                      Number(taskDetail?.timeTrackingSpent) +
                      Number(taskDetail?.timeTrackingRemaining)
                    }
                  />
                  <div className="flex justify-between">
                    <span className="font-bold">
                      {taskDetail?.timeTrackingSpent}h logged
                    </span>
                    <span className="font-bold">
                      {taskDetail?.timeTrackingRemaining}h remain
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Modal open={openModal} onCancel={onCloseModal} footer={null}>
        <form
          onSubmit={handleSubmit((value) => {
            const editedTimeTracking = {
              taskId: taskId,
              timeTrackingSpent: Number(value.timeTrackingSpent),
              timeTrackingRemaining: Number(value.timeTrackingRemaining),
            };
            dispatch(editTimeTracking(editedTimeTracking));
          })}
        >
          <label
            htmlFor="timeTracking"
            className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
          >
            Time tracking
          </label>
          <Slider
            value={taskDetail?.timeTrackingSpent}
            max={
              Number(taskDetail?.timeTrackingSpent) +
              Number(taskDetail?.timeTrackingRemaining)
            }
          />
          <div className="flex justify-between">
            <span className="font-bold">
              {taskDetail?.timeTrackingSpent}h logged
            </span>
            <span className="font-bold">
              {taskDetail?.timeTrackingRemaining}h remain
            </span>
          </div>
          <div className="form-group grid md:grid-cols-2 md:gap-6 mt-6">
            <div className="mb-6">
              <label
                htmlFor="timeTrackingSpent"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time spent (hours)
              </label>
              <input
                defaultValue={taskDetail?.timeTrackingSpent}
                name="timeTrackingSpent"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                {...register("timeTrackingSpent")}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="timeTrackingRemain"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time remain (hours)
              </label>
              <input
                defaultValue={taskDetail?.timeTrackingRemaining}
                name="timeTrackingRemaining"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                {...register("timeTrackingRemaining")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-3 py-2"
          >
            Save
          </button>
        </form>
      </Modal>
    </Modal>
  );
};

export default EditTask;
