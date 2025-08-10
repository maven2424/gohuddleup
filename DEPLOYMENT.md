# 🚀 Deployment Guide - goHuddleUp

This guide will help you deploy your goHuddleUp application to the cloud so you and your partners can access it from anywhere.

## 🌐 **Option 1: Deploy to Vercel (Recommended)**

### **Why Vercel?**
- ✅ **Free tier** available
- ✅ **Automatic deployments** from GitHub
- ✅ **Perfect for Next.js** applications
- ✅ **Global CDN** for fast loading
- ✅ **SSL certificates** included
- ✅ **Custom domains** supported

### **Step 1: Push Code to GitHub**

1. **Create a GitHub repository**:
   ```bash
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit - goHuddleUp application"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it `gohuddleup`
   - Don't initialize with README (we already have one)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gohuddleup.git
   git branch -M main
   git push -u origin main
   ```

### **Step 2: Deploy to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### **Step 3: Set Environment Variables**

In your Vercel project dashboard:

1. **Go to Settings → Environment Variables**
2. **Add these variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://cudyhjzkgfwznxmerhyw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1ZHloanprZ2Z3em54bWVyaHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDQ5OTgsImV4cCI6MjA2Njg4MDk5OH0.eSJ1WggEREMvOP__tRBkCf92UqjbLX-zamIEA4Be2mQ
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   RESEND_API_KEY=your_resend_api_key_here
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   ```

### **Step 4: Deploy**

1. **Click "Deploy"**
2. **Wait for build to complete** (usually 2-3 minutes)
3. **Your app will be live** at `https://your-app-name.vercel.app`

## 🌐 **Option 2: Deploy to Netlify**

### **Alternative to Vercel**

1. **Go to [netlify.com](https://netlify.com)**
2. **Connect your GitHub repository**
3. **Set build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. **Add environment variables** (same as Vercel)
5. **Deploy**

## 🌐 **Option 3: Deploy to Railway**

### **Another Great Option**

1. **Go to [railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Railway will auto-detect Next.js**
4. **Add environment variables**
5. **Deploy**

## 🔧 **Post-Deployment Setup**

### **1. Update Supabase Settings**

1. **Go to your Supabase dashboard**
2. **Settings → API**
3. **Add your production URL** to allowed origins:
   ```
   https://your-app-name.vercel.app
   ```

### **2. Create Admin User**

1. **SSH into your deployment** or use Vercel's CLI:
   ```bash
   npm i -g vercel
   vercel login
   vercel env pull .env.local
   ```

2. **Run the admin creation script**:
   ```bash
   node create-admin.js
   ```

### **3. Set Up Custom Domain (Optional)**

1. **In Vercel dashboard**:
   - Go to Settings → Domains
   - Add your custom domain (e.g., `gohuddleup.com`)
   - Follow DNS setup instructions

2. **Update environment variables**:
   ```
   NEXT_PUBLIC_APP_URL=https://your-custom-domain.com
   ```

## 📊 **Monitoring & Analytics**

### **Vercel Analytics**
- **Built-in analytics** in Vercel dashboard
- **Performance monitoring**
- **Error tracking**

### **Google Analytics**
Add to your app for detailed insights.

## 🔒 **Security Checklist**

- ✅ **Environment variables** set in production
- ✅ **Supabase RLS** policies active
- ✅ **HTTPS** enabled (automatic with Vercel)
- ✅ **Custom domain** SSL certificate
- ✅ **Admin passwords** changed from defaults

## 🚀 **Performance Optimization**

### **Vercel Optimizations**
- **Automatic image optimization**
- **Edge caching**
- **Global CDN**
- **Automatic compression**

### **Next.js Optimizations**
- **Code splitting** (automatic)
- **Static generation** where possible
- **Image optimization** with `next/image`

## 📱 **Mobile Optimization**

Your app is already mobile-responsive with Tailwind CSS!

## 🔄 **Continuous Deployment**

### **Automatic Deployments**
- **Push to main branch** → automatic deployment
- **Preview deployments** for pull requests
- **Rollback** to previous versions

### **Environment Management**
- **Development**: `localhost:3000`
- **Staging**: `staging.your-app.vercel.app`
- **Production**: `your-app.vercel.app`

## 💰 **Costs**

### **Vercel Free Tier**
- **Unlimited deployments**
- **100GB bandwidth/month**
- **100GB storage**
- **Perfect for most use cases**

### **Paid Plans**
- **Pro**: $20/month for more bandwidth
- **Enterprise**: Custom pricing

## 🆘 **Troubleshooting**

### **Common Issues**

1. **Build Failures**:
   - Check environment variables
   - Verify all dependencies installed

2. **Database Connection**:
   - Ensure Supabase URL is correct
   - Check RLS policies

3. **Authentication Issues**:
   - Verify Supabase auth settings
   - Check redirect URLs

### **Support**
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)

## 🎉 **You're Live!**

Once deployed, your partners can access:
- **Main App**: `https://your-app.vercel.app`
- **Admin Login**: `https://your-app.vercel.app/admin`
- **Student Registration**: `https://your-app.vercel.app/register`

---

**Need help?** Check the troubleshooting section or contact support!
