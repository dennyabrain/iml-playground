import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'

const tabs = [
  { label: 'Overview',  content: <OverviewTab /> },
  { label: 'Prototype', content: <PrototypeTab /> },
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
