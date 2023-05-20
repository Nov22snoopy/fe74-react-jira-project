import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProjectList } from "../store/project/thunkAction";
import UpdateProject from "./UpdateProject";

const ProjectList = () => {
  const { projectList } = useSelector((state) => state.ProjectService);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectList());
    return ()=>{
    }
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
          {projectList.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.projectName}</td>
                <td>{item.categoryName}</td>
                <td>{item.creator.name}</td>
                <td>{item.member}</td>
                <td>
                  <UpdateProject id ={item.id} category = {item.categoryId} />

                  <button
                    className="btn btn-danger ml-1"
                    onClick={() => {
                      dispatch(deleteProject(item.id))
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
