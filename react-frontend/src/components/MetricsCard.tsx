import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function MetricsCard({
  mse,
  rmse,
  r2,
  currency,
}: {
  mse: number
  rmse: number
  r2: number
  currency: string | null
}) {
  const metrics = [
    {
      label: 'MSE',
      value: mse.toFixed(2),
      description:
        'Mean squared error, in squared price units. Lower is better.',
    },
    {
      label: 'RMSE',
      value: `${rmse.toFixed(2)} ${currency ?? ''}`.trim(),
      description:
        "Typical size of the prediction error, in the stock's currency.",
    },
    {
      label: 'R²',
      value: r2.toFixed(3),
      description:
        'How closely predictions follow real prices. 1 is a perfect fit.',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Evaluation</CardTitle>
        <CardDescription>
          Measured on the most recent 30% of the price history, which the model
          was not trained on.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4 sm:grid-cols-3'>
        {metrics.map((m) => (
          <div key={m.label} className='rounded-lg border p-4'>
            <p className='text-muted-foreground text-sm'>{m.label}</p>
            <p className='text-2xl font-semibold'>{m.value}</p>
            <p className='text-muted-foreground mt-1 text-xs'>
              {m.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default MetricsCard
