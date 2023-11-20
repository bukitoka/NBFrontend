import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import queryString from "query-string"
import { verifyEmail } from "@/tools/auth"
import toast from "react-hot-toast"
import Success from "@/components/messages/Success"
import Error from "@/components/messages/Error"
import { confirmed } from "@/assets"

const VerifyEmail = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  const verify = async (key) => {
    const { error } = await verifyEmail(key)

    if (error) {
      const status = "Whoops!"
      const message = "Something went wrong. Please try again."
      toast.custom((t) => <Error t={t} status={status} message={message} />)
    } else {
      const status = "Email Verified!"
      const message = "You can now sign in to your account."

      toast.custom((t) => <Success t={t} status={status} message={message} />)
    }
  }

  useEffect(() => {
    const { key } = queryString.parse(location.search)

    if (key) {
      verify(key)
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
        <img className="mx-auto h-96 w-auto" src={confirmed} alt="Not Found" />
        <p className="text-lg font-medium leading-7 text-gray-600">
          Your email is being verified...
        </p>
        <p className="text-gray-600 mt-3">
          Redirecting in {countdown} seconds...
        </p>
      </div>
    </main>
  )
}

export default VerifyEmail
