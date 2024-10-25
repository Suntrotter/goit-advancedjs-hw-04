import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '46490288-24919c30ba7303f136305d546';

async function fetchImages({ page, perPage, searchTerm }) {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      q: searchTerm,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return data;
}

export { fetchImages };
