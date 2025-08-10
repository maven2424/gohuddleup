'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  School, 
  MessageSquare, 
  LogOut, 
  Plus,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  Database,
  Activity,
  Globe,
  UserPlus,
  FileText,
  Eye,
  Crown
} from 'lucide-react'
import Link from 'next/link'
import { signOut, getCurrentUser } from '@/lib/auth'
import toast from 'react-hot-toast'

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<unknown>(null)
  const [userData, setUserData] = useState<{ role?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user: currentUser, userData: currentUserData } = await getCurrentUser()
        if (!currentUser || !currentUserData) {
          router.push('/admin')
          return
        }
        setUser(currentUser)
        setUserData(currentUserData)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      router.push('/admin')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Error signing out')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !userData) {
    return null
  }

  const isSuperAdmin = userData.role === 'SUPER'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                goHuddleUp
              </Link>
              <div className="ml-4 flex items-center space-x-2">
                {isSuperAdmin ? (
                  <span className="text-sm text-purple-700 bg-purple-100 px-3 py-1 rounded-full flex items-center">
                    <Crown className="h-4 w-4 mr-1" />
                    Super Admin
                  </span>
                ) : (
                  <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
                    Admin Dashboard
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Welcome, {userData.role} Admin
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {isSuperAdmin ? 'Super Admin Command Center' : 'FCA Huddle Management Dashboard'}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {isSuperAdmin 
              ? 'Full system access and control for goHuddleUp platform management'
              : 'Manage your FCA huddles, students, and communications'
            }
          </p>
        </div>

        {/* Super Admin Stats Overview */}
        {isSuperAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
                <Users className="h-4 w-4 text-purple-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1,247</div>
                <p className="text-xs text-purple-200">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active Schools</CardTitle>
                <School className="h-4 w-4 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">89</div>
                <p className="text-xs text-blue-200">
                  Across 12 states
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">System Health</CardTitle>
                <Activity className="h-4 w-4 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <p className="text-xs text-green-200">
                  Uptime this month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Audit Logs</CardTitle>
                <FileText className="h-4 w-4 text-orange-200" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">2,847</div>
                <p className="text-xs text-orange-200">
                  Actions today
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Regular Admin Stats Overview */}
        {!isSuperAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Total Students</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <p className="text-xs text-gray-500">
                  +0% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Active Huddles</CardTitle>
                <School className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">4</div>
                <p className="text-xs text-gray-500">
                  Across all schools
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <p className="text-xs text-gray-500">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Events</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">0</div>
                <p className="text-xs text-gray-500">
                  Upcoming
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Super Admin Quick Actions */}
        {isSuperAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <UserPlus className="h-5 w-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Create, edit, and manage admin users and roles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Database className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span>System Settings</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configure platform settings and integrations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Eye className="h-5 w-5 text-green-600 group-hover:text-green-700 transition-colors" />
                  <span>Audit Logs</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Review system activity and security logs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Globe className="h-5 w-5 text-orange-600 group-hover:text-orange-700 transition-colors" />
                  <span>Global Analytics</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  View platform-wide statistics and insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Shield className="h-5 w-5 text-red-600 group-hover:text-red-700 transition-colors" />
                  <span>Security Center</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Monitor security threats and access controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Settings className="h-5 w-5 text-gray-600 group-hover:text-gray-700 transition-colors" />
                  <span>Advanced Config</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Advanced system configuration options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Regular Admin Quick Actions */}
        {!isSuperAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span>Add Student</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Register a new student to your FCA huddle
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <School className="h-5 w-5 text-green-600" />
                  <span>Manage Huddles</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  View and manage your FCA huddles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <span>Send Message</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Communicate with students and parents
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Recent Activity */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isSuperAdmin 
                ? 'Latest system-wide updates and administrative activities'
                : 'Latest updates and activities in your FCA huddles'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity to display</p>
              <p className="text-sm mt-2">
                {isSuperAdmin 
                  ? 'Start by managing users or reviewing system settings'
                  : 'Start by adding students or creating events'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
