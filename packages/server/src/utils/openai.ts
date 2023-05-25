const { Configuration, OpenAIApi } = require('openai');
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.BC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   temperature: 0,
//   max_tokens: 7,
// });

export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}
export interface CreateChatRequest {
  model: 'gpt-3.5-turbo' | 'gpt-3.5-turbo-0301';
  messages: ChatMessage[];
}

export interface CreateChatResponse {
  id: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: Usage;
}

interface Choice {
  index: number;
  message: Message;
  finish_reason: string;
}

interface Message {
  role: string;
  content: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export const createChatCompletion = async (
  chatCompletionOptions: CreateChatRequest
) => {
  const request = await axios.post<CreateChatResponse>(
    'https://api.openai.com/v1/chat/completions',
    {
      model: chatCompletionOptions.model,
      messages: chatCompletionOptions.messages,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BC_OPENAI_API_KEY}`,
      },
    }
  );

  return request;
};
