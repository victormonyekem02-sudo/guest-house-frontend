# 👁️ Visual Guide - What You Should See

This guide shows you exactly what to expect at each step when setting up and using The Stone Guest House Management System.

---

## 🖥️ STEP 1: Terminal/Command Prompt

### When you first open the terminal:
```
Microsoft Windows [Version XX.X.XXXXX]
(c) Microsoft Corporation. All rights reserved.

C:\Users\YourName>
```
**✅ This is normal - you're ready to proceed**

---

## 📁 STEP 2: Navigate to Project Folder

### After running `cd path/to/stone-guesthouse`:
```
C:\Users\YourName\Downloads\stone-guesthouse>
```

### Check you're in the right place with `dir` (Windows) or `ls` (Mac/Linux):
```
Directory of C:\Users\YourName\Downloads\stone-guesthouse

03/22/2026  10:30 AM    <DIR>          .
03/22/2026  10:30 AM    <DIR>          ..
03/22/2026  10:30 AM               XXX package.json
03/22/2026  10:30 AM    <DIR>          src
03/22/2026  10:30 AM               XXX vite.config.ts
03/22/2026  10:30 AM               XXX README.md
              X File(s)          X,XXX bytes
              X Dir(s)   XXX,XXX,XXX,XXX bytes free
```
**✅ You should see: package.json, src folder, vite.config.ts**

---

## 📦 STEP 3: npm install

### What you'll see:
```
npm install

npm WARN deprecated package@version: message
npm WARN deprecated package@version: message

added 1523 packages, and audited 1524 packages in 2m

245 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

C:\Users\YourName\Downloads\stone-guesthouse>
```

**✅ Success indicators:**
- "added XXX packages"
- Returns to command prompt
- No RED error messages (yellow warnings are OK)

**❌ If you see errors:**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path C:\path\package.json
npm ERR! errno -4058
```
**Solution:** You're not in the correct folder. Use `cd` to navigate to the project folder.

---

## 🚀 STEP 4: npm run dev

### What you'll see:
```
> @figma/my-make-file@0.0.1 dev
> vite


  VITE v6.3.5  ready in 823 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**✅ Success indicators:**
- "VITE ready in XXX ms"
- Shows "Local: http://localhost:5173/"
- Cursor is blinking (server is running)

**⚠️ Important:** Don't close this window! Keep it running.

**Alternative port (if 5173 is in use):**
```
  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```
**✅ This is fine - just use 5174 instead of 5173**

---

## 🌐 STEP 5: Opening in Browser

### URL to enter:
```
http://localhost:5173/
```

### What you should see:

#### 1. Login Page (First View)
```
┌─────────────────────────────────────────┐
│                                         │
│      [THE STONE GUEST HOUSE LOGO]      │
│                                         │
│      Guest House Management             │
│         Access your portal              │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Manager │ Staff │ Guest          │  │ ← Tabs
│  ├──────────────────────────────────┤  │
│  │                                  │  │
│  │  Manager Login                   │  │
│  │  Access the management dashboard │  │
│  │                                  │  │
│  │  Username: [____________]        │  │
│  │  Password: [____________]        │  │
│  │                                  │  │
│  │  [Login as Manager]              │  │
│  │                                  │  │
│  │  Demo: manager / manager123      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**✅ You should see:**
- The Stone Guest House logo at the top
- Three tabs: Manager, Staff, Guest
- Login form with username and password fields
- Light brown/oak background with red accents
- Demo credentials shown below the button

---

## 🔐 STEP 6: After Logging in as Manager

### Manager Dashboard View:
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Manager Dashboard              [Logout] │
│        The Stone Guest House Management                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Total    │  │ Staff    │  │ Pending  │  │ Completed│  │
│  │ Rooms    │  │ Members  │  │ Requests │  │ Today    │  │
│  │   8      │  │   5      │  │   2      │  │   1      │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Overview │ Staff Management │ Room Management │... │    │ ← Tabs
│  ├────────────────────────────────────────────────────┤    │
│  │                                                     │    │
│  │  Recent Activities        │  Urgent Requests       │    │
│  │  ─────────────────────   │  ─────────────────     │    │
│  │  ✓ Room 104 cleaned      │  ⚠️ AC not working     │    │
│  │  ✓ Guest checked in      │     Room 203           │    │
│  │  ✓ Food order completed  │     [Assign Staff]     │    │
│  │                           │                        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**✅ You should see:**
- 4 statistics cards at top
- Tab navigation (Overview, Staff Management, Room Management, Service Requests)
- Recent activities on the left
- Urgent requests on the right
- All in light oak/brown theme with red accents

---

## 👷 After Logging in as Staff

### Staff Dashboard View:
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Staff Dashboard                [Logout] │
│        Welcome, David Chen                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │ Pending  │  │ In       │  │ Completed│                 │
│  │ Tasks    │  │ Progress │  │ Today    │                 │
│  │   1      │  │   1      │  │   0      │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  My Assigned Tasks                │  My Profile             │
│  ──────────────────────           │  ──────────             │
│  ┌──────────────────────────┐    │  👤 David Chen          │
│  │ Food Order  [Medium][⏳] │    │  Kitchen Staff          │
│  │ Room 101 - John Doe      │    │  Morning Shift          │
│  │ Breakfast - 2x...        │    │  Status: On Duty        │
│  │ [Start Task]             │    │  ───────────────        │
│  └──────────────────────────┘    │  Total Tasks: 2         │
│                                   │  Completed: 0           │
│                                   │                         │
│                                   │  Log Activity           │
│                                   │  [Text area...]         │
│                                   │  [Log Activity]         │
└─────────────────────────────────────────────────────────────┘
```

**✅ You should see:**
- 3 task statistics at top
- Your assigned tasks with action buttons
- Profile information on the right
- Activity logging form

---

## 🏨 After Logging in as Guest

### Guest Portal View:
```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Guest Portal                   [Logout] │
│        Welcome, John Doe                                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Available Services                   │  Room Information   │
│  ──────────────────                   │  ────────────────   │
│  ┌────────┐ ┌────────┐               │  🏠 Room 101        │
│  │🍽️ Food │ │✨House │               │  Suite - Single     │
│  │  Order  │ │keeping │               │                     │
│  └────────┘ └────────┘               │  Guest: John Doe    │
│  ┌────────┐ ┌────────┐               │  Check-in:  3/20    │
│  │🔧Maint.│ │🧺Laundr│               │  Check-out: 3/25    │
│  └────────┘ └────────┘               │                     │
│  ┌────────┐ ┌────────┐               │  ───────────────    │
│  │🚗Trans.│ │🛍️Extra │               │  📞 +1987654321     │
│  └────────┘ └────────┘               │  ✉️  john@email.com │
│                                       │                     │
│  My Service Requests                  │  Request Summary    │
│  ────────────────────                 │  ────────────────   │
│  ┌───────────────────────────┐       │  Total: 1           │
│  │ Food Order   [Medium][🔵] │       │  Pending: 0         │
│  │ Breakfast - 2x...         │       │  In Progress: 1     │
│  │ ⏰ 3/22 8:30 AM           │       │  Completed: 0       │
│  │ 🔵 Staff is working...    │       │                     │
│  └───────────────────────────┘       │                     │
└─────────────────────────────────────────────────────────────┘
```

**✅ You should see:**
- 6 service cards (clickable)
- Your service requests with status
- Room information on the right
- Request summary statistics

---

## 📱 Responsive Design

### On Tablet (768px - 1024px):
- Cards stack in 2 columns instead of 4
- Same functionality, adjusted layout

### On Mobile (< 768px):
- Single column layout
- Larger touch targets
- Collapsible sections
- Hamburger menu (if implemented)

---

## 🎨 Color Scheme Visual Reference

### You should see these colors:

**Backgrounds:**
- Light Oak: `#F5DEB3` (wheat/beige)
- Light Brown: `#D2B48C` (tan)
- White: `#FFFFFF` (cards, headers)

**Accents:**
- Red Primary: `#DC143C` (crimson)
- Red Hover: `#B22222` (firebrick)

**Status Colors:**
- Green: Available, Completed ✅
- Yellow: Pending, Cleaning ⏳
- Blue: In Progress 🔵
- Red: Occupied, Urgent ⚠️
- Orange: Maintenance 🔧

**Text:**
- Black: `#000000` (main text)
- Gray: `#666666` (secondary text)

---

## ✅ Success Checklist Visual

### Working System Indicators:

**✅ Terminal:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

**✅ Browser:**
- Logo loads correctly
- No console errors (F12 → Console)
- Forms are clickable
- Buttons respond to hover
- Toast notifications appear on actions

**✅ Functionality:**
- Can switch between login tabs
- Login redirects to correct dashboard
- Statistics show numbers
- Can click on services/rooms/staff
- Forms submit successfully
- Toast messages appear

---

## ❌ Common Visual Issues

### Issue 1: Blank White Screen
**What you see:**
- Completely white page
- No logo, no content

**Check:**
1. Open browser console (F12)
2. Look for red error messages
3. Check terminal for errors

### Issue 2: Unstyled Page
**What you see:**
- Content visible but no colors
- Plain HTML text
- No styling

**Solution:**
- Hard refresh: Ctrl+Shift+R
- Clear browser cache
- Restart dev server

### Issue 3: Logo Not Showing
**What you see:**
- Broken image icon
- Or empty space where logo should be

**Check:**
- Image file is in project
- Path is correct in code
- Image format is supported

### Issue 4: Layout Broken on Mobile
**What you see:**
- Content overflow
- Horizontal scrolling
- Tiny text

**Solution:**
- This is expected on very small screens
- System designed for tablets and up
- Use desktop/tablet for best experience

---

## 🎬 Interaction Visual Guide

### Clicking a Button:
```
Before:     [Login as Manager]
            ↓ (click)
During:     [Login as Manager] ← slightly darker
            ↓
After:      Toast notification appears
            ↓
            Page redirects
```

### Submitting a Form:
```
1. Fill fields:     Username: [manager___]
                    Password: [••••••••••]
                    ↓
2. Click button:    [Login as Manager]
                    ↓
3. See toast:       ✅ Welcome Manager!
                    ↓
4. Redirect:        → Manager Dashboard
```

### Status Changes:
```
Pending     →  In Progress  →  Completed
[Yellow]       [Blue]           [Green]
   ⏳            🔵               ✅
```

---

## 📊 Dashboard Statistics Example

### What the numbers mean:

**Total Rooms: 8**
- Number of rooms in the system
- Includes all statuses

**Staff Members: 5**
- Total staff in database
- Shows active count below

**Pending Requests: 2**
- Requests awaiting assignment
- Needs manager action

**Completed Today: 1**
- Requests finished today
- Shows productivity

---

## 🔔 Toast Notifications

### You should see these pop up:

**Success (Green):**
```
┌────────────────────────┐
│ ✅ Welcome Manager!    │
└────────────────────────┘
```

**Error (Red):**
```
┌────────────────────────┐
│ ❌ Invalid credentials │
└────────────────────────┘
```

**Info (Blue):**
```
┌────────────────────────┐
│ ℹ️ Task assigned       │
└────────────────────────┘
```

---

## 🖱️ Hover Effects

### Elements that change on hover:

**Buttons:**
- Background darkens
- Cursor becomes pointer
- Slight shadow increase

**Cards:**
- Shadow increases
- Slight scale up (1.02x)
- Cursor becomes pointer (if clickable)

**Tabs:**
- Background color change
- Underline appears
- Cursor becomes pointer

---

**This visual guide should help you identify if everything is working correctly!**

If what you see matches these descriptions, you're all set! 🎉
