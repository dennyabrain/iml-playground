import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UnstructuredDataCollection from './pages/unstructured-data-collection'
import TweakingWeights from './pages/tweaking-weights'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unstructured-data-collection" element={<UnstructuredDataCollection />} />
        <Route path="/tweaking-weights" element={<TweakingWeights />} />
      </Routes>
    </BrowserRouter>
  )
}
