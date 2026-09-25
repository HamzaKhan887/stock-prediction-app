import api from './api'
import type { LoginRequest, JWTTokenResponse } from '@/utils/types'

async function handleLogin(user: LoginRequest) {
  const response = await api.post<JWTTokenResponse>('/token/', user)
  localStorage.setItem('accessToken', response.data.access)
  localStorage.setItem('refreshToken', response.data.refresh)
  localStorage.setItem('username', user.username)
  return response.data
}

export default handleLogin
