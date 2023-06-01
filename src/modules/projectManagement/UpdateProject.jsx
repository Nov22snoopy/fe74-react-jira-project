import { Drawer, Space } from "antd";
import { useEffect, useRef, memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectCategory,
  getProjectDetail,
  updateProject,
} from "../../store/project/thunkAction";
import { openDrawerAction } from "../../store/drawer/slice";
const UpdateProject = () => {
  const editorRef = useRef(null);
  const { projectCategories, projectId, projectDetail, projectCategoryId } =
    useSelector((state) => state.ProjectService);
  const { onOpen } = useSelector((state) => state.OpenDrawer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectCategory());
  }, [dispatch]);
  useEffect(() => {
    if(onOpen) {
      dispatch(getProjectDetail(projectId));
    }
  }, [dispatch, projectId, onOpen]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    reset(projectDetail);
  }, [reset, projectDetail]);
  const Onclose = () => {
    dispatch(openDrawerAction.closeDrawer());
  };

  return (
    <>
      <Space></Space>
      <Drawer
        title={<h1 className="text-2xl mt-3 font-bold">Update Project</h1>}
        placement="right"
        size="large"
        onClose={Onclose}
        open={onOpen}
      >
        <form
          onSubmit={handleSubmit((value) => {
            const project = {
              id: Number(projectDetail?.id),
              projectName: value.projectName,
              description: editorRef?.current.getContent(),
              categoryId: value.categoryId,
            };
            dispatch(updateProject(project));
            Onclose();
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
              name="projectName"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="project name..."
              {...register("projectName", {
                required: "Please insert project name",
              })}
            />
            <p className="text-[13px] text-red-500">{errors?.projectName?.message}</p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <Editor
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={projectDetail?.description}
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
              defaultValue={projectCategoryId}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("categoryId")}
            >
              {projectCategories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </Drawer>
    </>
  );
};
export default memo(UpdateProject);
