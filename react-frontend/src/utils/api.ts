import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem('refreshToken')
    const isLogin = originalRequest?.url === '/token/'

    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      refreshToken &&
      !isLogin
    ) {
      originalRequest.retry = true
      try {
        const response = await axios.post<{ access: string }>(
          `${baseURL}/token/refresh/`,
          { refresh: refreshToken }
        )
        localStorage.setItem('accessToken', response.data.access)
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`
        return api(originalRequest)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
export default api
