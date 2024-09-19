import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Navbar from './components/Navbar';
import { SnackbarProvider } from './context/SnackbarContext';
import { ROUTES, TOKEN_KEY } from './constants/routes';

const App = () => {
  const location = useLocation();

  const token = localStorage.getItem(TOKEN_KEY);

  const shouldShowNavbar = useMemo(
    () => !(location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER),
    [location.pathname]
  );

  return (
    <SnackbarProvider>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path={ROUTES.LOGIN} element={token ? <Navigate to={ROUTES.TASKS} /> : <Login />} />
        <Route path={ROUTES.REGISTER} element={token ? <Navigate to={ROUTES.TASKS} /> : <Register />} />
        <Route path={ROUTES.TASKS} element={token ? <Tasks /> : <Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.TASKS} />} />
        <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.LOGIN} />} />
      </Routes>
    </SnackbarProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
