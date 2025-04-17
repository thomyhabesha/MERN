import React from 'react'

function FormRow({label, type, name, defaultValue}) {
  return (
    <div className='form-row'>
    <label htmlFor='name' className='form-label'>
      {label || name}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      className='form-input'
      defaultValue={defaultValue}
      required
    />
  </div>
  )
}

export default FormRow
