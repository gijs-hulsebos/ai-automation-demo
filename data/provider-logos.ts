// One provider mapping. Only add verified local logo assets; unknown providers use text.
export const providerLogos: Record<string, { src?: string; name: string }> = {
  Anthropic: { name: 'Anthropic' },
  Google: { name: 'Google' },
  'Google Cloud': { name: 'Google Cloud' },
  'Lund University': { name: 'Lund University' },
  'University of Pennsylvania (Wharton)': { name: 'Wharton' },
};
