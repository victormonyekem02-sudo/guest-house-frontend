# 📖 The Stone Guest House Management System - Documentation

## 🎯 System Overview

The Stone Guest House Management System (GHMS) is a comprehensive web-based application designed to streamline guest house operations through three integrated portals: Manager, Staff, and Guest interfaces.

---

## 🏗️ System Architecture

### Technology Stack

**Frontend:**
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Vite 6** - Build tool and development server

**UI Components:**
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

**Design Theme:**
- Primary: Light Oak/Brown (#F5DEB3, #D2B48C)
- Accent: Red (#DC143C, #B22222)
- Text: Black (#000000)
- Logo: The Stone Guest House branding

---

## 📊 System Modules

### 1. Authentication Module

**Location:** `/src/app/pages/Login.tsx`

**Features:**
- Multi-role login (Manager, Staff, Guest)
- Tab-based interface
- Credential validation
- Session management
- Role-based routing

**Security:**
- Currently demo authentication
- Can be extended with JWT/OAuth
- Supports different access levels

**Login Flow:**
```
User Opens App → Login Page → Select Role Tab → Enter Credentials → Authenticate → Redirect to Dashboard
```

---

### 2. Manager Dashboard Module

**Location:** `/src/app/pages/ManagerDashboard.tsx`

**Features:**

#### 2.1 Overview Tab
- Real-time statistics display
- Recent activities log
- Urgent service requests
- Quick action cards

**Statistics Tracked:**
- Total/Occupied/Available rooms
- Total/Active staff count
- Pending service requests
- Completed tasks today

#### 2.2 Staff Management Tab
- Complete staff directory
- Add new staff members
- View staff details (role, shift, status, contact)
- Filter by department

**Staff Information:**
- ID, Name, Role
- Shift (Morning/Evening/Night)
- Status (Available/Busy/Off Duty)
- Contact (Phone, Email)

#### 2.3 Room Management Tab
- Visual room grid
- Status indicators
- Room details (type, price, guest info)
- Quick status updates
- Occupancy tracking

**Room Statuses:**
- Available (Green)
- Occupied (Red)
- Cleaning (Yellow)
- Maintenance (Orange)

#### 2.4 Service Requests Tab
- All service requests list
- Priority-based sorting
- Staff assignment interface
- Task completion tracking
- Request history

**Request Management:**
- Assign tasks to available staff
- Monitor request status
- Complete task workflow
- Track completion times

---

### 3. Staff Dashboard Module

**Location:** `/src/app/pages/StaffDashboard.tsx`

**Features:**

#### 3.1 Task Management
- Personal task queue
- Priority indicators
- Status tracking
- Task actions (Start/Complete)

**Task Workflow:**
```
Pending → Start Task → In Progress → Complete Task → Completed
```

#### 3.2 Activity Logging
- Daily activity recording
- Free-form text input
- Timestamp tracking
- Performance monitoring

#### 3.3 Staff Profile
- Personal information
- Current shift details
- Performance metrics
- Completion rate tracking

---

### 4. Guest Portal Module

**Location:** `/src/app/pages/GuestPortal.tsx`

**Features:**

#### 4.1 Service Request System
**6 Service Categories:**

1. **Food Order** 🍽️
   - Meals and beverages
   - Room service
   - Special dietary requests

2. **Housekeeping** ✨
   - Room cleaning
   - Extra towels/amenities
   - Bed linen change

3. **Maintenance** 🔧
   - Room repairs
   - Technical issues
   - Facility problems

4. **Laundry** 🧺
   - Express laundry
   - Dry cleaning
   - Ironing service

5. **Transport** 🚗
   - Airport pickup/drop-off
   - Local transportation
   - Car rental

6. **Extra Amenities** 🛍️
   - Additional items
   - Special equipment
   - Custom requests

**Request Process:**
```
Select Service → Fill Details → Set Priority → Submit → Track Status
```

#### 4.2 Request Tracking
- Real-time status updates
- Assigned staff visibility
- Completion notifications
- Request history

#### 4.3 Guest Information
- Room details
- Check-in/check-out dates
- Contact information
- Stay summary

---

## 💾 Data Structure

### Staff Entity
```typescript
{
  id: string              // Unique identifier
  name: string            // Full name
  role: string            // Housekeeping | Kitchen | Maintenance | Front Desk
  status: string          // Available | Busy | Off Duty
  phone: string           // Contact number
  email: string           // Email address
  shift: string           // Morning | Evening | Night
}
```

### Room Entity
```typescript
{
  id: string              // Unique identifier
  number: string          // Room number
  type: string            // Single | Double | Suite | Deluxe
  status: string          // Available | Occupied | Cleaning | Maintenance
  price: number           // Per night rate
  currentGuest?: string   // Guest name (if occupied)
  checkIn?: string        // Check-in date
  checkOut?: string       // Check-out date
}
```

### Service Request Entity
```typescript
{
  id: string              // Unique identifier
  guestName: string       // Requesting guest
  roomNumber: string      // Room number
  serviceType: string     // Service category
  description: string     // Request details
  priority: string        // Low | Medium | High
  status: string          // Pending | In Progress | Completed | Cancelled
  assignedTo?: string     // Staff member name
  createdAt: string       // Request timestamp
  completedAt?: string    // Completion timestamp
}
```

### Guest Entity
```typescript
{
  id: string              // Unique identifier
  name: string            // Full name
  roomNumber: string      // Assigned room
  checkIn: string         // Check-in date
  checkOut: string        // Check-out date
  phone: string           // Contact number
  email: string           // Email address
  accessCode: string      // Portal access code
}
```

### Activity Entity
```typescript
{
  id: string              // Unique identifier
  type: string            // Activity category
  description: string     // Activity details
  performedBy: string     // Staff member
  timestamp: string       // When occurred
  roomNumber?: string     // Related room (if applicable)
}
```

---

## 🔄 System Workflows

### Workflow 1: Guest Service Request
```
1. Guest logs into portal
2. Selects service category
3. Fills request form (description, priority)
4. Submits request
5. Request appears in manager dashboard (Pending)
6. Manager assigns request to appropriate staff
7. Staff receives task in their dashboard
8. Staff starts task (status → In Progress)
9. Guest sees updated status in portal
10. Staff completes task (status → Completed)
11. Guest receives completion notification
12. Activity is logged in system
```

### Workflow 2: Room Status Management
```
1. Housekeeping cleans room
2. Staff updates status to "Cleaning" in their app
3. Manager sees room status in dashboard
4. Upon completion, staff marks room "Available"
5. Front desk can assign room to new guest
6. Manager updates status to "Occupied"
7. Guest info is added to room record
8. Activity is logged
```

### Workflow 3: Staff Task Assignment
```
1. Service request arrives (from guest or manager)
2. Manager opens Service Requests tab
3. Reviews request details and priority
4. Checks available staff by role
5. Assigns to appropriate staff member
6. Staff receives notification in their dashboard
7. Task appears in staff's task list
8. Staff can start working immediately
```

---

## 📈 Reporting & Analytics

### Manager Statistics
- Room occupancy rate
- Staff utilization
- Service request volume
- Completion rates
- Response times

### Staff Performance
- Tasks assigned vs completed
- Completion rate percentage
- Average response time
- Activity logs count

### Guest Metrics
- Total requests made
- Request completion rate
- Average resolution time
- Service type preferences

---

## 🎨 User Interface Design

### Design Principles
1. **Clarity** - Clear labels and intuitive navigation
2. **Consistency** - Uniform design across all portals
3. **Feedback** - Toast notifications for all actions
4. **Accessibility** - High contrast, readable fonts
5. **Responsiveness** - Works on desktop, tablet, mobile

### Color Coding System
- **Red** - Primary actions, urgent items
- **Green** - Available, completed, success
- **Yellow** - Pending, in progress, warnings
- **Blue** - Information, active states
- **Orange** - Maintenance, medium priority
- **Gray** - Inactive, disabled states

### Component Library
- Cards for content grouping
- Badges for status indicators
- Buttons for actions
- Dialogs for forms
- Tables for data display
- Tabs for navigation

---

## 🔐 Security Considerations

### Current Implementation (Demo)
- Simple credential checking
- No encryption
- Client-side only
- Session in memory

### Production Recommendations
1. **Authentication:**
   - JWT tokens
   - OAuth 2.0
   - Multi-factor authentication
   - Password hashing (bcrypt)

2. **Authorization:**
   - Role-based access control (RBAC)
   - Permission levels
   - API authentication
   - Secure session management

3. **Data Protection:**
   - HTTPS only
   - Input validation
   - SQL injection prevention
   - XSS protection
   - CSRF tokens

---

## 🚀 Deployment Guide

### Development
```bash
npm run dev
```
Access at: `http://localhost:5173/`

### Production Build
```bash
npm run build
```
Output: `/dist` folder

### Hosting Options
1. **Static Hosting:**
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

2. **Full-Stack (with backend):**
   - Heroku
   - DigitalOcean
   - AWS EC2
   - Google Cloud Platform

---

## 🔧 Extending the System

### Adding New Features

#### 1. Add New Service Type
**File:** `/src/app/data/mockData.ts`
```typescript
// Add to ServiceRequest type
serviceType: '... | Your New Service'
```

**File:** `/src/app/pages/GuestPortal.tsx`
```typescript
// Add to services array
{
  type: 'Your New Service',
  icon: YourIcon,
  description: 'Description',
  color: 'bg-color-class',
}
```

#### 2. Add New Staff Role
**File:** `/src/app/data/mockData.ts`
```typescript
// Add to Staff type
role: '... | Your New Role'
```

#### 3. Add New Room Type
**File:** `/src/app/data/mockData.ts`
```typescript
// Add to Room type
type: '... | Your New Type'
```

---

## 🗄️ Database Integration (Future)

### Recommended Stack
- **Backend:** Node.js + Express or Fastify
- **Database:** PostgreSQL or MongoDB
- **ORM:** Prisma or TypeORM
- **Real-time:** Socket.IO or Firebase

### API Endpoints Needed
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/staff
POST   /api/staff
PUT    /api/staff/:id
GET    /api/rooms
PUT    /api/rooms/:id
GET    /api/requests
POST   /api/requests
PUT    /api/requests/:id
GET    /api/activities
POST   /api/activities
```

---

## 📱 Mobile App Considerations

### React Native Conversion
- Same business logic
- Native UI components
- Push notifications
- Offline mode
- Barcode/QR scanner for access codes

### Progressive Web App (PWA)
- Add service worker
- Offline caching
- Install prompt
- Push notifications
- App-like experience

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Business logic
- Data validation
- Helper functions

### Integration Tests
- User flows
- API calls
- State management
- Navigation

### E2E Tests
- Complete workflows
- Cross-browser testing
- Mobile responsiveness
- Performance testing

---

## 📚 Additional Resources

### Code Organization
```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (routes)
│   ├── data/           # Mock data & types
│   ├── hooks/          # Custom React hooks (future)
│   ├── utils/          # Helper functions (future)
│   └── api/            # API calls (future)
├── styles/             # Global styles
└── assets/             # Images, fonts, etc.
```

### Best Practices
1. Keep components small and focused
2. Use TypeScript for type safety
3. Extract reusable logic to hooks
4. Maintain consistent naming conventions
5. Comment complex logic
6. Use proper error handling

---

## 🆘 Support & Maintenance

### Common Tasks

#### Update Dependencies
```bash
npm update
```

#### Check for Security Issues
```bash
npm audit
npm audit fix
```

#### Clear Cache
```bash
npm cache clean --force
```

---

## 📊 System Capacity

### Current Demo Limits
- Unlimited rooms (display limited by UI)
- Unlimited staff
- Unlimited service requests
- All data in memory

### Production Considerations
- Database query optimization
- Pagination for large lists
- Caching strategy
- Load balancing
- Backup systems

---

## 🎯 Future Enhancements

### Phase 1 (Essential)
- [ ] Real database integration
- [ ] User authentication & authorization
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Data export (CSV/Excel)

### Phase 2 (Advanced)
- [ ] Payment integration
- [ ] Booking system
- [ ] Inventory management
- [ ] Financial reports
- [ ] Multi-property support

### Phase 3 (Premium)
- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered analytics
- [ ] Chatbot support
- [ ] IoT integration (smart rooms)
- [ ] CRM integration

---

**Last Updated:** March 22, 2026
**Version:** 1.0.0
**License:** MIT
