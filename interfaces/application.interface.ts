export interface ApplicationI {
  firstName: string
  lastName: string
  middleName?: string
  nationality: string
  telephoneNumber: string
  email: string
  university?: string
  programme: string
  desiredCountry: string
  studyField: string
  address: string
}

export type ApplicationErrorTypes = Partial<ApplicationI>
