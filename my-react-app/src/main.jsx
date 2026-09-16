import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Submit from './Submit.jsx'
import UniversityDashboard from './university/UniversityDashboard.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/submit",
    element: <Submit/>,
  },
  {
    path: "/university",
    element: <UniversityDashboard/>
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)