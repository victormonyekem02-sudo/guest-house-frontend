# The Stone Guest House Management System - Setup Instructions

## 📋 Overview

This is a comprehensive Guest House Management System built with React, TypeScript, and Tailwind CSS. The system includes three different portals:

1. **Manager Dashboard** - Full management control
2. **Staff Dashboard** - Task management and activity logging
3. **Guest Portal** - Service requests and room information

---

## 🚀 Step-by-Step Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your laptop:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open terminal/command prompt and run:
     ```bash
     node --version
     ```
   - You should see something like `v18.x.x` or higher

2. **npm** (comes with Node.js)
   - Verify installation:
     ```bash
     npm --version
     ```
   - You should see something like `9.x.x` or higher

3. **A Code Editor** (recommended: VS Code)
   - Download from: https://code.visualstudio.com/

---

### Step 1: Download the Project

1. Download all the project files to a folder on your computer
2. Name the folder something like `stone-guesthouse` or `ghms`
3. Make sure all files and folders are extracted properly

---

### Step 2: Open Terminal/Command Prompt

**For Windows:**
- Press `Win + R`, type `cmd`, and press Enter
- OR Right-click in the project folder while holding Shift, then select "Open PowerShell window here"

**For Mac:**
- Open Finder, navigate to the project folder
- Right-click the folder and select "New Terminal at Folder"
- OR use Spotlight (Cmd + Space), type "Terminal", and press Enter, then navigate to the folder using `cd` command

**For Linux:**
- Open Terminal (usually Ctrl + Alt + T)
- Navigate to the project folder using `cd` command

---

### Step 3: Navigate to Project Folder

In the terminal, navigate to your project folder:

```bash
cd path/to/stone-guesthouse
```

**Example:**
```bash
cd C:\Users\YourName\Downloads\stone-guesthouse
```

**✅ How to know you're in the right place:**
- Run `dir` (Windows) or `ls` (Mac/Linux)
- You should see folders like `src`, `public`, and files like `package.json`, `vite.config.ts`

---

### Step 4: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

**⏱️ What to expect:**
- This will take 2-5 minutes depending on your internet speed
- You'll see a progress bar and package names being installed
- You may see some warnings (in yellow) - this is normal
- **DO NOT close the terminal** until you see a message like "added XXX packages"

**✅ Success indicators:**
- Terminal returns to the command prompt
- A new `node_modules` folder appears in your project directory
- A `package-lock.json` file is created

**❌ If you see errors:**
- Make sure you have Node.js installed correctly
- Check your internet connection
- Try running: `npm cache clean --force` then `npm install` again

---

### Step 5: Start the Development Server

Run the following command to start the application:

```bash
npm run dev
```

**⏱️ What to expect:**
- The server will start in 5-10 seconds
- You'll see output similar to:
  ```
  VITE v6.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```

**✅ Success indicators:**
- Terminal shows "ready in XXX ms"
- You see a URL like `http://localhost:5173/`
- The terminal stays open and active

**⚠️ Keep the terminal open!**
- Do NOT close this terminal window
- The server needs to keep running for the app to work
- To stop the server later, press `Ctrl + C` in the terminal

---

### Step 6: Open the Application in Your Browser

1. Open your web browser (Chrome, Firefox, Edge, Safari, etc.)
2. Enter the URL shown in the terminal (usually `http://localhost:5173/`)
3. Press Enter

**✅ What you should see:**
- The login page with "The Stone Guest House" logo
- Three login tabs: Manager, Staff, and Guest
- A beautiful light oak/brown and red color scheme

---

## 🔐 Login Credentials

### Manager Login
- **Username:** `manager`
- **Password:** `manager123`
- **Access:** Full system control, staff management, room management, service requests

### Staff Login
- **Username:** `staff`
- **Password:** `staff123`
- **Access:** View assigned tasks, log activities, complete tasks

### Guest Login
- **Access Code:** `GUEST101`
- **Password:** `guest123`
- **Access:** Request services, view room info, track request status

---

## 🎯 Testing the System

### Test as Manager:
1. Login with manager credentials
2. Check the Overview tab for statistics
3. Go to "Staff Management" to see all staff members
4. Visit "Room Management" to update room statuses
5. Check "Service Requests" to assign tasks to staff

### Test as Staff:
1. Login with staff credentials
2. View your assigned tasks
3. Click "Start Task" on pending tasks
4. Mark tasks as complete
5. Log daily activities using the form

### Test as Guest:
1. Login with guest credentials
2. Click on different service types (Food Order, Housekeeping, etc.)
3. Submit a service request
4. Watch it appear in "My Service Requests"
5. See the status change from Pending → In Progress → Completed

---

## 📁 Project Structure

```
stone-guesthouse/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable UI components
│   │   ├── data/
│   │   │   └── mockData.ts   # Sample data for the system
│   │   ├── pages/
│   │   │   ├── Login.tsx             # Login page
│   │   │   ├── ManagerDashboard.tsx  # Manager portal
│   │   │   ├── StaffDashboard.tsx    # Staff portal
│   │   │   └── GuestPortal.tsx       # Guest portal
│   │   ├── App.tsx            # Main app component
│   │   └── routes.tsx         # Route configuration
│   ├── styles/                # CSS styles
│   └── ...
├── package.json               # Project dependencies
├── vite.config.ts            # Build configuration
└── README.md                 # This file
```

---

## 🛠️ Troubleshooting

### Issue: "Port 5173 is already in use"
**Solution:**
- Another app is using that port
- Either stop that app, or
- The terminal will suggest an alternative port (like 5174) - use that URL instead

### Issue: "Cannot find module" errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: White screen or blank page
**Solution:**
- Check the browser console for errors (Press F12)
- Make sure the terminal is still running
- Refresh the page (Ctrl/Cmd + R)
- Try a different browser

### Issue: Logo not showing
**Solution:**
- Make sure the image file is in the correct location
- Check that the image import path is correct
- The logo should appear after the first successful build

### Issue: Styles not loading properly
**Solution:**
- Hard refresh the page (Ctrl/Cmd + Shift + R)
- Clear browser cache
- Restart the development server (Ctrl + C, then `npm run dev` again)

---

## 🎨 Features Overview

### Manager Dashboard
- ✅ Real-time statistics (rooms, staff, requests)
- ✅ Staff directory with role management
- ✅ Room status management
- ✅ Service request assignment
- ✅ Activity logs
- ✅ Task completion tracking

### Staff Dashboard
- ✅ Personal task list
- ✅ Task status updates (Pending → In Progress → Completed)
- ✅ Daily activity logging
- ✅ Performance metrics
- ✅ Staff profile information

### Guest Portal
- ✅ 6 service types:
  - Food Order
  - Housekeeping
  - Maintenance
  - Laundry
  - Transport
  - Extra Amenities
- ✅ Request tracking with status updates
- ✅ Room information display
- ✅ Contact information
- ✅ Request summary statistics

---

## 📱 Responsive Design

The system works on:
- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile phones

Test it by resizing your browser window!

---

## 🔄 Making Changes

If you want to modify the code:

1. Open the project in your code editor (e.g., VS Code)
2. Make your changes to the files
3. Save the file (Ctrl/Cmd + S)
4. The browser will automatically refresh (Hot Module Replacement)
5. See your changes instantly!

**Files you might want to edit:**
- `/src/app/data/mockData.ts` - Change sample data
- `/src/app/pages/Login.tsx` - Modify login credentials
- `/src/styles/theme.css` - Adjust colors and styling

---

## 🛑 Stopping the Server

When you're done:
1. Go to the terminal where the server is running
2. Press `Ctrl + C`
3. Confirm if asked
4. The server will stop

To start again:
```bash
npm run dev
```

---

## 📦 Building for Production

When ready to deploy the app to a real server:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

---

## 🆘 Getting Help

If you encounter any issues:

1. **Check the Terminal** - Error messages usually explain what's wrong
2. **Check Browser Console** - Press F12 → Console tab
3. **Restart Everything**:
   ```bash
   # Stop the server (Ctrl + C)
   # Then:
   npm install
   npm run dev
   ```

---

## 📝 Notes

- **Data Persistence:** Currently using mock data (resets on refresh). For real persistence, you'd need to connect a database.
- **Authentication:** Using simple credential checking. For production, implement proper authentication.
- **Multi-user:** Currently single-user simulation. For real multi-user, implement backend with WebSockets/real-time updates.

---

## ✅ Checklist for Successful Setup

- [ ] Node.js installed (check with `node --version`)
- [ ] npm installed (check with `npm --version`)
- [ ] Project folder downloaded
- [ ] Terminal opened in project folder
- [ ] Dependencies installed (`npm install` completed)
- [ ] Development server started (`npm run dev`)
- [ ] Browser opened to `http://localhost:5173/`
- [ ] Login page visible with logo
- [ ] Able to login as Manager/Staff/Guest
- [ ] All features working

---

## 🎉 You're All Set!

Your Guest House Management System is now running locally on your laptop!

**Next Steps:**
- Test all three user roles
- Explore all features
- Customize the data in `mockData.ts`
- Modify the design to your liking
- Consider adding a database for persistence

**Enjoy managing your guest house! 🏨**
