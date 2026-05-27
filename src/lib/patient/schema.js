export const CAUSES_OF_DEATH = [
  'cardiovascular disease',
  'cerebrovascular accident',
  'head trauma',
  'anoxia',
  'other',
]

// A patient record as presented to the model and the clinician.
// age                       — integer, years
// causeOfDeath              — one of CAUSES_OF_DEATH
// hba1c                     — float, percentage (e.g. 6.5)
// hypertension              — boolean
// donorRecipientWeightRatio — float (donor weight / recipient weight)
export function createPatient({ age, causeOfDeath, hba1c, hypertension, donorRecipientWeightRatio }) {
  if (!CAUSES_OF_DEATH.includes(causeOfDeath)) {
    throw new Error(`Invalid causeOfDeath: "${causeOfDeath}"`)
  }
  return { age, causeOfDeath, hba1c, hypertension, donorRecipientWeightRatio }
}
