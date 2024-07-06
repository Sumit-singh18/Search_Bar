import axios from 'axios';

const options = {
  method: 'GET',
  url: import.meta.env.VITE_GEO_DB_URL,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_GEO_DB_API_KEY,
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};

export const fetchCities = async (query, limit) => {
  try {
    const response = await axios.get(options.url, {
      headers: options.headers,
      params: { namePrefix: query, limit: limit }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};
