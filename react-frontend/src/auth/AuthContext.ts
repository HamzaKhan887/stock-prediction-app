import { createContext } from 'react'

export type AuthContextType = {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  username: string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
