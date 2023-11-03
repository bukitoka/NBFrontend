import React from "react"
import { useLocation } from "react-router-dom"

const Finish = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const paymentStatus = searchParams.get("status")

  return (
    <div className="h-screen w-full flex justify-center">
      <h1>Payment Status</h1>
      <p>
        {paymentStatus === "success"
          ? "Payment was successful!"
          : "Payment failed."}
      </p>
      <a href="/">Back to home</a>
    </div>
  )
}

export default Finish
