# 🏨 The Stone Guest House Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

**A comprehensive Guest House Management System with Manager, Staff, and Guest portals**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-demo-credentials) • [Support](#-support)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Demo Credentials](#-demo-credentials)
- [System Architecture](#-system-architecture)
- [Documentation](#-documentation)
- [Technology Stack](#-technology-stack)
- [Screenshots](#-screenshots)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

# Overview

The Stone Guest House Management System (GHMS) is a modern, full-featured web application designed to streamline guest house operations. It provides dedicated portals for managers, staff members, and guests, enabling efficient management of:

Staff Management - Track employees, assign tasks, monitor performance
-Room Management - Monitor occupancy, update status, manage bookings
- 📋 **Service Requests** - Handle guest requests from submission to completion
- 📊 **Analytics & Reporting** - Real-time statistics and activity tracking
- 🔐 **Role-Based Access** - Secure, customized experiences for each user type

### Why This System?

- **✅ Complete Workflow** - From guest check-in to service fulfillment
- **✅ Real-Time Updates** - Instant status changes across all portals
- **✅ User-Friendly** - Intuitive interface with minimal training needed
- **✅ Scalable** - Built with modern technologies for easy expansion
- **✅ Mobile Responsive** - Works on desktop, tablet, and mobile devices

---

## ✨ Features

### 👨‍💼 Manager Portal

- **Dashboard Overview**
  - Real-time statistics (rooms, staff, requests)
  - Recent activities log
  - Urgent requests highlighting
  - Performance metrics

- **Staff Management**
  - Complete staff directory
  - Add/edit staff members
  - Role and shift management
  - Contact information
  - Availability tracking

- **Room Management**
  - Visual room status grid
  - Quick status updates
  - Guest information
  - Occupancy tracking
  - Pricing display

- **Service Request Management**
  - View all requests
  - Priority-based sorting
  - Staff assignment
  - Task completion tracking
  - Request history

### 👷 Staff Portal

- **Task Dashboard**
  - Personal task queue
  - Priority indicators
  - Status tracking (Pending → In Progress → Completed)
  - Quick action buttons

- **Activity Logging**
  - Daily activity recording
  - Free-form notes
  - Timestamp tracking

- **Performance Metrics**
  - Task completion rate
  - Tasks assigned vs completed
  - Visual progress indicators

### 🏨 Guest Portal

- **Service Request System**
  - 6 service categories:
    - 🍽️ Food Order
    - ✨ Housekeeping
    - 🔧 Maintenance
    - 🧺 Laundry
    - 🚗 Transport
    - 🛍️ Extra Amenities
  - Priority selection (Low/Medium/High)
  - Detailed description input
  - Real-time status tracking

- **Room Information**
  - Room details
  - Check-in/check-out dates
  - Contact information
  - Stay summary

- **Request Tracking**
  - View all requests
  - Real-time status updates
  - Assigned staff visibility
  - Completion notifications

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

```bash
# 1. Navigate to project folder
cd path/to/stone-guesthouse

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Go to: http://localhost:5173/
```

### Verification

✅ Terminal shows: `VITE ready in XXX ms`  
✅ Browser shows: Login page with The Stone Guest House logo  
✅ Three login tabs visible: Manager, Staff, Guest  
✅ Light oak/brown theme with red accents  

---

## 🔐 Demo Credentials

### Manager Access
- **Username:** `manager`
- **Password:** `manager123`
- **Capabilities:** Full system access, staff management, room management, request assignment

### Staff Access
- **Username:** `staff`
- **Password:** `staff123`
- **Capabilities:** View assigned tasks, log activities, update task status

### Guest Access
- **Access Code:** `GUEST101`
- **Password:** `guest123`
- **Capabilities:** Request services, view room info, track request status

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Manager    │  │    Staff     │  │    Guest     │  │
│  │  Dashboard   │  │  Dashboard   │  │   Portal     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                          │                               │
│                  ┌───────┴────────┐                     │
│                  │  React Router   │                     │
│                  └───────┬────────┘                     │
│                          │                               │
│                  ┌───────┴────────┐                     │
│                  │  State (Demo)   │                     │
│                  │   Mock Data     │                     │
│                  └────────────────┘                     │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
Guest Portal → Service Request → Manager Dashboard → Assign to Staff
                                         ↓
Staff Dashboard ← Task Assignment ← Service Request
       ↓
Update Status → Completed → Notify Guest
```

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

| Document | Description | When to Use |
|----------|-------------|-------------|
| **[QUICK_START.md](QUICK_START.md)** | 3-minute setup guide | Starting for the first time |
| **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** | Detailed step-by-step setup | Need detailed guidance |
| **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** | Visual reference | Verify everything looks correct |
| **[SYSTEM_DOCUMENTATION.md](SYSTEM_DOCUMENTATION.md)** | Technical architecture | Understanding the system |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Common issues & solutions | Something isn't working |

### Quick Links

- 🚀 [Installation Guide](SETUP_INSTRUCTIONS.md#step-by-step-setup-instructions)
- 🔧 [Troubleshooting](TROUBLESHOOTING.md)
- 📖 [API Documentation](SYSTEM_DOCUMENTATION.md#-data-structure)
- 🎨 [UI Components](SYSTEM_DOCUMENTATION.md#-user-interface-design)
- 🔄 [Workflows](SYSTEM_DOCUMENTATION.md#-system-workflows)

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **React Router 7** - Navigation
- **Vite 6** - Build tool

### UI Components
- **Radix UI** - Accessible primitives
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vite** - Dev server & bundler

---

## 📸 Screenshots

### Login Page
Beautiful multi-role login with The Stone Guest House branding

### Manager Dashboard
- Statistics cards showing key metrics
- Recent activities timeline
- Urgent requests panel
- Staff directory table
- Room status grid
- Service request management

### Staff Dashboard
- Personal task queue
- Activity logging form
- Performance metrics
- Profile information

### Guest Portal
- 6 service request categories
- Request tracking interface
- Room information display
- Request history

---

## 💻 Development

### Project Structure

```
stone-guesthouse/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/              # Reusable UI components
│   │   │   └── figma/           # Figma-specific components
│   │   ├── pages/
│   │   │   ├── Login.tsx        # Login page
│   │   │   ├── ManagerDashboard.tsx
│   │   │   ├── StaffDashboard.tsx
│   │   │   └── GuestPortal.tsx
│   │   ├── data/
│   │   │   └── mockData.ts      # Demo data
│   │   ├── App.tsx              # Main app
│   │   └── routes.tsx           # Route config
│   ├── styles/
│   │   ├── index.css
│   │   ├── theme.css            # Theme variables
│   │   ├── tailwind.css
│   │   └── fonts.css
│   └── ...
├── package.json
├── vite.config.ts
└── README.md
```

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Currently using demo data. For production with backend:

```env
VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

### Hosting Options

**Static Hosting (Current Demo):**
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Full-Stack (With Backend):**
- Heroku
- DigitalOcean
- AWS EC2
- Google Cloud Platform

### Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Test the build locally:**
   ```bash
   npm run preview
   ```

3. **Deploy the `dist` folder** to your hosting service

4. **Configure routing** (for React Router):
   - Most hosts need a redirect rule: `/* → /index.html`

---

## 🔧 Troubleshooting

### Common Issues

**Issue: Blank white screen**
- Check browser console (F12)
- Verify server is running
- Hard refresh (Ctrl+Shift+R)

**Issue: Port already in use**
- Use alternative port suggested by Vite
- Or kill the process using the port

**Issue: Styles not loading**
- Clear browser cache
- Restart dev server
- Run `npm install` again

**Issue: Login not working**
- Verify exact credentials (case-sensitive)
- Clear browser cookies
- Check browser console for errors

👉 **See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for complete solutions**

---

## 🧪 Testing the System

### Complete Workflow Test

1. **Login as Guest** (GUEST101 / guest123)
   - Request a service (e.g., Food Order)
   - Enter description and set priority
   - Submit request

2. **Login as Manager** (manager / manager123)
   - Go to Service Requests tab
   - Find the new request
   - Assign to appropriate staff member

3. **Login as Staff** (staff / staff123)
   - View assigned task
   - Start the task
   - Complete the task

4. **Login as Guest** again
   - Check request status (should be Completed)
   - View in request history

✅ **If this workflow completes successfully, the system is working correctly!**

---

## 📊 Features Roadmap

### Phase 1 - Current (Demo)
- ✅ Multi-role authentication
- ✅ Manager dashboard
- ✅ Staff task management
- ✅ Guest service requests
- ✅ Real-time status updates (in-memory)

### Phase 2 - Backend Integration
- [ ] Database connection (PostgreSQL/MongoDB)
- [ ] REST API
- [ ] Real authentication (JWT)
- [ ] Email notifications
- [ ] File upload (documents, images)

### Phase 3 - Advanced Features
- [ ] Payment processing
- [ ] Online booking system
- [ ] Inventory management
- [ ] Financial reports
- [ ] Multi-property support

### Phase 4 - Mobile & AI
- [ ] Native mobile apps (iOS/Android)
- [ ] Push notifications
- [ ] AI-powered analytics
- [ ] Chatbot support
- [ ] Smart home integration

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**
   - Use the issue tracker
   - Include detailed steps to reproduce
   - Attach screenshots if applicable

2. **Suggest Features**
   - Describe the feature
   - Explain the use case
   - Provide examples

3. **Submit Pull Requests**
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Submit PR with description

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 The Stone Guest House

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🆘 Support

### Documentation
- 📖 [Setup Instructions](SETUP_INSTRUCTIONS.md)
- 🚀 [Quick Start Guide](QUICK_START.md)
- 🔧 [Troubleshooting](TROUBLESHOOTING.md)
- 👁️ [Visual Guide](VISUAL_GUIDE.md)
- 📚 [System Documentation](SYSTEM_DOCUMENTATION.md)

### Getting Help
1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Search existing issues
3. Create a new issue with:
   - Environment details
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/error messages

---

## 🙏 Acknowledgments

- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Lucide** - For beautiful icons
- **Vite** - For blazing fast development experience
- **React Team** - For the incredible library

---

## 📞 Contact

For questions, suggestions, or support:
- 📧 Email: support@stoneguesthouse.com
- 🌐 Website: www.stoneguesthouse.com
- 💬 Discord: [Join our community](#)

---

<div align="center">

**Made with ❤️ for The Stone Guest House**

⭐ Star this repo if you find it helpful!

[Back to Top](#-the-stone-guest-house-management-system)

</div>
