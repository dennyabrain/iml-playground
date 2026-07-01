import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UnstructuredDataCollection from './pages/unstructured-data-collection'
import TweakingWeights from './pages/tweaking-weights'
import DecisionTree from './pages/decision-tree'
import DrawALinearModel from './pages/draw-a-linear-model'
import TwoStageModel from './pages/two-stage-model'
import ContentModerationTwoStageModel from './pages/content-moderation-two-stage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unstructured-data-collection" element={<UnstructuredDataCollection />} />
        <Route path="/tweaking-weights" element={<TweakingWeights />} />
        <Route path="/decision-tree" element={<DecisionTree />} />
        <Route path="/draw-a-linear-model" element={<DrawALinearModel />} />
        <Route path="/two-stage-model" element={<TwoStageModel />} />
        <Route path="/content-moderation-two-stage" element={<ContentModerationTwoStageModel />} />
      </Routes>
    </BrowserRouter>
  )
}
