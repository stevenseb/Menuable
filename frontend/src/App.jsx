import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import * as sessionActions from './store/session';
import DisplayMenu from './components/DisplayMenu';
import MainPage from './components/Dashboard';
import Checkout from './components/Checkout';
import MyAccount from './components/MyAccount/MyAccount';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <NavBar isLoaded={isLoaded} />
      <div className="main-content">
        {isLoaded && <Outlet />}
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DisplayMenu />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/my-account',
        element: <MyAccount />,
      },
      {
        path: '/dashboard',
        element: <MainPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
