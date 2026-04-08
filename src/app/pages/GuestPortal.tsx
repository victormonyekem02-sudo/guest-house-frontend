import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import logo from '../../assets/logocopy.jpg';
import {
  LogOut, Utensils, Sparkles, Wrench, Car, ShoppingBag,
  Wind, CheckCircle, Clock, Home, User, Calendar, Phone, Mail, RefreshCw,
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


interface ServiceRequest {
  id: number;
  room_number: string;
  type: string;
  description: string;
  priority: string;
  status: string;
  staff_name?: string;
  created_at: string;
}

export default function GuestPortal() {
  const navigate = useNavigate();

  // Read logged-in guest from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const guestData = loggedInUser.user || loggedInUser;

  const guestInfo = {
    id: guestData.id || '',
    name: guestData.name || 'Guest',
    roomNumber: guestData.room_number || guestData.roomNumber || '',
    checkIn: guestData.check_in || guestData.checkIn || '',
    checkOut: guestData.check_out || guestData.checkOut || '',
    phone: guestData.phone || '',
    email: guestData.email || '',
    accessCode: guestData.access_code || guestData.accessCode || '',
  };

  // Front desk contact
  const FRONT_DESK_NUMBER = '+26658123456';
  const FRONT_DESK_NAME = 'Thabang Nelson — Front Desk';

  const [myRequests, setMyRequests] = useState<ServiceRequest[]>([]);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(false);

  // Load requests from MySQL
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${BASE_URL}/requests`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMyRequests(data.filter((r: ServiceRequest) => r.room_number === guestInfo.roomNumber));
      }
    } catch {
      // fallback silently
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSubmitRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_id: guestInfo.id,
          room_number: guestInfo.roomNumber,
          type: formData.get('serviceType'),
          description: formData.get('description'),
          priority: formData.get('priority') || 'medium',
          status: 'pending',
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Service request submitted! The manager will assign staff shortly.');
      setIsRequestDialogOpen(false);
      (e.target as HTMLFormElement).reset();
      fetchRequests();
    } catch {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCallFrontDesk = () => {
    window.location.href = `tel:${FRONT_DESK_NUMBER}`;
    toast.success(`Calling ${FRONT_DESK_NAME}...`);
  };

  // Calculate nights
  const getNights = () => {
    if (!guestInfo.checkIn || !guestInfo.checkOut) return null;
    const diff = new Date(guestInfo.checkOut).getTime() - new Date(guestInfo.checkIn).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  const nights = getNights();

  const services = [
    { type: 'Food Order',      icon: Utensils,    description: 'Order meals and beverages',  color: 'bg-orange-100 text-orange-700' },
    { type: 'Housekeeping',    icon: Sparkles,    description: 'Room cleaning and supplies', color: 'bg-blue-100 text-blue-700'    },
    { type: 'Maintenance',     icon: Wrench,      description: 'Report room issues',         color: 'bg-red-100 text-red-700'      },
    { type: 'Laundry',         icon: Wind,        description: 'Laundry services',           color: 'bg-purple-100 text-purple-700' },
    { type: 'Transport',       icon: Car,         description: 'Airport pickup/drop-off',    color: 'bg-green-100 text-green-700'  },
    { type: 'Extra Amenities', icon: ShoppingBag, description: 'Additional items',           color: 'bg-pink-100 text-pink-700'    },
  ];

  const getStatusColor = (s: string) => ({
    'pending': 'bg-yellow-500', 'in_progress': 'bg-blue-500', 'completed': 'bg-green-500',
    'Pending': 'bg-yellow-500', 'In Progress': 'bg-blue-500', 'Completed': 'bg-green-500',
  }[s] || 'bg-gray-500');

  const getPriorityColor = (p: string) => ({
    'high': 'bg-red-100 text-red-800 border-red-300', 'High': 'bg-red-100 text-red-800 border-red-300',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-300', 'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'low': 'bg-green-100 text-green-800 border-green-300', 'Low': 'bg-green-100 text-green-800 border-green-300',
  }[p] || 'bg-gray-100 text-gray-800 border-gray-300');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <header className="bg-white border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="The Stone Guest House" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-black">Guest Portal</h1>
              <p className="text-sm text-gray-600">
                Welcome, <span className="font-semibold text-red-600">{guestInfo.name}</span> — Room {guestInfo.roomNumber} 🏨
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchRequests} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <RefreshCw className="w-4 h-4 mr-2" />Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Services */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Available Services</CardTitle>
                <CardDescription className="text-gray-700">Select a service to make a request</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Dialog
                        key={service.type}
                        open={isRequestDialogOpen && selectedService === service.type}
                        onOpenChange={(open) => { setIsRequestDialogOpen(open); if (!open) setSelectedService(''); }}
                      >
                        <DialogTrigger asChild>
                          <Card
                            className="border-amber-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                            onClick={() => { setSelectedService(service.type); setIsRequestDialogOpen(true); }}
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${service.color}`}><Icon className="w-6 h-6" /></div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-black">{service.type}</h3>
                                  <p className="text-sm text-gray-700">{service.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-black">Request {service.type}</DialogTitle>
                            <DialogDescription className="text-gray-700">Fill in the details for your service request</DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmitRequest} className="space-y-4">
                            <input type="hidden" name="serviceType" value={service.type} />
                            <div>
                              <Label htmlFor="description" className="text-black">Description</Label>
                              <Textarea id="description" name="description" placeholder="Describe your request in detail..." required className="min-h-[100px] border-amber-300 focus:border-red-500" />
                            </div>
                            <div>
                              <Label htmlFor="priority" className="text-black">Priority</Label>
                              <Select name="priority" required defaultValue="medium">
                                <SelectTrigger className="border-amber-300"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low - Can wait</SelectItem>
                                  <SelectItem value="medium">Medium - Normal</SelectItem>
                                  <SelectItem value="high">High - Urgent</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2">
                              <Button type="button" variant="outline" onClick={() => setIsRequestDialogOpen(false)} className="flex-1 border-amber-300">Cancel</Button>
                              <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                {loading ? 'Submitting...' : 'Submit Request'}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* My Requests */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-black">My Service Requests</CardTitle>
                    <CardDescription className="text-gray-700">Track your requests and their status</CardDescription>
                  </div>
                  <Button onClick={fetchRequests} variant="outline" size="sm" className="border-amber-300 text-amber-700">
                    <RefreshCw className="w-3 h-3 mr-1" />Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {myRequests.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium">No service requests yet</p>
                      <p className="text-sm">Use the services above to make a request</p>
                    </div>
                  ) : (
                    myRequests.map((request) => (
                      <Card key={request.id} className="border-amber-200">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-black">{request.type}</h3>
                                <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(request.created_at).toLocaleString()}</div>
                                {request.staff_name && (
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    Assigned to <span className="font-medium text-blue-700 ml-1">{request.staff_name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {(request.status === 'pending' || request.status === 'Pending') && (
                            <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              <Clock className="w-4 h-4" /><span>Waiting for staff assignment...</span>
                            </div>
                          )}
                          {(request.status === 'in_progress' || request.status === 'In Progress') && (
                            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <Clock className="w-4 h-4 animate-pulse" /><span>Staff is working on your request</span>
                            </div>
                          )}
                          {(request.status === 'completed' || request.status === 'Completed') && (
                            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                              <CheckCircle className="w-4 h-4" /><span>Request completed successfully!</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Room Information */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Room Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-black">Room {guestInfo.roomNumber}</p>
                      <p className="text-sm text-gray-700">Access Code: <span className="font-medium text-red-600">{guestInfo.accessCode}</span></p>
                      {nights && <p className="text-xs text-amber-600 font-medium">🌙 {nights} night{nights > 1 ? 's' : ''} stay</p>}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-amber-200">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Guest:</span>
                      <span className="font-medium text-black ml-auto">{guestInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Check-in:</span>
                      <span className="font-medium text-black ml-auto">
                        {guestInfo.checkIn ? new Date(guestInfo.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">Check-out:</span>
                      <span className="font-medium text-black ml-auto">
                        {guestInfo.checkOut ? new Date(guestInfo.checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </span>
                    </div>
                    {nights && (
                      <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                        <p className="text-sm font-medium text-amber-800">🌙 {nights} Night{nights > 1 ? 's' : ''} Stay</p>
                        <p className="text-xs text-amber-600">
                          {guestInfo.checkIn ? new Date(guestInfo.checkIn).toLocaleDateString() : ''} →{' '}
                          {guestInfo.checkOut ? new Date(guestInfo.checkOut).toLocaleDateString() : ''}
                        </p>
                      </div>
                    )}
                  </div>

                  {(guestInfo.phone || guestInfo.email) && (
                    <div className="space-y-2 pt-4 border-t border-amber-200">
                      <p className="text-xs font-medium text-gray-700 uppercase">Contact Information</p>
                      {guestInfo.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-gray-600" /><span className="text-black">{guestInfo.phone}</span></div>}
                      {guestInfo.email && <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-gray-600" /><span className="text-black">{guestInfo.email}</span></div>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Request Summary */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50"><CardTitle className="text-black">Request Summary</CardTitle></CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-amber-100"><span className="text-sm text-gray-700">Total Requests</span><span className="text-lg font-bold text-black">{myRequests.length}</span></div>
                  <div className="flex justify-between items-center pb-2 border-b border-amber-100"><span className="text-sm text-gray-700">Pending</span><Badge className="bg-yellow-500">{myRequests.filter(r => r.status === 'pending' || r.status === 'Pending').length}</Badge></div>
                  <div className="flex justify-between items-center pb-2 border-b border-amber-100"><span className="text-sm text-gray-700">In Progress</span><Badge className="bg-blue-500">{myRequests.filter(r => r.status === 'in_progress' || r.status === 'In Progress').length}</Badge></div>
                  <div className="flex justify-between items-center"><span className="text-sm text-gray-700">Completed</span><Badge className="bg-green-500">{myRequests.filter(r => r.status === 'completed' || r.status === 'Completed').length}</Badge></div>
                </div>
              </CardContent>
            </Card>

            {/* Call Front Desk */}
            <Card className="border-amber-200 shadow-md bg-gradient-to-br from-red-50 to-orange-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-black mb-1">Need Immediate Help?</h3>
                  <p className="text-sm text-gray-700 mb-1">Call our front desk for urgent assistance</p>
                  <p className="text-xs text-gray-500 mb-4">{FRONT_DESK_NAME}</p>
                  <Button onClick={handleCallFrontDesk} className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-3">
                    <Phone className="w-5 h-5 mr-2" />📞 Call Front Desk
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">{FRONT_DESK_NUMBER}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
