import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { resetPasswordConfirm } from "@/tools/auth"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await resetPasswordConfirm(
      uid,
      token,
      password,
      confirmPassword
    )

    if (response.status === 200) {
      toast.success("Password reset successful")
    } else {
      for (const key in response.data) {
        console.log(`${key}: ${response.data[key]}`)
      }
    }

    navigate("/")
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword
