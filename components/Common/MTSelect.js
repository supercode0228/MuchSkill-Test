import React from 'react'
import Select from 'react-select'

const MTSelect = ({
  id,
  className,
  isMulti,
  placeholder,
  name,
  options,
  value,
  onBlur,
  onChange,
}) => {
  return (
    <Select
      isMulti={isMulti}
      id={id}
      className={className}
      name={name}
      placeholder={placeholder}
      options={options}
      value={value}
      onBlur={() => onBlur && onBlur({ target: { name, value } })}
      onChange={(selectedOption) => onChange(name, selectedOption)}
    />
  )
}

export default MTSelect
