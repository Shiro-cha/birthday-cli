import axios from 'axios';
import type { Wisdom, ApiConfig } from './types';

const API_CONFIG: ApiConfig = {
  quotesApiUrl: 'https://api.api-ninjas.com/v1/quotes',
  adviceApiUrl: 'https://api.adviceslip.com/advice',
  catFactApiUrl: 'https://catfact.ninja/fact',
  quotesApiKey: 'pyabrhJriBi8T12yaPJFyw==ASqH5PovpfyqFqVX' 
};

export const fetchWisdom = async (): Promise<Wisdom> => {
  try {
    const [quoteRes, adviceRes, factRes] = await Promise.allSettled([
      axios.get(API_CONFIG.quotesApiUrl, {
        headers: { 'X-Api-Key': API_CONFIG.quotesApiKey }
      }),
      axios.get(API_CONFIG.adviceApiUrl),
      axios.get(API_CONFIG.catFactApiUrl)
    ]);

    const defaultWisdom: Wisdom = {
      quote: 'La vie est belle - Anonyme',
      advice: 'Prends le temps de savourer cette journée spéciale',
      funFact: 'Les chats peuvent faire plus de 100 sons vocaux différents'
    };

    return {
      quote: quoteRes.status === 'fulfilled' && quoteRes.value.data[0]?.quote 
        ? `${quoteRes.value.data[0].quote} - ${quoteRes.value.data[0].author}` 
        : defaultWisdom.quote,
      advice: adviceRes.status === 'fulfilled' && adviceRes.value.data.slip?.advice
        ? adviceRes.value.data.slip.advice
        : defaultWisdom.advice,
      funFact: factRes.status === 'fulfilled' && factRes.value.data?.fact
        ? factRes.value.data.fact
        : defaultWisdom.funFact
    };
  } catch (error) {
    console.error('Error fetching wisdom:', error);
    return {
      quote: 'La sagesse commence dans l\'émerveillement - Socrate',
      advice: 'Profite de chaque instant',
      funFact: 'Le rire augmente la longévité'
    };
  }
};