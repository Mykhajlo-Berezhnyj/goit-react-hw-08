import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import AppBar from '../AppBar/AppBar';
import {
  selectIsLoading,
  selectIsRefreshing,
} from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';
import { RestrictedRoute } from '../RestrictedRoute.jsx';
import { PrivateRoute } from '../PrivateRoute.jsx';
import { Loader } from '../Loader/Loader.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage.jsx'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage/ContactsPage'),
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {isRefreshing ? (
        <strong>Refreshing user...</strong>
      ) : (
        <div className="container">
          <Toaster position="top-center" />
          <AppBar />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<RegistrationPage />}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<LoginPage />}
                  />
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<ContactsPage />}
                  />
                }
              />
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
