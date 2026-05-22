import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Shield, Brain, ArrowLeft, Mail, Lock, Eye, EyeOff, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function Login() {
  const { login, backendUrl, token } = UseAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized health insights powered by advanced machine learning"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      condition: "Lupus",
      quote: "SymptomAI helped me identify patterns I never noticed before. It's been life-changing.",
      rating: 5
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
          
          {/* Left Side - Login Form (lg:col-span-6) */}
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
                  <Brain size={28} />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-gradient-primary">
                  Welcome Back
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Sign in to your SymptomAI account to continue tracking your health
                </p>
              </div>

              {/* Login Form Wrapper */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                {loginError && (
                  <div className="mb-6 p-4 rounded-xl border border-red-100 dark:border-red-950/30 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
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
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600"
                        placeholder="Enter your email"
                      />
                    </div>
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
                        required
                        className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                    <label className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-slate-300 text-medical-blue focus:ring-medical-blue/20 cursor-pointer"
                      />
                      Remember me
                    </label>
                    <Link to="/forgot-password" className="text-medical-blue dark:text-sky-400 hover:underline font-bold">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-medical-blue/20 hover:shadow-xl hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2 text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-medical-blue dark:text-sky-400 font-extrabold hover:underline">
                      Create Account
                    </Link>
                  </div>

                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold tracking-wider">Or continue with</span>
                  </div>
                </div>

                {/* Social Login Options */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors cursor-pointer">
                    <i className="fab fa-google text-red-500"></i>
                    Google
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors cursor-pointer">
                    <i className="fab fa-apple text-slate-900 dark:text-white"></i>
                    Apple
                  </button>
                </div>

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
                  Trusted by 10,000+ Patients
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
                  Take Control of Your <br />
                  <span className="text-amber-400">Health Journey</span>
                </h1>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Join thousands of patients who are managing their rare conditions with AI-powered insights and personalized tracking.
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

              {/* Testimonials snippet */}
              <div className="space-y-3">
                <h6 className="font-bold text-xs uppercase tracking-wider text-slate-400 text-center">What patients say</h6>
                {testimonials.map((test, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-400 text-slate-950 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm">
                        {test.name[0]}
                      </div>
                      <div>
                        <h6 className="font-bold text-xs text-slate-200">{test.name}</h6>
                        <small className="text-[10px] text-slate-400">{test.condition}</small>
                      </div>
                      <div className="ml-auto flex gap-0.5 text-amber-400 text-xs">
                        {[...Array(test.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{test.quote}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-3 text-center">
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
