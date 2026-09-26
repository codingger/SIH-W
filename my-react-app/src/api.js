import axios from 'axios';
import {
  INITIAL_CHALLENGES,
  INITIAL_PROJECTS,
  INITIAL_COLLABS,
  INITIAL_TEAMS,
  INITIAL_PARTNERS,
  INITIAL_APPLICATIONS
} from './constants.js';

const API_BASE = 'http://localhost:3000';
const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000
});

// Local cache to ensure seamless zero-downtime offline experience
let localChallenges = [...INITIAL_CHALLENGES];
let localProjects = [...INITIAL_PROJECTS];
let localCollabs = [...INITIAL_COLLABS];
let localTeams = [...INITIAL_TEAMS];
let localPartners = [...INITIAL_PARTNERS];
let localApplications = [...INITIAL_APPLICATIONS];

function mapStatusToStep(status) {
  if (!status) return 0;
  const s = status.toLowerCase();
  if (s.includes('deploy') || s.includes('complete')) return 7;
  if (s.includes('develop') || s.includes('progress')) return 6;
  if (s.includes('collab')) return 5;
  if (s.includes('team')) return 4;
  if (s.includes('project')) return 3;
  if (s.includes('taken') || s.includes('adopt')) return 2;
  if (s.includes('review')) return 1;
  return 0;
}

function normalizeChallenge(c) {
  if (!c) return null;
  const supporters = c.supporters !== undefined ? c.supporters : (c.votes || 0);
  const affected = c.affected_people !== undefined ? c.affected_people : (c.affected || 0);
  const category = c.category || c.cat || 'General';
  const desc = c.description || c.desc || '';
  const step = c.step !== undefined ? c.step : mapStatusToStep(c.status);
  return {
    ...c,
    id: c.id,
    title: c.title,
    category,
    cat: category,
    district: c.district || 'General',
    area: c.area || '',
    supporters,
    votes: supporters,
    affected_people: affected,
    affected,
    description: desc,
    desc,
    additional_info: c.additional_info || '',
    status: c.status || (step <= 1 ? 'Under Review' : step <= 3 ? 'Taken Up' : 'In Progress'),
    step,
    media: c.media || []
  };
}

function normalizeProject(p) {
  if (!p) return null;
  return {
    ...p,
    id: p.id,
    title: p.title,
    description: p.description || p.desc || '',
    desc: p.description || p.desc || '',
    university: p.university || p.uni || 'Partner University',
    uni: p.university || p.uni || 'Partner University',
    tags: p.tags || ['Community Tech', 'Civic'],
    progress: p.progress !== undefined ? p.progress : 25,
    status: p.status || 'In Progress',
    looking: p.looking || 'Technical mentorship & industrial testing',
    faculty_mentor: p.faculty_mentor || 'Assigned Mentor',
    industry_partner: p.industry_partner || null
  };
}

// API methods with graceful fallback to local cache
export async function getChallenges() {
  try {
    const res = await api.get('/challenges');
    if (Array.isArray(res.data) && res.data.length > 0) {
      localChallenges = res.data.map(normalizeChallenge);
      return localChallenges;
    }
  } catch (err) {
    console.warn('Backend unavailable, using local challenges data:', err.message);
  }
  return localChallenges.map(normalizeChallenge);
}

export async function getChallenge(id) {
  try {
    const res = await api.get(`/challenges/${id}`);
    if (res.data) {
      const ch = res.data.challenge || res.data;
      const media = res.data.media || ch.media || [];
      return normalizeChallenge({ ...ch, media });
    }
  } catch (err) {
    console.warn(`Backend /challenges/${id} unavailable:`, err.message);
  }
  const match = localChallenges.find(c => String(c.id) === String(id));
  return normalizeChallenge(match) || null;
}

export async function supportChallenge(id) {
  try {
    const res = await api.patch(`/challenges/${id}/support`);
    if (res.data) {
      const updated = normalizeChallenge(res.data);
      localChallenges = localChallenges.map(c => c.id === id ? updated : c);
      return updated;
    }
  } catch (err) {
    console.warn('Backend support update failed, applying optimistic update locally:', err.message);
  }
  // Optimistic fallback
  localChallenges = localChallenges.map(c => {
    if (String(c.id) === String(id)) {
      const nv = (c.supporters || c.votes || 0) + 1;
      return { ...c, supporters: nv, votes: nv };
    }
    return c;
  });
  return normalizeChallenge(localChallenges.find(c => String(c.id) === String(id)));
}

export async function createChallenge(formDataOrPayload, files = []) {
  try {
    let payload = formDataOrPayload;
    if (!(formDataOrPayload instanceof FormData)) {
      const data = new FormData();
      Object.keys(formDataOrPayload).forEach(k => {
        if (formDataOrPayload[k] !== undefined && formDataOrPayload[k] !== null) {
          data.append(k, formDataOrPayload[k]);
        }
      });
      if (Array.isArray(files)) {
        files.forEach(f => data.append('files', f));
      }
      payload = data;
    }
    const res = await api.post('/challenges', payload);
    if (res.data) {
      const created = normalizeChallenge(res.data);
      localChallenges = [created, ...localChallenges];
      return created;
    }
  } catch (err) {
    console.warn('Backend POST /challenges failed, saving locally:', err.message);
  }
  // Local fallback creation if backend is offline
  const newId = Date.now();
  const raw = formDataOrPayload instanceof FormData ? Object.fromEntries(formDataOrPayload.entries()) : formDataOrPayload;
  const fallbackMedia = (files || []).map((f, i) => ({
    id: newId + i,
    file_url: URL.createObjectURL(f),
    file_type: f.type || 'image/jpeg'
  }));

  const newC = normalizeChallenge({
    ...raw,
    id: newId,
    supporters: 1,
    votes: 1,
    step: 0,
    status: 'Submitted',
    media: fallbackMedia,
    created_at: new Date().toISOString()
  });
  localChallenges = [newC, ...localChallenges];
  return newC;
}

export async function getProjects() {
  try {
    const res = await api.get('/projects');
    if (Array.isArray(res.data) && res.data.length > 0) {
      localProjects = res.data.map(normalizeProject);
      return localProjects;
    }
  } catch (err) {
    console.warn('Backend /projects unavailable:', err.message);
  }
  return localProjects.map(normalizeProject);
}

export async function getProject(id) {
  try {
    const res = await api.get(`/projects/${id}`);
    if (res.data) {
      return normalizeProject(res.data);
    }
  } catch (err) {
    console.warn(`Backend /projects/${id} unavailable:`, err.message);
  }
  const match = localProjects.find(p => String(p.id) === String(id));
  return normalizeProject(match) || null;
}

export async function takeUpChallenge({ challenge_id, title, description }) {
  try {
    const res = await api.post('/projects', { challenge_id, title, description });
    if (res.data) {
      const newProj = normalizeProject(res.data);
      localProjects = [newProj, ...localProjects];
      // Mark challenge as taken up
      localChallenges = localChallenges.map(c => c.id === challenge_id ? { ...c, status: 'Taken Up', step: 2 } : c);
      return newProj;
    }
  } catch (err) {
    console.warn('Backend take up challenge failed, updating locally:', err.message);
  }
  const newP = normalizeProject({
    id: Date.now(),
    challenge_id,
    title,
    description,
    university: 'University Portal User',
    status: 'Taken Up',
    progress: 10,
    tags: ['Community Problem', 'Active']
  });
  localProjects = [newP, ...localProjects];
  localChallenges = localChallenges.map(c => String(c.id) === String(challenge_id) ? { ...c, status: 'Taken Up', step: 2 } : c);
  return newP;
}

export async function getTeams() {
  try {
    const res = await api.get('/teams');
    if (Array.isArray(res.data) && res.data.length > 0) {
      localTeams = res.data;
      return localTeams;
    }
  } catch (err) {
    console.warn('Backend /teams unavailable:', err.message);
  }
  return localTeams;
}

export async function createTeam(teamData) {
  try {
    const res = await api.post('/teams', teamData);
    if (res.data) {
      localTeams = [res.data, ...localTeams];
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /teams POST failed, creating locally:', err.message);
  }
  const newT = { ...teamData, id: Date.now() };
  localTeams = [newT, ...localTeams];
  return newT;
}

export async function getCompanyCollaborations(companyId = 4) {
  try {
    const res = await api.get(`/company/collaborations/${companyId}`);
    if (Array.isArray(res.data) && res.data.length > 0) {
      localCollabs = res.data;
      return localCollabs;
    }
  } catch (err) {
    console.warn('Backend /company/collaborations unavailable:', err.message);
  }
  return localCollabs;
}

export async function requestCollaboration(projectId, companyId = 4, details = {}) {
  try {
    const res = await api.post(`/projects/${projectId}/collaborate`, { company_id: companyId, ...details });
    if (res.data) {
      localCollabs = [res.data, ...localCollabs];
      return res.data;
    }
  } catch (err) {
    console.warn('Backend collaborate failed, saving locally:', err.message);
  }
  const project = localProjects.find(p => String(p.id) === String(projectId));
  const newC = {
    id: Date.now(),
    project_id: projectId,
    company_id: companyId,
    status: 'Requested',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    project: project?.title || 'Civic Technology Project',
    projects: project || { title: 'Civic Technology Project', status: 'In Progress', progress: 30 }
  };
  localCollabs = [newC, ...localCollabs];
  return newC;
}

export async function getCollaborationRequests() {
  try {
    const res = await api.get('/collaboration-requests');
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /collaboration-requests unavailable:', err.message);
  }
  return localCollabs.filter(c => c.status === 'Requested');
}

export async function updateCollaborationRequest(id, status) {
  try {
    const res = await api.patch(`/collaboration-requests/${id}`, { status });
    if (res.data) {
      localCollabs = localCollabs.map(c => c.id === id ? { ...c, status } : c);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend update collaboration failed, updating locally:', err.message);
  }
  localCollabs = localCollabs.map(c => String(c.id) === String(id) ? { ...c, status } : c);
  return { id, status };
}

export async function getIndustryPartners() {
  try {
    const res = await api.get('/industry-partners');
    if (Array.isArray(res.data) && res.data.length > 0) {
      localPartners = res.data;
      return localPartners;
    }
  } catch (err) {
    console.warn('Backend /industry-partners unavailable:', err.message);
  }
  return localPartners;
}

export async function getIndustryPartnerApplications() {
  try {
    const res = await api.get('/industry-partner-applications');
    if (Array.isArray(res.data) && res.data.length > 0) {
      localApplications = res.data;
      return localApplications;
    }
  } catch (err) {
    console.warn('Backend /industry-partner-applications unavailable:', err.message);
  }
  return localApplications;
}

export async function updatePartnerApplication(id, status) {
  try {
    const res = await api.patch(`/industry-partner-applications/${id}`, { status });
    if (res.data) {
      localApplications = localApplications.filter(a => a.id !== id);
      if (status === 'Accepted') {
        localPartners = [res.data, ...localPartners];
      }
      return res.data;
    }
  } catch (err) {
    console.warn('Backend update application failed, updating locally:', err.message);
  }
  const app = localApplications.find(a => String(a.id) === String(id));
  localApplications = localApplications.filter(a => String(a.id) !== String(id));
  if (app && status === 'Accepted') {
    localPartners = [{ ...app, status: 'Accepted' }, ...localPartners];
  }
  return { id, status };
}

export async function applyIndustryPartner(data) {
  try {
    const res = await api.post('/industry-partners', data);
    if (res.data) {
      localApplications = [res.data, ...localApplications];
      return res.data;
    }
  } catch (err) {
    console.warn('Backend /industry-partners POST failed, applying locally:', err.message);
  }
  const newApp = { ...data, id: Date.now(), status: 'Pending' };
  localApplications = [newApp, ...localApplications];
  return newApp;
}

export async function loginUser(email, password, role) {
  try {
    const res = await api.post('/login', { email, password, role });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('sih_user', JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    console.warn('Backend login failed, using simulated auth session:', err.message);
  }
  // Simulated fallback user session
  const simUser = {
    id: 100,
    name: email.split('@')[0] || 'User',
    email,
    role: role || 'citizen'
  };
  localStorage.setItem('user', JSON.stringify(simUser));
  localStorage.setItem('sih_user', JSON.stringify(simUser));
  return simUser;
}

export async function registerUser(name, email, password, role) {
  try {
    const res = await api.post('/register', { name, email, password, role });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('sih_user', JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    console.warn('Backend register failed, using simulated registration session:', err.message);
  }
  const simUser = { id: 101, name, email, role };
  localStorage.setItem('user', JSON.stringify(simUser));
  localStorage.setItem('sih_user', JSON.stringify(simUser));
  return simUser;
}

export function getCurrentUser() {
  try {
    const saved = localStorage.getItem('user') || localStorage.getItem('sih_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('sih_user');
}
