import PageLayout from '../../components/PageLayout'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'

const tabs = [
  { label: 'Prototype', content: <Tab1 /> },
  { label: 'Prototype B', content: <Tab2 /> },
  { label: 'Prototype C', content: <Tab3 /> },
]

export default function KidneyAllocation() {
  return (
    <PageLayout
      title="Model Interaction for Kidney Allocation Domain"
      description="A prototype that allows users to choose patient details and query a model for a response."
      tabs={tabs}
    />
  )
}
