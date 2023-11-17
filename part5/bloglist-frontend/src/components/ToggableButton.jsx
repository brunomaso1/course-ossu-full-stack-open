import { cloneElement, useImperativeHandle, useState } from "react"

const ToggableButton = ({ title, children }) => {
  const [showToggableButton, setShowToggableButton] = useState(true)

  if (showToggableButton) return (<button onClick={() => { setShowToggableButton(false) }}>{title}</button>)

  return (
    <>
      {cloneElement(children, { setShowToggableButton })}
      <button onClick={() => { setShowToggableButton(true) }}>cancel</button>
    </>
  )
}

export default ToggableButton