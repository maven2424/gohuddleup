'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  School, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalStudents: number
  pendingConsent: number
  activeHuddles: number
  totalSchools: number
  newThisWeek: number
  messagesUnread: number
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalStudents: 1247,
    pendingConsent: 89,
    activeHuddles: 156,
    totalSchools: 89,
    newThisWeek: 23,
    messagesUnread: 12
  })

  const recentStudents = [
    { id: 1, name: 'Sarah Johnson', school: 'Lincoln High', grade: '11th Grade', status: 'Pending Consent', date: '2024-01-15' },
    { id: 2, name: 'Michael Chen', school: 'Riverside Academy', grade: '10th Grade', status: 'Approved', date: '2024-01-14' },
    { id: 3, name: 'Emily Rodriguez', school: 'Central High', grade: '12th Grade', status: 'Pending Consent', date: '2024-01-13' },
    { id: 4, name: 'David Thompson', school: 'Westside Prep', grade: '9th Grade', status: 'Approved', date: '2024-01-12' },
  ]

  const recentMessages = [
    { id: 1, from: 'Sarah Johnson', subject: 'Question about upcoming event', time: '2 hours ago', unread: true },
    { id: 2, from: 'Coach Williams', subject: 'Weekly huddle update', time: '1 day ago', unread: false },
    { id: 3, from: 'Regional Director', subject: 'Monthly report due', time: '2 days ago', unread: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                goHuddleUp
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Consent</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingConsent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <School className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Huddles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeHuddles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.messagesUnread}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link href="/admin/students">
                  <Users className="h-6 w-6" />
                  <span>Manage Students</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link href="/admin/schools">
                  <School className="h-6 w-6" />
                  <span>Manage Schools</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link href="/admin/messages">
                  <MessageSquare className="h-6 w-6" />
                  <span>Messages</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link href="/admin/reports">
                  <BarChart3 className="h-6 w-6" />
                  <span>Reports</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Students */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/students">
                  View All
                </Link>
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.school} • {student.grade}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {student.status === 'Approved' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      )}
                      <span className={`text-sm ${
                        student.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/messages">
                  View All
                </Link>
              </Button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className={`p-4 border border-gray-200 rounded-lg ${
                    message.unread ? 'bg-blue-50 border-blue-200' : ''
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{message.from}</p>
                        <p className="text-sm text-gray-600">{message.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{message.time}</p>
                        {message.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 ml-auto"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-lg shadow mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Growth Report</h3>
                <p className="text-sm text-gray-600 mb-4">Student enrollment trends</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/reports/growth">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-4 mb-4">
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Consent Report</h3>
                <p className="text-sm text-gray-600 mb-4">Parent consent status</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/reports/consent">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-lg p-4 mb-4">
                  <FileText className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Student Roster</h3>
                <p className="text-sm text-gray-600 mb-4">Complete student list</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/reports/roster">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
