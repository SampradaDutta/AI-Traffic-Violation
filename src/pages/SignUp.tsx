import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, UserPlus, Shield, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface SignUpProps {
  onSignUp: () => void
  onSwitchToLogin: () => void
}

export default function SignUp({ onSignUp, onSwitchToLogin }: SignUpProps) {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    badgeNumber: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }
    
    if (!formData.badgeNumber.trim()) {
      newErrors.badgeNumber = 'Badge number is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate signup - in production, this would call an API
    setTimeout(() => {
      onSignUp()
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(formData.password), text: 'One number' }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-300/30'
        }`} />
        <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-300/30'
        }`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-lg ${
          theme === 'dark'
            ? 'bg-slate-800/80 backdrop-blur-xl border border-slate-700'
            : 'bg-white/80 backdrop-blur-xl border border-gray-200'
        } rounded-3xl shadow-2xl p-8`}
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Create Account
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            Register for Traffic Violation Analytics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${
                errors.fullName ? 'border-red-500' :
                theme === 'dark'
                  ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${
                errors.email ? 'border-red-500' :
                theme === 'dark'
                  ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="john.doe@traffic.gov"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Department & Badge Number */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${
                theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${
                  errors.department ? 'border-red-500' :
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
              >
                <option value="">Select...</option>
                <option value="traffic">Traffic Police</option>
                <option value="highway">Highway Patrol</option>
                <option value="transport">Transport Dept</option>
                <option value="admin">Administration</option>
              </select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${
                theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
              }`}>
                Badge Number
              </label>
              <input
                type="text"
                name="badgeNumber"
                value={formData.badgeNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${
                  errors.badgeNumber ? 'border-red-500' :
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="TP-12345"
              />
              {errors.badgeNumber && <p className="text-red-500 text-xs mt-1">{errors.badgeNumber}</p>}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${
                  errors.password ? 'border-red-500' :
                  theme === 'dark'
                    ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Requirements */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      req.met ? 'bg-emerald-500' : theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'
                    }`}>
                      {req.met && <Check size={10} className="text-white" />}
                    </div>
                    <span className={`text-xs ${
                      req.met ? 'text-emerald-500' : theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
                    }`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all ${
                errors.confirmPassword ? 'border-red-500' :
                theme === 'dark'
                  ? 'bg-slate-700/50 border-slate-600 text-white focus:border-blue-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mt-2 ${
              isLoading
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className={`absolute inset-0 flex items-center ${
            theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className={`w-full border-t ${
              theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
            }`} />
          </div>
          <div className="relative flex justify-center">
            <span className={`px-4 text-sm ${
              theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-white text-gray-500'
            }`}>
              or
            </span>
          </div>
        </div>

        {/* Login Link */}
        <p className={`text-center text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
        }`}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className={`font-medium ${
              theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  )
}

