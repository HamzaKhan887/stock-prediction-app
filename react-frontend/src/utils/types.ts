import * as z from 'zod'

export const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    email: z.email('Enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required.'),
  password: z.string().min(1, 'Password is required.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// backend does not accept confirmPassword
export type RegisterRequest = Omit<RegisterFormValues, 'confirmPassword'>

// login is only with username, so no need for email
export type LoginRequest = {
  username: string
  password: string
}

// password is a write only field so response doesn't return the password
export type UserResponse = {
  username: string
  email: string
}

export type JWTTokenResponse = {
  access: string
  refresh: string
}

export const searchFormSchema = z.object({
  ticker: z.string().min(1, 'Stock ticker must be at least 1 character'),
})

export type SearchFormValues = z.infer<typeof searchFormSchema>

export type SearchFormProps = {
  onSearch: (values: SearchFormValues) => void
  isPending: boolean
}

export type StockAnalysisResponse = {
  status: string
  plot_img: string
  plot_100_dma: string
  plot_200_dma: string
  plot_prediction: string
  mse: number
  rmse: number
  r2: number
  currency: string | null
}
