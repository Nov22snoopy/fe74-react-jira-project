import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAuthorize, getProjectCategory } from "../../store/project/thunkAction";
import { Navigate } from "react-router-dom";
const CreateProject = () => {
  const editorRef = useRef(null);
  const {projectCategories ,newProject} = useSelector((state)=> state.ProjectService)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProjectCategory())
  },[dispatch])
  const { register, handleSubmit } = useForm();

  if(newProject){
    return <Navigate to={'/projectList'}/>
  }  
  return (
    <div className="p-4 sm:ml-64 w-1/2 mx-auto">
      <h1 className="font-bold text-2xl mb-4">Create Project</h1>

      <form
        onSubmit={handleSubmit((value) => {
          const project = {
            projectName: value.projectName,
            description: editorRef?.current.getContent(),
            categoryId: Number( value.categoryId),
          };
          dispatch(createProjectAuthorize(project))
        })}
      >
        <div className="mb-6">
          <label
            htmlFor="projectName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="project name..."
            {...register("projectName")}
          />
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
              height: 300,
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
        <div className="mb-6">
          <label
            htmlFor="categoryId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Categories
          </label>
          <select
            name="categoryId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("categoryId")}
          >
            {
              projectCategories.map((item)=> {
                return (
                  <option key={item.id} value={item.id}>{item.projectCategoryName}</option>
                )
              })
            }
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
