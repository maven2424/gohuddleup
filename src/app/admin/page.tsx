'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Eye, EyeOff, Crown, School, Globe } from 'lucide-react'
import Link from 'next/link'
import { signInAdmin } from '@/lib/auth'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { user, userData } = await signInAdmin(email, password)
      
      if (user && userData) {
        toast.success(`Welcome, ${userData.role} Admin!`)
        router.push('/admin/dashboard')
      }
    } catch (error: unknown) {
      console.error('Login error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-4xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            goHuddleUp
          </Link>
          <div className="mt-8">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Portal</h2>
            <p className="mt-3 text-lg text-gray-600">
              Secure access for FCA staff and administrators
            </p>
          </div>
        </div>

        {/* Admin Types Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Access Levels</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Crown className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-900">Super Admin</p>
                <p className="text-xs text-purple-600">Full system access & control</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Globe className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">State/Regional Admin</p>
                <p className="text-xs text-blue-600">Multi-school management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <School className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">School Admin</p>
                <p className="text-xs text-green-600">Single school operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors text-gray-900 bg-white placeholder-gray-500"
                placeholder="admin@gohuddleup.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-2 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 px-4 pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors text-gray-900 bg-white placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Access Admin Portal</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact your system administrator
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
