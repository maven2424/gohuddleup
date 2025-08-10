# 🖥️ Cursor Setup Guide - goHuddleUp

This guide will help you set up Cursor IDE for optimal development of your goHuddleUp application.

## 🔗 **Connect Cursor to GitHub**

### **Step 1: Sign in to GitHub in Cursor**
1. **Open Cursor**
2. **Go to Settings** (Cmd/Ctrl + ,)
3. **Click "GitHub"** in the left sidebar
4. **Click "Sign in with GitHub"**
5. **Authorize Cursor** to access your account

### **Step 2: Open Your Project**
1. **File → Open Folder**
2. **Navigate to**: `/Users/jedwilson/GoHuddleUp/gohuddleup`
3. **Click "Open"**

## 🚀 **Recommended Extensions**

Cursor will automatically suggest these extensions when you open the project:

### **Essential Extensions**
- ✅ **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- ✅ **Prettier** - Code formatting
- ✅ **ESLint** - Code linting
- ✅ **TypeScript** - Type checking
- ✅ **GitLens** - Enhanced Git features
- ✅ **GitHub Copilot** - AI code assistance

### **Install Extensions**
1. **Cmd/Ctrl + Shift + X** to open Extensions
2. **Search for each extension** and install
3. **Restart Cursor** if prompted

## ⚙️ **Workspace Settings**

The project includes optimized settings for:
- **Auto-formatting** on save
- **Tailwind CSS** autocomplete
- **TypeScript** configuration
- **Git** integration

## 🔧 **Development Workflow**

### **1. Start Development Server**
```bash
npm run dev
```

### **2. Make Changes**
- Edit files in Cursor
- Use AI assistance (Cmd/Ctrl + K)
- Preview changes at `http://localhost:3000`

### **3. Commit Changes**
- **Source Control panel** (Cmd/Ctrl + Shift + G)
- **Stage changes** and commit
- **Push to GitHub**

### **4. Deploy**
- **Push to main branch** → automatic Vercel deployment
- **Create pull requests** for features

## 🎯 **Cursor AI Features**

### **Chat with AI**
- **Cmd/Ctrl + L** - Open AI chat
- **Ask questions** about your code
- **Get help** with debugging

### **Code Generation**
- **Cmd/Ctrl + K** - Generate code
- **Describe what you want** to build
- **AI will suggest** implementation

### **Code Explanation**
- **Select code** and ask AI to explain
- **Get documentation** suggestions
- **Learn best practices**

## 📁 **Project Structure**

```
gohuddleup/
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities and config
│   └── types/               # TypeScript types
├── .vscode/                 # Cursor/VS Code settings
├── supabase-schema.sql      # Database schema
└── README.md               # Project documentation
```

## 🔍 **Useful Cursor Shortcuts**

- **Cmd/Ctrl + P** - Quick file search
- **Cmd/Ctrl + Shift + P** - Command palette
- **Cmd/Ctrl + G** - Go to line
- **Cmd/Ctrl + D** - Select next occurrence
- **Cmd/Ctrl + L** - AI chat
- **Cmd/Ctrl + K** - AI code generation

## 🚀 **Deployment Integration**

### **Automatic Deployments**
1. **Make changes** in Cursor
2. **Commit and push** to GitHub
3. **Vercel automatically** deploys
4. **Your partners** see updates immediately

### **Preview Deployments**
1. **Create feature branch**
2. **Push changes**
3. **Create pull request**
4. **Vercel creates** preview URL

## 🆘 **Troubleshooting**

### **Extensions Not Working**
- **Restart Cursor**
- **Check extension settings**
- **Update extensions**

### **Git Issues**
- **Check GitHub connection** in settings
- **Verify Git credentials**
- **Use terminal** for complex Git operations

### **AI Not Responding**
- **Check internet connection**
- **Verify AI service** is active
- **Restart Cursor**

## 🎉 **You're Ready!**

Your Cursor setup is now optimized for:
- ✅ **Next.js development**
- ✅ **TypeScript support**
- ✅ **Tailwind CSS** autocomplete
- ✅ **Git integration**
- ✅ **AI assistance**
- ✅ **Automatic deployment**

---

**Happy coding! 🚀**


