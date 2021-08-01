export interface PaymentI {
  firstName: string
  lastName: string
  email: string
  amount: number
  reason: string
}

export interface PaymentValidationI {
  firstName: string
  lastName: string
  email: string
  amount: string
  reason: string
}
