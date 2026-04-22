import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2,
  Users, TrendingUp, Bot, CheckCircle2,
} from 'lucide-react'
import logoFull from '../../logo.png'

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  email: string
  password: string
  remember: boolean
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

// ── Validation ────────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }
  return errors
}

// ── Feature pill ──────────────────────────────────────────────────────────────

function FeaturePill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
      <Icon className="w-3.5 h-3.5 text-orange-200" />
      <span className="text-xs text-white/90 font-medium">{label}</span>
    </div>
  )
}

// ── Stat badge ────────────────────────────────────────────────────────────────

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/60 mt-0.5">{label}</p>
    </div>
  )
}

// ── Input field ───────────────────────────────────────────────────────────────

function InputField({
  id, label, type, value, onChange, onBlur, placeholder, icon: Icon,
  error, rightElement,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  placeholder: string
  icon: React.ElementType
  error?: string
  rightElement?: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className={`w-4 h-4 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={id === 'email' ? 'email' : 'current-password'}
          className={`w-full pl-10 pr-${rightElement ? '10' : '3'} py-2.5 text-sm bg-gray-50 border rounded-xl transition-all outline-none
            focus:bg-white focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400
            ${error
              ? 'border-red-300 bg-red-50/30 focus:ring-red-400/20 focus:border-red-400'
              : 'border-gray-200 hover:border-gray-300'
            }`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
          <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const navigate = useNavigate()

  const [form,        setForm]        = useState<FormState>({ email: '', password: '', remember: false })
  const [errors,      setErrors]      = useState<FormErrors>({})
  const [showPass,    setShowPass]    = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [touched,     setTouched]     = useState<Record<string, boolean>>({})

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }))
    if (touched[key]) {
      const next = { ...form, [key]: value }
      const errs = validate(next)
      setErrors(e => ({ ...e, [key]: errs[key as keyof FormErrors] }))
    }
  }

  function handleBlur(key: string) {
    setTouched(t => ({ ...t, [key]: true }))
    const errs = validate(form)
    setErrors(e => ({ ...e, [key]: errs[key as keyof FormErrors] }))
  }

  const handleSubmit = useCallback(async () => {
    setTouched({ email: true, password: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setErrors({})
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500))
      navigate('/')
    } catch {
      setErrors({ general: 'Invalid email or password. Please try again.' })
    } finally {
      setLoading(false)
    }
  }, [form, navigate])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !loading) handleSubmit()
  }

  return (
    <div className="min-h-screen flex bg-[#f4f5f7]" onKeyDown={handleKeyDown}>

      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-between p-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #c96a2a 100%)' }}>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-orange-400/8 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <img src={logoFull} alt="Fusion CRM" className="h-10 w-auto object-contain" />
        </div>

        {/* Centre content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs text-orange-300 font-medium">Trusted by 500+ businesses</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Manage your<br />
              business <span className="text-orange-400">smarter</span><br />
              with Fusion CRM
            </h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Streamline your sales pipeline, track leads, automate follow-ups and grow revenue — all from one powerful platform.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            <FeaturePill icon={Users}      label="Lead Management" />
            <FeaturePill icon={TrendingUp} label="Sales Analytics" />
            <FeaturePill icon={Bot}        label="Bot Automation" />
            <FeaturePill icon={TrendingUp} label="Live Reports" />
          </div>

          {/* Checklist */}
          <div className="space-y-2.5">
            {[
              'Real-time pipeline visibility',
              'Automated bot workflows',
              'Multi-role access control',
              'Integrated property portal',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-sm text-white/75">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10">
          <div className="flex items-center gap-8 pt-6 border-t border-white/10">
            <StatBadge value="12k+" label="Active Users" />
            <div className="w-px h-8 bg-white/10" />
            <StatBadge value="98%" label="Uptime SLA" />
            <div className="w-px h-8 bg-white/10" />
            <StatBadge value="4.9★" label="User Rating" />
          </div>
        </div>
      </div>

      {/* ── Right login panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-[400px] space-y-6">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center mb-2">
            <img src={logoFull} alt="Fusion CRM" className="h-8 w-auto object-contain" />
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 p-7 space-y-5">

            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-sm text-gray-500">Sign in to your Fusion CRM account</p>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <p className="text-xs text-red-600 font-medium">{errors.general}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <InputField
                  id="email"
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={v => setField('email', v)}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@company.com"
                  icon={Mail}
                  error={errors.email}
                />

              <InputField
                  id="password"
                  label="Password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={v => setField('password', v)}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  icon={Lock}
                  error={errors.password}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
                      tabIndex={-1}
                      aria-label={showPass ? 'Hide password' : 'Show password'}>
                      {showPass
                        ? <EyeOff className="w-4 h-4" />
                        : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setField('remember', !form.remember)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    form.remember
                      ? 'bg-orange-500 border-orange-500'
                      : 'border-gray-300 bg-white group-hover:border-orange-400'
                  }`}>
                  {form.remember && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-gray-600 select-none">Remember me</span>
              </label>

              <button
                type="button"
                className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-orange-500/25 hover:shadow-orange-500/40">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">
            Don't have an account?{' '}
            <button className="text-orange-500 hover:text-orange-600 font-medium transition-colors hover:underline">
              Contact your administrator
            </button>
          </p>

          <p className="text-center text-[11px] text-gray-300">
            © {new Date().getFullYear()} Fusion CRM · All rights reserved
          </p>

        </div>
      </div>
    </div>
  )
}
