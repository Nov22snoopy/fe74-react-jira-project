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
import { Avatar, Popover } from "antd";
import { NavLink } from "react-router-dom";
const ProjectList = () => {
  const { projectList } = useSelector((state) => state.ProjectService);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectList());
    return () => {};
  }, [dispatch]);
  return (
    <div>
      <table className="table-striped w-full">
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
                  <NavLink to={`/projectDetail/${item.id}`}>{item.projectName}</NavLink>
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
      </table>
    </div>
  );
};

export default ProjectList;
