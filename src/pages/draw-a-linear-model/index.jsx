import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'

const tabs = [
  { label: 'Overview',  content: <OverviewTab /> },
  { label: 'Prototype', content: <PrototypeTab /> },
]

export default function DrawALinearModel() {
  return (
    <PageLayout
      title="Draw a Linear Model"
      description="User is allowed to create a linear model by specifying the weight assigned to each variable."
      tabs={tabs}
    />
  )
}
