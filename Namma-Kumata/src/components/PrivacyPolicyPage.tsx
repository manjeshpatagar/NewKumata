import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Bell, Cookie } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <h1 className="text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24">
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white">
                    Your Privacy Matters
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Last Updated: December 2024
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                At Namma Kumta, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
            </Card>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                  Information We Collect
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Personal Information:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Name, email address, phone number</li>
                    <li>Profile information and preferences</li>
                    <li>Account credentials (encrypted)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Usage Information:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>App usage patterns and preferences</li>
                    <li>Search queries and browsing history</li>
                    <li>Device information and IP address</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Location Data:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Approximate location (if enabled)</li>
                    <li>Used for showing nearby businesses</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                  How We Use Your Information
                </h3>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>To provide and improve our services</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>To personalize your experience</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>To send important notifications and updates</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>To ensure security and prevent fraud</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>To analyze app usage and improve features</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                  <span>To communicate with you about services</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                  Data Security
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Encrypted data transmission (SSL/TLS)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Secure password encryption</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Regular security audits</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Limited access to personal data</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                  Your Rights
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li className="flex gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">→</span>
                  <span>Access your personal information</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">→</span>
                  <span>Update or correct your data</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">→</span>
                  <span>Delete your account and data</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">→</span>
                  <span>Opt-out of notifications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-600 dark:text-orange-400 mt-1">→</span>
                  <span>Request data export</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Third-Party Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                  Third-Party Services
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                We may use third-party services for analytics, payments, and notifications. These services have their own privacy policies. We do not sell your personal information to third parties.
              </p>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3">
                Questions or Concerns?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2 text-sm sm:text-base">
                <p className="text-blue-600 dark:text-blue-400">
                  📧 privacy@nammakumta.com
                </p>
                <p className="text-blue-600 dark:text-blue-400">
                  📞 +91 98765 43210
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-4 bg-gray-100 dark:bg-gray-800 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                This Privacy Policy was last updated on December 3, 2024
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1">
                We may update this policy from time to time. Please check back regularly.
              </p>
            </Card>
          </motion.div>

        </div>
      </ScrollArea>
    </div>
  );
}
