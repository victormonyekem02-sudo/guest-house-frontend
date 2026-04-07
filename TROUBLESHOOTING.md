# 🔧 Troubleshooting Guide - The Stone Guest House Management System

Complete solutions for common issues you might encounter.

---

## 🚨 Installation Issues

### ❌ Problem: "npm is not recognized as an internal or external command"

**Cause:** Node.js is not installed or not in PATH

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. During installation, check "Add to PATH"
4. Restart your terminal/command prompt
5. Verify: `node --version` and `npm --version`

---

### ❌ Problem: "Cannot find package.json"

**Cause:** You're not in the correct directory

**Solution:**
```bash
# Windows
cd C:\path\to\stone-guesthouse

# Mac/Linux
cd /path/to/stone-guesthouse

# Verify you're in the right place
dir        # Windows
ls         # Mac/Linux

# You should see: package.json, src folder, etc.
```

---

### ❌ Problem: "npm install" fails with EACCES or permission errors

**Mac/Linux Solution:**
```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install
```

**Windows Solution:**
- Run Command Prompt as Administrator
- Right-click Command Prompt → "Run as administrator"
- Navigate to project folder and run `npm install`

---

### ❌ Problem: "npm ERR! code ENOTFOUND" or network errors

**Cause:** Network/firewall issues

**Solution:**
```bash
# Check internet connection
ping google.com

# Clear npm cache
npm cache clean --force

# Try with verbose logging
npm install --verbose

# If behind proxy, configure npm:
npm config set proxy http://proxy:port
npm config set https-proxy http://proxy:port
```

---

## 🌐 Browser Issues

### ❌ Problem: Blank white screen

**Solution 1: Check Browser Console**
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for red error messages
4. Common errors and fixes:
   ```
   "Failed to load module" → Run npm install again
   "Syntax error" → Browser too old, update browser
   "Network error" → Dev server not running, run npm run dev
   ```

**Solution 2: Clear Browser Cache**
1. Chrome: Ctrl+Shift+Delete → Clear cache
2. Firefox: Ctrl+Shift+Delete → Clear cache
3. Edge: Ctrl+Shift+Delete → Clear cache
4. Safari: Cmd+Option+E → Empty caches

**Solution 3: Hard Refresh**
- Windows: Ctrl + Shift + R
- Mac: Cmd + Shift + R

**Solution 4: Try Different Browser**
- Use Chrome, Firefox, or Edge (latest versions)
- Avoid Internet Explorer (not supported)

---

### ❌ Problem: Styles not loading / Unstyled content

**Symptoms:**
- Plain HTML text
- No colors or formatting
- Broken layout

**Solution:**
```bash
# Stop the server (Ctrl + C)

# Clear everything
rm -rf node_modules package-lock.json   # Mac/Linux
rmdir /s node_modules                   # Windows
del package-lock.json                   # Windows

# Reinstall
npm install

# Restart server
npm run dev

# Hard refresh browser (Ctrl+Shift+R)
```

---

### ❌ Problem: Logo image not showing

**Symptoms:**
- Broken image icon
- Empty space where logo should be

**Check:**
1. Image file exists in project
2. Image format is supported (PNG, JPG, SVG)
3. Path in code matches actual file location

**Solution:**
```bash
# Check if image exists (from project root)
ls src/assets/logo.*         # Mac/Linux
dir src\assets\logo.*        # Windows

# If missing, ensure image is in correct location
# Image should be referenced via figma:asset import
```

---

### ❌ Problem: "This site can't be reached" or "Connection refused"

**Cause:** Development server not running

**Solution:**
1. Check terminal - is the server running?
2. Look for: "VITE ready in XXX ms"
3. If not running:
   ```bash
   npm run dev
   ```
4. Use exact URL shown in terminal
5. Make sure no typos in URL

---

## ⚙️ Server Issues

### ❌ Problem: "Port 5173 is already in use"

**Full error:**
```
Port 5173 is already in use
Trying another port...
```

**Solution 1: Use Alternative Port**
- Server will suggest another port (e.g., 5174)
- Use that URL: `http://localhost:5174/`

**Solution 2: Kill Process Using Port 5173**

**Windows:**
```bash
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:5173 | xargs kill -9
```

**Solution 3: Specify Different Port**
```bash
# Edit package.json, change dev script to:
"dev": "vite --port 3000"

# Then run:
npm run dev
```

---

### ❌ Problem: Server crashes or keeps restarting

**Symptoms:**
- Terminal shows errors repeatedly
- Page keeps reloading
- "Waiting for file changes..."

**Solution:**
```bash
# Stop server (Ctrl + C)

# Check for syntax errors in code
npm run build

# If build fails, error will show which file has issues

# Fix the error, then:
npm run dev
```

---

### ❌ Problem: "ENOSPC: System limit for number of file watchers reached"

**Cause:** Linux only - too many files being watched

**Solution (Linux):**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 🔐 Login & Authentication Issues

### ❌ Problem: "Invalid credentials" even with correct login

**Check:**
1. Username and password are case-sensitive
2. No extra spaces before/after
3. Using correct credentials:

```
Manager:  manager / manager123
Staff:    staff / staff123  
Guest:    GUEST101 / guest123
```

**Solution:**
- Copy-paste credentials exactly
- Check Caps Lock is off
- Clear browser cache and try again

---

### ❌ Problem: Login redirects to wrong dashboard

**Cause:** Browser cache or state issue

**Solution:**
```bash
# Stop server (Ctrl + C)

# Clear browser completely:
# 1. Clear all cookies and site data
# 2. Close all browser tabs
# 3. Close browser entirely

# Restart server
npm run dev

# Open fresh browser window
# Login again
```

---

### ❌ Problem: Stuck on login page after successful login

**Cause:** Routing issue

**Check Browser Console (F12):**
- Look for navigation errors
- Check for JavaScript errors

**Solution:**
```bash
# Stop server
npm install react-router --save

# Restart
npm run dev
```

---

## 💾 Data & State Issues

### ❌ Problem: Data disappears after page refresh

**This is normal!** 

**Explanation:**
- System uses in-memory state (useState)
- Data resets on page reload
- This is demo behavior

**If you need persistence:**
- Add localStorage:
  ```javascript
  localStorage.setItem('data', JSON.stringify(data))
  const saved = JSON.parse(localStorage.getItem('data'))
  ```
- Or connect to a real database (see documentation)

---

### ❌ Problem: Changes not reflecting in UI

**Symptoms:**
- Click button, nothing happens
- Update form, data doesn't change
- Status doesn't update

**Solution 1: Check Console for Errors**
- Press F12
- Look for red errors
- Fix JavaScript issues

**Solution 2: Hard Refresh**
- Ctrl + Shift + R

**Solution 3: Restart Development Server**
```bash
# Ctrl + C to stop
npm run dev
```

---

## 📱 Mobile/Responsive Issues

### ❌ Problem: Layout broken on mobile

**Symptoms:**
- Content too small
- Horizontal scrolling
- Overlapping elements

**Solution:**
```bash
# This is expected for very small screens
# System optimized for tablets and desktop

# Best experience on:
# - Desktop (1024px+)
# - Tablet (768px+)
# - Large phones in landscape
```

**Workaround:**
- Use desktop or tablet
- Rotate phone to landscape
- Zoom out in browser

---

### ❌ Problem: Touch targets too small on mobile

**Solution:**
- This is a design consideration
- For production, increase button/tap target sizes:
  ```css
  /* Minimum 44px x 44px for mobile touch */
  button { min-height: 44px; min-width: 44px; }
  ```

---

## 🎨 Styling & Theme Issues

### ❌ Problem: Wrong colors showing

**Expected Colors:**
- Background: Light oak/brown
- Accents: Red
- Text: Black

**If you see different colors:**

**Solution:**
```bash
# Check if Tailwind is compiling
# Stop server, then:
npm run dev

# Hard refresh browser
Ctrl + Shift + R

# If still wrong, check /src/styles/theme.css
```

---

### ❌ Problem: Fonts look different

**Cause:** System fonts vary by OS

**This is normal:**
- Windows uses Segoe UI
- Mac uses San Francisco
- Linux uses system default

**If you want consistent fonts:**
- Add web font import to `/src/styles/fonts.css`

---

## 🔄 Hot Module Replacement (HMR) Issues

### ❌ Problem: Changes to code don't appear automatically

**Symptoms:**
- Edit file, save, but browser doesn't update
- Have to manually refresh every time

**Solution:**
```bash
# Stop server (Ctrl + C)

# Clear cache
npm cache clean --force

# Reinstall
npm install

# Restart with forced refresh
npm run dev
```

---

## 🧪 Testing & Debugging

### ❌ Problem: Can't test service request workflow

**Step-by-Step Test:**
1. Login as Guest (GUEST101 / guest123)
2. Click any service (e.g., "Food Order")
3. Fill form and submit
4. Logout
5. Login as Manager (manager / manager123)
6. Go to "Service Requests" tab
7. Find the new request
8. Assign to staff (e.g., "David Chen")
9. Logout
10. Login as Staff (staff / staff123)
11. See the task in your list
12. Click "Start Task"
13. Click "Complete Task"

**If this doesn't work:**
- Check browser console for errors
- Make sure each step completes before moving to next
- Watch for toast notifications

---

## 💻 Performance Issues

### ❌ Problem: App is slow or laggy

**Solution 1: Close Unnecessary Apps**
- Close other applications
- Close unused browser tabs
- Check system resources (Task Manager / Activity Monitor)

**Solution 2: Disable Browser Extensions**
- Ad blockers can slow React apps
- Try in Incognito/Private mode
- Disable extensions one by one

**Solution 3: Update Browser**
- Use latest version of Chrome, Firefox, or Edge
- Older browsers = slower performance

---

### ❌ Problem: High CPU usage

**Cause:** Development mode includes extra processing

**This is normal for dev mode:**
- HMR (hot module replacement)
- Source maps
- Dev tools

**Production build is faster:**
```bash
npm run build
# Then serve the dist folder
```

---

## 📦 Build Issues

### ❌ Problem: "npm run build" fails

**Common errors:**

**Error: TypeScript errors**
```
Solution: Fix type errors in code
Check terminal output for file and line number
```

**Error: "Out of memory"**
```bash
Solution: Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**Error: Module not found**
```bash
Solution: Install missing dependency
npm install <missing-package>
```

---

## 🆘 Emergency Reset (Nuclear Option)

**If nothing else works:**

```bash
# 1. Stop server (Ctrl + C)

# 2. Delete everything
rm -rf node_modules package-lock.json .vite dist    # Mac/Linux
rmdir /s node_modules && del package-lock.json      # Windows

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall Node.js (download from nodejs.org)

# 5. Reinstall project
npm install

# 6. Start fresh
npm run dev

# 7. Clear browser completely
# - Clear cache
# - Clear cookies
# - Close and reopen browser

# 8. Try again
# Open http://localhost:5173/
```

---

## 📞 Getting More Help

### Check These First:

1. **Browser Console (F12)**
   - Most errors show here
   - Red = error, Yellow = warning

2. **Terminal Output**
   - Server errors appear here
   - Read error messages carefully

3. **Documentation**
   - `SETUP_INSTRUCTIONS.md` - Detailed setup
   - `QUICK_START.md` - Fast reference
   - `VISUAL_GUIDE.md` - What you should see
   - `SYSTEM_DOCUMENTATION.md` - Technical details

### Diagnostic Checklist:

- [ ] Node.js installed? (`node --version`)
- [ ] In correct folder? (see `package.json`)
- [ ] Dependencies installed? (see `node_modules`)
- [ ] Server running? (see "VITE ready")
- [ ] Correct URL? (`http://localhost:5173/`)
- [ ] Browser updated? (latest version)
- [ ] Console errors? (F12 → Console)
- [ ] Tried hard refresh? (Ctrl+Shift+R)
- [ ] Tried different browser?
- [ ] Restarted server?

---

## 🐛 Reporting Issues

If you need to report an issue, include:

1. **Your Environment:**
   - OS: Windows/Mac/Linux (version)
   - Node version: `node --version`
   - npm version: `npm --version`
   - Browser: Chrome/Firefox/Edge (version)

2. **What You Did:**
   - Step-by-step actions
   - What command you ran

3. **What Happened:**
   - Exact error message
   - Screenshot (if applicable)
   - Browser console output (F12)

4. **What You Expected:**
   - What should have happened

---

## ✅ Verification Steps

**To confirm everything is working:**

```bash
# 1. Check Node.js
node --version      # Should show v18.x.x or higher
npm --version       # Should show 9.x.x or higher

# 2. Check project files
ls package.json     # Should exist
ls src              # Should exist

# 3. Install dependencies
npm install         # Should complete without errors

# 4. Start server
npm run dev         # Should show "VITE ready in XXX ms"

# 5. Open browser
# Go to: http://localhost:5173/
# Should see: Login page with logo

# 6. Test login
# Use: manager / manager123
# Should see: Manager dashboard

# 7. Check console
# Press F12
# Should have: No red errors
```

**If all steps pass: ✅ System is working correctly!**

---

## 📝 Common Error Messages Decoded

### "Cannot read property of undefined"
**Meaning:** Trying to access data that doesn't exist
**Fix:** Check data structure, add null checks

### "Failed to compile"
**Meaning:** Syntax error in code
**Fix:** Read error message for file and line number

### "Module not found"
**Meaning:** Missing dependency or wrong import path
**Fix:** Run `npm install` or fix import path

### "Network request failed"
**Meaning:** Can't connect to server
**Fix:** Make sure `npm run dev` is running

### "ERR_CONNECTION_REFUSED"
**Meaning:** Server not accessible
**Fix:** Check server is running, use correct port

---

**Remember: Most issues are fixed by:**
1. Reading error messages carefully
2. Checking browser console (F12)
3. Restarting the dev server
4. Hard refreshing the browser (Ctrl+Shift+R)
5. Clearing cache and reinstalling (`npm install`)

**Good luck! 🍀**
