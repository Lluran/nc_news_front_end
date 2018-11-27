import axios from 'axios';

const BASE_URL = 'https://ncnewsexpressmongodbapp.herokuapp.com/api';

export const getArticles = async () => {
  const {data} = await axios.get(`${BASE_URL}/articles`);
  return data.articles;
};

export const getTopics = async ()=> {
  const {data} = await axios.get(`${BASE_URL}/topics`);
return data.topics;
};

export const getArticlesByTopic = async (slug) => {
  const {data} = await axios.get(`${BASE_URL}/topics/${slug}/articles`);
  return data.articles;
}