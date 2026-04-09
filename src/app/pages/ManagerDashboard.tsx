import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from 'sonner';
import logo from '../../assets/logocopy.jpg';
import {
  LogOut, Users, Bed, ClipboardList, TrendingUp, UserPlus,
  Home, CheckCircle, DoorOpen, Wrench, Sparkles, Pencil,
  Trash2, PlusCircle, UserCircle, RefreshCw, DoorClosed,
} from 'lucide-react';

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
  console.log('Using PRODUCTION API:', 'https://guest-house-backend-gx77.onrender.com/api');
  return 'https://guest-house-backend-gx77.onrender.com/api';
};

const BASE_URL = getBaseUrl();

interface Staff { id: number; name: string; role: string; shift: string; status: string; phone: string; email: string; }
interface Room { id: number; room_number: string; type: string; status: string; price: number; guest_name?: string; check_in?: string; check_out?: string; }
interface Guest { id: number; name: string; room_number: string; check_in: string; check_out: string; phone: string; email: string; access_code: string; }
interface Request { id: number; room_number: string; type: string; description: string; priority: string; status: string; assigned_to?: number; guest_name?: string; staff_name?: string; created_at: string; completed_at?: string; }
interface Activity { id: number; staff_name?: string; description: string; type: string; created_at: string; }

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState<Staff[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isEditGuestOpen, setIsEditGuestOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  // ── Fetch all data ──────────────────────────────────────────────────────────
  const fetchAll = async () => {
    try {
      const [s, r, g, req, act] = await Promise.all([
        fetch(`${BASE_URL}/staff`).then(r => r.json()),
        fetch(`${BASE_URL}/rooms`).then(r => r.json()),
        fetch(`${BASE_URL}/guests`).then(r => r.json()),
        fetch(`${BASE_URL}/requests`).then(r => r.json()),
        fetch(`${BASE_URL}/activities`).then(r => r.json()),
      ]);
      setStaff(Array.isArray(s) ? s : []);
      setRooms(Array.isArray(r) ? r : []);
      setGuests(Array.isArray(g) ? g : []);
      setRequests(Array.isArray(req) ? req : []);
      setActivities(Array.isArray(act) ? act : []);
    } catch {
      toast.error('Cannot connect to backend. Make sure it is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  // ── STAFF CRUD ──────────────────────────────────────────────────────────────
  const handleAddStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${BASE_URL}/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'), role: f.get('role'), shift: f.get('shift'),
          phone: f.get('phone'), email: f.get('email'), status: 'active',
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Staff member added');
      setIsAddStaffOpen(false);
      (e.target as HTMLFormElement).reset();
      fetchAll();
    } catch { toast.error('Failed to add staff member'); }
  };

  const handleEditStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStaff) return;
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${BASE_URL}/staff/${selectedStaff.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'), role: f.get('role'), shift: f.get('shift'),
          phone: f.get('phone'), email: f.get('email'), status: selectedStaff.status,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Staff updated');
      setIsEditStaffOpen(false);
      setSelectedStaff(null);
      fetchAll();
    } catch { toast.error('Failed to update staff member'); }
  };

  const handleDeleteStaff = async (id: number) => {
    if (!confirm('Delete this staff member?')) return;
    try {
      await fetch(`${BASE_URL}/staff/${id}`, { method: 'DELETE' });
      toast.success('Staff deleted');
      fetchAll();
    } catch { toast.error('Failed to delete staff'); }
  };

  // ── ROOM CRUD ───────────────────────────────────────────────────────────────
  const handleAddRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${BASE_URL}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_number: f.get('room_number'), type: f.get('type'),
          price: Number(f.get('price')), status: 'available',
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Room added');
      setIsAddRoomOpen(false);
      (e.target as HTMLFormElement).reset();
      fetchAll();
    } catch { toast.error('Failed to add room'); }
  };

  const handleEditRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRoom) return;
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${BASE_URL}/rooms/${selectedRoom.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_number: f.get('room_number'), type: f.get('type'),
          price: Number(f.get('price')), status: f.get('status'),
          guest_name: selectedRoom.guest_name,
          check_in: selectedRoom.check_in,
          check_out: selectedRoom.check_out,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Room updated');
      setIsEditRoomOpen(false);
      setSelectedRoom(null);
      fetchAll();
    } catch { toast.error('Failed to update room'); }
  };

  const handleDeleteRoom = async (id: number) => {
    if (!confirm('Delete this room?')) return;
    try {
      await fetch(`${BASE_URL}/rooms/${id}`, { method: 'DELETE' });
      toast.success('Room deleted');
      fetchAll();
    } catch { toast.error('Failed to delete room'); }
  };

  const handleUpdateRoomStatus = async (id: number, status: string, room: Room) => {
    try {
      await fetch(`${BASE_URL}/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...room, status }),
      });
      toast.success('Room status updated');
      fetchAll();
    } catch { toast.error('Failed to update room status'); }
  };

  // ── GUEST CHECK-IN ──────────────────────────────────────────────────────────
  const handleCheckIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const roomNumber = f.get('room_number') as string;
    const name = f.get('name') as string;
    const checkIn = f.get('check_in') as string;
    const checkOut = f.get('check_out') as string;
    const phone = f.get('phone') as string;
    const email = f.get('email') as string;

    // Auto-generate access code from room number
    const accessCode = roomNumber.toUpperCase();

    try {
      const res = await fetch(`${BASE_URL}/guests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, room_number: roomNumber, check_in: checkIn,
          check_out: checkOut, phone, email,
          access_code: accessCode, password: '12345678',
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      toast.success(`✅ ${name} checked into Room ${roomNumber}! Access code: ${accessCode} | Password: 12345678`);
      setIsCheckInOpen(false);
      (e.target as HTMLFormElement).reset();
      fetchAll();
    } catch (err: any) {
      toast.error(err.message || 'Failed to check in guest');
    }
  };

  // ── GUEST EDIT & CHECKOUT ───────────────────────────────────────────────────
  const handleEditGuest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGuest) return;
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${BASE_URL}/guests/${selectedGuest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'), room_number: f.get('room_number'),
          check_in: f.get('check_in'), check_out: f.get('check_out'),
          phone: f.get('phone'), email: f.get('email'),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Guest updated');
      setIsEditGuestOpen(false);
      setSelectedGuest(null);
      fetchAll();
    } catch { toast.error('Failed to update guest'); }
  };

  const handleCheckOut = async (guest: Guest) => {
    if (!confirm(`Check out ${guest.name} from Room ${guest.room_number}? This will free the room and remove their login.`)) return;
    try {
      await fetch(`${BASE_URL}/guests/${guest.id}`, { method: 'DELETE' });
      toast.success(`${guest.name} checked out. Room ${guest.room_number} is now available.`);
      fetchAll();
    } catch { toast.error('Failed to check out guest'); }
  };

  // ── REQUEST CRUD ────────────────────────────────────────────────────────────
  const handleAssignTask = async (requestId: number, staffMember: Staff) => {
    try {
      await fetch(`${BASE_URL}/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'in_progress', assigned_to: staffMember.id }),
      });
      toast.success(`Task assigned to ${staffMember.name}`);
      fetchAll();
    } catch { toast.error('Failed to assign task'); }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });
      toast.success('Task completed');
      fetchAll();
    } catch { toast.error('Failed to complete task'); }
  };

  const handleDeleteRequest = async (id: number) => {
    if (!confirm('Delete this request?')) return;
    try {
      await fetch(`${BASE_URL}/requests/${id}`, { method: 'DELETE' });
      toast.success('Request deleted');
      fetchAll();
    } catch { toast.error('Failed to delete request'); }
  };

  const handleDeleteActivity = async (id: number) => {
    if (!confirm('Delete this activity?')) return;
    try {
      await fetch(`${BASE_URL}/activities/${id}`, { method: 'DELETE' });
      toast.success('Activity deleted');
      fetchAll();
    } catch { toast.error('Failed to delete activity'); }
  };

  // ── STATS ───────────────────────────────────────────────────────────────────
  const stats = {
    totalRooms: rooms.length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    totalStaff: staff.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    totalGuests: guests.length,
  };

  const getStatusColor = (s: string) => ({
    'pending': 'bg-yellow-500', 'in_progress': 'bg-blue-500', 'completed': 'bg-green-500',
    'available': 'bg-green-500', 'occupied': 'bg-red-500', 'cleaning': 'bg-yellow-500',
    'maintenance': 'bg-orange-500', 'active': 'bg-green-500',
  }[s?.toLowerCase()] || 'bg-gray-500');

  const getPriorityColor = (p: string) => ({
    'high': 'bg-red-100 text-red-800 border-red-300',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'low': 'bg-green-100 text-green-800 border-green-300',
  }[p?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300');

  // ── AVAILABLE ROOMS for check-in dropdown ───────────────────────────────────
  const availableRooms = rooms.filter(r => r.status === 'available');

  // ── FORM FIELDS ─────────────────────────────────────────────────────────────
  const StaffFormFields = ({ d }: { d?: Staff }) => (<>
    <div><Label className="text-black">Full Name</Label><Input name="name" defaultValue={d?.name} required className="border-amber-300" /></div>
    <div><Label className="text-black">Role</Label>
      <Select name="role" defaultValue={d?.role} required>
        <SelectTrigger className="border-amber-300"><SelectValue placeholder="Select role" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Housekeeping">Housekeeping</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Maintenance">Maintenance</SelectItem>
          <SelectItem value="Front Desk">Front Desk</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div><Label className="text-black">Shift</Label>
      <Select name="shift" defaultValue={d?.shift} required>
        <SelectTrigger className="border-amber-300"><SelectValue placeholder="Select shift" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Morning">Morning</SelectItem>
          <SelectItem value="Evening">Evening</SelectItem>
          <SelectItem value="Night">Night</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div><Label className="text-black">Phone</Label><Input name="phone" defaultValue={d?.phone} className="border-amber-300" /></div>
    <div><Label className="text-black">Email</Label><Input name="email" type="email" defaultValue={d?.email} className="border-amber-300" /></div>
  </>);

  const RoomFormFields = ({ d }: { d?: Room }) => (<>
    <div><Label className="text-black">Room Number</Label><Input name="room_number" defaultValue={d?.room_number} required className="border-amber-300" /></div>
    <div><Label className="text-black">Type</Label>
      <Select name="type" defaultValue={d?.type} required>
        <SelectTrigger className="border-amber-300"><SelectValue placeholder="Select type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Single">Single</SelectItem>
          <SelectItem value="Double">Double</SelectItem>
          <SelectItem value="Suite">Suite</SelectItem>
          <SelectItem value="Deluxe">Deluxe</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div><Label className="text-black">Price per Night (M)</Label><Input name="price" type="number" defaultValue={d?.price} required className="border-amber-300" /></div>
    {d && <div><Label className="text-black">Status</Label>
      <Select name="status" defaultValue={d?.status}>
        <SelectTrigger className="border-amber-300"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="occupied">Occupied</SelectItem>
          <SelectItem value="cleaning">Cleaning</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>
    </div>}
  </>);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="text-center">
        <RefreshCw className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <header className="bg-white border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="The Stone Guest House" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-black">Manager Dashboard</h1>
              <p className="text-sm text-gray-600">The Stone Guest House — Live MySQL Data</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchAll} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <RefreshCw className="w-4 h-4 mr-2" />Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-amber-200 shadow-md"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-700">Total Rooms</CardTitle><Bed className="w-4 h-4 text-red-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-black">{stats.totalRooms}</div><p className="text-xs text-gray-600 mt-1">{stats.occupiedRooms} occupied, {stats.availableRooms} available</p></CardContent></Card>
          <Card className="border-amber-200 shadow-md"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-700">Staff Members</CardTitle><Users className="w-4 h-4 text-red-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-black">{stats.totalStaff}</div><p className="text-xs text-gray-600 mt-1">Team members</p></CardContent></Card>
          <Card className="border-amber-200 shadow-md"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-700">Pending Requests</CardTitle><ClipboardList className="w-4 h-4 text-red-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-black">{stats.pendingRequests}</div><p className="text-xs text-gray-600 mt-1">Awaiting assignment</p></CardContent></Card>
          <Card className="border-amber-200 shadow-md"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-700">Checked In Guests</CardTitle><TrendingUp className="w-4 h-4 text-red-600" /></CardHeader><CardContent><div className="text-3xl font-bold text-black">{stats.totalGuests}</div><p className="text-xs text-gray-600 mt-1">Currently staying</p></CardContent></Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-amber-100 p-1 flex flex-wrap gap-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600 data-[state=active]:text-white"><Home className="w-4 h-4 mr-2" />Overview</TabsTrigger>
            <TabsTrigger value="checkin" className="data-[state=active]:bg-red-600 data-[state=active]:text-white"><DoorOpen className="w-4 h-4 mr-2" />Check In/Out</TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-red-600 data-[state=active]:text-white"><Users className="w-4 h-4 mr-2" />Staff</TabsTrigger>
            <TabsTrigger value="rooms" className="data-[state=active]:bg-red-600 data-[state=active]:text-white"><Bed className="w-4 h-4 mr-2" />Rooms</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <ClipboardList className="w-4 h-4 mr-2" />Requests
              {stats.pendingRequests > 0 && <span className="ml-1.5 bg-white text-red-600 rounded-full px-1.5 text-xs font-bold">{stats.pendingRequests}</span>}
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-amber-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50"><CardTitle className="text-black">Recent Activities</CardTitle><CardDescription>Latest operations logged</CardDescription></CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {activities.slice(0, 5).map(a => (
                      <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-amber-100 last:border-0">
                        <div className="p-2 bg-red-100 rounded-lg">
                          {a.type === 'Check-in' && <DoorOpen className="w-4 h-4 text-red-600" />}
                          {a.type === 'Room Cleaning' && <Sparkles className="w-4 h-4 text-red-600" />}
                          {a.type === 'Maintenance' && <Wrench className="w-4 h-4 text-red-600" />}
                          {(a.type === 'Service Request' || !a.type) && <ClipboardList className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">{a.description}</p>
                          <p className="text-xs text-gray-600">By {a.staff_name || 'System'} • {new Date(a.created_at).toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteActivity(a.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    ))}
                    {activities.length === 0 && <p className="text-center text-gray-500 py-4">No activities yet</p>}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle className="text-black">Pending Requests — Assign Now</CardTitle>
                  <CardDescription>New guest requests awaiting staff assignment</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {requests.filter(r => r.status === 'pending').map(req => (
                      <div key={req.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-black">{req.type}</p>
                            <p className="text-sm text-gray-700">Room {req.room_number} — {req.guest_name}</p>
                            <p className="text-xs text-gray-500 mt-1">{req.description}</p>
                          </div>
                          <Badge className={getPriorityColor(req.priority)}>{req.priority}</Badge>
                        </div>
                        <Select onValueChange={val => { const s = staff.find(m => m.id === Number(val)); if (s) handleAssignTask(req.id, s); }}>
                          <SelectTrigger className="w-full border-amber-300 mt-2"><SelectValue placeholder="Assign to staff member..." /></SelectTrigger>
                          <SelectContent>{staff.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name} — {s.role} ({s.shift} shift)</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    ))}
                    {requests.filter(r => r.status === 'pending').length === 0 && (
                      <div className="text-center py-8 text-gray-500"><CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" /><p>All requests assigned</p></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CHECK IN / OUT */}
          <TabsContent value="checkin">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Check In Form */}
              <Card className="border-amber-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-black flex items-center gap-2"><DoorOpen className="w-5 h-5 text-green-600" />Check In Guest</CardTitle>
                      <CardDescription>Register a new guest and assign a room</CardDescription>
                    </div>
                    <Badge className="bg-green-500">{availableRooms.length} rooms available</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCheckIn} className="space-y-4">
                    <div>
                      <Label className="text-black font-medium">Guest Full Name *</Label>
                      <Input name="name" placeholder="e.g. Thabo Mokoena" required className="border-amber-300" />
                    </div>
                    <div>
                      <Label className="text-black font-medium">Assign Room *</Label>
                      <Select name="room_number" required>
                        <SelectTrigger className="border-amber-300"><SelectValue placeholder="Select available room..." /></SelectTrigger>
                        <SelectContent>
                          {availableRooms.map(r => (
                            <SelectItem key={r.id} value={r.room_number}>
                              Room {r.room_number} — {r.type} (M{r.price}/night)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-black font-medium">Check-In Date *</Label>
                        <Input name="check_in" type="date" required className="border-amber-300" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div>
                        <Label className="text-black font-medium">Check-Out Date *</Label>
                        <Input name="check_out" type="date" required className="border-amber-300" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-black font-medium">Phone Number</Label>
                      <Input name="phone" placeholder="+266 XXXX XXXX" className="border-amber-300" />
                    </div>
                    <div>
                      <Label className="text-black font-medium">Email Address</Label>
                      <Input name="email" type="email" placeholder="guest@email.com" className="border-amber-300" />
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs text-amber-800 font-medium">ℹ️ Login credentials for guest:</p>
                      <p className="text-xs text-amber-700">Access Code: <strong>Room number (e.g. G01)</strong></p>
                      <p className="text-xs text-amber-700">Password: <strong>12345678</strong></p>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-3">
                      <DoorOpen className="w-5 h-5 mr-2" />Check In Guest
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Currently Checked In Guests */}
              <Card className="border-amber-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle className="text-black flex items-center gap-2"><UserCircle className="w-5 h-5 text-red-600" />Currently Checked In</CardTitle>
                  <CardDescription>Manage guest check-outs and details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {guests.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <UserCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p>No guests currently checked in</p>
                      </div>
                    ) : (
                      guests.map(g => (
                        <Card key={g.id} className="border-amber-200">
                          <CardContent className="pt-4 pb-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold text-black">{g.name}</p>
                                <p className="text-sm text-gray-700">Room {g.room_number} — Code: <span className="font-medium text-red-600">{g.access_code}</span></p>
                                <div className="flex gap-3 mt-1">
                                  <p className="text-xs text-gray-600">📅 In: {g.check_in ? new Date(g.check_in).toLocaleDateString('en-GB') : '—'}</p>
                                  <p className="text-xs text-gray-600">📅 Out: {g.check_out ? new Date(g.check_out).toLocaleDateString('en-GB') : '—'}</p>
                                </div>
                                {g.phone && <p className="text-xs text-gray-600 mt-1">📞 {g.phone}</p>}
                                {g.email && <p className="text-xs text-gray-600">✉️ {g.email}</p>}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 flex-1"
                                onClick={() => { setSelectedGuest(g); setIsEditGuestOpen(true); }}>
                                <Pencil className="w-3 h-3 mr-1" />Edit
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white flex-1"
                                onClick={() => handleCheckOut(g)}>
                                <DoorClosed className="w-3 h-3 mr-1" />Check Out
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Edit Guest Dialog */}
            <Dialog open={isEditGuestOpen} onOpenChange={setIsEditGuestOpen}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Guest Details</DialogTitle><DialogDescription>Update guest information</DialogDescription></DialogHeader>
                {selectedGuest && (
                  <form onSubmit={handleEditGuest} className="space-y-4">
                    <div><Label className="text-black">Full Name</Label><Input name="name" defaultValue={selectedGuest.name} required className="border-amber-300" /></div>
                    <div><Label className="text-black">Room Number</Label><Input name="room_number" defaultValue={selectedGuest.room_number} required className="border-amber-300" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label className="text-black">Check In</Label><Input name="check_in" type="date" defaultValue={selectedGuest.check_in} required className="border-amber-300" /></div>
                      <div><Label className="text-black">Check Out</Label><Input name="check_out" type="date" defaultValue={selectedGuest.check_out} required className="border-amber-300" /></div>
                    </div>
                    <div><Label className="text-black">Phone</Label><Input name="phone" defaultValue={selectedGuest.phone} className="border-amber-300" /></div>
                    <div><Label className="text-black">Email</Label><Input name="email" type="email" defaultValue={selectedGuest.email} className="border-amber-300" /></div>
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Save Changes</Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* STAFF */}
          <TabsContent value="staff">
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div><CardTitle className="text-black">Staff Directory</CardTitle><CardDescription>Manage your team members</CardDescription></div>
                  <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                    <DialogTrigger asChild><Button className="bg-red-600 hover:bg-red-700 text-white"><UserPlus className="w-4 h-4 mr-2" />Add Staff</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Add New Staff Member</DialogTitle><DialogDescription>Enter staff member details</DialogDescription></DialogHeader>
                      <form onSubmit={handleAddStaff} className="space-y-4"><StaffFormFields /><Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Add Staff Member</Button></form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader><TableRow className="border-amber-200"><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Shift</TableHead><TableHead>Status</TableHead><TableHead>Contact</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {staff.map(m => (
                      <TableRow key={m.id} className="border-amber-100">
                        <TableCell className="font-medium">{m.id}</TableCell>
                        <TableCell>{m.name}</TableCell>
                        <TableCell><Badge variant="outline" className="border-amber-300">{m.role}</Badge></TableCell>
                        <TableCell>{m.shift}</TableCell>
                        <TableCell><Badge className={getStatusColor(m.status)}>{m.status}</Badge></TableCell>
                        <TableCell className="text-sm text-gray-700"><div>{m.phone}</div><div className="text-xs">{m.email}</div></TableCell>
                        <TableCell><div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-amber-300 text-amber-700" onClick={() => { setSelectedStaff(m); setIsEditStaffOpen(true); }}><Pencil className="w-3 h-3" /></Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600" onClick={() => handleDeleteStaff(m.id)}><Trash2 className="w-3 h-3" /></Button>
                        </div></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
              <DialogContent><DialogHeader><DialogTitle>Edit Staff Member</DialogTitle><DialogDescription>Update staff member details</DialogDescription></DialogHeader>
                {selectedStaff && <form onSubmit={handleEditStaff} className="space-y-4"><StaffFormFields d={selectedStaff} /><Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Save Changes</Button></form>}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ROOMS */}
          <TabsContent value="rooms">
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div><CardTitle className="text-black">Room Management</CardTitle><CardDescription>All 60 rooms across G, LG and UG floors</CardDescription></div>
                  <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
                    <DialogTrigger asChild><Button className="bg-red-600 hover:bg-red-700 text-white"><PlusCircle className="w-4 h-4 mr-2" />Add Room</Button></DialogTrigger>
                    <DialogContent><DialogHeader><DialogTitle>Add New Room</DialogTitle><DialogDescription>Enter room details</DialogDescription></DialogHeader>
                      <form onSubmit={handleAddRoom} className="space-y-4"><RoomFormFields /><Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Add Room</Button></form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map(room => (
                    <Card key={room.id} className="border-amber-200 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Room {room.room_number}</CardTitle>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="text-amber-600" onClick={() => { setSelectedRoom(room); setIsEditRoomOpen(true); }}><Pencil className="w-3 h-3" /></Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteRoom(room.id)}><Trash2 className="w-3 h-3" /></Button>
                          </div>
                        </div>
                        <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm font-medium mb-1">{room.type} — M{room.price}/night</p>
                        {room.guest_name && (
                          <div className="text-xs text-gray-700 mb-2">
                            <p className="font-medium">👤 {room.guest_name}</p>
                            <p>In: {room.check_in} | Out: {room.check_out}</p>
                          </div>
                        )}
                        <Select value={room.status} onValueChange={v => handleUpdateRoomStatus(room.id, v, room)}>
                          <SelectTrigger className="w-full mt-1 border-amber-300 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="occupied">Occupied</SelectItem>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
              <DialogContent><DialogHeader><DialogTitle>Edit Room</DialogTitle><DialogDescription>Update room details</DialogDescription></DialogHeader>
                {selectedRoom && <form onSubmit={handleEditRoom} className="space-y-4"><RoomFormFields d={selectedRoom} /><Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Save Changes</Button></form>}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* REQUESTS */}
          <TabsContent value="requests">
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50"><CardTitle className="text-black">All Service Requests</CardTitle><CardDescription>Manage and assign all guest service requests</CardDescription></CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {requests.map(req => (
                    <Card key={req.id} className="border-amber-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-black">{req.type}</h3>
                              <Badge className={getPriorityColor(req.priority)}>{req.priority}</Badge>
                              <Badge className={getStatusColor(req.status)}>{req.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">Room {req.room_number} — {req.guest_name}</p>
                            <p className="text-sm text-gray-700 mb-2">{req.description}</p>
                            <p className="text-xs text-gray-600">Requested: {new Date(req.created_at).toLocaleString()}</p>
                            {req.staff_name && <p className="text-xs text-blue-700 mt-1 font-medium">Assigned to: {req.staff_name}</p>}
                          </div>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 ml-2" onClick={() => handleDeleteRequest(req.id)}><Trash2 className="w-3 h-3" /></Button>
                        </div>
                        <div className="flex gap-2">
                          {req.status === 'pending' && (
                            <Select onValueChange={val => { const s = staff.find(m => m.id === Number(val)); if (s) handleAssignTask(req.id, s); }}>
                              <SelectTrigger className="flex-1 border-amber-300"><SelectValue placeholder="Assign to staff member..." /></SelectTrigger>
                              <SelectContent>{staff.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name} — {s.role} ({s.shift} shift)</SelectItem>)}</SelectContent>
                            </Select>
                          )}
                          {req.status === 'in_progress' && (
                            <Button onClick={() => handleCompleteTask(req.id)} className="bg-green-600 hover:bg-green-700 text-white">
                              <CheckCircle className="w-4 h-4 mr-2" />Mark Completed
                            </Button>
                          )}
                          {req.status === 'completed' && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" /><span className="text-sm">Completed</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {requests.length === 0 && <div className="text-center py-12 text-gray-500"><ClipboardList className="w-12 h-12 mx-auto mb-2" /><p>No service requests yet</p></div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
