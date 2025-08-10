# goHuddleUp - FCA Student Enrollment Platform

A secure web application for Fellowship of Christian Athletes (FCA) staff to collect, manage, and monitor student enrollment for multi-sport huddles across schools.

## 🚀 Features

### For Students
- **Multi-step registration process** with personal info, parent/guardian details, and ministry data
- **School selection** with state/region filtering
- **Parent consent workflow** via secure email links
- **Student dashboard** to track registration status
- **Secure messaging** with authorized admins

### For Administrators
- **Role-based access control** (Super, State, Regional, School Admin)
- **Comprehensive dashboards** with real-time statistics
- **Student management** with filtering and export capabilities
- **Parent consent monitoring** and follow-up tools
- **In-app messaging system** with moderation features
- **Reporting and analytics** with CSV/Excel export

### Security & Compliance
- **Row Level Security (RLS)** for data protection
- **Parent consent verification** for minor protection
- **Audit logging** for all admin actions
- **FERPA-compliant** data handling
- **TCPA-compliant** SMS opt-in

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form, Zod validation
- **Deployment**: Vercel (Frontend), Supabase Cloud (Backend)

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- A Supabase account (free tier available)
- A Vercel account (free tier available)
- Git installed

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Navigate to the project directory
cd gohuddleup

# Install dependencies
npm install
```

### 2. Set Up Supabase

1. **Create a new Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Set up the database**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the entire contents of `supabase-schema.sql`
   - Execute the script

3. **Configure authentication**:
   - Go to Authentication > Settings
   - Enable email confirmations
   - Set up email templates for parent consent

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cudyhjzkgfwznxmerhyw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1ZHloanprZ2Z3em54bWVyaHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDQ5OTgsImV4cCI6MjA2Njg4MDk5OH0.eSJ1WggEREMvOP__tRBkCf92UqjbLX-zamIEA4Be2mQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1ZHloanprZ2Z3em54bWVyaHl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTMwNDk5OCwiZXhwIjoyMDY2ODgwOTk4fQ.ZCxcxNJTj4QVFB7AnSDiUffblZZyjkBo9eo1lX-FrI0

# Email Configuration (for parent consent emails)
RESEND_API_KEY=re_PaxgPHx6_8cKLBo6W7Hgso96yfwFsYxhC

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Email Service (Optional but Recommended)

For parent consent emails, we recommend using Resend:

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key**
3. **Add it to your environment variables**

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄 Database Schema

The application uses a comprehensive database schema with the following key tables:

- **users**: User accounts and authentication
- **students**: Student registration data
- **parents**: Parent/guardian information
- **consents**: Parent consent tracking
- **ministry_data**: Spiritual/ministry information
- **schools/huddles**: School and huddle management
- **role_assignments**: Role-based access control
- **message_threads/messages**: In-app messaging system

## 🔐 Role-Based Access Control

The application implements a hierarchical RBAC system:

- **Super Admin**: Full access to all data and functions
- **State Admin**: Access to all schools in their state
- **Regional Admin**: Access to schools in their region
- **School Admin**: Access to students in their school
- **Student**: Access to their own data only

## 📧 Parent Consent Workflow

1. Student completes registration form
2. System generates unique consent token
3. Email sent to parent with secure consent link
4. Parent clicks link and provides consent
5. Student status updated to "Approved"
6. Student gains access to huddle features

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**
2. **Connect your repository to Vercel**
3. **Add environment variables in Vercel dashboard**
4. **Deploy**

### Deploy to Production

1. **Update environment variables** with production URLs
2. **Set up custom domain** (optional)
3. **Configure email templates** for production
4. **Set up monitoring and analytics**

## 📊 Admin Dashboard Features

### School Admin Dashboard
- View student roster with consent status
- Export student data to CSV
- Manage huddle enrollments
- Send messages to students
- View ministry data (with proper permissions)

### Regional/State Admin Dashboard
- Overview of all schools in scope
- Aggregated statistics and reports
- Consent completion tracking
- Sport participation breakdown
- Regional messaging capabilities

### Super Admin Dashboard
- User and role management
- School and huddle CRUD operations
- Global statistics and reporting
- System-wide message moderation
- Audit log review

## 🔒 Security Features

- **Row Level Security (RLS)** on all sensitive tables
- **JWT-based authentication** via Supabase Auth
- **Parent consent verification** for data access
- **Audit logging** for all admin actions
- **Rate limiting** on public forms
- **Content filtering** for messaging system

## 📱 Messaging System

The in-app messaging system includes:
- **Real-time messaging** via Supabase Realtime
- **Thread-based conversations** between students and admins
- **File attachments** with size/type restrictions
- **Message moderation** and flagging system
- **Read receipts** and typing indicators
- **Parent CC options** for transparency

## 📈 Reporting and Analytics

Available reports include:
- **Student enrollment trends**
- **Consent completion rates**
- **Sport participation breakdown**
- **Ministry data analytics**
- **Messaging engagement metrics**
- **Regional performance comparisons**

## 🛠 Development

### Project Structure

```
gohuddleup/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and config
│   └── types/               # TypeScript type definitions
├── supabase-schema.sql      # Database schema
└── README.md               # This file
```

### Key Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Contact the development team
- Submit an issue on GitHub

## 🎯 Next Steps

To make this a fully functioning live app:

1. **Complete Supabase setup** with the provided schema
2. **Configure email service** for parent consent
3. **Set up production environment** variables
4. **Deploy to Vercel** and Supabase
5. **Add your schools and regions** to the database
6. **Create admin accounts** with appropriate roles
7. **Test the complete workflow** end-to-end
8. **Set up monitoring** and error tracking
9. **Configure backups** and disaster recovery
10. **Train your staff** on the admin interface

## 🔄 Updates and Maintenance

- **Regular security updates** for dependencies
- **Database backups** via Supabase
- **Performance monitoring** and optimization
- **Feature updates** based on user feedback
- **Compliance reviews** for data protection

---

**Built with ❤️ for Fellowship of Christian Athletes**
