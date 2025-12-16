'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NammaKumtaLogo } from '../NammaKumtaLogo';
import { useAuth } from '../../contexts/AuthContext';

export function LoginScreen() {
  const router = useRouter();
  const { login, continueAsGuest } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0B0F1A] p-4">

      <div className="w-full max-w-md bg-white dark:bg-[#111827] rounded-2xl shadow-xl p-8">

        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4 text-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <NammaKumtaLogo size="lg" showTagline={false} />
          <h2 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
            Welcome Back
          </h2>
        </div>

        {/* Error */}
        {errorMsg && (
          <p className="text-red-600 text-center mb-3 text-sm">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 h-12 text-gray-900 dark:text-gray-100 dark:bg-[#0F172A] dark:border-gray-700"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                Password
              </label>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 h-12 text-gray-900 dark:text-gray-100 dark:bg-[#0F172A] dark:border-gray-700"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <span className="flex items-center gap-2">
                <LogIn size={18} /> Login
              </span>
            )}
          </Button>
        </form>

        {/* Guest Login */}
        <Button
          variant="outline"
          className="w-full h-12 mt-4 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          onClick={() => {
            continueAsGuest();
            router.push('/');
          }}
        >
          <User size={18} className="mr-2" /> Continue as Guest
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4 text-gray-800 dark:text-gray-300">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 dark:text-blue-400"
            onClick={() => router.push('/auth/register')}
          >
            Register
          </button>
        </p>

      </div>

    </div>
  );
}
