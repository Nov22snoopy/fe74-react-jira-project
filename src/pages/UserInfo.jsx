import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editUser } from "../store/user/thunkAction";
const UserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: onchange,
  });
  useEffect(() => {
    reset({
      email: userInfo.email,
      name: userInfo.name,
      phoneNumber: userInfo.phoneNumber,
    });
  }, [reset, userInfo.email, userInfo.phoneNumber, userInfo.name]);
  console.log(userInfo);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ml-auto mr-auto w-2/3 shadow-lg md:mt-10">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Updatate your account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit((value) => {
            const editedUser = {
              id: userInfo.id,
              name: value.name,
              email: value.email,
              passWord: value.passWord,
              phoneNumber: value.phoneNumber
            }
            dispatch(editUser(editedUser))
          })}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email is not valid",
                },
              })}
            />
            <p className="text-[13px] text-red-500">{errors?.email?.message}</p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("passWord", {
                required: "Please enter your password",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                  message:
                    "At least 1 special character, 1 number , 1 upper case word",
                },
              })}
            />
            <p className="text-[13px] text-red-500">
              {errors?.passWord?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Nguyễn Văn A"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("name", {
                required: "Please enter your name",
              })}
            />
            <p className="text-[13px] text-red-500">{errors?.name?.message}</p>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="+8409023356"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("phoneNumber", {
                required: "Please enter your phone number",
              })}
            />
            <p className="text-[13px] text-red-500">
              {errors?.phoneNumber?.message}
            </p>
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
