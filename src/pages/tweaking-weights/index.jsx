import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'

const tabs = [
  { label: 'Overview',  content: <OverviewTab /> },
  { label: 'Prototype', content: <PrototypeTab /> },
]

export default function TweakingWeights() {
  return (
    <PageLayout
      title="Tweaking weights of a Linear Model"
      description={`We present user with an interactive visualization of a linear model. The user can modify the weights to see the model prediction update in real time.`}
      tabs={tabs}
    />
  )
}
