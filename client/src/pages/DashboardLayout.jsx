// src/pages/DashboardLayout.jsx
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar, Loading } from '../components';
import customFetch from '../utils/customFetch';
import React, { useState, createContext, useContext } from 'react';
import { checkDefaultTheme } from '../App';

export const DashboardContext = createContext();

// 1️⃣ Our loader: fetch (or redirect) before UI
export const loader = (queryClient) => async () => {
  try {
    // ensure the ['user'] query is in cache (or fetch it)
    await queryClient.ensureQueryData({
      queryKey: ['user'],
      queryFn: async () => {
        const { data } = await customFetch('/users/current-user');
        return data;
      },
    });
    // Return the cached payload so useLoaderData() gets { user }
    return queryClient.getQueryData(['user']);
  } catch {
    // if not logged in, send them back to /
    return redirect('/');
  }
};

const DashboardLayout=()=> {
  // 2️⃣ Grab the user from the loader
  const { user } = useLoaderData();

  // 3️⃣ Grab the same QueryClient you used for the loader
  const queryClient = useQueryClient();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const navigate = useNavigate();

  const logoutUser = async () => {
    // hit logout, clear cache, toast, then redirect
    await customFetch.get('/auth/logout');
    queryClient.clear(); 
    toast.success('Logging out…');
    navigate('/', { replace: true });
  };

  const toggleDarkTheme = () => {
    const next = !isDarkTheme;
    setIsDarkTheme(next);
    document.body.classList.toggle('dark-theme', next);
    localStorage.setItem('darkTheme', next);
  };

  const toggleSidebar = () => setShowSidebar((s) => !s);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
