import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'
import PrototypeTabB from './PrototypeTabB'

const tabs = [
  { label: 'Overview',    content: <OverviewTab /> },
  { label: 'Prototype A', content: <PrototypeTab /> },
  { label: 'Prototype B', content: <PrototypeTabB /> },
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
