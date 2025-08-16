'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  School, 
  Shield, 
  Heart, 
  Star, 
  Calendar, 
  Users, 
  Target, 
  BookOpen, 
  Award,
  MapPin,
  Phone,
  Mail,
  Church,
  Car,
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type Student = Database['public']['Tables']['students']['Row']
type MinistryData = Database['public']['Tables']['ministry_data']['Row']
type Parent = Database['public']['Tables']['parents']['Row']
type FCAEvent = Database['public']['Tables']['fca_events']['Row']
type StudentAchievement = Database['public']['Tables']['student_achievements']['Row']
type StudentAttendance = Database['public']['Tables']['student_attendance']['Row']

export default function StudentDashboardPage() {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [ministryData, setMinistryData] = useState<MinistryData | null>(null)
  const [parents, setParents] = useState<Parent[]>([])
  const [fcaEvents, setFcaEvents] = useState<FCAEvent[]>([])
  const [achievements, setAchievements] = useState<StudentAchievement[]>([])
  const [attendance, setAttendance] = useState<StudentAttendance[]>([])
  const [fcaStats, setFcaStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/student/login')
        return
      }

      await Promise.all([
        loadStudentData(user.id),
        loadMinistryData(user.id),
        loadParentData(user.id),
        loadFCAEvents(user.id),
        loadAchievements(user.id),
        loadAttendance(user.id),
        loadFCAStats(user.id)
      ])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      router.push('/student/login')
    } finally {
      setIsLoading(false)
    }
  }

  const loadStudentData = async (userId: string) => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        schools (
          name,
          regions (
            name,
            states (
              name,
              code
            )
          )
        ),
        huddles (
          name
        )
      `)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error loading student data:', error)
      return
    }

    setStudent(data)
  }

  const loadMinistryData = async (userId: string) => {
    const { data, error } = await supabase
      .from('ministry_data')
      .select('*')
      .eq('student_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading ministry data:', error)
      return
    }

    setMinistryData(data)
  }

  const loadParentData = async (userId: string) => {
    const { data, error } = await supabase
      .from('parents')
      .select('*')
      .eq('student_id', userId)

    if (error) {
      console.error('Error loading parent data:', error)
      return
    }

    setParents(data || [])
  }

  const loadFCAEvents = async (userId: string) => {
    const { data, error } = await supabase
      .from('student_event_registrations')
      .select(`
        *,
        fca_events (
          name,
          description,
          event_type,
          start_date,
          end_date,
          location
        )
      `)
      .eq('student_id', userId)

    if (error) {
      console.error('Error loading FCA events:', error)
      return
    }

    setFcaEvents(data?.map(reg => reg.fca_events) || [])
  }

  const loadAchievements = async (userId: string) => {
    const { data, error } = await supabase
      .from('student_achievements')
      .select('*')
      .eq('student_id', userId)
      .order('date_earned', { ascending: false })

    if (error) {
      console.error('Error loading achievements:', error)
      return
    }

    setAchievements(data || [])
  }

  const loadAttendance = async (userId: string) => {
    const { data, error } = await supabase
      .from('student_attendance')
      .select('*')
      .eq('student_id', userId)
      .order('meeting_date', { ascending: false })

    if (error) {
      console.error('Error loading attendance:', error)
      return
    }

    setAttendance(data || [])
  }

  const loadFCAStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_fca_statistics', { student_uuid: userId })

      if (error) {
        console.error('Error loading FCA stats:', error)
        return
      }

      setFcaStats(data?.[0] || null)
    } catch (error) {
      console.error('Error calling FCA stats function:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your FCA dashboard...</p>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Profile Not Found</h2>
          <p className="text-gray-600 mb-6">Please complete your profile setup first.</p>
          <Button onClick={() => router.push('/student/profile')} className="bg-blue-600 hover:bg-blue-700">
            Complete Profile
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {student.preferred_name || student.first_name}!
          </h1>
          <p className="text-gray-600">
            Your FCA journey dashboard - track your growth, achievements, and involvement
          </p>
        </div>

        {/* FCA Statistics Overview */}
        {fcaStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Total FCA Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fcaStats.total_points}</div>
                <p className="text-xs opacity-75">Keep growing in faith!</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Meetings Attended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fcaStats.meetings_attended}</div>
                <p className="text-xs opacity-75">Consistent participation</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Events Registered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fcaStats.events_registered}</div>
                <p className="text-xs opacity-75">Active involvement</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Service Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fcaStats.community_service_hours}</div>
                <p className="text-xs opacity-75">Serving others</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info & Ministry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{student.first_name} {student.last_name}</p>
                  </div>
                  {student.preferred_name && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Preferred Name</p>
                      <p className="text-gray-900">{student.preferred_name}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Grade</p>
                    <p className="text-gray-900">{student.grade}</p>
                  </div>
                  {student.graduation_year && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Graduation Year</p>
                      <p className="text-gray-900">{student.graduation_year}</p>
                    </div>
                  )}
                  {student.gpa && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">GPA</p>
                      <p className="text-gray-900">{student.gpa}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">School</p>
                    <p className="text-gray-900">{student.schools?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">FCA Huddle</p>
                    <p className="text-gray-900">{student.huddles?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ministry & Faith Journey */}
            {ministryData && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-blue-600" />
                    <span>Ministry & Faith Journey</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Church</p>
                      <p className="text-gray-900">{ministryData.church_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Relationship to Christ</p>
                      <p className="text-gray-900">{ministryData.relationship_to_christ}</p>
                    </div>
                    {ministryData.spiritual_maturity_level && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Spiritual Maturity</p>
                        <p className="text-gray-900">{ministryData.spiritual_maturity_level}</p>
                      </div>
                    )}
                    {ministryData.prayer_partner && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Prayer Partner</p>
                        <p className="text-gray-900">{ministryData.prayer_partner}</p>
                      </div>
                    )}
                    {ministryData.bible_study_group && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bible Study Group</p>
                        <p className="text-gray-900">{ministryData.bible_study_group}</p>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-500">Ministry Interests</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {ministryData.leadership_interest && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Leadership</span>
                        )}
                        {ministryData.camp_interest && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Camp</span>
                        )}
                        {ministryData.worship_team_involvement && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Worship Team</span>
                        )}
                        {ministryData.evangelism_training && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Evangelism</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Achievements */}
            {achievements.length > 0 && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.slice(0, 5).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{achievement.title}</p>
                          <p className="text-sm text-gray-600">{achievement.achievement_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{new Date(achievement.date_earned).toLocaleDateString()}</p>
                          <p className="text-xs text-blue-600">+{achievement.points_awarded} pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming FCA Events */}
            {fcaEvents.length > 0 && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span>Upcoming FCA Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fcaEvents.slice(0, 3).map((event, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{event.name}</p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{new Date(event.start_date).toLocaleDateString()}</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{event.event_type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Actions & Additional Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => router.push('/student/profile')}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Events
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Bible Study
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Find Huddle
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{student.mobile}</span>
                </div>
                {student.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-900">
                      <p>{student.address.street}</p>
                      <p>{student.address.city}, {student.address.state} {student.address.zip}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            {student.emergency_contact_name && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-gray-900">{student.emergency_contact_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{student.emergency_contact_phone}</p>
                  </div>
                  {student.emergency_contact_relationship && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Relationship</p>
                      <p className="text-gray-900">{student.emergency_contact_relationship}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Medical Information */}
            {(student.medical_conditions || student.allergies || student.dietary_restrictions) && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {student.medical_conditions && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Medical Conditions</p>
                      <p className="text-gray-900">{student.medical_conditions}</p>
                    </div>
                  )}
                  {student.allergies && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Allergies</p>
                      <p className="text-gray-900">{student.allergies}</p>
                    </div>
                  )}
                  {student.dietary_restrictions && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Dietary Restrictions</p>
                      <p className="text-gray-900">{student.dietary_restrictions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


