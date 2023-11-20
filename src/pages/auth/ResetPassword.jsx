import React from "react"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "@/tools/auth"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"
import { nanobeepa } from "@/assets"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import verifyRecaptcha from "@/tools/recaptcha"

const ResetPassword = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const onSubmit = async (data) => {
    const token = await verifyRecaptcha()
      .then((token) => token)
      .catch((err) => console.log(err))

    if (!token) {
      return
    }

    const payload = {
      email: data.email,
      token: token,
    }

    await handleResetPassword(payload)
  }

  const handleResetPassword = async (payload) => {
    const response = await resetPassword(payload.email, payload.token)

    if (response.error === null) {
      toast.custom((t) => (
        <Success
          t={t}
          status="Link Sent!"
          message="Link to reset your password has been sent to your email."
        />
      ))
      navigate("/")
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
              Reset your password
            </h2>
          </div>
          <form
            className="space-y-6"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <small className="mt-2 text-sm text-red-300">
                    {errors.email.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-zinc-800 px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                Send reset link
              </button>
            </div>
          </form>

          <div>
            <div className="mt-10">
              <a
                href="/signin"
                className="font-semibold leading-6 text-yellow-600 hover:text-yellow-800 flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back to sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
