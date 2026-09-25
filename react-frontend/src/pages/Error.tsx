import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
  Link,
} from 'react-router'
import { TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()

  const is404 = isRouteErrorResponse(error) && error.status === 404

  const code = is404 ? '404' : 'Error'
  const title = is404 ? 'Page not found' : 'Something went wrong'
  const description = is404
    ? "The page you're looking for doesn't exist or has been moved."
    : 'An unexpected error occurred. Try again, or head back to the home page.'

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center'>
      <div className='flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary'>
        <TrendingDown className='size-8' />
      </div>
      <div className='space-y-2'>
        <p className='text-7xl md:text-8xl font-bold text-primary'>{code}</p>
        <h1 className='text-2xl md:text-3xl font-semibold'>{title}</h1>
        <p className='text-muted-foreground max-w-md mx-auto'>{description}</p>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-3'>
        <Button nativeButton={false} render={<Link to='/' />}>
          Back to home
        </Button>
        <Button variant='outline' onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    </main>
  )
}

export default ErrorPage
