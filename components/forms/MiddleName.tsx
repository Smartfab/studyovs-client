/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function MiddleName({ middleName, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="middleName">Middle name</label>
      <input
        id="middleName"
        name="middleName"
        value={middleName}
        placeholder="Eric"
        type="text"
        onChange={(e) => handleChange(e)}
        style={{ borderColor: error && 'red' }}
      />
      {error && (
        <div className="input-error">
          <AiFillInfoCircle className="input-error__error" />
          {error}
        </div>
      )}
    </div>
  )
}
