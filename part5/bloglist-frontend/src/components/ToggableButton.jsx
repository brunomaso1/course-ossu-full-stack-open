import { forwardRef, useImperativeHandle, useState } from "react"

const ToggableButton = forwardRef((props, ref) => {
  const [showToggableButton, setShowToggableButton] = useState(true)

  useImperativeHandle(ref, () => {
    return {
      setShowToggableButton
    }
  })

  if (showToggableButton) return (<button onClick={() => { setShowToggableButton(false) }}>{props.title}</button>)

  return (
    <>
      {props.children}
      <button onClick={() => { setShowToggableButton(true) }}>cancel</button>
    </>
  )
})

export default ToggableButton