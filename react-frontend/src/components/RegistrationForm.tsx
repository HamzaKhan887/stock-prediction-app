import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  registerSchema,
  type RegisterFormValues,
  type RegisterRequest,
} from '@/utils/types'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import useRegister from '@/hooks/useRegister'
import { Spinner } from '@/components/ui/spinner'

function RegistrationForm() {
  const { mutate, isPending } = useRegister()
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: RegisterFormValues) {
    const user: RegisterRequest = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    mutate(user)
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='registration-form'
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup>
            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-username'>Username</FieldLabel>
                  <Input
                    {...field}
                    id='register-username'
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter your username'
                    autoComplete='username'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='register-email'
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter your email'
                    autoComplete='email'
                    type='email'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-password'>Password</FieldLabel>
                  <Input
                    {...field}
                    id='register-password'
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter your password'
                    autoComplete='new-password'
                    type='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-confirm-password'>
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id='register-confirm-password'
                    aria-invalid={fieldState.invalid}
                    placeholder='Confirm your password'
                    autoComplete='new-password'
                    type='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='registration-form' disabled={isPending}>
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default RegistrationForm
