import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// Lazy-loaded pages
export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInVLUPage = lazy(() => import('src/pages/sign-in-vlu'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------
// Loading fallback
const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);
// Authentication check function
const isAuthenticated = () => !!localStorage.getItem('msal.account.keys');

// Private Route Component for Protected Routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = isAuthenticated();

  // Redirect to /login if not authenticated
  return isAuth ? children : <Navigate to="/login" replace />;
};
// Redirect Component for Public Routes (like /login)
const RedirectToHome = ({ children }: { children: JSX.Element }) => {
  const isAuth = isAuthenticated();
  const location = useLocation();

  // If authenticated and on /login, redirect to /
  if ((isAuth && location.pathname === '/login') || location.pathname === '/sign-in-vlu') {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children (e.g., the login page)
  return children;
};

// Suspense Wrapper
const SuspenseWrapper = ({ children }: { children: JSX.Element }) => (
  <Suspense fallback={renderFallback}>{children}</Suspense>
);

// ----------------------------------------------------------------------

// Main Router
export function Router() {
  return useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <SuspenseWrapper>
              <Outlet />
            </SuspenseWrapper>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/login',
      element: (
        <RedirectToHome>
          <AuthLayout>
            <SuspenseWrapper>
              <SignInPage />
            </SuspenseWrapper>
          </AuthLayout>
        </RedirectToHome>
      ),
    },
    {
      path: '/sign-in-vlu',
      element: (
        <RedirectToHome>
          <AuthLayout>
            <SuspenseWrapper>
              <SignInVLUPage />
            </SuspenseWrapper>
          </AuthLayout>
        </RedirectToHome>
      ),
    },
    {
      path: '404',
      element: (
        <SuspenseWrapper>
          <Page404 />
        </SuspenseWrapper>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
