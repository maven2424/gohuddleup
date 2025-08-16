'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  User, 
  Lock, 
  School, 
  ArrowLeft, 
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Church,
  Heart,
  Users,
  BookOpen,
  Target,
  Calendar,
  Car,
  AlertTriangle,
  Star
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function EnhancedStudentRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  // Form data with all FCA-specific fields
  const [formData, setFormData] = useState({
    // Step 1: Account Setup
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    grade: '',
    graduationYear: '',
    gpa: '',
    
    // Step 3: FCA & Ministry Information
    churchName: '',
    relationship: '',
    ownsBible: false,
    campAttended: false,
    campInterest: false,
    leadershipInterest: false,
    spiritualMaturityLevel: '',
    prayerPartner: '',
    accountabilityPartner: '',
    bibleStudyGroup: '',
    worshipTeamInvolvement: false,
    evangelismTraining: false,
    discipleshipTraining: false,
    leadershipTraining: false,
    spiritualGifts: [] as string[],
    personalTestimony: '',
    familyFaithBackground: '',
    prayerRequests: '',
    spiritualGoals: '',
    
    // Step 4: Sports & Activities
    sports: [] as string[],
    academicInterests: [] as string[],
    careerInterests: [] as string[],
    leadershipPositions: [] as string[],
    communityServiceHours: '',
    
    // Step 5: School & Huddle
    schoolName: '',
    huddleName: '',
    
    // Step 6: Address & Contact
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    
    // Step 7: Emergency & Medical
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    medicalConditions: '',
    allergies: '',
    dietaryRestrictions: '',
    transportationNeeds: '',
    specialAccommodations: '',
    
    // Step 8: Parent/Guardian Information
    parent1Name: '',
    parent1Phone: '',
    parent1Email: '',
    parent1Relationship: '',
    parent1Occupation: '',
    parent1Employer: '',
    parent1ChurchAffiliation: '',
    parent1FCAInvolvement: false,
    parent1FCARole: '',
    
    parent2Name: '',
    parent2Phone: '',
    parent2Email: '',
    parent2Relationship: '',
    parent2Occupation: '',
    parent2Employer: '',
    parent2ChurchAffiliation: '',
    parent2FCAInvolvement: false,
    parent2FCARole: '',
    
    // Step 9: Consents & Preferences
    consentCommunications: false,
    consentPhotos: false,
    consentSocialMedia: false,
    consentMedicalTreatment: false,
    
    // Step 10: Social Media
    socials: {
      instagram: '',
      snapchat: '',
      tiktok: ''
    },
    
    // Step 11: Clothing Sizes
    shirtSize: '',
    tShirtSize: '',
    hoodieSize: '',
    
    // Step 12: Notes & Additional Info
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle URL parameters for pre-populated school data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const school = urlParams.get('school')
    const city = urlParams.get('city')
    const county = urlParams.get('county')
    
    if (school) {
      setFormData(prev => ({
        ...prev,
        schoolName: school,
        address: {
          ...prev.address,
          city: city || '',
          state: 'KY'
        }
      }))
    }
  }, [])

  const totalSteps = 12

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {}
    
    switch (stepNumber) {
      case 1: // Account Setup
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
        break
        
      case 2: // Personal Information
        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required'
        if (!formData.grade) newErrors.grade = 'Grade level is required'
        if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required'
        break
        
      case 3: // FCA & Ministry
        if (!formData.churchName) newErrors.churchName = 'Church name is required'
        if (!formData.relationship) newErrors.relationship = 'Relationship to Christ is required'
        break
        
      case 5: // School & Huddle
        if (!formData.schoolName) newErrors.schoolName = 'School name is required'
        if (!formData.huddleName) newErrors.huddleName = 'FCA huddle name is required'
        break
        
      case 6: // Address
        if (!formData.address.street) newErrors.street = 'Street address is required'
        if (!formData.address.city) newErrors.city = 'City is required'
        if (!formData.address.state) newErrors.state = 'State is required'
        if (!formData.address.zip) newErrors.zip = 'ZIP code is required'
        break
        
      case 7: // Emergency & Medical
        if (!formData.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required'
        if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = 'Emergency contact phone is required'
        break
        
      case 8: // Parent/Guardian
        if (!formData.parent1Name) newErrors.parent1Name = 'At least one parent/guardian name is required'
        if (!formData.parent1Phone) newErrors.parent1Phone = 'At least one parent/guardian phone is required'
        if (!formData.parent1Email) newErrors.parent1Email = 'At least one parent/guardian email is required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step) && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(step)) return
    
    setIsLoading(true)
    
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user record
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            role: 'STUDENT',
            status: 'PENDING',
          })

        if (userError) throw userError

        // Create student record with all the new fields
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            user_id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            preferred_name: formData.preferredName,
            email: formData.email,
            mobile: formData.mobile,
            grade: formData.grade,
            graduation_year: parseInt(formData.graduationYear),
            gpa: formData.gpa ? parseFloat(formData.gpa) : null,
            shirt_size: formData.shirtSize,
            t_shirt_size: formData.tShirtSize,
            hoodie_size: formData.hoodieSize,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            emergency_contact_name: formData.emergencyContactName,
            emergency_contact_phone: formData.emergencyContactPhone,
            emergency_contact_relationship: formData.emergencyContactRelationship,
            medical_conditions: formData.medicalConditions,
            allergies: formData.allergies,
            dietary_restrictions: formData.dietaryRestrictions,
            transportation_needs: formData.transportationNeeds,
            special_accommodations: formData.specialAccommodations,
            academic_interests: formData.academicInterests,
            career_interests: formData.careerInterests,
            leadership_positions: formData.leadershipPositions,
            community_service_hours: formData.communityServiceHours ? parseInt(formData.communityServiceHours) : 0,
            socials_instagram: formData.socials.instagram,
            socials_snap: formData.socials.snapchat,
            socials_tiktok: formData.socials.tiktok,
            address: formData.address,
            notes: formData.notes,
            // Note: school_id will need to be set by an admin or through a lookup process
          })

        if (studentError) throw studentError

        // Create ministry data record
        const { error: ministryError } = await supabase
          .from('ministry_data')
          .insert({
            student_id: authData.user.id, // This should be the student ID, not user ID
            church_name: formData.churchName,
            relationship: formData.relationship,
            owns_bible: formData.ownsBible,
            camp_attended: formData.campAttended,
            camp_interest: formData.campInterest,
            leadership_interest: formData.leadershipInterest,
            spiritual_maturity_level: formData.spiritualMaturityLevel,
            prayer_partner: formData.prayerPartner,
            accountability_partner: formData.accountabilityPartner,
            bible_study_group: formData.bibleStudyGroup,
            worship_team_involvement: formData.worshipTeamInvolvement,
            evangelism_training: formData.evangelismTraining,
            discipleship_training: formData.discipleshipTraining,
            leadership_training: formData.leadershipTraining,
            spiritual_gifts: formData.spiritualGifts,
            personal_testimony: formData.personalTestimony,
            family_faith_background: formData.familyFaithBackground,
            prayer_requests: formData.prayerRequests,
            spiritual_goals: formData.spiritualGoals,
          })

        if (ministryError) throw ministryError

        // Create parent records
        if (formData.parent1Name) {
          const { error: parent1Error } = await supabase
            .from('parents')
            .insert({
              student_id: authData.user.id, // This should be the student ID
              name1: formData.parent1Name,
              phone: formData.parent1Phone,
              email: formData.parent1Email,
              relationship_to_student: formData.parent1Relationship,
              occupation: formData.parent1Occupation,
              employer: formData.parent1Employer,
              church_affiliation: formData.parent1ChurchAffiliation,
              fca_involvement: formData.parent1FCAInvolvement,
              fca_role: formData.parent1FCARole,
              consent_for_communications: formData.consentCommunications,
              consent_for_photos: formData.consentPhotos,
              consent_for_social_media: formData.consentSocialMedia,
              consent_for_medical_treatment: formData.consentMedicalTreatment,
            })

          if (parent1Error) throw parent1Error
        }

        if (formData.parent2Name) {
          const { error: parent2Error } = await supabase
            .from('parents')
            .insert({
              student_id: authData.user.id, // This should be the student ID
              name1: formData.parent2Name,
              phone: formData.parent2Phone,
              email: formData.parent2Email,
              relationship_to_student: formData.parent2Relationship,
              occupation: formData.parent2Occupation,
              employer: formData.parent2Employer,
              church_affiliation: formData.parent2ChurchAffiliation,
              fca_involvement: formData.parent2FCAInvolvement,
              fca_role: formData.parent2FCARole,
              consent_for_communications: formData.consentCommunications,
              consent_for_photos: formData.consentPhotos,
              consent_for_social_media: formData.consentSocialMedia,
              consent_for_medical_treatment: formData.consentMedicalTreatment,
            })

          if (parent2Error) throw parent2Error
        }

        toast.success('Registration successful! Please check your email to verify your account.')
        router.push('/student/login')
      }
    } catch (error: unknown) {
      console.error('Registration error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string | boolean | string[], subfield?: string) => {
    if (subfield) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [subfield]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[] || []
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] }
      } else {
        return { ...prev, [field]: currentArray.filter(item => item !== value) }
      }
    })
  }

  const getStepTitle = (stepNumber: number) => {
    const titles = {
      1: 'Account Setup',
      2: 'Personal Information',
      3: 'FCA & Ministry',
      4: 'Sports & Activities',
      5: 'School & Huddle',
      6: 'Address & Contact',
      7: 'Emergency & Medical',
      8: 'Parent/Guardian',
      9: 'Consents & Preferences',
      10: 'Social Media',
      11: 'Clothing Sizes',
      12: 'Notes & Additional Info'
    }
    return titles[stepNumber as keyof typeof titles] || ''
  }

  const getStepDescription = (stepNumber: number) => {
    const descriptions = {
      1: 'Create your account credentials',
      2: 'Tell us about yourself',
      3: 'Share your faith journey and ministry interests',
      4: 'Your sports and activity preferences',
      5: 'Connect with your FCA huddle',
      6: 'Your home address for FCA communications',
      7: 'Important safety and medical information',
      8: 'Parent or guardian contact information',
      9: 'Permissions and communication preferences',
      10: 'Connect with your FCA community',
      11: 'Clothing sizes for FCA events',
      12: 'Any additional information you\'d like to share'
    }
    return descriptions[stepNumber as keyof typeof descriptions] || ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors mb-2">
            <School className="h-8 w-8 mr-2" />
            goHuddleUp
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Enhanced Student Registration
          </h2>
          <p className="text-gray-600">
            Join your FCA huddle with a comprehensive profile for better ministry support
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-2 mb-8 overflow-x-auto">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
            <div key={stepNumber} className="flex items-center flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step >= stepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div className={`w-8 h-1 mx-1 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Registration Card */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {getStepTitle(step)}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {getStepDescription(step)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step content will be rendered here */}
            <div className="min-h-[400px]">
              {/* Step 1: Account Setup */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredName">Preferred Name</Label>
                      <Input
                        id="preferredName"
                        placeholder="What should we call you?"
                        value={formData.preferredName}
                        onChange={(e) => updateFormData('preferredName', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Phone *</Label>
                      <Input
                        id="mobile"
                        placeholder="Enter your mobile number"
                        value={formData.mobile}
                        onChange={(e) => updateFormData('mobile', e.target.value)}
                        className={errors.mobile ? 'border-red-500' : ''}
                      />
                      {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level *</Label>
                      <Select value={formData.grade} onValueChange={(value) => updateFormData('grade', value)}>
                        <SelectTrigger className={errors.grade ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.grade && <p className="text-sm text-red-600">{errors.grade}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Graduation Year *</Label>
                      <Select value={formData.graduationYear} onValueChange={(value) => updateFormData('graduationYear', value)}>
                        <SelectTrigger className={errors.graduationYear ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 4 }, (_, i) => new Date().getFullYear() + i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.graduationYear && <p className="text-sm text-red-600">{errors.graduationYear}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gpa">GPA (Optional)</Label>
                      <Input
                        id="gpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        placeholder="e.g., 3.75"
                        value={formData.gpa}
                        onChange={(e) => updateFormData('gpa', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: FCA & Ministry Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="churchName">Church Name *</Label>
                    <div className="relative">
                      <Church className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="churchName"
                        placeholder="What church do you attend?"
                        value={formData.churchName}
                        onChange={(e) => updateFormData('churchName', e.target.value)}
                        className={`pl-10 ${errors.churchName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.churchName && <p className="text-sm text-red-600">{errors.churchName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship to Christ *</Label>
                    <Select value={formData.relationship} onValueChange={(value) => updateFormData('relationship', value)}>
                      <SelectTrigger className={errors.relationship ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">I have accepted Christ as my Savior</SelectItem>
                        <SelectItem value="NO">I have not yet accepted Christ</SelectItem>
                        <SelectItem value="INTERESTED">I am interested in learning more</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.relationship && <p className="text-sm text-red-600">{errors.relationship}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="spiritualMaturityLevel">Spiritual Maturity Level</Label>
                      <Select value={formData.spiritualMaturityLevel} onValueChange={(value) => updateFormData('spiritualMaturityLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-believer">New Believer</SelectItem>
                          <SelectItem value="growing">Growing in Faith</SelectItem>
                          <SelectItem value="mature">Mature Believer</SelectItem>
                          <SelectItem value="leader">Spiritual Leader</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bibleStudyGroup">Bible Study Group</Label>
                      <Input
                        id="bibleStudyGroup"
                        placeholder="Are you part of a Bible study?"
                        value={formData.bibleStudyGroup}
                        onChange={(e) => updateFormData('bibleStudyGroup', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Ministry Interests & Experience</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ownsBible"
                          checked={formData.ownsBible}
                          onCheckedChange={(checked) => updateFormData('ownsBible', checked)}
                        />
                        <Label htmlFor="ownsBible">I own a Bible</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="campAttended"
                          checked={formData.campAttended}
                          onCheckedChange={(checked) => updateFormData('campAttended', checked)}
                        />
                        <Label htmlFor="campAttended">I have attended FCA camp</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="campInterest"
                          checked={formData.campInterest}
                          onCheckedChange={(checked) => updateFormData('campInterest', checked)}
                        />
                        <Label htmlFor="campInterest">I am interested in FCA camp</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="leadershipInterest"
                          checked={formData.leadershipInterest}
                          onCheckedChange={(checked) => updateFormData('leadershipInterest', checked)}
                        />
                        <Label htmlFor="leadershipInterest">I am interested in leadership</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalTestimony">Personal Testimony (Optional)</Label>
                    <Textarea
                      id="personalTestimony"
                      placeholder="Share your faith journey..."
                      value={formData.personalTestimony}
                      onChange={(e) => updateFormData('personalTestimony', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prayerRequests">Prayer Requests (Optional)</Label>
                    <Textarea
                      id="prayerRequests"
                      placeholder="How can we pray for you?"
                      value={formData.prayerRequests}
                      onChange={(e) => updateFormData('prayerRequests', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {/* Additional steps would continue here... */}
              {step > 3 && (
                <div className="text-center py-20">
                  <div className="text-gray-500">
                    <p className="text-lg">Step {step} content will be implemented</p>
                    <p className="text-sm mt-2">This is a comprehensive registration form with {totalSteps} steps</p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <span>•</span>
            <Link href="/student/login" className="hover:text-blue-600 transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>By registering, you agree to our terms of service and privacy policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
