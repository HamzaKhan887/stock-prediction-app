import api from '@/utils/api'
import type { SearchFormValues, StockAnalysisResponse } from '@/utils/types'

async function handleStockAnalysis(tickerObject: SearchFormValues) {
  const response = await api.post<StockAnalysisResponse>(
    '/predict/',
    tickerObject
  )
  return response.data
}

export default handleStockAnalysis
