import React, { useState, useEffect } from 'react';
import { AllRoutes } from './helpers/AllRoutes';

import { AnimatePresence } from 'framer-motion';

function App() {

  return (
    <AnimatePresence mode='wait'>
    <div className="App">
      <AllRoutes />
    </div>
    </AnimatePresence>
  );
}

export default App;
