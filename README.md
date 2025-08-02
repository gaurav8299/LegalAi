# LegalAI India

## Overview

LegalAI India is a comprehensive web application that provides AI-powered legal consultation services specifically tailored for Indian law. The platform offers instant legal guidance across multiple practice areas including Family Law (Hindu Marriage Act, Muslim Personal Law), Property Law, Employment Law (Indian Labour Laws), Criminal Law (IPC, CrPC), Business Law (Companies Act, GST), and Consumer Law (Consumer Protection Act). 

Beyond AI consultations, the platform includes a complete Legal Resources Hub featuring:
- **Indian Legal Forms**: Downloadable templates for divorce petitions, property sale deeds, employment contracts, company registration documents, consumer complaints, and criminal complaints (FIR)
- **Indian Law Guides**: Comprehensive guides covering major Indian acts like Hindu Marriage Act, Companies Act 2013, Labour Laws, Consumer Protection Act, and CrPC
- **Indian Case Law Database**: Searchable collection of landmark Supreme Court and High Court cases with filtering by legal category
- **Legal Articles & Insights**: Expert analysis on current Indian legal topics including new criminal laws (BNS, BNSS, BSA), GST compliance, women's property rights, and data protection

Users can interact with an AI assistant specialized in Indian legal framework to get professional legal advice, access comprehensive legal resources, view consultation history, and submit contact requests for qualified Indian advocates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses React with TypeScript for the frontend, implementing a single-page application (SPA) architecture. The UI is built with shadcn/ui components and styled using Tailwind CSS with custom legal-themed color variables. The routing is handled by Wouter for lightweight client-side navigation.

**Key Frontend Components:**
- **Header/Navigation**: Sticky navigation with smooth scrolling to sections including Legal Resources
- **Hero Section**: Landing area with call-to-action buttons and background imagery
- **AI Chat Interface**: Real-time chat interface for legal consultations with message history, quick question buttons, and demo mode support
- **Legal Categories**: Visual grid showcasing different legal practice areas
- **Legal Resources Hub**: Comprehensive resource center with four main sections:
  - Indian Legal Forms with downloadable templates
  - Indian Law Guides with detailed act explanations
  - Indian Case Law database with search and filtering
  - Legal Articles with expert insights on current topics
- **Contact Section**: Form for users to request human legal consultation
- **Resources Section**: FAQ accordion and legal resource links

### Backend Architecture
The backend is built with Express.js and TypeScript, following a RESTful API design pattern. The server handles AI integration, data storage, and client-server communication.

**API Endpoints:**
- `POST /api/consultations` - Submit legal questions and receive AI responses
- `GET /api/consultations` - Retrieve consultation history
- `POST /api/contact` - Submit contact requests for human consultation

### Data Storage Solutions
The application uses a dual storage approach:
- **Development**: In-memory storage with TypeScript interfaces for rapid development
- **Production**: PostgreSQL database with Drizzle ORM for type-safe database operations

**Database Schema:**
- **Users table**: User authentication and profile management
- **Consultations table**: AI consultation history with questions, responses, categories, and confidence scores
- **Contact Requests table**: User inquiries for human legal representation

### State Management
React Query (TanStack Query) handles server state management, caching, and API interactions. Local component state is managed with React hooks for UI interactions and form handling.

### Authentication System
Basic user authentication structure is implemented but currently supports anonymous consultations. The system is designed to easily integrate user registration and login features.

## External Dependencies

### AI Integration
- **OpenAI GPT-4o**: Primary AI service for generating Indian legal advice responses
- **API Configuration**: Structured prompts specialized for Indian legal system, categorization and confidence scoring
- **Response Format**: JSON-structured responses with Indian legal disclaimers and Bar Council of India references

### Database Services
- **Neon Database**: PostgreSQL hosting service for production deployments
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries
- **Connection Management**: Environment-based database URL configuration

### UI Framework
- **shadcn/ui**: Comprehensive React component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom legal theme variables
- **Radix UI**: Accessible component primitives for complex UI elements

### Development Tools
- **Vite**: Fast build tool and development server with React plugin
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

### Third-Party Services
- **Form Validation**: Zod schema validation for API requests and form data
- **Date Handling**: date-fns library for timestamp formatting and manipulation