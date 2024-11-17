import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from "./routes.jsx"
import './index.css'
import { AuthProvider } from "./autenticacao/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
