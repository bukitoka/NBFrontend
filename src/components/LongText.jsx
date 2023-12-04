import React, { useState } from "react"

const LongText = ({ text }) => {
  const [isFullTextVisible, setFullTextVisible] = useState(false)

  const toggleFullText = () => {
    setFullTextVisible(!isFullTextVisible)
  }

  return (
    <div>
      <p>
        {isFullTextVisible ? text : `${text?.slice(0, 300)}...`}
        <span
          onClick={toggleFullText}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isFullTextVisible ? " Read Less" : " Read More"}
        </span>
      </p>
    </div>
  )
}

export default LongText
