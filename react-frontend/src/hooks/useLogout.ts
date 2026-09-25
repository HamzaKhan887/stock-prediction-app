import { useNavigate } from 'react-router'
import useAuth from '@/hooks/useAuth'
import { toast } from '@/components/ui/toast'

function useLogout() {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuth()

  return function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
    setIsLoggedIn(false)
    navigate('/login')
    toast.add({
      type: 'success',
      title: 'Logged out successfully',
    })
  }
}

export default useLogout
