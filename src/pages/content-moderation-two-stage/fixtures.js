export const SENTENCES = [
  {
    text: "People like you don't belong in this country.",
    severity: 'high',
    targetedIdentity: 'race',
    appropriated: false,
  },
  {
    text: "Those people always ruin everything they touch.",
    severity: 'high',
    targetedIdentity: 'religion',
    appropriated: false,
  },
  {
    text: "I can't believe they're letting women make decisions now.",
    severity: 'medium',
    targetedIdentity: 'gender',
    appropriated: false,
  },
  {
    text: "My cousin called me a desi uncle and I died laughing.",
    severity: 'low',
    targetedIdentity: 'race',
    appropriated: true,
  },
  {
    text: "That's just typical lower class behavior, what do you expect?",
    severity: 'high',
    targetedIdentity: 'class',
    appropriated: false,
  },
  {
    text: "The food at that restaurant was absolutely amazing!",
    severity: 'low',
    targetedIdentity: null,
    appropriated: false,
  },
  {
    text: "Why do people from that caste always act entitled?",
    severity: 'medium',
    targetedIdentity: 'caste',
    appropriated: false,
  },
  {
    text: "My girls and I were being total basic b*tches about it, so funny.",
    severity: 'low',
    targetedIdentity: 'gender',
    appropriated: true,
  },
  {
    text: "Someone needs to put these immigrants back where they came from.",
    severity: 'high',
    targetedIdentity: 'race',
    appropriated: false,
  },
  {
    text: "The meeting was pushed to Thursday, check your calendar.",
    severity: 'low',
    targetedIdentity: null,
    appropriated: false,
  },
  {
    text: "These rich kids have no idea how the real world works.",
    severity: 'medium',
    targetedIdentity: 'class',
    appropriated: false,
  },
  {
    text: "We queers have been fighting for this for decades.",
    severity: 'low',
    targetedIdentity: 'gender',
    appropriated: true,
  },
]

export function getRandomSentence() {
  return SENTENCES[Math.floor(Math.random() * SENTENCES.length)]
}
