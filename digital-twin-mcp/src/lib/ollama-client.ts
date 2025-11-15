import { Ollama } from 'ollama';

// Initialize Ollama client
const ollama = new Ollama({
  host: process.env.OLLAMA_HOST || 'http://localhost:11434',
});

export interface OllamaConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Check if Ollama is available and running
 */
export async function isOllamaAvailable(): Promise<boolean> {
  try {
    await ollama.list();
    return true;
  } catch (error) {
    console.warn('Ollama is not available:', error);
    return false;
  }
}

/**
 * Get list of available Ollama models
 */
export async function getAvailableModels(): Promise<string[]> {
  try {
    const response = await ollama.list();
    return response.models.map((model: any) => model.name);
  } catch (error) {
    console.error('Failed to get Ollama models:', error);
    return [];
  }
}

/**
 * Generate completion using Ollama
 */
export async function generateOllamaCompletion(
  prompt: string,
  config: OllamaConfig = {}
): Promise<string> {
  const {
    model = process.env.OLLAMA_MODEL || 'llama3.2',
    temperature = 0.7,
    maxTokens = 600,
  } = config;

  try {
    const response = await ollama.generate({
      model,
      prompt,
      options: {
        temperature,
        num_predict: maxTokens,
      },
    });

    return response.response;
  } catch (error) {
    console.error('Ollama generation failed:', error);
    throw error;
  }
}

/**
 * Chat completion using Ollama (for conversation context)
 */
export async function chatWithOllama(
  messages: Array<{ role: string; content: string }>,
  config: OllamaConfig = {}
): Promise<string> {
  const {
    model = process.env.OLLAMA_MODEL || 'llama3.2',
    temperature = 0.7,
  } = config;

  try {
    const response = await ollama.chat({
      model,
      messages,
      options: {
        temperature,
      },
    });

    return response.message.content;
  } catch (error) {
    console.error('Ollama chat failed:', error);
    throw error;
  }
}

export { ollama };
