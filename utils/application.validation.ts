import { ApplicationI } from '../interfaces/application.interface'
import isValidEmail from './email-validator'

export default function applicationValidation(fields: ApplicationI) {
  const {
    firstName,
    lastName,
    nationality,
    telephoneNumber,
    email,
    university,
    programme,
    desiredCountry,
    studyField,
    address,
  } = fields
  const errors = {} as Partial<ApplicationI>
  if (!firstName) {
    errors.firstName = 'First name is required'
  }
  if (!lastName) {
    errors.lastName = 'Last name is required'
  }
  if (!nationality) {
    errors.nationality = 'Nationality is required'
  }
  if (!telephoneNumber) {
    errors.telephoneNumber = 'Telephone number is required'
  }
  if (!email) {
    errors.email = 'Email is required'
  }
  if (email) {
    if (!isValidEmail(email)) {
      errors.email = 'Email is invalid'
    }
  }
  if (!university) {
    errors.university = 'Univeristy is required'
  }
  if (!programme) {
    errors.programme = 'Programme is required'
  }
  if (!desiredCountry) {
    errors.desiredCountry = 'Desired country of study is required'
  }
  if (!address) {
    errors.address = 'Residential address is required'
  }
  if (!studyField) {
    errors.studyField = 'Field of study is required'
  }
  return { errors, isError: Object.keys(errors).length > 0 }
}
