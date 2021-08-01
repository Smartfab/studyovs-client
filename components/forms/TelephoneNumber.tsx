/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function TelephoneNumber({ telephoneNumber, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="telephone">
        Telephone Number <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="telephone"
        name="telephoneNumber"
        value={telephoneNumber}
        placeholder="+2347000000000"
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
