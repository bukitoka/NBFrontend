import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import queryString from "query-string"
import { googleAuthenticate } from "@/tools/auth"
import { relax } from "@/assets"
import toast from "react-hot-toast"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"

const GoogleCallBack = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  const authenticate = async (code) => {
    const { data, error } = await googleAuthenticate(code)

    if (error) {
      const status = "Whoops!"
      const message = "Something went wrong. Please try again."
      toast.custom((t) => <Error t={t} status={status} message={message} />)
      navigate("/signin")
    } else {
      const status = "Hi " + data.user.first_name + "!"
      const message = "Welcome back to NanoBeepa 👋"

      toast.custom((t) => <Success t={t} status={status} message={message} />)
      navigate("/")
    }
  }

  useEffect(() => {
    const { code } = queryString.parse(location.search)

    if (code) {
      authenticate(code)
    } else {
      navigate("/")
    }

    // countdown before redirect
    const interval = setInterval(() => {
      if (countdown === 0) {
        return
      }
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    // redirect to home page after 5 seconds
    setTimeout(() => {
      navigate("/")
    }, 5000)

    // clear interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-gray-700">NanoBeepa</h1>
        <img className="mx-auto h-96 w-auto" src={relax} alt="Not Found" />
        <p className="text-lg font-medium leading-7 text-gray-600">
          You are being redirected to Home Page.
        </p>
        <p className="text-gray-600 mt-3">
          Redirecting in {countdown} seconds...
        </p>
      </div>
    </main>
  )
}

export default GoogleCallBack
