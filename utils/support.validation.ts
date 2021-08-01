import { SuppportValidationI, SupportI } from '../interfaces/support.interface'
import isValidEmail from './email-validator'

export default function supportValidation(fields: SupportI) {
  const { firstName, lastName, email, subject, message } = fields
  const errors = {} as SuppportValidationI
  if (!firstName) {
    errors.firstName = 'First name is required'
  }
  if (!lastName) {
    errors.lastName = 'Last name is required'
  }
  if (!email) {
    errors.email = 'Email is required'
  }
  if (email) {
    if (!isValidEmail(email)) {
      errors.email = 'Email is invalid'
    }
  }
  if (!subject) {
    errors.subject = 'Subject is required'
  }
  if (!message) {
    errors.message = 'Message is required'
  }

  return { errors, isError: Object.keys(errors).length > 0 }
}
