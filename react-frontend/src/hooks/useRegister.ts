import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import handleRegistration from '@/utils/handleRegistration'
import { toast } from '@/components/ui/toast'
import { isAxiosError } from 'axios'

function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: handleRegistration,
    onSuccess: () => {
      toast.add({
        type: 'success',
        title: 'Account created',
        description: 'You can now log in.',
      })
      navigate('/login')
    },
    onError: (error) => {
      let description = 'An unexpected error occurred. Please try again.'

      if (isAxiosError(error)) {
        if (!error.response) {
          description = 'Could not reach the server. Try again.'
        } else if (error.response.status === 400) {
          const firstError = Object.values(error.response.data)[0]
          if (Array.isArray(firstError)) description = firstError[0]
        }
      }

      toast.add({ type: 'error', title: 'Registration failed', description })
    },
  })
}

export default useRegister
