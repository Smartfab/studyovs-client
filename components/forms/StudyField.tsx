/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

export default function StudyField({ studyField, handleChange, error }) {
  return (
    <div className="form__control">
      <label htmlFor="studyField">
        Field of study <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <input
        id="studyField"
        name="studyField"
        value={studyField}
        placeholder="Mechanical Engineering"
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
