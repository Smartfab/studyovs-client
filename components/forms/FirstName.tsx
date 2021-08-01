/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function FirstName({ firstName, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="firstName">
        First name <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="firstName"
        name="firstName"
        value={firstName}
        placeholder="John"
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
