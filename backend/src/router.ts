import express, { Request } from 'express';
import axiosInstance from './axiosConfig';
import API_PATHS from './API_PATHS';

interface CustomRequest extends Request {
  query: {
    ingredient?: string;
    country?: string;
    category?: string;
  } & Request['query'];
}

interface RequestWithId extends Request {
  params: {
    id?: string;
  };
}

const router = express.Router();

router.get('/', (req, res) => {
  console.log(
    'GET /',
    JSON.stringify({
      url: req.url,
      query: req.query,
      params: req.params,
    })
  );
  res.send('Hello, Recipes!');
});

router.get('/recipes', async (req: CustomRequest, res) => {
  const ingredient = req.query.ingredient;
  const country = req.query.country;
  const category = req.query.category;
  console.log(req.query);
  try {
    const searchParams = new URLSearchParams();
    if (ingredient) {
      searchParams.set('i', ingredient);
      const response = await axiosInstance.get(
        `${API_PATHS.FILTER}?${searchParams.toString()}`
      );
      const recipes = response.data;
      res.send(recipes);
      return;
    }
    if (country) {
      searchParams.set('a', country);
      const response = await axiosInstance.get(
        `${API_PATHS.FILTER}?${searchParams.toString()}`
      );
      const recipes = response.data;
      console.log(recipes);
      res.send(recipes);
      return;
    }
    if (category) {
      searchParams.set('c', category);
      const response = await axiosInstance.get(
        `${API_PATHS.FILTER}?${searchParams.toString()}`
      );
      const recipes = response.data;
      res.send(recipes);
      return;
    }
    searchParams.set('s', '');
    const response = await axiosInstance.get(
      `${API_PATHS.RECIPES}?${searchParams.toString()}`
    );
    const recipes = response.data;
    res.send(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/recipes/:id', async (req: RequestWithId, res) => {
  const id = req.params.id;
  console.log(req.query);
  try {
    const searchParams = new URLSearchParams();
    if (!id) {
      searchParams.set('s', '');
      const response = await axiosInstance.get(
        `${API_PATHS.RECIPES}?${searchParams.toString()}`
      );
      const recipes = response.data;
      res.send(recipes);
      return;
    }
    searchParams.set('i', id);
    const response = await axiosInstance.get(
      `${API_PATHS.LOOKUP}?${searchParams.toString()}`
    );
    const recipes = response.data;
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
  });
});

export default router;
