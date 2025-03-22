'use client';

import API, { axiosInstance } from '../../api';
import { use, useEffect, useState } from 'react';
import { FullMealInfo } from '../page';
import { Box, Container, List, ListItem, ListItemText } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Page({
  params,
}: {
  params: Promise<{ meal: string }>;
}) {
  const { meal: idMeal } = use(params);

  const [mealInfo, setMealInfo] = useState<FullMealInfo>();

  useEffect(() => {
    const getMealInfo = async () => {
      try {
        const response = await axiosInstance.get<{ meals: FullMealInfo[] }>(
          `${API.RECIPES}/${idMeal}`
        );
        console.log(response.data);
        setMealInfo((response.data.meals ?? []).at(0));
      } catch (e) {
        console.log(e);
      }
    };
    getMealInfo();
  }, []);

  return (
    <Container>
      {mealInfo && (
        <>
          <h1>Meal {idMeal}</h1>
          <Image
            src={mealInfo.strMealThumb}
            alt={mealInfo.strMeal}
            width={100}
            height={100}
          />
          <Box>
            <p>{mealInfo.strMeal}</p>
            <p>
              <Link
                href={{ pathname: '/', query: { country: mealInfo.strArea } }}
              >
                {mealInfo.strArea}
              </Link>
            </p>
            <p>{mealInfo.strInstructions}</p>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {Object.keys(mealInfo ?? {})
                .filter((mealKey) => {
                  return (
                    (mealKey ?? '').indexOf('strIngredient') > -1 &&
                    !!mealInfo[mealKey]
                  );
                })
                .map((mealKey) => (
                  <ListItem disablePadding key={mealKey}>
                    <Link
                      href={{
                        pathname: '/',
                        query: { ingredient: mealInfo[mealKey] },
                      }}
                    >
                      <ListItemText primary={`${mealInfo[mealKey]}`} />
                    </Link>
                  </ListItem>
                ))}
            </List>
          </Box>
        </>
      )}
    </Container>
  );
}
