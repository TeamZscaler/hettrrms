import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Packages from './pages/Packages';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Usermain from './userpage/Usermain';
import Adminmain from './adminpage/Adminmain';
import Register from './pages/Register';
import App from './App';
import Sms from './pages/Sms';
import Users from './adminpage/Users';
import Addpack from './adminpage/Addpack';
import PackageDetails from './adminpage/PackageDetails';
import Local from './userpage/Local';
import PackageList from './adminpage/PackageList';
import Book from './userpage/Book';


const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
  },
  {
    path:"/About",
    element:<About />,
  },
  {
    path:"/Packages",
    element:<Packages />,
  },
  {
    path:"/ContactUs",
    element:<ContactUs />,
  },
  {
    path:"/Login",
    element:<Login />,
  },
  {
    path:"/Register",
    element:<Register />,
  },
  //user
  {
    path:"/User",
    element:<Usermain />,
  },
//admin
{
  path:"/Admin",
  element:<Adminmain />,
},
{
  path:"/Showuser",
  element:<Users />,
},
{
  path:"/AddPackages",
  element:<Addpack />,
},
{
  path:"/packages/:id",
  element:<PackageDetails />,
},
{
  path:"/Local",
  element:<Local />,
},
{
  path:"/PackageList",
  element:<PackageList />,
},
//booking
{
  path:"/Book",
  element:<Book/>,
},
//sms
{
  path:"/Sms",
  element:<Sms/>,
},




]);

const root = ReactDOM.createRoot(document.getElementById('root'));
function AppWithNavigation() {
  const navigate = useNavigate();
  return <App navigate={navigate} />;
}
root.render(

  <RouterProvider router={router}>
  <AppWithNavigation />
</RouterProvider>
 
);


