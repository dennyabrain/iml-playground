import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'
import PrototypeTabB from './PrototypeTabB'
import PrototypeTabC from './PrototypeTabC'

const tabs = [
  { label: 'Overview',    content: <OverviewTab /> },
  { label: 'Prototype A', content: <PrototypeTab /> },
  { label: 'Prototype B', content: <PrototypeTabB /> },
  { label: 'Prototype C', content: <PrototypeTabC /> },
]

export default function DecisionTree() {
  return (
    <PageLayout
      title="Decision Tree"
      description="We present the user with a decision tree model and ask them to move decision steps around."
      tabs={tabs}
    />
  )
}
