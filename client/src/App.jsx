import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Landing, AddJob, Admin, AllJobs, DashboardLayout, DeleteJob, EditJob, Error, HomeLayout, Login, Profile, Register, Stats
} from './pages'
import { action as registerAction  } from './pages/Register';
import { action as LoginAction  } from './pages/Login';
import { loader as loaderDashboard  } from './pages/DashboardLayout';

export const checkDefaultTheme = () => {
  const isDarkTheme =
    localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};



checkDefaultTheme()
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:<Error />,
    children: [  // changed 'child' to 'children'
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: LoginAction,
      },
      {
        path: 'dashboardLayout',
        element: <DashboardLayout isDarkThemeEnabled/>,
        loader: loaderDashboard,
        children: [
          {
             index:true,
              element:<AddJob />
          },
          {
              path:'allJobs',
              element:<AllJobs />
          },
          {
              path:'profile',
              element:<Profile />
          },
          {
              path:'stats',
              element:<Stats />
          },
          {
              path:'admin',
              element:<Admin />
          },
        ]
      },
    ],
  },
]);

function App() {

  
  return (
    <RouterProvider router={router} />
  )
}

export default App;
