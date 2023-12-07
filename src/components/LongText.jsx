import React, { useState } from "react"

const LongText = ({ text }) => {
  const [isFullTextVisible, setFullTextVisible] = useState(false)
  const lengthText = text?.length

  const toggleFullText = () => {
    setFullTextVisible(!isFullTextVisible)
  }

  return (
    <div>
      <p>
        {isFullTextVisible
          ? text
          : `${text?.slice(0, 300)}${lengthText > 300 ? "..." : ""} `}

        {lengthText > 300 && (
          <span
            onClick={toggleFullText}
            className="text-yellow-500 cursor-pointer text-lg"
            // style={{ color: "blue", cursor: "pointer" }}
          >
            {isFullTextVisible ? " Read Less" : " Read More"}
          </span>
        )}
      </p>
    </div>
  )
}

export default LongText
