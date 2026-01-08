export interface NewUser {
  name: string
  email: string
  password?: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginUser {
  email: string
  password: string
}
