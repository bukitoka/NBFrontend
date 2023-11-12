import { useState, useEffect } from "react"

export default function useHorizontalScroll() {
  const [target, setTarget] = useState(null)

  useEffect(() => {
    if (target) {
      const handleScroll = (e) => {
        e.preventDefault()
        target.scrollLeft = target.scrollLeft + e.deltaY
      }

      // Check if touch events are not supported
      if (!("ontouchstart" in window)) {
        target.addEventListener("wheel", handleScroll)
        return () => target.removeEventListener("wheel", handleScroll)
      }
    }
  }, [target])

  const setScrollTarget = (ref) => {
    setTarget(ref.current)
  }

  return { setScrollTarget }
}
