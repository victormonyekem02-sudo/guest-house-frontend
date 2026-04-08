// In your api.ts or config file
const getBaseUrl = () => {
  console.log('Current hostname:', window.location.hostname);
  console.log('Current port:', window.location.port);
  
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.port === '3000' ||
      window.location.port === '5173') {
    console.log('Using LOCAL API:', 'http://localhost:5000/api');
    return 'http://localhost:5000/api';
  }
  console.log('Using PRODUCTION API:', 'https://guesthouse-backend.onrender.com/api');
  return 'https://guest-house-backend-gx77.onrender.com/api';
};

const BASE_URL = getBaseUrl();
// AUTH
export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json();
};

// STAFF
export const getStaff = async () => {
  const res = await fetch(`${BASE_URL}/staff`);
  return res.json();
};

export const createStaff = async (data: any) => {
  const res = await fetch(`${BASE_URL}/staff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateStaff = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/staff/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteStaff = async (id: number) => {
  const res = await fetch(`${BASE_URL}/staff/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

// ROOMS
export const getRooms = async () => {
  const res = await fetch(`${BASE_URL}/rooms`);
  return res.json();
};

export const createRoom = async (data: any) => {
  const res = await fetch(`${BASE_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateRoom = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteRoom = async (id: number) => {
  const res = await fetch(`${BASE_URL}/rooms/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

// GUESTS
export const getGuests = async () => {
  const res = await fetch(`${BASE_URL}/guests`);
  return res.json();
};

export const createGuest = async (data: any) => {
  const res = await fetch(`${BASE_URL}/guests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateGuest = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/guests/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteGuest = async (id: number) => {
  const res = await fetch(`${BASE_URL}/guests/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

// SERVICE REQUESTS
export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests`);
  return res.json();
};

export const getRequestsByGuest = async (guestId: number) => {
  const res = await fetch(`${BASE_URL}/requests/guest/${guestId}`);
  return res.json();
};

export const getRequestsByStaff = async (staffId: number) => {
  const res = await fetch(`${BASE_URL}/requests/staff/${staffId}`);
  return res.json();
};

export const createRequest = async (data: any) => {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateRequest = async (id: number, data: any) => {
  const res = await fetch(`${BASE_URL}/requests/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteRequest = async (id: number) => {
  const res = await fetch(`${BASE_URL}/requests/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

// ACTIVITIES
export const getActivities = async () => {
  const res = await fetch(`${BASE_URL}/activities`);
  return res.json();
};

export const createActivity = async (data: any) => {
  const res = await fetch(`${BASE_URL}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteActivity = async (id: number) => {
  const res = await fetch(`${BASE_URL}/activities/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};