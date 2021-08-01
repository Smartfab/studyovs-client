/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function Address({ address, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="address">
        Residential Address <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="address"
        name="address"
        value={address}
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
