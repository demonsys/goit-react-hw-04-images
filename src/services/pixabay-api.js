import axios from 'axios';
const API_KEY = '34212325-c6ab7e135f4fe9a0ab32789f1';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page) => {
  const params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
    q: searchQuery,
  };
  const response = await axios.get('', { params });
  return response.data;
};

// eslint-disable-next-line
export default { fetchImages };

// class FetchImages = async searchQuery => {
//   const params = {
//     key: API_KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: 1,
//     per_page: 12,
//     q: searchQuery,
//   };
//   const response = await axios.get('', { params });
//   return response.data.hits;
// };
// const fetchImages = FetchImages();

// export default { fetchImages };
