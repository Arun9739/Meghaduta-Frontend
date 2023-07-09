import React from 'react'

const Button = ({
    label = 'Button',
    type = 'button',
    className = '',
    disabled = false
}) => {
  return (
    <div>
        <button type={type} disabled={disabled} className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 rounded-md ${className}`}>{label}</button>
    </div>
  )
}

export default Button