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
