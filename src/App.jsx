import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UnstructuredDataCollection from './pages/unstructured-data-collection'
import TweakingWeights from './pages/tweaking-weights'
import DecisionTree from './pages/decision-tree'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unstructured-data-collection" element={<UnstructuredDataCollection />} />
        <Route path="/tweaking-weights" element={<TweakingWeights />} />
        <Route path="/decision-tree" element={<DecisionTree />} />
      </Routes>
    </BrowserRouter>
  )
}
