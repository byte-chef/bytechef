const { Configuration, OpenAIApi } = require('openai');
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.BC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
