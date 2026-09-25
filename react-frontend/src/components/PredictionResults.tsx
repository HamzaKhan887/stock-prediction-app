import type { StockAnalysisResponse } from '@/utils/types'
import PlotCard from '@/components/PlotCard'
import MetricsCard from '@/components/MetricsCard'

function PredictionResults({ data }: { data: StockAnalysisResponse }) {
  const plots = [
    { title: 'Predicted vs Actual Price', src: data.plot_prediction },
    { title: 'Closing Price', src: data.plot_img },
    { title: '100-day Moving Average', src: data.plot_100_dma },
    { title: '200-day Moving Average', src: data.plot_200_dma },
  ]

  return (
    <section className='w-full max-w-4xl space-y-6 p-5 mt-5'>
      <MetricsCard
        mse={data.mse}
        rmse={data.rmse}
        r2={data.r2}
        currency={data.currency}
      />
      {plots.map((plot) => (
        <PlotCard key={plot.title} {...plot} />
      ))}
    </section>
  )
}

export default PredictionResults
