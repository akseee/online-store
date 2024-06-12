import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  orderActions,
  orderSelectors,
  postOrderData
} from '../../services/slices/order';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructor';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getOrderRequestSelector, getOrderModalDataSelector } = orderSelectors;
  const { getConstructorData } = burgerConstructorSelectors;
  const { getUserDataSelector } = userSelectors;

  const { removeIngredients } = burgerConstructorActions;

  const user = useSelector(getUserDataSelector);
  const constructorItems = useSelector(getConstructorData);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderModalDataSelector);

  const { removeOrderModal } = orderActions;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const bunForOrder = constructorItems.bun._id;
    const ingredientsForOrder = constructorItems.ingredients.reduce(
      (ids: string[], ingredient) => [...ids, ingredient._id],
      []
    );

    const orderData = [bunForOrder, bunForOrder, ...ingredientsForOrder];
    dispatch(postOrderData(orderData)).finally(() =>
      dispatch(removeIngredients())
    );
  };

  const closeOrderModal = () => {
    dispatch(removeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
