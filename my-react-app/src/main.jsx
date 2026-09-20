import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Submit from './Submit.jsx'
import CitizenChallengeDetails from './CitizenChallengeDetails.jsx'
import UniversityDashboard from './university/UniversityDashboard.jsx'
import ChallengeDetails from './university/ChallengeDetails.jsx'
import Projects from './university/Projects.jsx'
import Challenges from './university/Challenges.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/submit",
    element: <Submit />,
  },
  {
    path: "/challenges/:id",
    element: <CitizenChallengeDetails />
  },
  {
    path: "/university",
    element: <UniversityDashboard />
  },
  {
    path: "/university/challenges/:id",
    element: <ChallengeDetails />
  },
  {
    path: "/university/challenges/:id",
    element: <ChallengeDetails />
  },
  {
    path: "/university/projects",
    element: <Projects />
  },
  {
    path: "/university/challenges",
    element: <Challenges />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)