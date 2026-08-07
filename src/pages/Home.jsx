import { Link } from 'react-router-dom'

const prototypes = [
  {
    path: '/unstructured-data-collection',
    title: 'Unstructured data collection for Linear Model',
    description: `We present the user with a patient's data and a model's prediction. The user is then asked to either agree or disagree with the model's prediction. If they disagree, they can fill a text field with details about why they disagree.`,
  },
  {
    path: '/tweaking-weights',
    title: 'Tweaking weights of a Linear Model',
    description: `We present user with an interactive visualization of a linear model. The user can modify the weights to see the model prediction update in real time.`,
  },
  {
    path: '/decision-tree',
    title: 'Decision Tree',
    description: `We present the user with a decision tree model and ask them to move decision steps around.`,
  },
  {
    path: '/draw-a-linear-model',
    title: 'Draw a Linear Model',
    description: `User is allowed to create a linear model by specifying the weight assigned to each variable.`,
  },
  {
    path: '/two-stage-model',
    title: '2 Stage Model',
    description: `A 2 stage model that's faithful to human decision making.`,
  },
  {
    path: '/kidney-allocation',
    title: 'Model Interaction for Kidney Allocation Domain',
    description: `A prototype that allows users to choose patient details and query a model for a response.`,
  },
  {
    path: '/content-moderation-two-stage',
    title: '2 Stage Model — Content Moderation',
    description: `A 2 stage model for content moderation. Evaluate severity, targeted identity, and appropriation one parameter at a time, then get a Remove / Flag / Approve verdict via simple tallying.`,
  },
]

export default function Home() {
  return (
    <main>
      <h1>IML Prototypes</h1>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {prototypes.map(({ path, title, description }) => (
          <li key={path}>
            <Link to={path}><h2>{title}</h2></Link>
            <p style={{ marginTop: '4px' }}>{description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
