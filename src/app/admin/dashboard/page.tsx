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
  BarChart3
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                goHuddleUp
              </Link>
              <span className="ml-4 text-sm text-gray-500">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {userData.role} Admin
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
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
          <h1 className="text-3xl font-bold text-gray-900">
            FCA Huddle Management Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your FCA huddles, students, and communications
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                +0% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Huddles</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Across all schools
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Upcoming
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <span>Add Student</span>
              </CardTitle>
              <CardDescription>
                Register a new student to your FCA huddle
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5 text-green-600" />
                <span>Manage Huddles</span>
              </CardTitle>
              <CardDescription>
                View and manage your FCA huddles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <span>Send Message</span>
              </CardTitle>
              <CardDescription>
                Communicate with students and parents
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest updates and activities in your FCA huddles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity to display</p>
              <p className="text-sm mt-2">Start by adding students or creating events</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
