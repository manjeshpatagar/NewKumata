import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NammaKumtaLogo } from '../NammaKumtaLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onNavigate: (page: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const { t } = useLanguage();
  const { login, continueAsGuest } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      onNavigate('home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    continueAsGuest();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-orange-500 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Container */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Home</span>
          </button>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
        >
          {/* Logo & Welcome */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <NammaKumtaLogo size="lg" showTagline={false} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-900 dark:text-white mb-2"
            >
              Welcome Back!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400"
            >
              Login to access your account
            </motion.p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email/Phone Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Email or Phone
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your email or phone"
                  className="pl-10 sm:pl-12 h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-right"
            >
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Login</span>
                  </div>
                )}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative py-2 sm:py-3"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-gray-900 px-3 sm:px-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  or
                </span>
              </div>
            </motion.div>

            {/* Guest Login */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                type="button"
                onClick={handleGuestLogin}
                variant="outline"
                className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Continue as Guest
              </Button>
            </motion.div>
          </form>

          {/* Demo Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-5 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <p className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              <strong>Demo Account</strong>
            </p>
            <div className="space-y-1 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                📧 <span className="text-blue-600 dark:text-blue-400">demo@example.com</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                🔑 <span className="text-blue-600 dark:text-blue-400">any password</span>
              </p>
            </div>
          </motion.div>

          {/* Register Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 sm:mt-6 text-center"
          >
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up now
              </button>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-white/80"
        >
          © 2024 Namma Kumta. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}
