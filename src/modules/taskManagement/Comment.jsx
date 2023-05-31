import { Avatar, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  editComment,
  getAllComment,
  insertComment,
} from "../../store/comment/thunkAction";
import { useSelector } from "react-redux";

const Comment = (props) => {
  const [comment, setComment] = useState("");
  const [editingComment, setEditingComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { taskId } = props;
  const { allComment, newComment, isLoading } = useSelector(
    (state) => state.CommentService
  );
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  useEffect(() => {
    dispatch(getAllComment(taskId));
  }, [dispatch, taskId, newComment, isLoading, edit]);
  const mainUser = JSON.parse(localStorage.getItem("user")).name;
  return (
    <div>
      <div className="insert-comment">
        <label
          htmlFor="contentComment"
          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >
          Comments
        </label>
        <div className="flex mt-3">
          <Avatar className="mr-2">{mainUser.slice(0, 2).toUpperCase()}</Avatar>
          {openComment ? (
            <div className="w-full">
              <textarea
                name="contentComment"
                cols="30"
                rows="3"
                placeholder="Add comment ..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(value) => {
                  setComment(value.target.value);
                }}
              ></textarea>
              <div className="flex mt-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const insertedComment = {
                      taskId: taskId,
                      contentComment: comment,
                    };
                    console.log(insertedComment);
                    dispatch(insertComment(insertedComment));
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center"
                >
                  Save
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenComment(false)
                  }}
                  className="text-black bg-neutral-200 hover:bg-neutral-400 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm w-full px-3 py-2 sm:w-auto text-center ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full py-2 border rounded-lg"
            onClick={()=>{setOpenComment(true)}}>
              <p className="ml-2 mt-1">Add comment ...</p>
            </div>
          )}
        </div>
      </div>
      <div className="comment-list mt-6">
        {allComment?.map((comment, index) => {
          return (
            <div key={index} className="flex mb-6 ml-4">
              <Avatar className="mr-2">
                {comment.user.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <div>
                <h1>{comment.user.name}</h1>
                {edit ? (
                  <div>
                    <textarea
                      cols="20"
                      rows="3"
                      defaultValue={comment.contentComment}
                      onChange={(e) => {
                        setEditingComment(e.target.value);
                      }}
                    ></textarea>
                    <div className="flex">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          const editedComment = {
                            contentComment: editingComment,
                            id: comment.id,
                          };
                          dispatch(editComment(editedComment));
                          setEdit(false);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="text-black bg-neutral-200 hover:bg-neutral-400 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm w-full px-3 py-2 sm:w-auto text-center ml-2"
                        onClick={() => {
                          setEdit(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{comment.contentComment}</p>
                )}
                <div className="">
                  <span
                    onClick={() => {
                      setEdit(true);
                    }}
                    className="cursor-pointer hover:underline transition-all"
                  >
                    Edit
                  </span>
                  <Popconfirm
                    title="Delete comment"
                    description="Are you sure to delete this comment"
                    onConfirm={() => {
                      dispatch(deleteComment(`${comment.id}`));
                    }}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span className="cursor-pointer hover:underline transition-all ml-3">
                      Delete
                    </span>
                  </Popconfirm>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
