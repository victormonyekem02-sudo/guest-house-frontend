import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import logo from '../../assets/logocopy.jpg';
import { Building2, Users, UserCircle } from 'lucide-react';

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

export default function Login() {
  const navigate = useNavigate();
  const [managerUser, setManagerUser] = useState('');
  const [managerPass, setManagerPass] = useState('');
  const [staffUser, setStaffUser] = useState('');
  const [staffPass, setStaffPass] = useState('');
  const [guestCode, setGuestCode] = useState('');
  const [guestPass, setGuestPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username: string, password: string, expectedRole: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Invalid credentials');
        return;
      }
      if (data.role !== expectedRole) {
        toast.error('Access denied for this portal');
        return;
      }
      localStorage.setItem('user', JSON.stringify(data));
      toast.success(`Welcome ${data.user?.name || username}!`);
      if (data.role === 'manager') navigate('/manager');
      if (data.role === 'staff') navigate('/staff');
      if (data.role === 'guest') navigate('/guest');
    } catch {
      toast.error('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="The Stone Guest House" className="h-24 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-black mb-2">Guest House Management</h1>
          <p className="text-gray-700">Access your portal below</p>
        </div>

        <Tabs defaultValue="manager" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-amber-100">
            <TabsTrigger value="manager" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />Manager
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />Staff
            </TabsTrigger>
            <TabsTrigger value="guest" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <UserCircle className="w-4 h-4 mr-2" />Guest
            </TabsTrigger>
          </TabsList>

          {/* Manager */}
          <TabsContent value="manager">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Manager Login</CardTitle>
                <CardDescription className="text-gray-700">Access the management dashboard</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={e => { e.preventDefault(); handleLogin(managerUser, managerPass, 'manager'); }} className="space-y-4">
                  <div>
                    <Label className="text-black">Username</Label>
                    <Input placeholder="Enter username" value={managerUser} onChange={e => setManagerUser(e.target.value)} className="border-amber-300 focus:border-red-500" />
                  </div>
                  <div>
                    <Label className="text-black">Password</Label>
                    <Input type="password" placeholder="Enter password" value={managerPass} onChange={e => setManagerPass(e.target.value)} className="border-amber-300 focus:border-red-500" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    {loading ? 'Logging in...' : 'Login as Manager'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff */}
          <TabsContent value="staff">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Staff Login</CardTitle>
                <CardDescription className="text-gray-700">Access your work assignments</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={e => { e.preventDefault(); handleLogin(staffUser, staffPass, 'staff'); }} className="space-y-4">
                  <div>
                    <Label className="text-black">Username</Label>
                    <Input placeholder="e.g. tlalane.tsotetsi" value={staffUser} onChange={e => setStaffUser(e.target.value)} className="border-amber-300 focus:border-red-500" />
                  </div>
                  <div>
                    <Label className="text-black">Password</Label>
                    <Input type="password" placeholder="Enter password" value={staffPass} onChange={e => setStaffPass(e.target.value)} className="border-amber-300 focus:border-red-500" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    {loading ? 'Logging in...' : 'Login as Staff'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guest */}
          <TabsContent value="guest">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Guest Portal</CardTitle>
                <CardDescription className="text-gray-700">Access services and make requests</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={e => { e.preventDefault(); handleLogin(guestCode, guestPass, 'guest'); }} className="space-y-4">
                  <div>
                    <Label className="text-black">Access Code</Label>
                    <Input placeholder="e.g. G01, LG01, UG01" value={guestCode} onChange={e => setGuestCode(e.target.value)} className="border-amber-300 focus:border-red-500" />
                  </div>
                  <div>
                    <Label className="text-black">Password</Label>
                    <Input type="password" placeholder="Enter password" value={guestPass} onChange={e => setGuestPass(e.target.value)} className="border-amber-300 focus:border-red-500" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    {loading ? 'Logging in...' : 'Access Guest Portal'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}