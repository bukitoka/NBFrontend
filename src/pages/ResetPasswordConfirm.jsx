import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { resetPasswordConfirm } from "@/tools/auth"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const response = await resetPasswordConfirm(
      uid,
      token,
      data.password,
      data.confirmPassword
    )

    if (response.error === null) {
      toast.custom((t) => (
        <Success
          t={t}
          status="Success!"
          message="Your password has been reset."
        />
      ))
    } else {
      toast.custom((t) => (
        <Error
          t={t}
          status="Whoops!"
          message="Something went wrong. Please try again or contact us if the problem persists."
        />
      ))
    }

    setTimeout(() => {
      navigate("/signin")
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="self-start">
            <h2 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-white">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your new password below.
            </p>
          </div>

          <div className="flex flex-col w-full mt-8 space-y-4">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-5 text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  {...register("password", { required: true })}
                  className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium leading-5 text-gray-700 dark:text-gray-200"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  {...register("confirmPassword", { required: true })}
                  className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full mt-4">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                >
                  Reset Password
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordConfirm
