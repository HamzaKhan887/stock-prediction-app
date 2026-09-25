import { useMutation } from '@tanstack/react-query'
import handleStockAnalysis from '@/utils/handleStockAnalysis'
import { toast } from '@/components/ui/toast'
import { isAxiosError } from 'axios'

function useStockAnalysis() {
  return useMutation({
    mutationFn: handleStockAnalysis,
    onSuccess: (_data, variables) => {
      toast.add({
        type: 'success',
        title: `${variables.ticker} analysis ready`,
        description: 'Model predictions, metrics and price charts are loaded.',
      })
    },
    onError: (error) => {
      let description = 'An unexpected error occurred. Please try again.'

      if (isAxiosError(error)) {
        if (!error.response) {
          description = 'Could not reach the server. Try again.'
        } else if (error.response.status === 400) {
          const firstError = Object.values(error.response.data)[0]
          if (Array.isArray(firstError)) description = firstError[0]
        } else if (error.response.status === 404) {
          description = 'No data found for that ticker.'
        }
      }

      toast.add({ type: 'error', title: 'Stock fetching failed', description })
    },
  })
}

export default useStockAnalysis
