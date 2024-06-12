import { FC } from 'react';

export const NotFound404: FC = () => (
  <h3
    className={`pb-6 text text_type_main-large `}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh'
    }}
  >
    Страница не найдена. Ошибка 404.
  </h3>
);
