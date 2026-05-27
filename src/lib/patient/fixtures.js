import { createPatient } from './schema'

export const patients = [
  createPatient({ age: 54, causeOfDeath: 'cardiovascular disease',    hba1c: 5.8, hypertension: true,  donorRecipientWeightRatio: 1.05 }),
  createPatient({ age: 38, causeOfDeath: 'head trauma',               hba1c: 4.9, hypertension: false, donorRecipientWeightRatio: 0.92 }),
  createPatient({ age: 61, causeOfDeath: 'cerebrovascular accident',  hba1c: 7.2, hypertension: true,  donorRecipientWeightRatio: 1.18 }),
  createPatient({ age: 45, causeOfDeath: 'anoxia',                    hba1c: 5.3, hypertension: false, donorRecipientWeightRatio: 0.87 }),
  createPatient({ age: 70, causeOfDeath: 'other',                     hba1c: 6.1, hypertension: true,  donorRecipientWeightRatio: 1.00 }),
]
