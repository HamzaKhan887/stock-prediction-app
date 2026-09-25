import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router'
import { router } from '@/utils/router'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toast'
import AuthProvider from '@/auth/AuthProvider'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
