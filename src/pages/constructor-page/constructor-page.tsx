import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';
import { RequestStatus } from '@utils-types';

export const ConstructorPage: FC = () => {
  const { getIngredientStatusSelector } = ingredientsSelectors;
  const isIngredientsLoading = useSelector(getIngredientStatusSelector);

  return (
    <>
      {isIngredientsLoading === RequestStatus.LOADING ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
