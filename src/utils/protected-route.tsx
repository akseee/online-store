import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelectors } from '../services/slices/user';
import { useSelector } from '../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { getAuthSelector: getAuthStateSelector, getUserDataSelector } =
    userSelectors;

  const isAuthChecked = useSelector(getAuthStateSelector);
  const user = useSelector(getUserDataSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
