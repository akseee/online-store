import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  ingredientsActions,
  ingredientsSelectors
} from '../../services/slices/ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { getCurrentIngredientSelector, getIngredientsSelector } =
    ingredientsSelectors;
  const { setCurrentIngredient } = ingredientsActions;

  const { id } = useParams<'id'>();
  const ingredientsData = useSelector(getIngredientsSelector);
  const currentIngredient = useSelector(getCurrentIngredientSelector);

  useEffect(() => {
    dispatch(setCurrentIngredient(id));
  }, [dispatch, id, ingredientsData]);

  if (!currentIngredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={currentIngredient} />;
};
