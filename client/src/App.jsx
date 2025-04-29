
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Landing, AddJob, Admin, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Login, Profile, Register, Stats
} from './pages'
import { action as registerAction  } from './pages/Register';
import { action as LoginAction  } from './pages/Login';
import { loader as loaderDashboard } from './pages/DashboardLayout';
import { action as addJobAction  } from './pages/AddJob';
import { loader as allJobLoader  } from './pages/AllJobs';
import { action as editJobAction  } from './pages/EditJob';
import { loader as editJobLoader  } from './pages/EditJob';
import { action as deleteJobAction  } from './pages/DeleteJob';
import { loader as adminLoader  } from './pages/Admin';
import { action as actionProfile  } from './pages/Profile';
import ErrorElement   from './components/ErrorElement';
import { loader as statsLoader  } from './pages/Stats';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        action: LoginAction(queryClient),
      },
      {
        path: 'dashboardLayout',
        element: <DashboardLayout isDarkThemeEnabled/>,
        loader: loaderDashboard(queryClient),
        children: [
          {
             index:true,
              element:<AddJob />,
              action:addJobAction(queryClient),
          },
          {
              path:'allJobs',
              element:<AllJobs />,
              loader: allJobLoader(queryClient),
          },
          {
              path:'profile',
              element:<Profile />,
              action: actionProfile(queryClient),
          },
          {
              path:'stats',
              element:<Stats />,
              loader: statsLoader(queryClient),
              errorElement: <ErrorElement />,
          },
          {
              path:'edit-job/:id',
              element:<EditJob />,
              action: editJobAction(queryClient),
              loader: editJobLoader(queryClient),
          },
          {
              path: 'delete-job/:id', 
              action: deleteJobAction(queryClient),
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App;
