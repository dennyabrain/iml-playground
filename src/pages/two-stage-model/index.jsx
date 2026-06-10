import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'

const tabs = [
  { label: 'Overview',  content: <OverviewTab /> },
  { label: 'Prototype', content: <PrototypeTab /> },
]

export default function TwoStageModel() {
  return (
    <PageLayout
      title="2 Stage Model"
      description="A 2 stage model that's faithful to human decision making."
      tabs={tabs}
    />
  )
}
