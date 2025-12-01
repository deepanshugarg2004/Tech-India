# Debug Guide - Blank Page Issue

## Step 1: Check Browser Console
1. Open browser (Brave/Chrome)
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for **RED ERRORS**
5. Copy the exact error message

## Step 2: Check Terminal
Look at the terminal where you ran `npm run dev`:
- Are there any error messages?
- Does it say "ready" or are there warnings?

## Step 3: Test Minimal Version
If the full app doesn't work, test with minimal version:

1. **Backup current App.jsx:**
   ```bash
   cd client/src
   mv App.jsx App.full.jsx
   mv App.minimal.jsx App.jsx
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **If minimal version works:**
   - The issue is in one of the components
   - Check browser console for which component is failing

4. **Restore full app:**
   ```bash
   mv App.jsx App.minimal.jsx
   mv App.full.jsx App.jsx
   ```

## Step 4: Common Issues

### Issue 1: Missing Dependencies
**Solution:**
```bash
cd client
npm install
```

### Issue 2: Import Errors
**Check:**
- All component files exist in `src/Components/`
- All exports match imports
- No typos in file names

### Issue 3: Image Import Errors
**Solution:**
- Check if images exist in `src/assets/`
- If images are missing, the app will show fallback placeholders

### Issue 4: CSS Not Loading
**Check:**
- `index.css` exists
- Tailwind is properly configured

## Step 5: Get Error Details
**Please share:**
1. Browser console errors (F12 → Console tab)
2. Terminal output when running `npm run dev`
3. Any specific error messages

This will help identify the exact issue!

