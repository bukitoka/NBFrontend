import { useEffect, useState } from "react"
import { tokenChecking } from "@/tools/auth"

const MainWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const checkToken = async () => {
    setLoading(true)
    await tokenChecking()
    setLoading(false)
  }

  useEffect(() => {
    checkToken()
  }, [])

  return loading ? null : <>{children}</>
}

export default MainWrapper
