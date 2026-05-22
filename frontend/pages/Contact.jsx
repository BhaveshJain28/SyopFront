import { useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import Feedback from "../components/Feedback";
import { PhoneCall, Mail, MessageSquare, AlertTriangle, Send, HelpCircle, ArrowRight, Headphones, Shield, CheckCircle2, X } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    urgency: "medium"
  });
  
  const { isDarkMode } = useTheme();
  const [error, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isLogin, token, backendUrl } = UseAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      setError(true);
      setTimeout(() => setError(false), 5000);
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/contact`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
        urgency: "medium"
      });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Failed to submit message. Please try again.");
    }
  };

  const contactMethods = [
    {
      icon: PhoneCall,
      title: "Phone Support",
      description: "Speak with our support team",
      detail: "+91 9256******",
      hours: "Mon-Fri: 8AM-8PM EST",
      gradient: "from-sky-500/20 to-blue-500/20 text-sky-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      detail: "sympto.scope28@gmail.com",
      hours: "24/7 Response",
      gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      detail: "Available on website",
      hours: "Mon-Fri: 9AM-6PM EST",
      gradient: "from-purple-500/20 to-indigo-500/20 text-purple-500"
    },
  ];

  const faqs = [
    {
      question: "What is SymptoScope?",
      answer: "SymptoScope is a smart, web-based health tracking platform that helps users log symptoms, analyze health trends, and receive AI-driven insights for proactive well-being."
    },
    {
      question: "How does SymptoScope help me monitor my health?",
      answer: "By allowing you to log daily symptoms, track changes visually over time, and get personalized health insights using AI, SymptoScope enables you to stay informed and in control of your wellness."
    },
    {
      question: "Is SymptoScope available on mobile?",
      answer: "Currently, SymptoScope is optimized for desktop use. A mobile-responsive version and dedicated app are planned for future updates."
    },
    {
      question: "How do I contact the SymptoScope team?",
      answer: "For any queries or support, feel free to reach out to us at sympto.scope28@gmail.com — we're here to help!"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white rounded-b-[40px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                We're Here to <br />
                <span className="text-amber-400">Help You</span>
              </h1>
              <p className="text-slate-200 dark:text-slate-350 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Our dedicated support team is ready to assist you with any questions, technical issues, or guidance you need on your health journey.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-350 text-slate-950 font-black rounded-full transition-transform hover:-translate-y-0.5 shadow-lg shadow-amber-400/25 text-sm cursor-pointer"
                >
                  <MessageSquare size={18} />
                  Start Live Chat
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                  <img src="/SymptoScopeLogo.png" alt="SymptoScope Logo" className="h-16 w-auto object-contain bg-transparent" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-800 dark:text-slate-150 uppercase text-xs tracking-widest">AI Support</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
                    User-friendly healthcare provider
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Methods Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center px-4 py-1 bg-medical-blue/10 text-medical-blue dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-wider">
              Contact Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight">
              How Can We Help?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-center space-y-4 hover:-translate-y-0.5 transition-transform shadow-md">
                  <div className={`p-4 rounded-2xl inline-flex ${method.gradient}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-800 dark:text-slate-150">{method.title}</h5>
                    <p className="text-xs text-slate-455 font-medium">{method.description}</p>
                  </div>
                  <p className="font-extrabold text-sm text-medical-blue dark:text-sky-400">{method.detail}</p>
                  <small className="text-[10px] text-slate-400 block font-semibold uppercase">{method.hours}</small>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Message Form & Sidebar Section */}
      <section className="py-16 bg-slate-100/40 dark:bg-slate-950/40 border-y border-slate-200/60 dark:border-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Panel */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="mb-6 space-y-2">
                <h2 className="text-2xl font-black text-slate-850 dark:text-slate-100 tracking-tight">Send Us a Message</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 text-sm transition-all shadow-sm cursor-pointer"
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Support</option>
                      <option value="medical">Medical Questions</option>
                      <option value="billing">Billing & Pricing</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="media">Media & Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief subject line"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm"
                    />
                  </div>

                  {/* Priority Level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority Level</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 text-sm transition-all shadow-sm cursor-pointer"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Need assistance</option>
                      <option value="high">High - Urgent issue</option>
                      <option value="critical">Critical - Emergency</option>
                    </select>
                  </div>

                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message *</label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your question or issue in detail..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/85 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm leading-relaxed"
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-2xl border border-red-100 dark:border-red-950/30 bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 text-xs sm:text-sm font-semibold flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
                      Please log in first to submit this inquiry form.
                    </span>
                    <Link to="/login" className="px-4 py-1.5 bg-red-650 text-white rounded-lg text-xs font-extrabold hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm">
                      Sign In
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}

                {showSuccess && (
                  <div className="p-4 rounded-2xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    Thank you for your message! Our system logged it, and we will get back to you soon.
                  </div>
                )}

                {/* Consent & Submit */}
                <div className="pt-2 space-y-4">
                  <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-500 font-medium cursor-pointer">
                    <input 
                      type="checkbox" 
                      required 
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-medical-blue focus:ring-medical-blue/20 cursor-pointer"
                    />
                    I agree to SymptoScope's standard Privacy Policy and Terms of Service constraints.
                  </label>
                  
                  <button 
                    type="submit"
                    className="bg-gradient-primary text-white px-8 py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-medical-blue/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow shadow-medical-blue/10"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>

              </form>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Emergency Card */}
              <div className="bg-white dark:bg-slate-900 border-l-4 border-red-500 border border-y-slate-100 border-r-slate-100 dark:border-y-slate-800 dark:border-r-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h5 className="font-black text-red-500 uppercase text-xs tracking-wider flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Medical Emergency?
                </h5>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  SymptoScope is a wellness log journal, not an ER dispatch tool. If you are experiencing an acute medical emergency, contact clinical providers or emergency help lines immediately.
                </p>
                <a href="tel:108" className="block text-center bg-red-500 hover:bg-red-650 text-white py-3 rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wide">
                  Emergency: call 108
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center px-4 py-1 bg-sky-500/10 text-medical-blue dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-wider">
              FAQ Help
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight">
              Common Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 space-y-2.5">
                <h6 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-150 flex items-center gap-2">
                  <HelpCircle size={18} className="text-medical-blue flex-shrink-0" />
                  {faq.question}
                </h6>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-405 leading-relaxed font-semibold pl-6.5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Feedback />

      {/* Custom Tailwind Live Chat Modal (Simulated overlay dialog) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <div 
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
          ></div>
          
          {/* Modal Container Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6 animate-scale-up">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-4">
              <div className="inline-flex p-4.5 bg-medical-blue/15 text-medical-blue dark:text-sky-400 rounded-full animate-bounce">
                <Headphones size={36} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-slate-850 dark:text-slate-100">Live Chat Support</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Our digital support desk is ready to help you with any operational queries. Start a dynamic session below.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={() => {
                  alert("Connecting you to a support agent...");
                  setShowModal(false);
                }}
                className="w-full py-3 bg-gradient-primary text-white font-bold rounded-2xl shadow-lg shadow-medical-blue/20 hover:-translate-y-0.5 transition-transform cursor-pointer text-sm"
              >
                Start Chat Session
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-bold rounded-2xl transition-colors cursor-pointer text-sm"
              >
                Maybe Later
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
