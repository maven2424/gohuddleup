'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  CheckCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function StudentRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobile: '',
    grade: '',
    shirtSize: '',
    schoolName: '',
    huddleName: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    socials: {
      instagram: '',
      snapchat: '',
      tiktok: ''
    }
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required'
    if (!formData.grade) newErrors.grade = 'Grade level is required'
    if (!formData.shirtSize) newErrors.shirtSize = 'Shirt size is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.schoolName) newErrors.schoolName = 'School name is required'
    if (!formData.huddleName) newErrors.huddleName = 'FCA huddle name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false
    
    switch (step) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
    }
    
    if (isValid && step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return
    
    setIsLoading(true)
    
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        throw authError
      }

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

        if (userError) {
          throw userError
        }

        // Create student record
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            user_id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            grade: formData.grade,
            shirt_size: formData.shirtSize,
            socials_instagram: formData.socials.instagram,
            socials_snap: formData.socials.snapchat,
            socials_tiktok: formData.socials.tiktok,
            address: formData.address,
            // Note: school_id will need to be set by an admin or through a lookup process
          })

        if (studentError) {
          throw studentError
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

  const updateFormData = (field: string, value: string, subfield?: string) => {
    if (subfield) {
      setFormData(prev => {
        const currentField = prev[field as keyof typeof prev]
        if (typeof currentField === 'object' && currentField !== null) {
          return {
            ...prev,
            [field]: {
              ...currentField,
              [subfield]: value
            }
          }
        }
        return prev
      })
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors mb-2">
            <School className="h-8 w-8 mr-2" />
            goHuddleUp
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Student Registration
          </h2>
          <p className="text-gray-600">
            Join your FCA huddle and stay connected with your community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${
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
              {step === 1 && 'Account Setup'}
              {step === 2 && 'Personal Information'}
              {step === 3 && 'FCA Details'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {step === 1 && 'Create your account credentials'}
              {step === 2 && 'Tell us about yourself'}
              {step === 3 && 'Connect with your FCA huddle'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Account Setup */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
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
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
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
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
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
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                    Mobile Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="mobile"
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={(e) => updateFormData('mobile', e.target.value)}
                      className={`pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-sm font-medium text-gray-700">
                      Grade Level
                    </Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="shirtSize" className="text-sm font-medium text-gray-700">
                      Shirt Size
                    </Label>
                    <Select value={formData.shirtSize} onValueChange={(value) => updateFormData('shirtSize', value)}>
                      <SelectTrigger className={errors.shirtSize ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.shirtSize && <p className="text-sm text-red-600">{errors.shirtSize}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: FCA Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName" className="text-sm font-medium text-gray-700">
                    School Name
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="schoolName"
                      placeholder="Enter your school name"
                      value={formData.schoolName}
                      onChange={(e) => updateFormData('schoolName', e.target.value)}
                      className={`pl-10 ${errors.schoolName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.schoolName && <p className="text-sm text-red-600">{errors.schoolName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="huddleName" className="text-sm font-medium text-gray-700">
                    FCA Huddle Name
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="huddleName"
                      placeholder="Enter your FCA huddle name"
                      value={formData.huddleName}
                      onChange={(e) => updateFormData('huddleName', e.target.value)}
                      className={`pl-10 ${errors.huddleName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.huddleName && <p className="text-sm text-red-600">{errors.huddleName}</p>}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Address (Optional)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Street Address"
                          value={formData.address.street}
                          onChange={(e) => updateFormData('address', e.target.value, 'street')}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => updateFormData('address', e.target.value, 'city')}
                        className="pl-10"
                      />
                    </div>
                    <div>
                      <Select value={formData.address.state} onValueChange={(value) => updateFormData('address', value, 'state')}>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="ZIP Code"
                        value={formData.address.zip}
                        onChange={(e) => updateFormData('address', e.target.value, 'zip')}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

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

              {step < 3 ? (
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
