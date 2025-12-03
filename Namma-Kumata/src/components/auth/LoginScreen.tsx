'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NammaKumtaLogo } from '../NammaKumtaLogo';
import { useAuth } from '../../contexts/AuthContext';

export function LoginScreen({ onNavigate }: { onNavigate: (page: string) => void }) {
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
      onNavigate("home");
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Back */}
        <button className="text-gray-600 mb-4 flex items-center gap-2" onClick={() => onNavigate('home')}>
          <ArrowLeft size={20} /> Back
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <NammaKumtaLogo size="lg" showTagline={false} />
          <h2 className="text-2xl font-semibold mt-4">Welcome Back</h2>
        </div>

        {/* Error msg */}
        {errorMsg && (
          <p className="text-red-600 text-center mb-4">{errorMsg}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                required
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12">
            {loading ? "Logging in..." : (
              <div className="flex items-center gap-2"><LogIn size={18} /> Login</div>
            )}
          </Button>
        </form>

        {/* Guest Login */}
        <Button
          variant="outline"
          className="w-full h-12 mt-4"
          onClick={() => { continueAsGuest(); onNavigate('home'); }}
        >
          <User size={18} className="mr-2" /> Continue as Guest
        </Button>

        {/* Register link */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button className="text-blue-600" onClick={() => onNavigate('register')}>
            Register
          </button>
        </p>
      </div>

    </div>
  );
}
