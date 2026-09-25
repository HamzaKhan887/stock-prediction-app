import { useMutation } from '@tanstack/react-query'
import handleLogin from '@/utils/handleLogin'
import { toast } from '@/components/ui/toast'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router'
import useAuth from '@/hooks/useAuth'

function useLogin() {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuth()

  return useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      setIsLoggedIn(true)
      toast.add({
        type: 'success',
        title: 'Logged in successfully',
      })
      navigate('/dashboard')
    },
    onError: (error) => {
      let description = 'An unexpected error occurred. Please try again.'

      if (isAxiosError(error)) {
        if (!error.response) {
          description = 'Could not reach the server. Try again.'
        } else if (error.response.status === 401) {
          description = 'Incorrect username or password.'
        }
      }

      toast.add({ type: 'error', title: 'Login failed', description })
    },
  })
}

export default useLogin
