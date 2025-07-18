# AI Website Studio 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Transform your ideas into professional websites with AI-powered generation**

A modern full-stack web application that leverages artificial intelligence to generate complete, responsive landing pages from simple user ideas. Built with cutting-edge technologies and professional development practices.

## ✨ Key Features

- 🤖 **AI-Powered Generation** - Transform simple ideas into complete website sections
- 🎨 **Modern UI/UX** - Professional interface built with Shadcn/UI and Tailwind CSS
- 📱 **Responsive Design** - Mobile-first approach with perfect device adaptation
- ⚡ **Real-time Preview** - Live website preview with instant updates
- 💾 **Code Export** - Download complete HTML/CSS files
- 🔧 **Type Safety** - Full TypeScript implementation across the stack
- 🚀 **Production Ready** - Scalable architecture with professional deployment practices

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     AI Website Studio                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │    Frontend     │◄────────────►│     Backend         │   │
│  │                 │              │                     │   │
│  │ • Next.js 15.4  │   REST API   │ • NestJS 11.0       │   │
│  │ • React 19.1    │              │ • TypeScript        │   │
│  │ • TypeScript    │              │ • MongoDB           │   │
│  │ • Tailwind CSS  │              │ • Mongoose          │   │
│  │ • Shadcn/UI     │              │ • AI Integration    │   │
│  │ • React Query   │              │ • Validation        │   │
│  └─────────────────┘              └─────────────────────┘   │
│           │                                 │               │
│           │                                 │               │
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │   User Browser  │              │    Database         │   │
│  │                 │              │                     │   │
│  │ • Responsive UI │              │ • MongoDB Atlas     │   │
│  │ • PWA Support   │              │ • Cloud Storage     │   │
│  │ • Fast Loading  │              │ • Auto Scaling     │    │
│  └─────────────────┘              └─────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 15.4.1 with App Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4.x + Shadcn/UI
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend

- **Framework**: NestJS 11.0
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Class Validator + Class Transformer
- **AI Services**: Azure AI Integration
- **HTTP Client**: Axios
- **Configuration**: Environment-based config

### Development Tools

- **Language**: TypeScript 5.x
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Testing**: Jest
- **Package Manager**: npm

## 📁 Project Structure

```
get-sections/
├── 📁 front-end/                 # React/Next.js Frontend
│   ├── 📁 src/
│   │   ├── 📁 app/               # Next.js App Router
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── page.tsx          # Home page
│   │   │   └── providers.tsx     # React providers
│   │   ├── 📁 components/        # React components
│   │   │   ├── 📁 ui/            # Shadcn/UI components
│   │   │   ├── 📁 form/          # Form components
│   │   │   ├── 📁 dashboard/     # Dashboard features
│   │   │   └── 📁 layout/        # Layout components
│   │   ├── 📁 hooks/             # Custom React hooks
│   │   ├── 📁 lib/               # Utilities & API client
│   │   └── 📁 validations/       # Form validation schemas
│   ├── 📄 package.json
│   └── 📄 next.config.ts
├── 📁 back-end/                  # NestJS Backend API
│   ├── 📁 src/
│   │   ├── 📁 controllers/       # Request handlers
│   │   ├── 📁 services/          # Business logic
│   │   ├── 📁 dto/              # Data transfer objects
│   │   ├── 📁 schemas/          # Database schemas
│   │   ├── app.module.ts        # Root module
│   │   └── main.ts              # Entry point
│   ├── 📄 package.json
│   └── 📄 nest-cli.json
└── 📄 README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohamedammar2729/get-sections.git
   cd get-sections
   ```

2. **Setup Backend**

   ```bash
   cd back-end
   npm install

   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration

   # Start development server
   npm run start:dev
   ```

3. **Setup Frontend** (in a new terminal)

   ```bash
   cd front-end
   npm install

   # Create environment file
   cp .env.local.example .env.local
   # Edit .env.local with your configuration

   # Start development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Environment Configuration

#### Backend (.env)

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
GITHUB_TOKEN=your_github_token
PORT=3001
NODE_ENV=development
AZURE_AI_ENDPOINT=https://your-endpoint.azure.com
AZURE_AI_KEY=your-azure-key
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🔧 API Documentation

### Base URL: `http://localhost:3001`

#### Create Website Idea

```http
POST /api/website-ideas
Content-Type: application/json

{
  "idea": "E-commerce platform for handmade crafts",
  "userId": "user123" // optional
}
```

#### Get All Website Ideas

```http
GET /api/website-ideas
```

#### Get Single Website Idea

```http
GET /api/website-ideas/:id
```

### Response Format

```json
{
  "success": true,
  "data": {
    "_id": "64f8a9b1c234567890abcdef",
    "idea": "E-commerce platform for handmade crafts",
    "sections": [
      {
        "name": "Hero Section",
        "description": "Main landing section",
        "content": "Welcome to our marketplace",
        "order": 1
      }
    ],
    "status": "completed",
    "createdAt": "2024-07-18T12:00:00.000Z"
  },
  "message": "Website idea created successfully"
}
```

## 🎯 Key Features Deep Dive

### AI-Powered Website Generation

- Transform simple text ideas into complete website sections
- Intelligent content generation with fallback mechanisms
- Professional design patterns and responsive layouts

### Modern UI/UX Design

- **Component Library**: 40+ Shadcn/UI components
- **Design System**: Consistent spacing, typography, and color schemes
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Accessibility**: WCAG 2.1 compliant components

### Real-time Preview System

- Live website preview with instant updates
- Device simulation capabilities
- Interactive element testing

### Professional Development Practices

- **Type Safety**: Full TypeScript implementation
- **Code Quality**: ESLint and Prettier configuration
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Performance**: Optimized bundle size and loading strategies

## 📊 Development Workflow

### Available Scripts

#### Frontend

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

#### Backend

```bash
npm run start:dev    # Start development server with watch
npm run start:prod   # Start production server
npm run build        # Build for production
npm run test         # Run unit tests
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request for code review
```

## 🧪 Testing Strategy

### Frontend Testing

- **Unit Tests**: Component testing with Jest and React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end user workflow testing

### Backend Testing

- **Unit Tests**: Service and controller testing
- **Integration Tests**: Database and API endpoint testing
- **E2E Tests**: Complete API workflow testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment Guide

### Production Build

#### Frontend (Vercel/Netlify)

```bash
npm run build
npm run start
```

#### Backend (Railway/Heroku/DigitalOcean)

```bash
npm run build
npm run start:prod
```

### Environment Variables for Production

- Set up MongoDB Atlas connection
- Configure CORS for production domain
- Set up SSL certificates
- Configure environment-specific logging

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

## 📈 Performance Optimizations

### Frontend Optimizations

- **Code Splitting**: Automatic route-based splitting with Next.js
- **Image Optimization**: Next.js built-in image optimization
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching Strategy**: React Query with intelligent caching

### Backend Optimizations

- **Database Indexing**: Optimized MongoDB queries
- **Response Compression**: Gzip compression for API responses
- **Rate Limiting**: Protection against API abuse
- **Connection Pooling**: Efficient database connections

## 🔒 Security Considerations

### Frontend Security

- **Content Security Policy**: XSS protection
- **Input Sanitization**: All user inputs validated and sanitized
- **HTTPS Only**: Secure connections in production

### Backend Security

- **Input Validation**: Class-validator for all DTOs
- **CORS Configuration**: Restricted cross-origin requests
- **Environment Variables**: Sensitive data protection
- **Error Handling**: No sensitive information in error responses

## 🗺️ Roadmap

### Version 1.0.0 (Current - July 2025)

- ✅ AI-Powered Website Generation
- ✅ Professional UI/UX with Shadcn/UI
- ✅ Real-time Preview System
- ✅ Code Export Functionality
- ✅ Responsive Design
- ✅ TypeScript Implementation

### Version 2.0.0 (Planned)

- 🔄 **Enhanced AI Capabilities**: Multi-section generation with advanced AI
- 🔄 **User Authentication**: Complete user management system
- 🔄 **Advanced Design Features**: Custom themes and design templates
- 🔄 **Development Tools**: Integrated code editor with live editing
- 🔄 **Analytics Dashboard**: Usage analytics and popular features tracking
- 🔄 **One-Click Deployment**: Direct deployment to Vercel/Netlify
- 🔄 **CRUD Operations**: Update and delete functionality for website ideas
- 🔄 **Multi-language Support**: Internationalization features


## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Code Style Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add appropriate documentation

## 🙏 Acknowledgments

- **Shadcn/UI** for the excellent component library
- **Next.js** team for the amazing React framework
- **NestJS** for the powerful Node.js framework
- **Vercel** for hosting and deployment platform
- **MongoDB** for the flexible database solution

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/mohamedammar2729/get-sections)
- **Discussions**: [GitHub Discussions](https://github.com/mohamedammar2729/get-sections)
- **Email**: [mohamedammar2729@gmail.com](mailto:mohamedammar2729@gmail.com)

---

<div align="center">

**Built with ❤️ by [Mohamed Ammar](https://github.com/mohamedammar2729)**

⭐ Star this repository if you find it helpful!

</div>
