# LeafItToMe

# Setup

This project is split into two parts: server & client. Setup for both is detailed below.

## Server Setup

1. Ensure that all packages in the package.json are installed.
2. In the 'server' folder, add a .env file that contains a "JWT_PRIVATE_KEY" field with a provided key. I.E. JWT_PRIVATE_KEY=[key]
3. Ensure that you have a MongoDB database connected on port 27017. The database must be called "LeafItDB".

## Server Startup

1. Run 'cd server' in the terminal to make sure that you are in the right directory.
2. Run 'npm start' in the terminal to launch the server.\

## Client Setup

1. Ensure that all packages in the package.json are installed.
2. Ensure that the corresponding server is running on your current device.

## Client Startup

1. Run 'cd client' in the terminal to make sure that you are in the right directory.
2. Run 'npm start' in the terminal to launch the server.
