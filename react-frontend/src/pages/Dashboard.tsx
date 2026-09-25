import SearchForm from '@/components/SearchForm'
import useStockAnalysis from '@/hooks/useStockAnalysis'
import PredictionResults from '@/components/PredictionResults'

function Dashboard() {
  const { mutate, data, isPending } = useStockAnalysis()
  return (
    <main className={`page-center items-center ${data ? 'mt-10' : ''}`}>
      <SearchForm onSearch={mutate} isPending={isPending} />
      {data && <PredictionResults data={data} />}
    </main>
  )
}

export default Dashboard
