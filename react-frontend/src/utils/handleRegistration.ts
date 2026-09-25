import api from './api'
import type { RegisterRequest, UserResponse } from '@/utils/types'

async function handleRegistration(user: RegisterRequest) {
  const response = await api.post<UserResponse>('/register/', user)
  return response.data
}

export default handleRegistration
