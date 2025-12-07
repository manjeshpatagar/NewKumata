'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Key } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NammaKumtaLogo } from '../NammaKumtaLogo';
import { toast } from 'sonner';
import { axiosClient } from '@/lib/api/axiosClient';

export function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");
    if (!/^[^\s@]+[^\s@]+\.[^\s]+$/.test(email))
      return toast.error("Enter a valid email");

    if (!newPassword || !confirmPassword)
      return toast.error("Please fill all password fields");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);

    try {
      const res = await axiosClient.post("/auth/reset-password", {
        email,
        newPassword,
      });

      toast.success("Password reset successful!");
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <button
          onClick={() => router.push('/auth/login')}
          className="flex items-center gap-2 text-gray-600 mb-5"
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Key className="w-8 h-8 text-white" />
            </div>

            <NammaKumtaLogo size="lg" />
            <h2 className="text-2xl font-semibold mt-2">Reset Password</h2>
            <p className="text-gray-600 text-sm">Enter your email and new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pl-10 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="pl-10 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              type="submit"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
