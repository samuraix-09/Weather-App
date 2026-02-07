import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import OfflinePage from './pages/OfflinePage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import NetworkService from './services/networkService';
import './styles/index.css';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/details/:cityName', element: <DetailsPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/offline', element: <OfflinePage /> },
  { path: '/error', element: <ErrorPage /> },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]);

function App() {
  const [isOnline, setIsOnline] = useState(NetworkService.getStatus());

  useEffect(() => {
    const handleNetworkChange = status => {
      setIsOnline(status);
    };

    NetworkService.addListener(handleNetworkChange);

    return () => {
      NetworkService.removeListener(handleNetworkChange);
    };
  }, []);

  return (
    <div className="app-container">
      <RouterProvider router={router} />

      {isOnline && (
        <div className="network-status online">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          Online
        </div>
      )}
    </div>
  );
}

export default App;
