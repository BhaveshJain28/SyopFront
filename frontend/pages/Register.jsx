import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Shield, Brain, ArrowLeft, Mail, Lock, Eye, EyeOff, User, UserPlus, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function Register() {
  const { backendUrl, token } = UseAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    ConfirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.FirstName.trim()) newErrors.FirstName = "First name is required";
    if (!formData.LastName.trim()) newErrors.LastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (formData.password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    setShowSuccess(false);

    try {
      await axios.post(`${backendUrl}/api/user/register`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Registration Error:", error);
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ message });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Interactive AI Logging",
      description: "Log your health symptoms simply and get dynamic insights instantly."
    },
    {
      icon: Shield,
      title: "Compliant & Private",
      description: "We secure your personal health records with industry standard algorithms."
    }
  ];

  if (showSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <div className="w-full max-w-md mx-auto p-6 sm:p-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
            <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Account Created!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Welcome to SymptoScope! Your profile has been created successfully. You can now log in and begin tracking your health.
              </p>
            </div>
            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center bg-gradient-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-medical-blue/20 hover:shadow-xl hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
          
          {/* Left Side - Register Form (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center py-12 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="w-full max-w-md mx-auto space-y-8">
              
              {/* Back to Home Link */}
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-medical-blue dark:hover:text-sky-400 transition-colors">
                <ArrowLeft size={16} />
                Back to Home
              </Link>

              {/* Header Branding */}
              <div className="text-center lg:text-left space-y-2">
                <div className="bg-gradient-primary inline-flex p-3 rounded-2xl text-white shadow-lg shadow-medical-blue/20">
                  <UserPlus size={28} />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-gradient-primary">
                  Create Account
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Register today and get access to custom AI symptom mapping
                </p>
              </div>

              {/* Register Form Wrapper */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                {errors.message && (
                  <div className="mb-6 p-4 rounded-xl border border-red-100 dark:border-red-950/30 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    {errors.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        First Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          name="FirstName"
                          value={formData.FirstName}
                          onChange={handleInputChange}
                          className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border ${errors.FirstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-medical-blue/10'} rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600`}
                          placeholder="John"
                        />
                      </div>
                      {errors.FirstName && (
                        <p className="text-xs text-red-500 font-semibold mt-1">{errors.FirstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Last Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          name="LastName"
                          value={formData.LastName}
                          onChange={handleInputChange}
                          className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border ${errors.LastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-medical-blue/10'} rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600`}
                          placeholder="Doe"
                        />
                      </div>
                      {errors.LastName && (
                        <p className="text-xs text-red-500 font-semibold mt-1">{errors.LastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-medical-blue/10'} rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600`}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-12 py-2.5 bg-slate-50 dark:bg-slate-950 border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-medical-blue/10'} rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-12 py-2.5 bg-slate-50 dark:bg-slate-950 border ${errors.ConfirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-medical-blue/10'} rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.ConfirmPassword && (
                      <p className="text-xs text-red-500 font-semibold mt-1">{errors.ConfirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-medical-blue/20 hover:shadow-xl hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2 text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-medical-blue dark:text-sky-400 font-extrabold hover:underline">
                      Sign In
                    </Link>
                  </div>

                </form>

              </div>

              {/* Security Notice */}
              <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <Shield size={14} className="text-emerald-500" />
                Your data is protected with 256-bit SSL encryption
              </p>

            </div>
          </div>

          {/* Right Side - Branding Assets & Info Panel (lg:col-span-6) */}
          <div className="hidden lg:col-span-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white flex-col justify-center p-12 relative overflow-hidden rounded-r-3xl">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            
            <div className="max-w-md mx-auto space-y-8 relative z-10">
              
              <div className="text-center space-y-4">
                <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 shadow-md">
                  <Award size={14} />
                  SymptoScope Dashboard
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
                  Track Symptoms, <br />
                  <span className="text-amber-400">Discover Insights</span>
                </h1>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Join thousands of patients using our medical analysis system to safely journal logs, track anomalies, and compile charts for your healthcare provider.
                </p>
              </div>

              {/* Showcase Features list */}
              <div className="space-y-4">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex gap-4 p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <div className="bg-amber-400 text-slate-950 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-200 mb-1">{feature.title}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-3 text-center pt-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                  <h3 className="font-black text-amber-400 text-lg sm:text-xl">10K+</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Active Users</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                  <h3 className="font-black text-amber-400 text-lg sm:text-xl">95%</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Accuracy</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                  <h3 className="font-black text-amber-400 text-lg sm:text-xl">500+</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Conditions</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
