/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function LastName({ lastName, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="lastName">
        Last name <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="lastName"
        name="lastName"
        value={lastName}
        placeholder="Doe"
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
