import { Button } from '@/components/ui/button'
import DemoLoginButton from '@/components/DemoLoginButton'
import { useNavigate } from 'react-router'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import DashboardSearchForm from '../assets/dashboard-search-form.png'
import DashboardResults1 from '../assets/dashboard-results-1.png'
import DashboardResults2 from '../assets/dashboard-results-2.png'
import DashboardResults3 from '../assets/dashboard-results-3.png'
import DashboardResults4 from '../assets/dashboard-results-4.png'
import DashboardResults5 from '../assets/dashboard-results-5.png'

const screenshots = [
  {
    src: DashboardSearchForm,
    alt: 'Empty stock ticker search form',
  },
  {
    src: DashboardResults1,
    alt: 'Model evaluation metrics (MSE, RMSE, R²)',
  },
  {
    src: DashboardResults2,
    alt: 'Predicted vs actual price chart for AAPL',
  },
  {
    src: DashboardResults3,
    alt: 'Closing price chart for AAPL',
  },
  {
    src: DashboardResults4,
    alt: '100-day moving average chart for AAPL',
  },
  {
    src: DashboardResults5,
    alt: '200-day moving average chart for AAPL',
  },
]

function Landing() {
  const navigate = useNavigate()
  return (
    <main className='page-center'>
      <div className='align-elements'>
        <section className='w-full grid lg:grid-cols-2 items-center'>
          <div className='max-w-2xl'>
            <h1 className='capitalize text-4xl md:text-6xl font-bold'>
              stock <span className='text-primary'>prediction</span> app
            </h1>
            <p className='leading-loose mt-4 text-muted-foreground'>
              This stock prediction application integrates a LSTM model built
              with Keras within a Django REST Framework backend and a React
              frontend. It evaluates the model's predictions against historical
              price data, alongside 100-day and 200-day moving averages,
              indicators commonly used by analysts to gauge price trends
            </p>
            <p className='leading-loose mt-4 text-muted-foreground'>
              <span className='font-bold'>Disclaimer:</span> This model{' '}
              <span className='font-bold'>does not</span> forecast future prices
              and{' '}
              <span className='font-bold'>
                should not be used for real trading or investment decisions
              </span>
              . Relying on it for actual investments can lead to significant
              financial loss. It is tested by predicting each day in the most
              recent 30% of a stock's price history, using the preceding 100
              days as input, and comparing those predictions against what
              actually happened
            </p>
            <div className='flex flex-wrap items-center gap-4 mt-4'>
              <Button onClick={() => navigate('/dashboard')}>
                Get Started
              </Button>
              <DemoLoginButton />
            </div>
          </div>
          <Carousel className='hidden lg:block'>
            <CarouselContent>
              {screenshots.map((screenshot) => (
                <CarouselItem key={screenshot.alt}>
                  <div className='rounded-xl overflow-hidden border shadow-lg'>
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className='w-full h-full object-cover'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </main>
  )
}

export default Landing
