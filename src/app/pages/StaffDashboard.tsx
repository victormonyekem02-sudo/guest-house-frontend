import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';
import logo from '../../assets/logocopy.jpg';
import {
  LogOut, ClipboardList, CheckCircle, Clock,
  FileText, AlertCircle, User, RefreshCw,
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


interface Task {
  id: number;
  room_number: string;
  type: string;
  description: string;
  priority: string;
  status: string;
  guest_name?: string;
  staff_name?: string;
  assigned_to?: number;
  created_at: string;
  completed_at?: string;
}

export default function StaffDashboard() {
  const navigate = useNavigate();

  // Get logged-in staff from localStorage
  const rawUser = JSON.parse(localStorage.getItem('user') || '{}');
  const loggedInUser = rawUser.user || rawUser;
  const staffId = loggedInUser.id;
  const staffName = loggedInUser.name || 'Staff Member';
  const firstName = staffName.split(' ')[0];
  const staffRole = loggedInUser.role || '';
  const staffShift = loggedInUser.shift || '';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityNote, setActivityNote] = useState('');
  const [loading, setLoading] = useState(true);

  // ── Fetch tasks assigned to this staff member from MySQL ────────────────────
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/requests/staff/${staffId}`);
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Cannot connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (staffId) fetchTasks();
    else setLoading(false);
  }, [staffId]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleStartTask = async (taskId: number) => {
    try {
      await fetch(`${BASE_URL}/requests/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'in_progress', assigned_to: staffId }),
      });
      toast.success('Task started');
      fetchTasks();
    } catch { toast.error('Failed to start task'); }
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      await fetch(`${BASE_URL}/requests/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed', assigned_to: staffId }),
      });
      // Log activity
      await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staff_id: staffId,
          description: `Task completed by ${staffName}`,
          type: 'Service Request',
        }),
      });
      toast.success('Task completed successfully');
      fetchTasks();
    } catch { toast.error('Failed to complete task'); }
  };

  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityNote.trim()) { toast.error('Please enter activity details'); return; }
    try {
      await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staff_id: staffId,
          description: activityNote,
          type: 'Service Request',
        }),
      });
      toast.success('Activity logged successfully');
      setActivityNote('');
    } catch { toast.error('Failed to log activity'); }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'Pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress' || t.status === 'In Progress');
  const completedTasks = tasks.filter(t => t.status === 'completed' || t.status === 'Completed');
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  // Smart performance message
  const getPerformanceMessage = () => {
    if (tasks.length === 0) return { msg: `Welcome ${firstName}! No tasks assigned yet.`, color: 'text-gray-500' };
    if (completionRate === 0) return { msg: `Let's get started ${firstName}! You have tasks waiting.`, color: 'text-red-500' };
    if (completionRate < 25) return { msg: `You're just getting started ${firstName}, keep pushing!`, color: 'text-red-500' };
    if (completionRate < 50) return { msg: `Making progress ${firstName}! Keep going, you can do it!`, color: 'text-orange-500' };
    if (completionRate < 75) return { msg: `Great effort ${firstName}! More than halfway there!`, color: 'text-yellow-600' };
    if (completionRate < 100) return { msg: `Almost there ${firstName}! Excellent work, finish strong!`, color: 'text-blue-600' };
    return { msg: `Outstanding work ${firstName}! All tasks completed! 🎉`, color: 'text-green-600' };
  };

  const performance = getPerformanceMessage();

  const getStatusColor = (s: string) => ({
    'pending': 'bg-yellow-500', 'Pending': 'bg-yellow-500',
    'in_progress': 'bg-blue-500', 'In Progress': 'bg-blue-500',
    'completed': 'bg-green-500', 'Completed': 'bg-green-500',
  }[s] || 'bg-gray-500');

  const getPriorityColor = (p: string) => ({
    'high': 'bg-red-100 text-red-800 border-red-300', 'High': 'bg-red-100 text-red-800 border-red-300',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-300', 'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'low': 'bg-green-100 text-green-800 border-green-300', 'Low': 'bg-green-100 text-green-800 border-green-300',
  }[p] || 'bg-gray-100 text-gray-800 border-gray-300');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="text-center">
        <RefreshCw className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading tasks for {staffName}...</p>
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
              <h1 className="text-2xl font-bold text-black">Staff Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, <span className="font-semibold text-red-600">{staffName}</span>! 👋</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchTasks} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <RefreshCw className="w-4 h-4 mr-2" />Refresh Tasks
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Tasks</CardTitle>
              <Clock className="w-4 h-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{pendingTasks.length}</div>
              <p className="text-xs text-gray-600 mt-1">Awaiting action</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">In Progress</CardTitle>
              <AlertCircle className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{inProgressTasks.length}</div>
              <p className="text-xs text-gray-600 mt-1">Currently working on</p>
            </CardContent>
          </Card>
          <Card className="border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Completed</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{completedTasks.length}</div>
              <p className="text-xs text-gray-600 mt-1">Tasks finished</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-black">My Assigned Tasks</CardTitle>
                    <CardDescription className="text-gray-700">Tasks assigned to {staffName} from MySQL</CardDescription>
                  </div>
                  <Button onClick={fetchTasks} variant="outline" size="sm" className="border-amber-300 text-amber-700">
                    <RefreshCw className="w-3 h-3 mr-1" />Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {tasks.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium">No tasks assigned yet, {firstName}</p>
                      <p className="text-sm">Click Refresh to check for new assignments from the manager</p>
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <Card key={task.id} className="border-amber-200 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-black">{task.type}</h3>
                                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-1">
                                Room {task.room_number} {task.guest_name && `— ${task.guest_name}`}
                              </p>
                              <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                              <p className="text-xs text-gray-600">
                                Requested: {new Date(task.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {(task.status === 'pending' || task.status === 'Pending') && (
                              <Button onClick={() => handleStartTask(task.id)} className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Clock className="w-4 h-4 mr-2" />Start Task
                              </Button>
                            )}
                            {(task.status === 'in_progress' || task.status === 'In Progress') && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    <CheckCircle className="w-4 h-4 mr-2" />Complete Task
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="text-black">Complete Task</DialogTitle>
                                    <DialogDescription className="text-gray-700">
                                      Confirm task completion for Room {task.room_number}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                      <p className="font-medium text-black mb-1">{task.type}</p>
                                      <p className="text-sm text-gray-700">{task.description}</p>
                                    </div>
                                    <Button onClick={() => handleCompleteTask(task.id)} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                      Confirm Completion
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            {(task.status === 'completed' || task.status === 'Completed') && (
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                <span className="text-sm">Completed</span>
                              </div>
                            )}
                          </div>
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
            {/* Profile */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">My Profile</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">{staffName}</p>
                    <p className="text-sm text-gray-700">{staffRole}</p>
                    <p className="text-xs text-gray-600">{staffShift} Shift</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-amber-100">
                    <span className="text-gray-700">Status:</span>
                    <Badge className="bg-green-500">On Duty</Badge>
                  </div>
                  <div className="flex justify-between py-2 border-b border-amber-100">
                    <span className="text-gray-700">Total Tasks:</span>
                    <span className="font-medium text-black">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Completed:</span>
                    <span className="font-medium text-black">{completedTasks.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Log Activity */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Log Activity</CardTitle>
                <CardDescription className="text-gray-700">Record your daily activities</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleLogActivity} className="space-y-4">
                  <Textarea
                    placeholder={`Describe your activity, ${firstName}...`}
                    value={activityNote}
                    onChange={e => setActivityNote(e.target.value)}
                    className="min-h-[120px] border-amber-300 focus:border-red-500"
                  />
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />Log Activity
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="text-black">Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Completion Rate</span>
                    <span className={`text-lg font-bold ${
                      completionRate === 0 ? 'text-red-600' :
                      completionRate < 50 ? 'text-orange-500' :
                      completionRate < 75 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>{completionRate}%</span>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        completionRate === 0 ? 'bg-gray-300' :
                        completionRate < 50 ? 'bg-orange-500' :
                        completionRate < 75 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                  <p className={`text-xs text-center mt-2 font-medium ${performance.color}`}>
                    {performance.msg}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
