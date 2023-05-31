import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getProjectList,
  removeUserFromProject,
} from "../../store/project/thunkAction";
import AsignUserProject from "./AsignUserProject";
import { openDrawerAction } from "../../store/drawer/slice";
import { projectServiceActions } from "../../store/project/slice";
import { Avatar, Popconfirm, Popover, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const ProjectList = () => {
  const { projectList } = useSelector((state) => state.ProjectService);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectList());
    return () => {};
  }, [dispatch]);

  const columns = [
    //Project Id
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (_, { id }) => <div key={id}>{id}</div>,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    //Project Name
    {
      title: "Project Name",
      dataIndex: "projectName, id",
      key: "projectName",
      render: (_, { projectName, id }) => (
        <NavLink key={id} to={`/projectDetail/${id}`}>
          {projectName}
        </NavLink>
      ),
      sorter: (a, b) => {
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = b.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    //Project Category
    {
      title: "Project Category",
      dataIndex: "categoryName, id",
      key: "categoryId",
      render: (_, { categoryName, id }) => <div key={id}>{categoryName}</div>,
      sorter: (a, b) => {
        let categoryName1 = a.categoryName?.trim().toLowerCase();
        let categoryName2 = b.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    //Creator
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (_, { creator, id }) => (
        <div key={id}>
          {(() => {
            let color = creator.name.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={creator.id}>
                {creator.name.toUpperCase()}
              </Tag>
            );
          })()}
        </div>
      ),
      sorter: (a, b) => {
        let creator1 = a.creator?.name.trim().toLowerCase();
        let creator2 = b.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    //Members
    {
      title: "Member",
      dataIndex: "members id",
      key: "members",
      render: (_, { members, id }) => (
        <div className="flex items-center" key={id}>
          {members.map((member) => {
            return (
              <Popover
                key={member.userId}
                title="Members"
                content={
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => {
                        return (
                          <tr key={member.userId}>
                            <td>{member.userId}</td>
                            <td>{member.name}</td>
                            <td>
                              <button
                                className="btn btn-danger px-2 py-0.5"
                                onClick={() => {
                                  const user = {
                                    projectId: id,
                                    userId: member.userId,
                                  };
                                  dispatch(removeUserFromProject(user));
                                }}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                }
              >
                <Avatar className="mr-2" key={member.userId}>
                  {member.name.slice(0, 2).toUpperCase()}
                </Avatar>
              </Popover>
            );
          })}
          <span >
            {" "}
            <AsignUserProject id={id} />
          </span>
        </div>
      ),
    },
    //Actions
    {
      title: "Actions",
      key: "actions",
      dataIndex: "id, categoryId ",
      render: (_, { id, categoryId }) => (
        <Space key={id}>
          <button
            className="btn btn-info p-1"
            onClick={() => {
              dispatch(openDrawerAction.openDrawer());
              dispatch(projectServiceActions.getProjectId(id));
              dispatch(projectServiceActions.getProjectCategoryId(categoryId));
            }}
          >
            <EditOutlined className="text-white p-2" />
          </button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this project?"
            okText="Yes"
            cancelText="No"
            okType="default"
            onConfirm={() => {
              dispatch(deleteProject(id));
            }}
          >
            <button className="btn btn-danger p-1"><DeleteOutlined className="text-white p-2" /></button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {/* <table className="table-striped w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Project Category</th>
            <th>Creator</th>
            <th>Member</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectList?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <NavLink to={`/projectDetail/${item.id}`}>
                    {item.projectName}
                  </NavLink>
                </td>
                <td>{item.categoryName}</td>
                <td>{item.creator.name}</td>
                <td>
                  {item.members.map((member) => {
                    return (
                      <Popover
                        key={member.userId}
                        title="Members"
                        content={
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.members.map((member) => {
                                return (
                                  <tr key={member.userId}>
                                    <td>{member.userId}</td>
                                    <td>{member.name}</td>
                                    <td>
                                      <button
                                        className="bg-red"
                                        onClick={() => {
                                          const user = {
                                            projectId: item.id,
                                            userId: member.userId,
                                          };
                                          dispatch(removeUserFromProject(user));
                                        }}
                                      >
                                        X
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        }
                      >
                        <Avatar className="mr-2" key={member.userId}>
                          {member.name.slice(0, 2).toUpperCase()}
                        </Avatar>
                      </Popover>
                    );
                  })}
                  <span>
                    {" "}
                    <AsignUserProject id={item.id} />
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      dispatch(openDrawerAction.openDrawer());
                      dispatch(projectServiceActions.getProjectId(item.id));
                      dispatch(
                        projectServiceActions.getProjectCategoryId(
                          item.categoryId
                        )
                      );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-1"
                    onClick={() => {
                      dispatch(deleteProject(item.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <Table
        columns={columns}
        dataSource={projectList}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default ProjectList;
