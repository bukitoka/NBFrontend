import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"
import { nanobeepa } from "@/assets"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { changePassword } from "@/tools/auth"

const ChangePassword = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const onSubmit = async (data) => {
    const payload = {
      old_password: data.old_password,
      new_password1: data.new_password1,
      new_password2: data.new_password2,
    }

    await handleChangePassword(payload)
  }

  const handleChangePassword = async (payload) => {
    const response = await changePassword(
      payload.old_password,
      payload.new_password1,
      payload.new_password2
    )

    if (response.error === null) {
      toast.custom((t) => (
        <Success
          t={t}
          status="Success!"
          message="Your password has been reset."
        />
      ))
      navigate("/signin")
    } else {
      toast.custom((t) => (
        <Error
          t={t}
          status="Whoops!"
          message="Something went wrong. Please try again or contact us if the problem persists."
        />
      ))
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-white h-screen block lg:grid lg:grid-cols-2">
      <div className="hidden relative lg:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1599022484226-1e18b28d32d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          alt=""
          className="h-full w-full object-cover object-bottom"
        />
        <div className="absolute bottom-0 mb-20 mx-20 backdrop-blur-[14px] bg-black/40 p-8 rounded-xl">
          <div className="flex flex-col items-center text-center">
            <h4 className="text-2xl font-bold tracking-tight text-zinc-200">
              <span className="block sm:inline">Secure and Safe Shopping</span>
            </h4>
            <p className="mt-3 text-xl text-zinc-200 italic">
              We are committed to protecting your privacy.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-8 md:px-32 lg:px-24 pt-16">
        <div className="py-12 sm:px-12">
          <div className="mb-3">
            <a href="/" className="flex justify-center">
              <img className="h-8 w-auto" src={nanobeepa} alt="nanobeepa.com" />
              <h2 className="text-2xl font-bold leading-9 tracking-tight bg-clip-text text-transparent bg-gradient-to-t from-yellow-600 to-yellow-200 ml-3">
                NanoBeepa
              </h2>
            </a>
            <h2 className="mb-6 mt-3 text-2xl text-center font-bold leading-9 tracking-tight text-zinc-800">
              Change your password
            </h2>
          </div>
          <form
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
              <label
                htmlFor="old_password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Old Password
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    id="old_password"
                    name="old_password"
                    {...register("old_password", {
                      required: "Old password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.old_password && (
                  <small className="mt-2 text-sm text-red-300">
                    {errors.old_password.message}
                  </small>
                )}
              </div>
            </div>
            <div className="w-full mt-6 lg:mt-0">
              <label
                htmlFor="new_password1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    id="new_password1"
                    name="new_password1"
                    type={showPassword ? "text" : "password"}
                    {...register("new_password1", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter and one number",
                      },
                    })}
                    className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.new_password1 && (
                  <small className="mt-2 text-sm text-red-300">
                    {errors.new_password1.message}
                  </small>
                )}
              </div>
            </div>
            <div className="w-full mt-6 lg:mt-0">
              <label
                htmlFor="new_password2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    id="new_password2"
                    name="new_password2"
                    type={showPassword ? "text" : "password"}
                    {...register("new_password2", {
                      validate: (value) =>
                        value === watch("new_password1") ||
                        "The passwords do not match",
                    })}
                    className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.new_password2 && (
                  <small className="mt-2 text-sm text-red-300">
                    {errors.new_password2.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-zinc-800 px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Change Password
              </button>
            </div>
          </form>

          <div>
            <div className="mt-10">
              <a
                href="/"
                className="font-semibold leading-6 text-yellow-600 hover:text-yellow-800 flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Cancel Password Reset
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
