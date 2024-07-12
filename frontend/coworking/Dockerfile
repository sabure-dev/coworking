# Use an official Node.js image as the base image
FROM node:16

WORKDIR /frontend

# Copy the package.json file
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will use
EXPOSE 3000

# Run the command to start the development server
CMD ["npm", "run", "dev"]
