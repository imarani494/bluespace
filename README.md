
Project Description

BlueSpace is a modern, feature-rich Todo Application built with React and Supabase, designed for efficiency, aesthetics, and real-time collaboration.
It allows users to securely sign up, log in, and manage their daily tasks through a beautifully responsive interface.

With real-time synchronization, dark/light themes, multi-language support, and insightful productivity analytics, BlueSpace provides a smooth and personalized task management experience for users across all devices


🔗 Project Links & Descriptions

🎥 Live Demo & Video Walkthrough

https://drive.google.com/file/d/1gpj2qpM3XBMQ5VoFW7O8U7w99tpgj0iH/view?usp=sharing


🌐 Live Deployed Application
https://bluespace-fawn.vercel.app/


Overview

BlueSpace is a modern, production-ready Todo application built with React, featuring:

Real-time synchronization via Supabase

Elegant UI/UX with glassmorphism and dark/light themes

Secure JWT authentication

Smart task management with analytics and localization


🔐 Authentication & Security

JWT-based Auth using Supabase

Persistent Sessions with token refresh

Protected Routes for authorized users

Encrypted Password Handling

🎨 UI/UX Highlights

🌗 Dual Themes (Light/Dark with smooth transition)

📱 Fully Responsive (Mobile-first)

💎 Glassmorphism Design

⚡ Smooth Animations

♿ Accessibility (Keyboard navigation, WCAG 2.1)


✅ Core Features

✏️ CRUD for tasks (Create, Read, Update, Delete)

🔄 Real-time sync across devices

📝 Rich text notes for each task

🔍 Smart search & filter

📊 Productivity dashboard with completion analytics

🌐 Multi-language Support

English 🇬🇧 & Hindi 🇮🇳

RTL-ready

Auto language preference storage


Tech Stack

Frontend: React 18, Vite, Tailwind CSS

Backend: Supabase (BaaS, real-time DB)

Tools: ESLint, PostCSS, React DevTools


# Clone the repo
git clone https://github.com/imarani494/bluespace.git
cd bluespace

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add Supabase credentials
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Run the app
npm run dev
