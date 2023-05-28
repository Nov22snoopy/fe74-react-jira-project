import React, { useRef, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Space, Popover, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user/thunkAction";
import { asignUserProject } from "../../store/project/thunkAction";
const AsignUserProject = (props) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { searchUser } = useSelector((state) => state.UserService);
  const searchUserRef = useRef(null);
  return (
    <>
      <Popover
        placement="topLeft"
        title={"Add User"}
        content={
          <AutoComplete
            style={{
              width: 200,
            }}
            options={searchUser?.map((user, index) => {
              return { label: user.name, value: user.userId.toString() };
            })}
            onSearch={(value) => {
              if(searchUserRef.current){
                clearTimeout(searchUserRef.current)
              }
              searchUserRef.current = setTimeout(() => {
                dispatch(getUser(value));
              }, 300);
            }}
            onChange={(value) => {
              setValue(value);
            }}
            value={value}
            onSelect={(value, options) => {
              setValue(options.label);
              const user = {
                projectId: props.id,
                userId: Number(value),
              };
              dispatch(asignUserProject(user));
            }}
            placeholder="Search user"
          />
        }
        trigger="click"
      >
        <Space>
          <PlusCircleOutlined className="hover:text-blue-500 transition-all text-2xl cursor-pointer my-2" />
        </Space>
      </Popover>
    </>
    // <Dropdown
    //   overlayStyle={{ overflowY: "scroll", height: "250px", }}
    //   menu={{
    //     items,
    //   }}
    // >
    //   <button onClick={(e) => e.preventDefault()}>
    //     <Space>
    //       <PlusCircleOutlined className="hover:text-blue-500 transition-all text-xl mr-2 p-1" />
    //     </Space>
    //   </button>
    // </Dropdown>
  );
};

export default AsignUserProject;
