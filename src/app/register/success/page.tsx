'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              goHuddleUp
            </Link>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Registration Submitted!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for registering with FCA. We're excited to have you join our community!
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-semibold text-blue-900">Status: Pending Parent Consent</span>
            </div>
            <p className="text-blue-800">
              We've sent a consent email to your parent/guardian. Once they approve, your registration will be complete.
            </p>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">What happens next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Parent Email</h3>
                <p className="text-sm text-gray-600">
                  Your parent/guardian will receive an email with a secure consent link.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Parent Approval</h3>
                <p className="text-sm text-gray-600">
                  Once they click the consent link, your registration will be approved.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Join Your Huddle</h3>
                <p className="text-sm text-gray-600">
                  You'll receive access to your school's FCA huddle and can start connecting.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-2">Important Notes:</h3>
            <ul className="text-sm text-yellow-800 space-y-1 text-left">
              <li>• Check your email (and spam folder) for the parent consent link</li>
              <li>• Your parent/guardian must approve within 7 days</li>
              <li>• You can log in to check your status anytime</li>
              <li>• Contact your school's FCA leader if you have questions</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
