# Quick Fix Guide - Frontend Not Working

## Step 1: Install Dependencies
```bash
cd client
npm install
```

This will install all required packages including:
- socket.io-client
- react-router-dom
- framer-motion
- lucide-react
- axios
- tailwindcss

## Step 2: Check for Errors
After installing, run:
```bash
npm run dev
```

## Step 3: If Still Blank Page

### Check Browser Console (F12)
Look for any red errors in the console tab.

### Common Issues:

1. **Missing socket.io-client**: 
   - Run: `npm install socket.io-client`
   - The app will work without it, but real-time messaging won't work

2. **Import Errors**:
   - Check if all component files exist in `src/Components/`
   - Make sure all exports are correct

3. **CSS Not Loading**:
   - Check if `index.css` exists
   - Check if Tailwind is properly configured

## Step 4: Verify Files Exist
Make sure these files exist:
- ✅ `client/src/main.jsx`
- ✅ `client/src/App.jsx`
- ✅ `client/src/index.css`
- ✅ `client/src/Components/LandingPage.jsx`
- ✅ `client/index.html`

## Step 5: Clear Cache and Restart
```bash
# Stop the dev server (Ctrl+C)
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## If Still Not Working:
1. Check terminal for error messages
2. Check browser console (F12) for JavaScript errors
3. Make sure you're accessing `http://localhost:5173/` (not 5174 or other port)

