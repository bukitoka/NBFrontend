import React from "react"

const Unfinish = () => {
  return (
    <div className="h-screen w-full flex justify-center">
      <h1>Payment Unfinished</h1>
      <p>Your payment process is not finished. Please complete your payment.</p>
      <p>You can always complete your payment in your order history.</p>

      <a href="/account">Back to order history page </a>
    </div>
  )
}

export default Unfinish
