import React from "react";
import { Input,Avatar } from "antd";
const { Search } = Input;
const onSearch = (value) => console.log(value);

const TaskFilter = (props) => {
  const { projectDetail } = props;
  return (
    <div className="board-filters flex items-center ">
      <Search
        placeholder="search task"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />{" "}
      <div className="task-member ml-3 ">
        {projectDetail?.members.map((member, index) => {
          return (
            <Avatar className="mr-2 cursor-pointer hover:translate-y-[-5px] transition-all" key={member.userId}>
              {member.name.slice(0, 2).toUpperCase()}
            </Avatar>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilter;
