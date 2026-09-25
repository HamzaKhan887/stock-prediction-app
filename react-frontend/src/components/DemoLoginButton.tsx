import useLogin from '@/hooks/useLogin'
import type { LoginRequest } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const demoUser: LoginRequest = {
  username: 'demo_user',
  password: 'demopassword123',
}

function DemoLoginButton() {
  const { mutate, isPending } = useLogin()

  return (
    <Button
      variant='outline'
      onClick={() => mutate(demoUser)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : 'Try Demo'}
    </Button>
  )
}

export default DemoLoginButton
