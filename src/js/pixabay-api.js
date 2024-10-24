import axios from 'axios';

const API_KEY = '46490288-24919c30ba7303f136305d546';
const BASE_URL = 'https://pixabay.com/api/';

async function getImages(query, page = 1, perPage = 15) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  const searchUrl = `${BASE_URL}?${searchParams}`;
  try {
    const response = await axios.get(searchUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error);
    throw error;
  }
}

export { getImages };
