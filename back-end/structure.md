# Backend Architecture & Structure Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
5. [Architecture Patterns](#architecture-patterns)
6. [Workflow & Data Flow](#workflow--data-flow)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [Error Handling Strategy](#error-handling-strategy)
10. [Configuration & Environment](#configuration--environment)
11. [Development Workflow](#development-workflow)
12. [Deployment Guide](#deployment-guide)

---

## 🎯 Project Overview

This is a **NestJS Backend API** for a **Create Website Management System** that allows users to:

- Submit create website ideas
- Generate AI-powered create website sections
- Manage and retrieve create website ideas
- Update and delete create website ideas

### Core Features

- ✅ RESTful API endpoints
- ✅ MongoDB integration with Mongoose
- ✅ AI-powered content generation
- ✅ Input validation and sanitization
- ✅ CORS configuration for frontend integration
- ✅ Error handling and logging
- ✅ TypeScript for type safety

---

## 🛠 Technology Stack

### Backend Framework

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment

### Database

- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling

### External Services

- **Azure AI Services** - For content generation
- **HTTP Client** - Axios for external API calls

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework

---

## 📁 Project Structure

```
back-end/
├── src/                          # Source code directory
│   ├── controllers/              # Request handlers
│   │   └── create-website.controller.ts
│   ├── dto/                      # Data Transfer Objects
│   │   └── create-website.dto.ts
│   ├── schemas/                  # Database schemas
│   │   └── create-website.schema.ts
│   ├── services/                 # Business logic
│   │   └── create-website.service.ts
│   ├── app.controller.ts         # Root controller
│   ├── app.module.ts            # Root module
│   ├── app.service.ts           # Root service
│   └── main.ts                  # Application entry point
├── architecture/                 # Documentation
│   └── structure.md             # This file
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── nest-cli.json               # Nest CLI configuration
├── eslint.config.mjs           # ESLint configuration
└── .env                        # Environment variables
```

### 🏗 Architecture Layers

```
┌─────────────────────────────────────┐
│           PRESENTATION LAYER        │
│         (Controllers)               │
├─────────────────────────────────────┤
│           BUSINESS LAYER            │
│           (Services)                │
├─────────────────────────────────────┤
│           DATA ACCESS LAYER         │
│         (Schemas/Models)            │
├─────────────────────────────────────┤
│           DATABASE LAYER            │
│           (MongoDB)                 │
└─────────────────────────────────────┘
```

---

## 🔧 Step-by-Step Implementation Guide

### Phase 1: Project Initialization

#### Step 1: Create NestJS Project

```bash
# Install Nest CLI globally
npm i -g @nestjs/cli

# Create new project
nest new project-name

# Navigate to project
cd back-end
```

#### Step 2: Install Core Dependencies

```bash
# Database dependencies
npm install @nestjs/mongoose mongoose

# Configuration
npm install @nestjs/config

# HTTP client
npm install @nestjs/axios axios

# Validation
npm install class-validator class-transformer

# Azure AI (for content generation)
npm install @azure-rest/ai-inference @azure/core-auth @azure/core-sse

# CORS
npm install cors @types/cors
```

#### Step 3: Install Development Dependencies

```bash
# TypeScript and linting
npm install -D typescript @types/node
npm install -D eslint @eslint/js typescript-eslint
npm install -D prettier eslint-plugin-prettier eslint-config-prettier

# Eslint
npm run lint
```

### Phase 2: Project Configuration

#### Step 4: Configure Environment Variables

Create `.env` file:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
GITHUB_TOKEN=your_github_token
PORT=3001
NODE_ENV=development
```

### Phase 3: Database Schema Design

#### Step 5: Create Database Schema

Create `src/schemas/create-website.schema.ts`:


### Phase 4: Data Transfer Objects

#### Step 6: Create DTOs for Validation

Create `src/dto/create-website.dto.ts`:


### Phase 5: Business Logic Implementation

#### Step 7: Create Service Layer

Create `src/services/create-website.service.ts`:


### Phase 6: Controller Implementation

#### Step 8: Create Controller Layer

Create `src/controllers/create-website.controller.ts`:


### Phase 7: Module Configuration

#### Step 9: Configure App Module

Update `src/app.module.ts`:


### Phase 8: Application Bootstrap

#### Step 10: Configure Main Entry Point

Update `src/main.ts`:

---

## 🏛 Architecture Patterns

### 1. **Dependency Injection Pattern**

- NestJS uses IoC (Inversion of Control) container
- Services are injected into controllers
- Promotes loose coupling and testability

### 2. **Repository Pattern**

- Mongoose models act as repositories
- Abstracts data access logic
- Enables easy testing with mocks

### 3. **DTO Pattern**

- Data Transfer Objects for request/response
- Input validation and transformation
- Type safety across application layers

### 4. **Service Layer Pattern**

- Business logic separated from controllers
- Reusable across different controllers
- Single responsibility principle

### 5. **Module Pattern**

- Feature-based module organization
- Encapsulation of related functionality
- Easy to scale and maintain

---

## 🔄 Workflow & Data Flow

### Request Flow Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │ Controller  │    │   Service   │    │  Database   │
│ (Frontend)  │    │             │    │             │    │ (MongoDB)   │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │                  │
       │ HTTP Request     │                  │                  │
       ├─────────────────►│                  │                  │
       │                  │                  │                  │
       │                  │ DTO Validation   │                  │
       │                  ├─────────────────►│                  │
       │                  │                  │                  │
       │                  │                  │ Database Query   │
       │                  │                  ├─────────────────►│
       │                  │                  │                  │
       │                  │                  │ Result           │
       │                  │                  │◄─────────────────┤
       │                  │                  │                  │
       │                  │ Formatted Response│                  │
       │                  │◄─────────────────┤                  │
       │                  │                  │                  │
       │ JSON Response    │                  │                  │
       │◄─────────────────┤                  │                  │
       │                  │                  │                  │
```

### Create Website Idea Workflow

1. **Request Reception**
   - Client sends POST request to `/api/website-ideas`
   - Request body contains `idea` and optional `userId`

2. **Input Validation**
   - DTO validates request structure
   - `class-validator` ensures data integrity
   - Transformation applied if needed

3. **Business Logic Execution**
   - Service receives validated DTO
   - AI content generation triggered
   - Fallback sections created if AI fails

4. **Database Operations**
   - New document created with generated sections
   - Mongoose saves to MongoDB
   - Timestamps automatically added

5. **Response Formation**
   - Success/error response formatted
   - Data serialized to JSON
   - HTTP status codes set appropriately

### Error Handling Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Error     │    │ Controller  │    │   Client    │
│  Occurs     │    │             │    │             │
└──────┬──────┘    └──────┬──────┘    └──────┬──────┘
       │                  │                  │
       │ Exception        │                  │
       ├─────────────────►│                  │
       │                  │                  │
       │                  │ Catch & Format   │
       │                  ├─────────────────►│
       │                  │                  │
       │                  │ Error Response   │
       │                  ├─────────────────►│
       │                  │                  │
```

---

## 🌐 API Endpoints

### Base URL: `http://localhost:3001`

### 1. Create Website Idea

```http
POST /api/website-ideas
Content-Type: application/json

{
  "idea": "E-commerce platform for handmade crafts",
  "userId": "user123" |"anonymous" // optional
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "64f8a9b1c234567890abcdef",
    "idea": "E-commerce platform for handmade crafts",
    "userId": "user123",
    "sections": [
      {
        "name": "Hero Section",
        "description": "Main landing section",
        "content": "Welcome to our handmade crafts marketplace",
        "order": 1
      }
    ],
    "status": "completed",
    "createdAt": "2023-09-06T12:00:00.000Z",
    "updatedAt": "2023-09-06T12:00:00.000Z"
  },
  "message": "Website idea created successfully"
}
```

### 2. Get All Website Ideas

```http
GET /api/website-ideas
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a9b1c234567890abcdef",
      "idea": "E-commerce platform for handmade crafts",
      "sections": [...],
      "status": "completed",
      "createdAt": "2023-09-06T12:00:00.000Z"
    }
  ],
  "message": "Website ideas retrieved successfully"
}
```

### 3. Get Single Website Idea

```http
GET /api/website-ideas/:id
```

---

## 🗃 Database Schema

### MongoDB Collections

#### WebsiteIdeas Collection

```javascript
{
  _id: ObjectId("64f8a9b1c234567890abcdef"),
  idea: "E-commerce platform for handmade crafts",
  userId: "user123",
  sections: [
    {
      name: "Hero Section",
      description: "Main landing section for the website",
      content: "Welcome to our handmade crafts marketplace",
      order: 1
    },
    {
      name: "About Section",
      description: "Information about our company",
      content: "We connect artisans with customers worldwide",
      order: 2
    }
  ],
  status: "completed",
  createdAt: ISODate("2023-09-06T12:00:00.000Z"),
  updatedAt: ISODate("2023-09-06T12:00:00.000Z")
}
```

### Schema Constraints

- `idea`: Required string (max 500 characters)
- `userId`: Optional string (default: "anonymous")
- `sections`: Array of section objects
- `status`: Enum ["pending", "in-progress", "completed"]
- `timestamps`: Automatically managed by Mongoose

---

## ⚠️ Error Handling Strategy

### Error Types & HTTP Status Codes

| Error Type       | HTTP Status | Description                  |
| ---------------- | ----------- | ---------------------------- |
| Validation Error | 400         | Invalid request data         |
| Not Found        | 404         | Resource doesn't exist       |
| Database Error   | 500         | MongoDB operation failed     |
| AI Service Error | 503         | External service unavailable |

### Error Response Format

```json
{
  "success": false,
  "message": "Detailed error description",
  "statusCode": 400,
  "timestamp": "2023-09-06T12:00:00.000Z",
  "path": "/api/website-ideas"
}
```

---

## ⚙️ Configuration & Environment

### Environment Variables

```env
# Database Configuration
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database

# Server Configuration
PORT=3001
NODE_ENV=development

# External Services
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# AI Services (if using)
AZURE_AI_ENDPOINT=https://your-endpoint.azure.com
AZURE_AI_KEY=your-azure-key
```

---

## 🔄 Development Workflow

### 1. Local Development Setup

```bash
# Clone repository
git clone <repository-url>
cd back-end

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run start:dev
```

### 2. Code Quality Workflow

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

### 3. Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request
# Code review
# Merge to main
```

### 4. Available Scripts

| Script        | Command                                 | Description              |
| ------------- | --------------------------------------- | ------------------------ |
| `start`       | `nest start`                            | Start production server  |
| `start:dev`   | `nest start --watch`                    | Start development server |
| `start:debug` | `nest start --debug --watch`            | Start with debugging     |
| `build`       | `nest build`                            | Build for production     |
| `test`        | `jest`                                  | Run unit tests           |
| `test:e2e`    | `jest --config ./test/jest-e2e.json`    | Run e2e tests            |
| `lint`        | `eslint "{src,apps,libs,test}/**/*.ts"` | Lint code                |
| `format`      | `prettier --write "src/**/*.ts"`        | Format code              |

---

## 🚀 Deployment Guide

### 1. Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### 2. Environment-Specific Configurations

#### Development

```typescript
export const config = {
  database: {
    uri: process.env.MONGO_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
  logging: {
    level: 'debug',
  },
};
```

#### Production

```typescript
export const config = {
  database: {
    uri: process.env.MONGO_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    },
  },
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  logging: {
    level: 'warn',
  },
};
```

---

## 📝 Changelog & Versioning

### Version 1.0.0 (Current)

- ✅ Basic CRUD operations for website ideas
- ✅ MongoDB integration with Mongoose
- ✅ Input validation with class-validator
- ✅ AI content generation (basic implementation)
- ✅ Error handling and logging
- ✅ CORS configuration

### Planned Features (v2.0.0)

- 🔄 Database Optimizations (like pagenation)
- 🔄 User authentication and authorization
- 🔄 Advanced AI integration
- 🔄 File upload functionality
- 🔄 Email notifications
- 🔄 Analytics and reporting
- 🔄 Update Website Idea
- 🔄 Delete Website Idea
- 🔄 Apply Testing Strategy
- 🔄 Add Caching Strategy & Rate Limiting
- 🔄 Environment Security
- 🔄 More options for Deployment (like docker)

---
