import { useState, useEffect } from "react"
import { ChevronRightIcon } from "@heroicons/react/20/solid"

const TopBanner = () => {
  // hide if the user scroll down more than 100px
  const [show, setShow] = useState(true)
  const handleScroll = () => {
    const currentScrollY = window.scrollY
    if (currentScrollY > 100) {
      setShow(false)
    } else {
      setShow(true)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!show) {
    return null
  }

  return (
    <div className="flex justify-center items-center gap-x-6 bg-zinc-900 border-b border-b-zinc-800 py-2 px-2 lg:px-6">
      <div className="bg-clip-text text-transparent bg-yellow-500 lg:bg-gradient-to-t from-yellow-500 to-yellow-50">
        <p className="text-sm leading-6">
          <a href="#" className="flex items-center">
            <span className="hidden lg:inline font-semibold">
              BEAUTY PROMO &nbsp;–&nbsp;
            </span>
            Register now and get 10% off for all product
            <ChevronRightIcon className="text-yellow-500 w-5 h-5 ml-3" />
          </a>
        </p>
      </div>
    </div>
  )
}

export default TopBanner
