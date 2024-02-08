# Build stage
# FROM node:alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm install --only=development && \
# 	npm run build

# # Runtime stage
# FROM node:alpine
# WORKDIR /app
# COPY --from=builder /app/dist /app/dist
# CMD ["npm", "start"]

FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i
CMD ["npm", "start"]