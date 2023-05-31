import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { getToken } from "./tokens";
import { isAuthenticated } from '../utils/Auth';

// Pages
import Index from '../pages/Index';

import Notes from '../pages/Notes';
import Bookmarks from '../pages/Bookmarks';
import Drafts from '../pages/Drafts';

import Notebooks from '../pages/Notebooks';
import Settings from '../pages/Settings';

// Auth
import Signin from '../pages/auth/Signin';
import Signup from '../pages/auth/Signup';

// Notes (CRUD)
import ViewNote from '../pages/notes/View';
import EditNote from '../pages/notes/Edit';
import NewNote from '../pages/notes/NewNote';

// Messages
import NotFound from '../pages/messages/NotFound';

// Page transitions
import { AnimatePresence } from "framer-motion";

export const AllRoutes = () => {

  const location = useLocation();
  const auth = isAuthenticated();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={ isAuthenticated() ? <Navigate to="notes" /> : <Index /> } />
      <Route path="/notes" element={isAuthenticated() ? <Notes/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes/bookmarks" element={isAuthenticated() ? <Bookmarks/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes/drafts" element={isAuthenticated() ? <Drafts/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes/new" element={isAuthenticated() ? <NewNote/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notebooks" element={isAuthenticated() ? <Notebooks /> : <Navigate to="/auth/signin" />} />
      <Route path="/settings" element={isAuthenticated() ? <Settings /> : <Navigate to="/auth/signin" />} />

      <Route path="/notes/v/:id" element={isAuthenticated() ? <ViewNote /> : <Navigate to="/auth/signin" />} />
      <Route path="/notes/e/:id" element={isAuthenticated() ? <EditNote /> : <Navigate to="/auth/signin" />} />

      <Route path="/auth/signin" element={!isAuthenticated() ? <Signin/> : <Navigate to="/notes" />} />
      <Route path="/auth/signup" element={!isAuthenticated() ? <Signup/> : <Navigate to="/notes" />} />

      <Route path="/404" element={isAuthenticated() ? <Notes/> : <NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
