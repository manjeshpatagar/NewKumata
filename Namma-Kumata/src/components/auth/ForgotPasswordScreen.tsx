import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Key } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NammaKumtaLogo } from '../NammaKumtaLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface ForgotPasswordScreenProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password reset successful!');
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Container */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Login</span>
          </button>
        </motion.div>

        {/* Reset Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
        >
          {/* Icon & Title */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                <Key className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <NammaKumtaLogo size="lg" showTagline={false} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-900 dark:text-white mb-2"
            >
              Reset Password
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400"
            >
              Enter your email and new password
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-10 sm:pl-12 h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            {/* New Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Resetting password...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Key className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Reset Password</span>
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <p className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300">
              💡 Password must be at least 6 characters long
            </p>
          </motion.div>

          {/* Back to Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-5 sm:mt-6 text-center"
          >
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to login
              </button>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-white/80"
        >
          © 2024 Namma Kumta. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}
