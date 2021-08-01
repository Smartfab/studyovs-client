/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function University({ university, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="university">
        University <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="university"
        name="university"
        value={university}
        placeholder="Moscow State University"
        type="text"
        onChange={handleChange}
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
