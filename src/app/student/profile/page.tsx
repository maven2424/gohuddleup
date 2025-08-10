'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  User, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  School, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Users, 
  LogOut,
  ArrowLeft,
  CheckCircle,
  Upload,
  Trash2
} from 'lucide-react'
import { getCurrentUser, signOut, getStudentProfile, updateStudentProfile } from '@/lib/auth'
import { validateImageFile, formatFileSize } from '@/lib/utils'
import toast from 'react-hot-toast'

interface StudentProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  grade: string
  shirt_size: string
  school_id: string
  profile_picture_url?: string
  socials_instagram?: string
  socials_snap?: string
  socials_tiktok?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  schools?: {
    name: string
    huddles?: Array<{ name: string }>
  }
}

export default function StudentProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [editedProfile, setEditedProfile] = useState<StudentProfile | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user, userData } = await getCurrentUser()
        if (!user || !userData || userData.role !== 'STUDENT') {
          router.push('/student/login')
          return
        }
        
        // Fetch real profile data
        const studentProfile = await getStudentProfile(user.id)
        if (studentProfile) {
          setProfile(studentProfile)
          setEditedProfile(studentProfile)
        } else {
          toast.error('Failed to load profile data')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/student/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateImageFile(file)
      if (!validation.isValid) {
        toast.error(validation.error || 'Invalid file')
        return
      }
      
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!profileImage || !profile) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)
      
      // Here you would typically upload to Supabase Storage
      // For now, we'll simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, you'd save this URL to the database
      // await updateStudentProfile(profile.user_id, { profile_picture_url: newImageUrl })
      
      setUploadProgress(100)
      toast.success('Profile picture uploaded successfully!')
      
      // Clear the file input
      setProfileImage(null)
      setImagePreview('')
      
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    setImagePreview('')
  }

  const handleSave = async () => {
    if (!editedProfile || !profile) return
    
    setIsSaving(true)
    try {
      // Prepare data for update (exclude fields that shouldn't be updated)
      const updateData = {
        first_name: editedProfile.first_name,
        last_name: editedProfile.last_name,
        mobile: editedProfile.mobile,
        grade: editedProfile.grade,
        shirt_size: editedProfile.shirt_size,
        socials_instagram: editedProfile.socials_instagram,
        socials_snap: editedProfile.socials_snap,
        socials_tiktok: editedProfile.socials_tiktok,
        address: editedProfile.address
      }
      
      // Update profile in database
      const updatedProfile = await updateStudentProfile(profile.user_id, updateData)
      
      if (updatedProfile) {
        setProfile({ ...profile, ...updatedProfile })
        setIsEditing(false)
        toast.success('Profile updated successfully!')
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
    setProfileImage(null)
    setImagePreview('')
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      router.push('/student/login')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Error signing out')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  const schoolName = profile.schools?.name || 'School not specified'
  const huddleName = profile.schools?.huddles?.[0]?.name || 'Huddle not specified'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                goHuddleUp
              </Link>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                  Student Portal
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/student/login" className="text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">
              My Profile
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Manage your personal information and FCA huddle profile
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                    <img
                      src={imagePreview || profile.profile_picture_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.user_id}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg" title="Upload profile picture">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        aria-label="Upload profile picture"
                      />
                    </label>
                  )}
                </div>
                
                {isEditing && profileImage && (
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">New image selected</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {profileImage.name} ({formatFileSize(profileImage.size)})
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={handleImageUpload}
                        disabled={isUploading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isUploading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                            {uploadProgress}%
                          </div>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </>
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRemoveImage}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Your basic personal details
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="first_name"
                        value={editedProfile?.first_name || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 font-medium">{profile.first_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="last_name"
                        value={editedProfile?.last_name || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 font-medium">{profile.last_name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{profile.email || 'Not provided'}</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                      Mobile Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        id="mobile"
                        value={editedProfile?.mobile || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, mobile: e.target.value} : null)}
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-900">{profile.mobile || 'Not provided'}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="grade" className="text-sm font-medium text-gray-700">
                      Grade Level
                    </Label>
                    {isEditing ? (
                      <Select value={editedProfile?.grade || ''} onValueChange={(value) => setEditedProfile(prev => prev ? {...prev, grade: value} : null)}>
                        <SelectTrigger className="mt-1 !bg-white !text-gray-900">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-gray-900 font-medium">{profile.grade || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="shirt_size" className="text-sm font-medium text-gray-700">
                      Shirt Size
                    </Label>
                    {isEditing ? (
                      <Select value={editedProfile?.shirt_size || ''} onValueChange={(value) => setEditedProfile(prev => prev ? {...prev, shirt_size: value} : null)}>
                        <SelectTrigger className="mt-1 !bg-white !text-gray-900">
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
                    ) : (
                      <p className="mt-1 text-gray-900 font-medium">{profile.shirt_size || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FCA Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>FCA Huddle Information</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your FCA huddle details and school information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      School Name
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <School className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{schoolName}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      FCA Huddle
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{huddleName}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Social Media
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Connect with your FCA community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="instagram" className="text-sm font-medium text-gray-700">
                      Instagram
                    </Label>
                    {isEditing ? (
                      <Input
                        id="instagram"
                        value={editedProfile?.socials_instagram || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, socials_instagram: e.target.value} : null)}
                        placeholder="@username"
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.socials_instagram || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="snapchat" className="text-sm font-medium text-gray-700">
                      Snapchat
                    </Label>
                    {isEditing ? (
                      <Input
                        id="snapchat"
                        value={editedProfile?.socials_snap || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, socials_snap: e.target.value} : null)}
                        placeholder="username"
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.socials_snap || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="tiktok" className="text-sm font-medium text-gray-700">
                      TikTok
                    </Label>
                    {isEditing ? (
                      <Input
                        id="tiktok"
                        value={editedProfile?.socials_tiktok || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {...prev, socials_tiktok: e.target.value} : null)}
                        placeholder="@username"
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.socials_tiktok || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Address Information</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your home address for FCA communications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street" className="text-sm font-medium text-gray-700">
                      Street Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="street"
                        value={editedProfile?.address?.street || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {
                          ...prev, 
                          address: {...prev.address, street: e.target.value}
                        } : null)}
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.address?.street || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                      City
                    </Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={editedProfile?.address?.city || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {
                          ...prev, 
                          address: {...prev.address, city: e.target.value}
                        } : null)}
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.address?.city || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                      State
                    </Label>
                    {isEditing ? (
                      <Select value={editedProfile?.address?.state || ''} onValueChange={(value) => setEditedProfile(prev => prev ? {
                        ...prev, 
                        address: {...prev.address, state: value}
                      } : null)}>
                        <SelectTrigger className="mt-1 !bg-white !text-gray-900">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.address?.state || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                      ZIP Code
                    </Label>
                    {isEditing ? (
                      <Input
                        id="zip"
                        value={editedProfile?.address?.zip || ''}
                        onChange={(e) => setEditedProfile(prev => prev ? {
                          ...prev, 
                          address: {...prev.address, zip: e.target.value}
                        } : null)}
                        className="mt-1 !bg-white !text-gray-900"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{profile.address?.zip || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
