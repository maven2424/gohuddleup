'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentRegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the enhanced registration page
    router.push('/student/register/enhanced')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to enhanced registration...</p>
      </div>
    </div>
  )
}
