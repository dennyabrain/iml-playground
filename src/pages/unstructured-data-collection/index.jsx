import PageLayout from '../../components/PageLayout'
import OverviewTab from './OverviewTab'
import PrototypeTab from './PrototypeTab'

const tabs = [
  { label: 'Overview',  content: <OverviewTab /> },
  { label: 'Prototype', content: <PrototypeTab /> },
]

export default function UnstructuredDataCollection() {
  return (
    <PageLayout
      title="Unstructured data collection for Linear Model"
      description={`We present the user with a patient's data and a model's prediction. The user is then asked to either agree or disagree with the model's prediction. If they disagree, they can fill a text field with details about why they disagree.`}
      tabs={tabs}
    />
  )
}
