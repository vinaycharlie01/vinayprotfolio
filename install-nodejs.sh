#!/bin/bash

# Portfolio Setup Script for Ubuntu
# This script installs Node.js and npm, then sets up the portfolio

echo "=========================================="
echo "Portfolio Website Setup for Ubuntu"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    echo "Please do not run as root. Run as regular user with sudo privileges."
    exit 1
fi

# Update package list
echo "Updating package list..."
sudo apt update

# Install Node.js and npm
echo ""
echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

# Verify installation
echo ""
echo "Verifying installation..."
node_version=$(node --version 2>/dev/null)
npm_version=$(npm --version 2>/dev/null)

if [ $? -eq 0 ]; then
    echo "✓ Node.js installed: $node_version"
    echo "✓ npm installed: $npm_version"
else
    echo "✗ Installation failed. Please install manually."
    exit 1
fi

# Navigate to frontend directory
echo ""
echo "Setting up frontend..."
cd frontend

# Install dependencies
echo "Installing project dependencies (this may take a few minutes)..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ Setup completed successfully!"
    echo "=========================================="
    echo ""
    echo "To start the development server, run:"
    echo "  cd frontend"
    echo "  npm start"
    echo ""
    echo "The portfolio will open at http://localhost:3000"
    echo ""
else
    echo "✗ Failed to install dependencies"
    exit 1
fi

# Made with Bob
