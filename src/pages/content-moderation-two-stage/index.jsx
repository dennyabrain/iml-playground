import PageLayout from '../../components/PageLayout'
import PrototypeTab from './PrototypeTab'
import PrototypeBTab from './PrototypeBTab'

const tabs = [
  { label: 'Prototype A', content: <PrototypeTab /> },
  { label: 'Prototype B', content: <PrototypeBTab /> },
]

export default function ContentModerationTwoStageModel() {
  return (
    <PageLayout
      title="2 Stage Model — Content Moderation"
      description="A 2 stage model for content moderation. Evaluate sentence parameters one by one, then apply a simple tallying rule to reach a verdict."
      tabs={tabs}
    />
  )
}
