import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function PlotCard({ title, src }: { title: string; src: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={src} alt={title} className='w-full rounded-xl' />
      </CardContent>
    </Card>
  )
}

export default PlotCard
