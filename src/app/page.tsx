'use client'

import { useState } from 'react'

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { STATES } from '@/lib/utils'
import { Search, Users, Shield, MessageSquare, BarChart3, MapPin } from 'lucide-react'
import Link from 'next/link'

// Kentucky high schools for testing
const KENTUCKY_SCHOOLS = [
  { id: 1, name: 'Ryle High School', city: 'Union', county: 'Boone' },
  { id: 2, name: 'Boone County High School', city: 'Florence', county: 'Boone' },
  { id: 3, name: 'Conner High School', city: 'Hebron', county: 'Boone' },
  { id: 4, name: 'Cooper High School', city: 'Union', county: 'Boone' },
  { id: 5, name: 'Covington Catholic High School', city: 'Park Hills', county: 'Kenton' },
  { id: 6, name: 'Beechwood High School', city: 'Fort Mitchell', county: 'Kenton' },
  { id: 7, name: 'Dixie Heights High School', city: 'Edgewood', county: 'Kenton' },
  { id: 8, name: 'Highlands High School', city: 'Fort Thomas', county: 'Campbell' },
  { id: 9, name: 'Campbell County High School', city: 'Alexandria', county: 'Campbell' },
  { id: 10, name: 'Bishop Brossart High School', city: 'Alexandria', county: 'Campbell' },
  { id: 11, name: 'Scott High School', city: 'Taylor Mill', county: 'Kenton' },
  { id: 12, name: 'Simon Kenton High School', city: 'Independence', county: 'Kenton' },
  { id: 13, name: 'Walton-Verona High School', city: 'Walton', county: 'Boone' },
  { id: 14, name: 'Ludlow High School', city: 'Ludlow', county: 'Kenton' },
  { id: 15, name: 'Villa Madonna Academy', city: 'Villa Hills', county: 'Kenton' }
]

export default function HomePage() {
  const [selectedState, setSelectedState] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showKentuckySchools, setShowKentuckySchools] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<any>(null)

  // Handle state selection and show Kentucky schools
  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode)
    setSelectedSchool(null)
    
    if (stateCode === 'KY') {
      setShowKentuckySchools(true)
      setSearchQuery('')
    } else {
      setShowKentuckySchools(false)
      setSearchQuery('')
    }
  }

  // Handle school selection and start registration
  const handleSchoolSelect = (school: any) => {
    setSelectedSchool(school)
    setSearchQuery(school.name)
  }

  // Start registration process
  const handleStartRegistration = () => {
    if (selectedSchool) {
      // Redirect to student registration page with school info
      window.location.href = `/student/register?school=${encodeURIComponent(selectedSchool.name)}&city=${encodeURIComponent(selectedSchool.city)}&county=${encodeURIComponent(selectedSchool.county)}`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">goHuddleUp</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                Privacy
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                Admin Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Your School&apos;s
            <span className="text-blue-600"> FCA Huddle</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with other student athletes, grow in faith, and make a difference in your school community through Fellowship of Christian Athletes.
          </p>

          {/* School Selector */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Find Your School
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <Select value={selectedState} onValueChange={handleStateChange}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 !bg-white !text-gray-900">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-lg !bg-white !text-gray-900">
                      {STATES.map((state) => (
                        <SelectItem key={state.code} value={state.code} className="text-gray-900 hover:bg-blue-50 focus:bg-blue-50 !text-gray-900">
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search for your school..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 !bg-white !text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Kentucky Schools List */}
              {showKentuckySchools && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Select Your Kentucky High School
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {KENTUCKY_SCHOOLS.map((school) => (
                      <button
                        key={school.id}
                        onClick={() => handleSchoolSelect(school)}
                        className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                          selectedSchool?.id === school.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">{school.name}</div>
                            <div className="text-sm text-gray-500">{school.city}, {school.county} County</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {selectedSchool ? (
                <Button 
                  onClick={handleStartRegistration}
                  className="w-full mt-6" 
                  size="lg"
                >
                  Continue to Registration - {selectedSchool.name}
                </Button>
              ) : (
                <Button className="w-full" size="lg" disabled>
                  {showKentuckySchools ? 'Select a school to continue' : 'Find My School'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join FCA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FCA huddles provide a safe space for student athletes to grow spiritually, build relationships, and develop leadership skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Connect with like-minded student athletes who share your values and faith.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Safe Environment
              </h3>
              <p className="text-gray-600">
                A secure, moderated space where students can share and grow together.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Communication
              </h3>
              <p className="text-gray-600">
                Stay connected with your huddle leaders and receive important updates.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Leadership
              </h3>
              <p className="text-gray-600">
                Develop leadership skills and make a positive impact in your school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of student athletes who are already part of FCA huddles across the country.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Find Your School Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">goHuddleUp</h3>
              <p className="text-gray-400">
                Connecting student athletes through Fellowship of Christian Athletes.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About FCA</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/admin" className="hover:text-white">Admin Access</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Notice</Link></li>
                <li><Link href="/data-use" className="hover:text-white">Data Use Policy</Link></li>
                <li><Link href="/consent" className="hover:text-white">Parent Consent</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 goHuddleUp. All rights reserved. Powered by Fellowship of Christian Athletes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
