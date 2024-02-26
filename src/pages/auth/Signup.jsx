import { nanobeepa, google } from "@/assets"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuthStore from "@/store/authStore"
import toast from "react-hot-toast"
import { signup } from "@/tools/auth"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"
import verifyRecaptcha from "@/tools/recaptcha"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

const Signup = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [])

  const onSubmit = async (data) => {
    const token = await verifyRecaptcha()
      .then((token) => token)
      .catch((err) => console.log(err))

    if (!token) {
      return
    }

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      token: token,
    }

    await handleRegister(payload)
  }

  const handleRegister = async (payload) => {
    const { error } = await signup(
      payload.first_name,
      payload.last_name,
      payload.email,
      payload.password,
      payload.password2,
      payload.token
    )

    if (error) {
      const status = "Whoops!"
      const message = "Something went wrong, please try again later."

      toast.custom((t) => <Error t={t} status={status} message={message} />)
    } else {
      const status = "One more step!"
      const message = "Please check your email to verify your account."

      toast.custom((t) => <Success t={t} status={status} message={message} />)
      navigate("/")
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const googleurl = import.meta.env.VITE_GOOGLE_AUTH_URL
      const response = window.open(googleurl, "_self")

      return response
    } catch (err) {
      // console.log(err)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="bg-white h-screen block lg:grid lg:grid-cols-2">
      <div className="w-full px-8 md:px-24 lg:px-16">
        <div className="py-12 sm:px-12">
          <div className="mb-3">
            <a href="/" className="flex justify-center">
              <img className="h-8 w-auto" src={nanobeepa} alt="nanobeepa.com" />
              <h2 className="text-2xl font-bold leading-9 tracking-tight bg-clip-text text-transparent bg-gradient-to-t from-yellow-600 to-yellow-200 ml-3">
                NanoBeepa
              </h2>
            </a>
            <h2 className="mb-6 mt-3 text-2xl text-center font-bold leading-9 tracking-tight text-zinc-800">
              Create an account
            </h2>
          </div>

          <form
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="first_name"
                    name="first_name"
                    autoComplete="first_name"
                    type="text"
                    {...register("first_name", {
                      required: "First name is required",
                    })}
                    className="w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    placeholder="First Name"
                  />
                  {errors.first_name && (
                    <small className="mt-2 text-sm text-red-300">
                      {errors.first_name.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="w-full mt-6 lg:mt-0">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    className="w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                    placeholder="Last Name"
                  />
                  {errors.last_name && (
                    <small className="mt-2 text-sm text-red-300">
                      {errors.last_name.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <small className="mt-2 text-sm text-red-300">
                    {errors.email.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      {...register("password", {
                        required: "Password is required",
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
                      type={showPassword ? "text" : "password"}
                      className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                      placeholder="Your password"
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
                  {errors.password && (
                    <small className="mt-2 text-sm text-red-300">
                      {errors.password.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="w-full mt-6 lg:mt-0">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <input
                      id="password2"
                      name="password2"
                      type={showPassword ? "text" : "password"}
                      {...register("password2", {
                        validate: (value) =>
                          value === watch("password") ||
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
                  {errors.password2 && (
                    <small className="mt-2 text-sm text-red-300">
                      {errors.password2.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <input
                  id="term-condition"
                  name="term_condition"
                  {...register("term_condition", {
                    required: "Please accept our terms and conditions",
                  })}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                />
                <label
                  htmlFor="term-condition"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Accept{" "}
                  <a
                    href="/terms"
                    className="font-semibold text-yellow-600 hover:text-yellow-800"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.term_condition && (
                <small className="mt-2 text-sm text-red-300">
                  {errors.term_condition.message}
                </small>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-zinc-800 px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Create an account
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 flex">
              <a
                href="#"
                onClick={handleGoogleSignUp}
                className="relative flex w-full items-center justify-start rounded-lg py-3 bg-white hover:bg-zinc-50 text-zinc-800 ring-1 ring-inset ring-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 overflow-hidden"
              >
                <div className="px-4 absolute py-3 m-1 rounded-md">
                  <img src={google} className="w-4 h-4" />
                </div>
                <div className="text-sm w-full flex justify-center font-semibold leading-6">
                  Sign up with Google
                </div>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-center text-sm text-gray-500">
                Already have an account ?{" "}
                <a
                  href="/signin"
                  className="font-semibold leading-6 text-yellow-600 hover:text-yellow-800"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1602037299890-c593f4c81d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 mb-20 mx-20 backdrop-blur-[14px] bg-black/40 p-8 rounded-xl">
          <div className="flex flex-col items-center text-center">
            <h4 className="text-2xl font-bold tracking-tight text-zinc-200">
              <span className="block sm:inline">Welcome to NanoBeepa</span>
            </h4>
            <p className="mt-3 text-xl text-zinc-200 italic">
              Welcome to a World of Beauty and Glamour - Sign up and discover
              Handpicked Cosmetic Treasures!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
