import React from 'react'
import buttonStyle from "./Button.module.css"

const Button = ({className, title, onClick }) => {
  return (
    <button className={`${buttonStyle.button} ${className}`} onClick={onClick}>{title}</button>
  )
}

export default Button