'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function StudentRegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get URL parameters and pass them to the enhanced registration page
    const school = searchParams.get('school')
    const city = searchParams.get('city')
    const county = searchParams.get('county')
    
    let redirectUrl = '/student/register/enhanced'
    if (school || city || county) {
      const params = new URLSearchParams()
      if (school) params.append('school', school)
      if (city) params.append('city', city)
      if (county) params.append('county', county)
      redirectUrl += `?${params.toString()}`
    }
    
    router.push(redirectUrl)
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to enhanced registration...</p>
      </div>
    </div>
  )
}
