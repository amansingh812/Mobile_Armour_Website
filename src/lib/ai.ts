// One place to configure the AI provider.
// AI_PROVIDER=openrouter (or an OpenRouter key, sk-or-...) uses OpenRouter's
// OpenAI-compatible API; anything else uses OpenAI directly.
// OPENAI_API_KEY holds the key either way. AI_MODEL overrides the model.

export function aiConfig() {
  const apiKey = process.env.OPENAI_API_KEY || '';
  const provider = (process.env.AI_PROVIDER || '').toLowerCase();
  const openrouter = provider === 'openrouter' || apiKey.startsWith('sk-or-');
  return {
    apiKey,
    openrouter,
    baseURL: openrouter ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1',
    model: process.env.AI_MODEL || (openrouter ? 'openai/gpt-4o-mini' : 'gpt-4o-mini'),
    headers: openrouter
      ? { 'HTTP-Referer': 'https://www.mobilearmour.com.au', 'X-Title': 'Mobile Armour' }
      : ({} as Record<string, string>),
  };
}
