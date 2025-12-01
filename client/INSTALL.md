# Installation Instructions

## Quick Fix for Blank Page

If you're seeing a blank page, you need to install the dependencies first:

1. Open a terminal in the `client` directory
2. Run: `npm install`
3. Wait for installation to complete
4. Run: `npm run dev`

This will install `socket.io-client` and all other required dependencies.

## Full Setup

1. **Install Client Dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Install Server Dependencies:**
   ```bash
   cd ../server
   npm install
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```

4. **Start the Client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

The app should now work properly!

