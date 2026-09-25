import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'

function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken')
  )

  const username = localStorage.getItem('username')

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
