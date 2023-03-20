import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { getToken } from "./tokens";

// Pages
import Index from '../pages/Index';
import Notes from '../pages/Notes';
import Timeline from '../pages/Timeline';
import Notebooks from '../pages/Notebooks';
import Drafts from '../pages/Drafts';
import Settings from '../pages/Settings';

import Signin from '../pages/auth/Signin';
import Signup from '../pages/auth/Signup';

export const AllRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={ <Index/> } />
      <Route path="/timeline" element={getToken() ? <Timeline/> : <Navigate to="/auth/signin" /> } />
      <Route path="/notes" element={getToken() ? <Notes /> : <Navigate to="/auth/signin" />} />
      <Route path="/notebooks" element={getToken() ? <Notebooks /> : <Navigate to="/auth/signin" />} />
      <Route path="/notes/drafts" element={getToken() ? <Drafts /> : <Navigate to="/auth/signin" />} />
      <Route path="/settings" element={getToken() ? <Settings /> : <Navigate to="/auth/signin" />} />

      <Route path="/auth/signin" element={<Signin/>} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  )
}
