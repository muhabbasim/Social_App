import { useContext } from 'react'
import './App.css';
import './style.scss'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate
} from "react-router-dom";

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RightBar from './components/right_bar/RightBar';
import LeftBar from './components/left_bar/LeftBar';
import Home from './pages/home/Home';
import NavBar from './components/nav_bar/NavBar';
import Profile from './pages/profile/Profile';
import { DarkModeContext } from './context/DarkModeContext';
import { AuthContext } from './context/AuthContext';


function App() {

  const queryClient = new QueryClient()

  const { currentUser } = useContext(AuthContext)
  const { darkMode } = useContext(DarkModeContext)

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${ darkMode ? 'dark' : 'light' }`}>
          <NavBar/>
          <div style={{display: 'flex'}}>
            <LeftBar/>
            <Outlet/>
            <RightBar/>
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),

      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        },
        
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
