
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Landing, AddJob, Admin, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Login, Profile, Register, Stats
} from './pages'
import { action as registerAction  } from './pages/Register';
import { action as LoginAction  } from './pages/Login';
import { loader as loaderDashboard  } from './pages/DashboardLayout';
import { action as addJobAction  } from './pages/AddJob';
import { loader as allJobLoader  } from './pages/AllJobs';
import { action as editJobAction  } from './pages/EditJob';
import { loader as editJobLoader  } from './pages/EditJob';
import { action as deleteJobAction  } from './pages/DeleteJob';
import { loader as adminLoader  } from './pages/Admin';
import { action as actionProfile  } from './pages/Profile';


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
              element:<AddJob />,
              action:addJobAction
          },
          {
              path:'allJobs',
              element:<AllJobs />,
              loader: allJobLoader
          },
          {
              path:'profile',
              element:<Profile />,
              action: actionProfile
          },
          {
              path:'stats',
              element:<Stats />
          },
          {
              path:'edit-job/:id',
              element:<EditJob />,
              action: editJobAction,
              loader: editJobLoader,
          },
          {
              path: 'delete-job/:id', 
              action: deleteJobAction 
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
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
