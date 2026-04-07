# 🚀 Quick Start Guide - The Stone Guest House Management System

## ⚡ 3-Minute Setup

### 1. Install Node.js
Download from: https://nodejs.org/ (choose LTS version)

### 2. Open Terminal in Project Folder
- **Windows:** Shift + Right-click folder → "Open PowerShell here"
- **Mac:** Right-click folder → "New Terminal at Folder"
- **Linux:** Right-click folder → "Open in Terminal"

### 3. Run These Commands
```bash
npm install
npm run dev
```

### 4. Open Browser
Go to: `http://localhost:5173/`

---

## 🔐 Login Credentials

| Role | Username/Code | Password |
|------|---------------|----------|
| Manager | `manager` | `manager123` |
| Staff | `staff` | `staff123` |
| Guest | `GUEST101` | `guest123` |

---

## ✅ What Each Role Can Do

### 👨‍💼 Manager
- View all statistics (rooms, staff, requests)
- Manage staff (add, view, assign)
- Update room status
- Assign service requests to staff
- View all activities

### 👷 Staff
- View assigned tasks
- Start and complete tasks
- Log daily activities
- Track performance

### 🏨 Guest
- Request 6 types of services:
  - 🍽️ Food Order
  - ✨ Housekeeping
  - 🔧 Maintenance
  - 🧺 Laundry
  - 🚗 Transport
  - 🛍️ Extra Amenities
- Track request status
- View room information

---

## 📊 System Features

### Data Tracked:
- ✅ Staff (roles, shifts, availability, contact info)
- ✅ Rooms (status, price, occupancy, guest info)
- ✅ Service Requests (type, priority, status, assignment)
- ✅ Activities (daily operations log)
- ✅ Guests (room info, check-in/out dates, contact)

### Real-time Updates:
- 📈 Statistics dashboard
- 🔔 Request status changes
- ✅ Task completion tracking
- 📝 Activity logging

---

## 🎯 Test Workflow

### Complete Service Request Flow:

1. **As Guest:**
   - Login → Click "Food Order" service
   - Enter: "2x Breakfast, 1x Coffee"
   - Set Priority: Medium
   - Submit Request

2. **As Manager:**
   - Login → Go to "Service Requests" tab
   - Find the new request
   - Assign to "David Chen" (Kitchen staff)

3. **As Staff:**
   - Login → See new task appear
   - Click "Start Task"
   - Click "Complete Task"

4. **As Guest:**
   - Login → Check "My Service Requests"
   - See status: Pending → In Progress → Completed

---

## 🛠️ Common Commands

```bash
# Start the app
npm run dev

# Stop the app (in terminal)
Ctrl + C

# Reinstall dependencies (if issues)
npm install

# Build for production
npm run build

# Clear everything and start fresh
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🎨 Customization

### Change Logo:
Replace the image import in login and dashboard files

### Change Colors:
Edit `/src/styles/theme.css`

### Change Sample Data:
Edit `/src/app/data/mockData.ts`

### Change Login Credentials:
Update the `loginCredentials` object in `/src/app/data/mockData.ts`

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| White screen | Check terminal for errors, refresh browser |
| Port in use | Use suggested alternative port (e.g., 5174) |
| No styles | Hard refresh (Ctrl+Shift+R) |
| Logo missing | Check image file path |
| Can't login | Use exact credentials (case-sensitive) |

---

## 📱 Browser Support

Works best on:
- ✅ Google Chrome
- ✅ Firefox
- ✅ Microsoft Edge
- ✅ Safari

---

## 🔄 Daily Usage

### To Start Working:
```bash
cd path/to/project
npm run dev
```
Open browser → `http://localhost:5173/`

### To Stop Working:
- Terminal: Press `Ctrl + C`
- Browser: Can close tab/window

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `/src/app/App.tsx` | Main application |
| `/src/app/routes.tsx` | Page routing |
| `/src/app/pages/Login.tsx` | Login page |
| `/src/app/pages/ManagerDashboard.tsx` | Manager portal |
| `/src/app/pages/StaffDashboard.tsx` | Staff portal |
| `/src/app/pages/GuestPortal.tsx` | Guest portal |
| `/src/app/data/mockData.ts` | Sample data |

---

## ⚠️ Important Notes

- **Not connected to database** - Data resets on page refresh
- **Demo credentials** - Change for production use
- **Keep terminal open** - Server must run continuously
- **Internet needed** - Only for initial `npm install`

---

## 🎓 Learning Resources

- React Docs: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/

---

## ✨ Next Steps

1. ✅ Get the system running
2. ✅ Test all three user roles
3. ✅ Understand the workflow
4. 🚀 Customize for your needs
5. 🚀 Connect to real database (if needed)
6. 🚀 Deploy to production server

---

**Need detailed instructions? See `SETUP_INSTRUCTIONS.md`**

**Happy Guest House Management! 🏨**
