import { Avatar, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'
import { type Meal } from '../app/page';

type Props = {} & Meal;

export function RecipeListItem({ strMeal, strMealThumb, idMeal }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} href={`/${idMeal}`}>
        <ListItemText primary={`${strMeal}`} />
        <Avatar>
          <Image src={strMealThumb} alt={strMeal} width={100} height={100} />
        </Avatar>
      </ListItemButton>
    </ListItem>
  );
}
