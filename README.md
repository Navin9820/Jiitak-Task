 LookMeals Admin Dashboard
A comprehensive admin dashboard for managing users, winners, and analytics for the LookMeals application.

📋 Table of Contents
Project Overview
Features
Tech Stack
Getting Started
Project Structure
Available Scripts
Environment Variables
Deployment
Contributing

🎯 Project Overview
The LookMeals Admin Dashboard is a Next.js application that provides administrators with tools to manage users, track analytics, and oversee the LookMeals platform. It includes user management, winner selection, admin controls, and comprehensive analytics dashboards.

✨ Features
Authentication
Secure login system
Password management
Session handling
Dashboard
Real-time analytics and metrics
User registration statistics
Active user tracking
Retention rate monitoring
Gender and age distribution charts
Search and lottery usage analytics
User Management
View all registered users
Search and filter capabilities
User details management
Registration date tracking
Winner Management
Select and manage contest winners
Winner history tracking
Admin Management
Administrator account management
Role-based access control

🛠 Tech Stack
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
UI Components: shadcn/ui
Icons: Lucide React
Charts: Chart.js with react-chartjs-2
State Management: React Hooks
Notifications: react-hot-toast
Deployment: Vercel

🚀 Getting Started
Prerequisites
Node.js 18.17 or later
npm or yarn
Installation
Clone the repository:
bash
git clone https://github.com/your-username/lookmeals-admin.git
cd lookmeals-admin
Install dependencies:
bash
npm install
# or
yarn install
Create a .env.local file in the root directory and add your environment variables (see Environment Variables )
Run the development server:
bash
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser

📁 Project Structure

src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── set-password/
│   ├── dashboard/         # Dashboard page
│   ├── users/             # User management
│   ├── winners/           # Winner management
│   ├── admin/             # Admin management
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx         # Header component
│   ├── PasswordInput.tsx  # Password input component
│   └── ...
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
└── public/                # Static assets
    ├── images/
    └── favicon.ico
▶️ Available Scripts
npm run dev - Starts the development server
npm run build - Builds the application for production
npm start - Starts the production server
npm run lint - Runs ESLint
npm run format - Formats code with Prettier

🔐 Environment Variables
Create a .env.local file in the root directory with the following variables:
# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# API Keys
NEXT_PUBLIC_API_URL=your_api_url
🌐 Deployment
Vercel (Recommended)
Push your code to a GitHub repository
Sign up for Vercel
Create a new project and import your repository
Set up environment variables in the Vercel dashboard
Deploy!
Other Platforms
The application can also be deployed to:

Netlify
AWS Amplify
Firebase Hosting
Docker containers

🤝 Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Code Style
Follow the existing code style
Use TypeScript for type safety
Write meaningful commit messages
Ensure all tests pass before submitting PR

🙏 Acknowledgments
Next.js
shadcn/ui
Tailwind CSS
Chart.js
Lucide Icons

📞 Support
For support, email support@lookmeals.com or open an issue in the repository.

Happy Coding! 🚀