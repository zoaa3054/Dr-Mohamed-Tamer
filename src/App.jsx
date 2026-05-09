import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'next-themes';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};

const RootLayout = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
    document.body.className = dir;
  }, [i18n.language, i18n.resolvedLanguage]);

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/admin",
        element: <AdminLogin />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/admin-dashboard",
            element: <AdminPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
