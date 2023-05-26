import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { getToken } from "./tokens";

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

  if(getToken()) {
    console.log('Token is set');
  }

  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={ getToken() ? <Navigate to="notes" /> : <Index /> } />
      <Route path="/notes" element={getToken() ? <Notes/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes/bookmarks" element={getToken() ? <Bookmarks/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes/drafts" element={getToken() ? <Drafts/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes/new" element={getToken() ? <NewNote/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notebooks" element={getToken() ? <Notebooks /> : <Navigate to="/auth/signin" />} />
      <Route path="/settings" element={getToken() ? <Settings /> : <Navigate to="/auth/signin" />} />

      <Route path="/notes/v/:id" element={getToken() ? <ViewNote /> : <Navigate to="/auth/signin" />} />
      <Route path="/notes/e/:id" element={getToken() ? <EditNote /> : <Navigate to="/auth/signin" />} />

      <Route path="/auth/signin" element={!getToken() ? <Signin/> : <Navigate to="/notes" />} />
      <Route path="/auth/signup" element={!getToken() ? <Signup/> : <Navigate to="/notes" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
