import React from 'react'

const Input = ({
  label = '',
  type = '',
  name = '',
  className = '',
  inputClassName = '',
  placeholder = '',
  isRequired = true,
  value = '',
  onChange = () => {},
}
) => {
  return (
    <div className={`w-1/2 ${className}`}>
       <label for={name} className='block mb-2 text-sm font-medium text-gray-800'>{label}</label>

       <input type={type} id={name} autocomplete="given-name" placeholder={placeholder} required={isRequired} className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500 ${inputClassName}`} value={value} onChange={onChange}/>

        
    </div>
  )
}

export default Input