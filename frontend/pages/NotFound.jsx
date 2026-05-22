import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Stethoscope, Home, ArrowLeft, HeartPulse, Activity } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/40 dark:bg-sky-950/20 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-950/20 rounded-full blur-3xl animate-pulse translate-x-1/2 translate-y-1/2" />

      {/* Floating background decorative medical icons */}
      <div className="absolute top-1/3 right-1/4 text-sky-500/10 dark:text-sky-500/5 animate-bounce" style={{ animationDuration: '6s' }}>
        <HeartPulse size={48} />
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-indigo-500/10 dark:text-indigo-500/5 animate-bounce" style={{ animationDuration: '8s' }}>
        <Activity size={40} />
      </div>

      <div className="relative max-w-md w-full text-center z-10">
        {/* Animated Stethoscope / 404 Graphic */}
        <div className="flex justify-center mb-8 relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/20 dark:shadow-sky-950/40 animate-pulse">
            <Stethoscope className="text-white w-16 h-16 animate-[spin_10s_linear_infinite]" />
          </div>
          {/* Pulsing Alert Indicator */}
          <div className="absolute top-0 right-[calc(50%-4rem)] w-6 h-6 bg-rose-500 border-4 border-slate-50 dark:border-slate-950 rounded-full animate-ping" />
          <div className="absolute top-0 right-[calc(50%-4rem)] w-6 h-6 bg-rose-500 border-4 border-slate-50 dark:border-slate-950 rounded-full" />
        </div>

        {/* 404 Error Numbers */}
        <h1 className="text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 select-none">
          404
        </h1>

        {/* Informative Subtext */}
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-slate-100">
          Diagnosing the Route...
        </h2>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
          We searched all medical files, but <span className="font-semibold text-sky-600 dark:text-sky-400">"{location.pathname}"</span> doesn't seem to exist. It might have been moved or removed.
        </p>

        {/* Interactive Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
