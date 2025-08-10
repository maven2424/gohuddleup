'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GRADES, SHIRT_SIZES, STATES } from '@/lib/utils'
import { ArrowLeft, ArrowRight, User, Shield, Heart } from 'lucide-react'
import Link from 'next/link'

interface StudentData {
  // Page 1 - Personal Info
  firstName: string
  lastName: string
  email: string
  mobile: string
  smsOptIn: boolean
  grade: string
  shirtSize: string
  socialsInstagram: string
  socialsSnap: string
  socialsTiktok: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  
  // Page 2 - Parent Info
  parentName1: string
  parentName2: string
  parentPhone: string
  parentEmail: string
  parentAddress: {
    street: string
    city: string
    state: string
    zip: string
  }
  parentWorkplace: string
  
  // Page 3 - Ministry Data
  churchName: string
  relationshipToJesus: 'YES' | 'NO' | 'INTERESTED' | ''
  ownsBible: boolean | null
  campAttended: boolean | null
  campInterest: boolean | null
  leadershipInterest: boolean | null
  sports: string[]
}

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [studentData, setStudentData] = useState<StudentData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    smsOptIn: false,
    grade: '',
    shirtSize: '',
    socialsInstagram: '',
    socialsSnap: '',
    socialsTiktok: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    parentName1: '',
    parentName2: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    parentWorkplace: '',
    churchName: '',
    relationshipToJesus: '',
    ownsBible: null,
    campAttended: null,
    campInterest: null,
    leadershipInterest: null,
    sports: []
  })

  const updateStudentData = (field: keyof StudentData, value: any) => {
    setStudentData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateAddress = (field: keyof StudentData['address'], value: string) => {
    setStudentData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const updateParentAddress = (field: keyof StudentData['parentAddress'], value: string) => {
    setStudentData(prev => ({
      ...prev,
      parentAddress: {
        ...prev.parentAddress,
        [field]: value
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // TODO: Submit to Supabase
    console.log('Submitting student data:', studentData)
    router.push('/register/success')
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={studentData.firstName}
            onChange={(e) => updateStudentData('firstName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={studentData.lastName}
            onChange={(e) => updateStudentData('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={studentData.email}
            onChange={(e) => updateStudentData('email', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="mobile">Mobile Phone</Label>
          <Input
            id="mobile"
            type="tel"
            value={studentData.mobile}
            onChange={(e) => updateStudentData('mobile', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="smsOptIn"
          checked={studentData.smsOptIn}
          onChange={(e) => updateStudentData('smsOptIn', e.target.checked)}
          className="rounded"
        />
        <Label htmlFor="smsOptIn">I agree to receive SMS notifications from FCA</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="grade">Grade *</Label>
          <Select value={studentData.grade} onValueChange={(value) => updateStudentData('grade', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your grade" />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="shirtSize">T-Shirt Size</Label>
          <Select value={studentData.shirtSize} onValueChange={(value) => updateStudentData('shirtSize', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select shirt size" />
            </SelectTrigger>
            <SelectContent>
              {SHIRT_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Address</Label>
        <div className="space-y-4">
          <Input
            placeholder="Street Address"
            value={studentData.address.street}
            onChange={(e) => updateAddress('street', e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="City"
              value={studentData.address.city}
              onChange={(e) => updateAddress('city', e.target.value)}
            />
            <Select value={studentData.address.state} onValueChange={(value) => updateAddress('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="ZIP Code"
              value={studentData.address.zip}
              onChange={(e) => updateAddress('zip', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <Label>Social Media (Optional)</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Instagram username"
            value={studentData.socialsInstagram}
            onChange={(e) => updateStudentData('socialsInstagram', e.target.value)}
          />
          <Input
            placeholder="Snapchat username"
            value={studentData.socialsSnap}
            onChange={(e) => updateStudentData('socialsSnap', e.target.value)}
          />
          <Input
            placeholder="TikTok username"
            value={studentData.socialsTiktok}
            onChange={(e) => updateStudentData('socialsTiktok', e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Parent/Guardian Information</h2>
        <p className="text-gray-600">We need to contact your parent or guardian for consent</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="parentName1">Parent/Guardian Name 1 *</Label>
          <Input
            id="parentName1"
            value={studentData.parentName1}
            onChange={(e) => updateStudentData('parentName1', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="parentName2">Parent/Guardian Name 2</Label>
          <Input
            id="parentName2"
            value={studentData.parentName2}
            onChange={(e) => updateStudentData('parentName2', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="parentPhone">Phone Number *</Label>
          <Input
            id="parentPhone"
            type="tel"
            value={studentData.parentPhone}
            onChange={(e) => updateStudentData('parentPhone', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="parentEmail">Email Address *</Label>
          <Input
            id="parentEmail"
            type="email"
            value={studentData.parentEmail}
            onChange={(e) => updateStudentData('parentEmail', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="parentWorkplace">Workplace (Optional)</Label>
        <Input
          id="parentWorkplace"
          value={studentData.parentWorkplace}
          onChange={(e) => updateStudentData('parentWorkplace', e.target.value)}
        />
      </div>

      <div>
        <Label>Parent/Guardian Address (if different from student)</Label>
        <div className="space-y-4">
          <Input
            placeholder="Street Address"
            value={studentData.parentAddress.street}
            onChange={(e) => updateParentAddress('street', e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="City"
              value={studentData.parentAddress.city}
              onChange={(e) => updateParentAddress('city', e.target.value)}
            />
            <Select value={studentData.parentAddress.state} onValueChange={(value) => updateParentAddress('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="ZIP Code"
              value={studentData.parentAddress.zip}
              onChange={(e) => updateParentAddress('zip', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Ministry Information</h2>
        <p className="text-gray-600">Help us understand your spiritual journey</p>
      </div>

      <div>
        <Label htmlFor="churchName">Do you go to church?</Label>
        <Input
          id="churchName"
          placeholder="Church name (if yes) or leave blank if no"
          value={studentData.churchName}
          onChange={(e) => updateStudentData('churchName', e.target.value)}
        />
      </div>

      <div>
        <Label>Do you have a personal relationship with Jesus?</Label>
        <Select value={studentData.relationshipToJesus} onValueChange={(value: 'YES' | 'NO' | 'INTERESTED') => updateStudentData('relationshipToJesus', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YES">Yes</SelectItem>
            <SelectItem value="NO">No</SelectItem>
            <SelectItem value="INTERESTED">Interested in learning more</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="ownsBible"
            checked={studentData.ownsBible === true}
            onChange={(e) => updateStudentData('ownsBible', e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="ownsBible">Do you own a Bible?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="campAttended"
            checked={studentData.campAttended === true}
            onChange={(e) => updateStudentData('campAttended', e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="campAttended">Have you attended FCA leadership camp?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="campInterest"
            checked={studentData.campInterest === true}
            onChange={(e) => updateStudentData('campInterest', e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="campInterest">Are you interested in attending next summer?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="leadershipInterest"
            checked={studentData.leadershipInterest === true}
            onChange={(e) => updateStudentData('leadershipInterest', e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="leadershipInterest">Are you interested in joining the FCA Student Leadership Team?</Label>
        </div>
      </div>

      <div>
        <Label>Do you play a sport? (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {['Baseball', 'Basketball', 'Cross Country', 'Football', 'Golf', 'Lacrosse', 'Soccer', 'Softball', 'Swimming', 'Tennis', 'Track & Field', 'Volleyball', 'Wrestling', 'Other'].map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={sport}
                checked={studentData.sports.includes(sport)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateStudentData('sports', [...studentData.sports, sport])
                  } else {
                    updateStudentData('sports', studentData.sports.filter(s => s !== sport))
                  }
                }}
                className="rounded"
              />
              <Label htmlFor={sport} className="text-sm">{sport}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              goHuddleUp
            </Link>
            <div className="text-sm text-gray-600">
              Step {currentStep} of 3
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-8 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center space-x-2"
              >
                <span>Submit Registration</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
