export interface Language {
  code: string;
  name: string;
}

export type TranslationState = 'idle' | 'loading' | 'success' | 'error';
