export const PATIENTS = [
  { age: 34, healthScore: 6, priorTransplants: 0, yearsWaiting: 3, dependents: 2, urgencyScore: 7 },
  { age: 58, healthScore: 3, priorTransplants: 1, yearsWaiting: 7, dependents: 0, urgencyScore: 9 },
  { age: 45, healthScore: 8, priorTransplants: 0, yearsWaiting: 1, dependents: 3, urgencyScore: 4 },
  { age: 62, healthScore: 2, priorTransplants: 2, yearsWaiting: 5, dependents: 1, urgencyScore: 10 },
  { age: 27, healthScore: 7, priorTransplants: 0, yearsWaiting: 2, dependents: 0, urgencyScore: 6 },
  { age: 50, healthScore: 5, priorTransplants: 1, yearsWaiting: 4, dependents: 4, urgencyScore: 8 },
  { age: 39, healthScore: 9, priorTransplants: 0, yearsWaiting: 0, dependents: 2, urgencyScore: 3 },
  { age: 71, healthScore: 1, priorTransplants: 0, yearsWaiting: 9, dependents: 0, urgencyScore: 10 },
  { age: 44, healthScore: 6, priorTransplants: 1, yearsWaiting: 6, dependents: 1, urgencyScore: 5 },
  { age: 31, healthScore: 8, priorTransplants: 0, yearsWaiting: 1, dependents: 3, urgencyScore: 2 },
]

export function getRandomPatient() {
  return PATIENTS[Math.floor(Math.random() * PATIENTS.length)]
}
