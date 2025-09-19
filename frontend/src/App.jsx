import { useState } from 'react';

import { Toaster } from "react-hot-toast";

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <AppRoutes/>

       <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
