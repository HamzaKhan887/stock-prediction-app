'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

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

import {
  type SearchFormProps,
  searchFormSchema,
  type SearchFormValues,
} from '@/utils/types'
import { Spinner } from '@/components/ui/spinner'

function SearchForm({ onSearch, isPending }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      ticker: '',
    },
  })

  function onSubmit(data: SearchFormValues) {
    onSearch({ ticker: data.ticker.trim().toUpperCase() })
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Search Stock Ticker</CardTitle>
        <CardDescription>
          Enter a stock ticker to see how the LSTM model's predictions compare
          with the real price history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='search-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='ticker'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='ticker'>Stock Ticker</FieldLabel>
                  <Input
                    {...field}
                    id='ticker'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. AAPL'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <p className='mt-4 text-sm text-muted-foreground'>
          The first request may take up to a minute to wake the server, and
          after a few searches the server may restart due to high memory usage.
          If a search doesn't return a result, wait a moment and try again
        </p>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='search-form' disabled={isPending}>
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default SearchForm
