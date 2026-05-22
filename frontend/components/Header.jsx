import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle.jsx";
import { UseAuth } from "../contexts/AuthContext.jsx";
import { Bell, Menu, X, LogOut, User } from "lucide-react";

export function Header() {
  const { isLogin, logout } = UseAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const [notifications] = useState([
    { id: 1, title: "New AI Insight", message: "Pattern detected in your symptoms", unread: true },
    { id: 2, title: "Medication Reminder", message: "Time for your evening dose", unread: true },
    { id: 3, title: "Appointment Tomorrow", message: "Dr. Smith at 2:00 PM", unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 py-2 ${
      isActive
        ? "text-medical-blue dark:text-sky-400"
        : "text-slate-600 dark:text-slate-300 hover:text-medical-blue dark:hover:text-sky-400"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
          <img 
            src="/SymptoScopeLogo.png" 
            alt="SymptoScope Logo" 
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="font-extrabold text-xl md:text-2xl text-gradient-primary">
            SymptoScope
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          {isLogin && (
            <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors focus:outline-none cursor-pointer"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center border border-white dark:border-slate-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)} />
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 py-2 divide-y divide-slate-100 dark:divide-slate-800/80 animate-fade-in">
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Notifications</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-2">
                        <div className="flex-grow">
                          <h6 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-0.5">
                            {notification.title}
                          </h6>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {notification.message}
                          </p>
                        </div>
                        {notification.unread && (
                          <span className="h-2 w-2 bg-sky-500 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Auth Button Logic */}
          {!isLogin ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-medical-blue dark:hover:text-sky-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-medical-blue dark:hover:text-sky-400 transition-colors"
              >
                <User size={16} />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 hover:text-red-600 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg focus:outline-none transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Responsive Navigation Overlay */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 px-6 py-6 flex flex-col gap-5 shadow-xl lg:hidden animate-slide-up">
            
            <nav className="flex flex-col gap-3">
              <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/about" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>About</NavLink>
              <NavLink to="/contact" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
              {isLogin && (
                <NavLink to="/dashboard" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
              )}
            </nav>

            <hr className="border-slate-100 dark:border-slate-800/80 my-1" />

            {/* Mobile Controls */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Theme</span>
              <ThemeToggle />
            </div>

            {/* Mobile Notification Status */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Notifications</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-full">
                  {unreadCount} unread
                </span>
              </div>
            )}

            <hr className="border-slate-100 dark:border-slate-800/80 my-1" />

            {/* Mobile Auth Button Logic */}
            {!isLogin ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-full font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-full font-bold bg-gradient-primary text-white hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/profile"
                  className="w-full text-center py-2.5 rounded-full font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 rounded-full font-bold bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </>
      )}
    </header>
  );
}
