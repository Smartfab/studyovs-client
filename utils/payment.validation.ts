import { PaymentValidationI, PaymentI } from '../interfaces/payment.interface'
import isValidEmail from './email-validator'

export default function paymentValidation(fields: PaymentI) {
  const { firstName, lastName, email, amount, reason } = fields
  const errors = {} as PaymentValidationI
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
  if (!amount) {
    errors.amount = 'Amount is required'
  }
  if (amount < 1000) {
    errors.amount = 'Minimun amount allowed is 1000'
  }
  if (!reason) {
    errors.reason = 'Reason for making payment is required'
  }
  if (reason && reason.length > 51) {
    errors.reason = 'Reason for making payment is too long max character is 50'
  }

  return { errors, isError: Object.keys(errors).length > 0 }
}
