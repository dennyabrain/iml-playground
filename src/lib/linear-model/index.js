// Fake linear model for donor suitability prediction.
//
// Each feature is first encoded into a 0–1 scalar, then multiplied by
// its weight and summed with a bias. A sigmoid maps the result to a
// probability; values above 0.5 → true (suitable), below → false.

const CAUSE_OF_DEATH_SCORE = {
  'head trauma':             1.0,
  'anoxia':                  0.75,
  'other':                   0.5,
  'cerebrovascular accident': 0.35,
  'cardiovascular disease':  0.15,
}

const encode = {
  age:                      v => (v - 18) / (75 - 18),
  causeOfDeath:             v => CAUSE_OF_DEATH_SCORE[v] ?? 0.5,
  hba1c:                    v => (v - 3.5) / (10.0 - 3.5),
  hypertension:             v => v ? 1 : 0,
  donorRecipientWeightRatio: v => 1 - Math.abs(v - 1.0),
}

// Positive weight → feature increases likelihood of true.
// Negative weight → feature decreases it.
export const DEFAULT_WEIGHTS = {
  age:                      -0.50,
  causeOfDeath:              0.65,
  hba1c:                    -0.55,
  hypertension:             -0.35,
  donorRecipientWeightRatio:  0.45,
}

const BIAS = 0.30

const sigmoid = x => 1 / (1 + Math.exp(-x))

const score = (patient, weights) =>
  Object.keys(weights).reduce(
    (sum, key) => sum + weights[key] * encode[key](patient[key]),
    BIAS
  )

export function predict(patient) {
  const probability = sigmoid(score(patient, DEFAULT_WEIGHTS))
  return { prediction: probability >= 0.5, probability }
}

export function predictWithWeights(patient, weights) {
  const probability = sigmoid(score(patient, weights))
  return { prediction: probability >= 0.5, probability }
}
