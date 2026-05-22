import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { UseAuth } from "../contexts/AuthContext";

export default function Index() {
  const { isDarkMode } = useTheme();
  const { isLogin } = UseAuth();

  const features = [
    {
      icon: "fas fa-brain",
      title: "AI-Powered Pattern Recognition",
      description: "Advanced machine learning algorithms analyze your symptoms to identify patterns and correlations that might be missed by traditional tracking methods.",
      benefits: ["Real-time analysis", "Predictive modeling", "Pattern detection", "Correlation mapping"]
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Smart Symptom Tracking",
      description: "Intuitive logging with voice recognition, photo capture, and automated reminders to ensure comprehensive health data collection.",
      benefits: ["Voice-to-text logging", "Photo documentation", "Smart reminders", "Multi-device sync"]
    },
    {
      icon: "fas fa-chart-line",
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive visualizations and insights that help you understand your health trends and share meaningful data with your healthcare team.",
      benefits: ["Trend visualization", "Custom reports", "Doctor sharing", "Progress tracking"]
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Patients", icon: "fas fa-users" },
    { number: "500+", label: "Rare Conditions", icon: "fas fa-dna" },
    { number: "95%", label: "AI Accuracy", icon: "fas fa-brain" },
    { number: "24/7", label: "Monitoring", icon: "fas fa-clock" }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Set up your secure account with your medical history, current conditions, and treatment information.",
      icon: "fas fa-user-plus"
    },
    {
      step: 2,
      title: "Track Daily Symptoms",
      description: "Use our intuitive interface to log symptoms, medications, triggers, and lifestyle factors daily.",
      icon: "fas fa-notes-medical"
    },
    {
      step: 3,
      title: "Get AI Insights",
      description: "Receive personalized insights, pattern recognition, and predictive analytics powered by advanced AI.",
      icon: "fas fa-brain"
    },
    {
      step: 4,
      title: "Get Health Report",
      description: "Generate comprehensive reports to share with your healthcare team for better treatment decisions.",
      icon: "fas fa-user-md"
    }
  ];

  return (
    <div className="pt-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden py-16 px-4">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
                Transform Your <br />
                <span className="text-amber-400 drop-shadow-md">Health Journey</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-200/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-justify">
                Navigating a rare condition can feel like walking in the dark. Our AI-powered journal helps you document your symptoms, analyze patterns, and discover possible conditions before they become critical.
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  to={!isLogin ? "/register" : "/dashboard"}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white bg-white/20 border border-white/30 backdrop-blur-md hover:bg-white/30 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <i className="fas fa-rocket"></i>
                  {!isLogin ? "Get Started" : "Go to Dashboard"}
                  <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
            </div>

            {/* Right Hero Column (Visual Showcase Logo Card) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[320px] p-8 rounded-3xl shadow-2xl glassmorphism border border-white/20 transform hover:scale-102 transition-transform duration-300 text-center">
                <img 
                  src="./SymptoScopeLogo.png" 
                  alt="SymptoScope Logo" 
                  className="h-28 mx-auto mb-6 bg-transparent hover:rotate-6 transition-transform duration-500" 
                />
                <p className="text-slate-200 dark:text-slate-300 font-medium text-lg">
                  AI Symptom Journal for Rare Conditions
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold">
                  <i className="fas fa-arrow-up"></i>
                  Empowering Health
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Animated Floating Medical Equipment Background Items */}
        <div className="medical-equipment absolute top-[15%] left-[5%] animate-float-1 text-sky-400/25">
          <i className="fas fa-stethoscope text-5xl"></i>
        </div>
        <div className="medical-equipment absolute top-[25%] right-[8%] animate-float-2 text-indigo-400/25">
          <i className="fas fa-heartbeat text-5xl"></i>
        </div>
        <div className="medical-equipment absolute bottom-[30%] left-[15%] animate-float-3 text-emerald-400/25">
          <i className="fas fa-user-md text-4xl"></i>
        </div>
        <div className="medical-equipment absolute top-[45%] right-[25%] animate-float-4 text-rose-400/25">
          <i className="fas fa-pills text-3xl"></i>
        </div>
        <div className="medical-equipment absolute bottom-[15%] right-[12%] animate-float-5 text-amber-400/25">
          <i className="fas fa-syringe text-4xl"></i>
        </div>
        <div className="medical-equipment absolute top-[35%] left-[25%] animate-float-6 text-cyan-400/25">
          <i className="fas fa-microscope text-5xl"></i>
        </div>
        <div className="medical-equipment absolute top-[10%] right-[5%] animate-float-3 text-indigo-300/20">
          <i className="fas fa-dna text-4xl"></i>
        </div>
        <div className="medical-equipment absolute bottom-[10%] left-[8%] animate-float-5 text-purple-400/20">
          <i className="fas fa-x-ray text-5xl"></i>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 uppercase tracking-widest">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Next-Generation Health Technology
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
              Cutting-edge AI algorithms combined with medical expertise to provide unprecedented insights into rare conditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="medical-card">
                <div className="bg-gradient-primary w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-medical-blue/20">
                  <i className={`${feature.icon} text-white text-lg`}></i>
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/50">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm pt-2 text-slate-600 dark:text-slate-300">
                      <i className="fas fa-check-circle text-emerald-500"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Simple Steps to Better Health
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
              Get started with SymptomAI in just a few easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-medical-blue/20 group-hover:scale-105 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="bg-gradient-success absolute -top-1.5 -right-1.5 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md">
                    <i className={step.icon}></i>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-amber-400 text-slate-900 uppercase tracking-widest">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready to Transform Your Health Management?
          </h2>
          <p className="text-slate-100 text-base md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
            Navigating a rare condition can feel like walking in the dark. Our AI-powered journal helps you document your symptoms, analyze patterns, and discover possible conditions before they become critical.
          </p>
          
          <div className="pt-6 flex justify-center">
            <Link to="/register">
              <button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                <i className="fas fa-rocket mr-2"></i>
                Get Started
                <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-medical py-16 bg-slate-950 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            
            {/* Branding Column */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <img 
                  src="./SymptoScopeLogo.png" 
                  alt="SymptoScope Logo" 
                  className="w-12 h-12 object-contain" 
                />
                <span className="font-extrabold text-xl text-gradient-primary">SymptoScope</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Empowering patients with rare conditions through AI-driven insights and personalized health tracking.
              </p>
              <div className="flex gap-3 pt-2">
                {["fa-twitter", "fa-linkedin", "fa-facebook"].map((social, i) => (
                  <button 
                    key={i} 
                    className="w-9 h-9 rounded-full border border-slate-800 hover:border-sky-500 hover:bg-sky-500/10 text-slate-400 hover:text-sky-400 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <i className={`fab ${social}`}></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-slate-300">Product</h5>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {["Features", "Security", "Mobile Apps"].map((item, i) => (
                  <li key={i}>
                    <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-sky-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-slate-300">Company</h5>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {["About", "Press", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-sky-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-slate-300">Legal</h5>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {["Privacy", "Terms", "Cookies"].map((item, i) => (
                  <li key={i}>
                    <Link to={`/${item.toLowerCase()}`} className="hover:text-sky-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <hr className="border-slate-900 my-10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 SymptoScope. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <i className="fas fa-shield-alt text-emerald-500"></i>
              HIPAA Compliant • SOC 2 Secure
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
