import { ToggleTheme } from '@/components/ToggleTheme'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Link } from 'react-router'
import useAuth from '@/hooks/useAuth'
import useLogout from '@/hooks/useLogout'

function Navbar() {
  const { isLoggedIn, username } = useAuth()
  const logout = useLogout()
  return (
    <div className='align-elements items-center py-6 border-b'>
      <div className='flex flex-col'>
        <Link to='/'>
          <div className='text-2xl font-semibold'>Stock Prediction App</div>
          <div className='text-sm text-muted-foreground'>
            Using React, DRF and ML
          </div>
        </Link>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 items-center'>
        {isLoggedIn && username && (
          <div className='flex items-center gap-2 sm:mr-2'>
            <Avatar>
              <AvatarFallback className='bg-primary/10 text-primary font-semibold uppercase'>
                {username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className='hidden sm:inline max-w-32 truncate text-sm font-medium'>
              {username}
            </span>
          </div>
        )}
        {isLoggedIn ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <>
            <Button nativeButton={false} render={<Link to='/login' />}>
              Login
            </Button>
            <Button
              variant='outline'
              nativeButton={false}
              render={<Link to='/register' />}
            >
              Sign Up
            </Button>
          </>
        )}

        <ToggleTheme />
      </div>
    </div>
  )
}

export default Navbar
