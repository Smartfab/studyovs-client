import Grid, { GridSpacing } from '@material-ui/core/Grid'
import React, { useState } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import Select from 'react-select'
import OtherCountries from './OtherCountries'

export default function DesiredCountry({ handleSelect, error }) {
  const [showOthers, setShowOthers] = useState<boolean>(false)
  const options = [
    { value: 'us', label: 'United states' },
    { value: 'canada', label: 'Canada' },
    { value: 'germany', label: 'Germany' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'russia', label: 'Russia' },
    { value: 'others', label: 'Others' },
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

  const customHandleSelect = (selectedOption) => {
    if (selectedOption.value === 'others') {
      setShowOthers(true)
    } else {
      setShowOthers(false)
    }
    handleSelect('desiredCountry', selectedOption.value === 'others' ? '' : selectedOption.value)
  }
  return (
    <>
      <Grid container spacing={2 as GridSpacing}>
        <Grid item xs={showOthers ? 4 : 12} md={showOthers ? 4 : 12}>
          <div className="form__control">
            <label htmlFor="desiredCountry">
              Country <span className={error ? 'must' : 'correct'}>*</span>
            </label>
            <Select
              id="desiredCountry"
              styles={customStyles}
              options={options}
              placeholder="United States"
              onChange={customHandleSelect}
            />
            {error && (
              <div className="input-error">
                <AiFillInfoCircle className="input-error__error" />
                {error}
              </div>
            )}
          </div>
        </Grid>
        {showOthers && (
          <Grid item xs={8} md={8}>
            <OtherCountries handleSelect={handleSelect} error={error} />
          </Grid>
        )}
      </Grid>
    </>
  )
}
