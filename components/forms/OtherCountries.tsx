/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function OtherCountries({ handleSelect, error }) {
  return (
    <div className="form__control">
      <label htmlFor="others">Others</label>
      <input
        id="others"
        placeholder="Others"
        type="text"
        onChange={(e) => handleSelect('desiredCountry', e.target.value)}
        style={{ borderColor: error && 'red' }}
      />
    </div>
  )
}
