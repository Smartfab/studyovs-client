/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function Email({ email, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="email">
        Email <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="email"
        name="email"
        value={email}
        placeholder="email@example.com"
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
