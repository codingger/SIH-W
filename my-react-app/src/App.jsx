import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Chrome, PortalShell } from './components.jsx';
import * as P from './pages.jsx';
import './styles.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Chrome />}>
        {/* Citizen Routes */}
        <Route index element={<P.Home />} />
        <Route path="explore" element={<P.Explore />} />
        <Route path="submit" element={<P.Submit />} />
        <Route path="track" element={<P.CitizenTrack />} />
        <Route path="challenges/:id" element={<P.ChallengeDetail />} />

        {/* Authentication */}
        <Route path="login" element={<P.Login />} />
        <Route path="register" element={<P.Register />} />

        {/* Informational & GIGW Compliance */}
        <Route path="how-it-works" element={<P.HowItWorks />} />
        <Route path="about" element={<P.About />} />
        <Route path="accessibility" element={<P.Accessibility />} />
        <Route path="help" element={<P.Help />} />
        <Route path="privacy" element={<P.StaticLegal title="Privacy Policy" />} />
        <Route path="terms" element={<P.StaticLegal title="Terms of Service" />} />
        <Route path="_kit" element={<P.KitDemo />} />

        {/* University Portal (Sidebar layout) */}
        <Route path="university" element={<PortalShell role="university" />}>
          <Route index element={<P.UniDash />} />
          <Route path="challenges" element={<P.UniChallenges />} />
          <Route path="challenges/:id" element={<P.ChallengeDetail portal />} />
          <Route path="projects" element={<P.ProjectsPage role="university" />} />
          <Route path="projects/:id" element={<P.ProjectDetailView role="university" />} />
          <Route path="teams" element={<P.UniTeams />} />
          <Route path="industry" element={<P.UniIndustry />} />
          <Route path="reports" element={<P.UniReports />} />
          <Route path="progress" element={<P.UniReports />} />
        </Route>

        {/* Industry / Company Portal (Sidebar layout) */}
        <Route path="company" element={<PortalShell role="company" />}>
          <Route index element={<P.CoDash />} />
          <Route path="projects" element={<P.ProjectsPage role="company" />} />
          <Route path="projects/:id" element={<P.ProjectDetailView role="company" />} />
          <Route path="collaborations" element={<P.CoCollaborations />} />
          <Route path="industry-application" element={<P.CoApply />} />
          <Route path="progress" element={<P.ProjectsPage role="company" />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<P.NotFound />} />
      </Route>
    </Routes>
  );
}