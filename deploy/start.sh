#!/bin/bash
# Stacka Frontend Startup Script

# Install production dependencies only
npm install --production

# Start the Next.js server
PORT=3000 npm start
