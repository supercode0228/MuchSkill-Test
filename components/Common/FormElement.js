import React from 'react'
import { isEmpty } from 'lodash'

const FormElement = ({
  type = 'text',
  required,
  title,
  property,
  placeholder,
  description,
  value,
  error,
  onBlur,
  onChange,
}) => {
  return (
    <div className="form-group">
      {!isEmpty(title) && (
        <label
          htmlFor={property}
          className={`${required && 'field-required'} ${
            !isEmpty(error) ? 'color-red' : 'color-grey-1'
          }`}
        >
          <span>{title}</span>
        </label>
      )}
      <div>
        <input
          id={property}
          type={type}
          name={property}
          placeholder={placeholder}
          className={`form-control input100 ${
            !isEmpty(error) && 'input-error'
          }`}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
        {!isEmpty(description) && (
          <div className="color-grey-2">{parse(description)}</div>
        )}
      </div>
      {!isEmpty(error) && <div className="color-red">{error}</div>}
    </div>
  )
}

export default FormElement
