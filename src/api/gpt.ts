
import { Configuration, OpenAIApi } from 'openai';

const organization = 'org-2CwskBzgGP5OnJE5rJP2GrIS';
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    organization,
    apiKey,
  });
  
  const openai = new OpenAIApi(configuration);
  
  export const generateGptResponse = async (prompt: string): Promise<string> => {
      const response = await openai.createCompletion({
        model: 'text-davinci-003', // Choose the appropriate GPT-3 model for your needs
        prompt,
        max_tokens: 2048,
        temperature: 0.7,
      });
    
      if (response.data.choices && response.data.choices.length > 0) {
        const choice = response.data.choices[0];
        if (choice.text) {
          return choice.text.trim();
        }
      }
    
      throw new Error('Failed to generate GPT response');
    };
  