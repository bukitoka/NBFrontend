import React from "react"

const Error = () => {
  return (
    <div className="h-screen w-full flex justify-center">
      <h1>Payment Error</h1>
      <p>There was an error processing your payment. Please try again.</p>

      <a href="/">Back to home</a>
    </div>
  )
}

export default Error
