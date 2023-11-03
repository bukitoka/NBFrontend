import React from "react"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "@/tools/auth"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"

const ResetPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const response = await resetPassword(data.email)

    console.log(response)

    if (response.error === null) {
      toast.custom((t) => (
        <Success
          t={t}
          status="Success!"
          message="Link to reset your password has been sent to your email."
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
      navigate("/")
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
              Enter your email below.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-200"
            >
              Email address
            </label>
            <div className="relative w-full mt-1">
              <input
                id="email"
                type="email"
                name="email"
                {...register("email", { required: true })}
                className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 dark:border-gray-700 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 dark:focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5"
              >
                Send reset link
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
