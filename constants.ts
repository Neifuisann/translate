import { Language } from './types';

// Adapting the "Language" interface to serve as "Problem Type"
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'auto', name: 'Detect language' },
  { code: 'gen', name: 'English' },
  { code: 'org', name: 'Vietnamese' },
  { code: 'inorg', name: 'Japanese' },
  { code: 'sto', name: 'Stoichiometry' },
  { code: 'thermo', name: 'Thermodynamics' },
  { code: 'kin', name: 'Kinetics' },
  { code: 'equi', name: 'Equilibrium' },
  { code: 'nuc', name: 'Nuclear Chemistry' },
];

export const TARGET_LANGUAGES: Language[] = [
  { code: 'concise', name: 'English' },
  { code: 'explain', name: 'Vietnamese' }, // Still kept short per user request for main mode, but options available
];