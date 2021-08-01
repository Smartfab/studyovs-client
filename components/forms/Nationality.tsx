/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function Nationality({ nationality, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="nationality">
        Nationality <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="nationality"
        name="nationality"
        value={nationality}
        placeholder="your country i.e nigeria"
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
