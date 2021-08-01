/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import Select from 'react-select'

export default function Programme({ handleSelect, error }) {
  const options = [
    { value: 'foundation', label: 'Premilinary, Foundation, HND Top Up' },
    { value: 'bachelor', label: 'Bachelor' },
    { value: 'master', label: 'Masters, Specialist Degree' },
    { value: 'PhD', label: 'PhD' },
  ]
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxSizing: 'border-box',
      outline: 'none',
      boxShadow: 'none',
      borderRadius: '5px',
      borderWidth: '1px',
      borderColor: state.isFocused ? '#00a8e2' : error ? 'red' : '#e9e9e9',
      height: '50px',
      padding: state.isFocused ? '0' : '0',

      '&:hover': 'none',
    }),
    valueContainer: (provided, _) => ({
      ...provided,
      position: 'none',
      height: '28px',
    }),
    input: (provided, _) => ({
      ...provided,
      position: 'none',
      height: '28px',
      padding: '0',
    }),
    indicatorContainer: (provided, _) => ({
      ...provided,
      height: '28px',
    }),
  }
  return (
    <div className="form__control">
      <label htmlFor="programme">
        Programme <span className={error ? 'must' : 'correct'}>*</span>
      </label>
      <Select
        id="programme"
        placeholder="Master"
        styles={customStyles}
        options={options}
        onChange={(selectedOption) => handleSelect('programme', selectedOption.value)}
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
