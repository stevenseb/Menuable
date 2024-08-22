import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import * as sessionActions from './store/session';
import DisplayMenu from './components/DisplayMenu';
import MainPage from './components/Dashboard';
import CartModal from './components/Cart/CartModal';


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
      <CartModal />
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
