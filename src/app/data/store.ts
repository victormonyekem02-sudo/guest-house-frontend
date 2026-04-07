// Shared data store using localStorage
// This keeps all three portals (Manager, Staff, Guest) in sync

import {
  initialStaff,
  initialRooms,
  initialServiceRequests,
  initialActivities,
  initialGuests,
  Staff,
  Room,
  ServiceRequest,
  Activity,
  Guest,
} from './mockData';

const KEYS = {
  staff: 'ghms_staff',
  rooms: 'ghms_rooms',
  requests: 'ghms_requests',
  activities: 'ghms_activities',
  guests: 'ghms_guests',
};

// ── Generic helpers ───────────────────────────────────────────────────────────
function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      // First time — seed with initial data
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Staff ─────────────────────────────────────────────────────────────────────
export function getStaff(): Staff[] { return load(KEYS.staff, initialStaff); }
export function saveStaff(data: Staff[]): void { save(KEYS.staff, data); }

// ── Rooms ─────────────────────────────────────────────────────────────────────
export function getRooms(): Room[] { return load(KEYS.rooms, initialRooms); }
export function saveRooms(data: Room[]): void { save(KEYS.rooms, data); }

// ── Guests ────────────────────────────────────────────────────────────────────
export function getGuests(): Guest[] { return load(KEYS.guests, initialGuests); }
export function saveGuests(data: Guest[]): void { save(KEYS.guests, data); }

// ── Service Requests ──────────────────────────────────────────────────────────
export function getRequests(): ServiceRequest[] { return load(KEYS.requests, initialServiceRequests); }
export function saveRequests(data: ServiceRequest[]): void { save(KEYS.requests, data); }

export function addRequest(req: ServiceRequest): void {
  const all = getRequests();
  saveRequests([req, ...all]);
}

export function updateRequest(id: string, updates: Partial<ServiceRequest>): void {
  const all = getRequests();
  saveRequests(all.map(r => r.id === id ? { ...r, ...updates } : r));
}

export function deleteRequest(id: string): void {
  saveRequests(getRequests().filter(r => r.id !== id));
}

// ── Activities ────────────────────────────────────────────────────────────────
export function getActivities(): Activity[] { return load(KEYS.activities, initialActivities); }
export function saveActivities(data: Activity[]): void { save(KEYS.activities, data); }

export function addActivity(act: Omit<Activity, 'id'>): void {
  const all = getActivities();
  const newAct: Activity = { ...act, id: `A${Date.now()}` };
  saveActivities([newAct, ...all]);
}

export function deleteActivity(id: string): void {
  saveActivities(getActivities().filter(a => a.id !== id));
}

// ── Reset all data (useful for testing) ───────────────────────────────────────
export function resetAllData(): void {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}
