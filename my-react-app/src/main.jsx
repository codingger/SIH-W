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
import IndustryPartners from './university/IndustryPartners.jsx'
import Teams from './university/Teams.jsx'
import CompanyDashboard from './company/CompanyDashboard.jsx'
import CompanyProjects from './company/CompanyProjects.jsx'
import CompanyProjectDetails from './company/CompanyProjectDetails.jsx'
import CompanyCollaborations from './company/CompanyCollaborations.jsx'
import ProjectDetails from './university/ProjectDetails.jsx'

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
    path: "/university/projects",
    element: <Projects />
  },
  {
    path: "/university/projects/:id",
    element: <ProjectDetails />
  },
  {
    path: "/university/challenges",
    element: <Challenges />
  },
  {
    path: "/university/industry",
    element: <IndustryPartners />
  },
  {
    path: "/university/teams",
    element: <Teams />
  },
  {
    path: "/company",
    element: <CompanyDashboard />
  },
  {
    path: "/company/projects",
    element: <CompanyProjects />
  },
  {
    path: "/company/projects/:id",
    element: <CompanyProjectDetails />
  },
  {
    path: "/company/collaborations",
    element: <CompanyCollaborations />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)