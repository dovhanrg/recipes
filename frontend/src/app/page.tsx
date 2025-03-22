'use client';

import { List } from '@mui/material';
import { useEffect, useState } from 'react';
import { RecipeListItem } from '../components/RecipeListItem';
import { SelectDropdown } from '../components/SelectDropdown';
import API, { axiosInstance } from '../api';
import { useSearchParams } from 'next/navigation';

export type IngredientType = `strIngredient${number}`;

export type FullMealInfo = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: null;
  strYoutube: string;
  strSource: string;
  strImageSource: null;
  strCreativeCommonsConfirmed: null;
  dateModified: null;
  [s: IngredientType]: string;
};

export type Meal = { strMeal: string; strMealThumb: string; idMeal: string };

export default function Page() {
  const searchParams = useSearchParams();

  const initialParams = {
    ingredient: searchParams.get('ingredient') ?? '',
    country: searchParams.get('country') ?? '',
  };

  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchType, setSearchType] = useState(
    Object.keys(initialParams)
      .filter((key) => !!initialParams[key])
      .at(0) ?? ''
  );
  const [searchValue, setSearchValue] = useState(
    Object.values(initialParams)
      .filter((value) => !!value)
      .at(0) ?? ''
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSearchTypeSelect = (type: string) => {
    setSearchType(type);
  };

  const onSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      const searchParams = new URLSearchParams();
      try {
        searchParams.set(searchType, searchValue);
        const response = await axiosInstance.get<{ meals: Meal[] }>(
          `${API.RECIPES}?${searchParams.toString()}`
        );
        setMeals(response.data.meals ?? []);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    const debounceTimeout = setTimeout(() => {
      getRecipes();
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchType, searchValue]);
  return (
    <div>
      <h1>Hello, Meals!</h1>
      <SelectDropdown
        initialSearchValue={searchValue}
        initialSearchType={searchType}
        onSelect={onSearchTypeSelect}
        onChange={onSearchValueChange}
      />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {meals.length ? (
          meals.map((meal) => <RecipeListItem key={meal.idMeal} {...meal} />)
        ) : (
          <p>No meals ...:(</p>
        )}
      </List>
    </div>
  );
}
