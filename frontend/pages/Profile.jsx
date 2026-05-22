import React, { useState, useEffect } from 'react';
import { User, Edit3, Shield, Phone, Mail, Camera, Save, Eye, EyeOff, CheckCircle2, Lock, Sparkles, Heart } from 'lucide-react';
import { UseAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = UseAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Custom Profile state initialized with real user context or localStorage overrides
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    age: '38',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  });

  // Settings states
  const [shareData, setShareData] = useState(false);
  const [thirdPartyIntegrations, setThirdPartyIntegrations] = useState(true);

  // Sync state from authenticated user and localStorage overrides
  useEffect(() => {
    const cachedData = localStorage.getItem('symptoscope_profile_addons');
    let parsedCache = {};
    if (cachedData) {
      try {
        parsedCache = JSON.parse(cachedData);
      } catch (e) {
        console.error("Failed to parse profile cache:", e);
      }
    }

    setProfileData({
      firstName: user?.FirstName || parsedCache.firstName || 'John',
      lastName: user?.LastName || parsedCache.lastName || 'Doe',
      email: user?.email || parsedCache.email || 'john.doe@email.com',
      phone: parsedCache.phone || '+1 (555) 123-4567',
      age: parsedCache.age || '38',
      avatar: parsedCache.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'
    });

    if (parsedCache.shareData !== undefined) setShareData(parsedCache.shareData);
    if (parsedCache.thirdPartyIntegrations !== undefined) setThirdPartyIntegrations(parsedCache.thirdPartyIntegrations);
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage for demo persistence
    localStorage.setItem('symptoscope_profile_addons', JSON.stringify({
      ...profileData,
      shareData,
      thirdPartyIntegrations
    }));
    
    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleAvatarChange = () => {
    // Generate a new cute Unsplash avatar for fun when clicked
    const randomAvatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
    ];
    const nextAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
    handleInputChange('avatar', nextAvatar);
    
    // Auto-save this right away
    const cachedData = localStorage.getItem('symptoscope_profile_addons');
    const parsedCache = cachedData ? JSON.parse(cachedData) : {};
    localStorage.setItem('symptoscope_profile_addons', JSON.stringify({
      ...parsedCache,
      avatar: nextAvatar
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 pt-28 pb-16 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/30 dark:bg-sky-950/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-950/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-[slideIn_0.3s_ease-out] border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
          <div>
            <p className="font-bold">Profile Updated!</p>
            <p className="text-xs text-emerald-100">Changes saved to your device dashboard.</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Profile Summary Card */}
        <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-sky-500/10 dark:shadow-indigo-950/30 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-6 -translate-y-6 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <Heart size={200} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              
              {/* Profile Avatar with Hover Effect */}
              <div className="relative group/avatar cursor-pointer" onClick={handleAvatarChange}>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 hover:border-white shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-md flex items-center justify-center">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="Profile Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-sky-600 hover:bg-sky-700 text-white rounded-full flex items-center justify-center shadow-lg border border-white transition-colors duration-200">
                  <Camera size={14} />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-[10px] text-white font-semibold">Change</span>
                </div>
              </div>

              {/* Patient Meta Details */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-spin-slow" /> Patient Profile
                  </span>
                </div>
                <p className="text-sky-100 text-sm sm:text-base mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <Mail size={14} /> {profileData.email}
                </p>
                <p className="text-sky-200 text-xs sm:text-sm mt-0.5">
                  Age: <span className="font-semibold text-white">{profileData.age} years</span> • Status: <span className="font-semibold text-emerald-300">Active</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isEditing) {
                  // Revert from cached
                  const cachedData = localStorage.getItem('symptoscope_profile_addons');
                  if (cachedData) {
                    try {
                      const parsed = JSON.parse(cachedData);
                      setProfileData(prev => ({ ...prev, ...parsed }));
                    } catch(e){}
                  }
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 backdrop-blur-md text-white font-medium text-sm transition-all duration-200 flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Edit3 size={16} />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Card and Form Details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300">
          
          {/* Dashboard Tabs Bar */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex-1 py-4 sm:py-5 px-4 font-semibold text-sm flex items-center justify-center gap-2 border-b-2 transition-all duration-300 ${
                activeTab === 'personal'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <User size={18} />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 sm:py-5 px-4 font-semibold text-sm flex items-center justify-center gap-2 border-b-2 transition-all duration-300 ${
                activeTab === 'privacy'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Shield size={18} />
              Privacy & Security
            </button>
          </div>

          <div className="p-6 sm:p-10">
            
            {/* Tab: Personal Details */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Personal Information</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Manage your personal demographics and contact coordinates.</p>
                  </div>
                  {isEditing && (
                    <span className="text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-semibold px-3 py-1 rounded-full border border-amber-200/50 dark:border-amber-900/30 animate-pulse">
                      Unsaved Changes
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* First Name Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter first name"
                      className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
                        isEditing
                          ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter last name"
                      className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
                        isEditing
                          ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  {/* Email Address Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter email address"
                        className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
                          isEditing
                            ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                        className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
                          isEditing
                            ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Age Field */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Age (years)</label>
                    <input
                      type="number"
                      value={profileData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      disabled={!isEditing}
                      min="1"
                      max="120"
                      placeholder="Enter age"
                      className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
                        isEditing
                          ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  {/* Blood Type Placeholder (Read-only aesthetic field) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Blood Group</label>
                    <input
                      type="text"
                      value="O Positive (O+)"
                      disabled={true}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-400 cursor-not-allowed rounded-xl text-sm font-medium transition-colors"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* Tab: Privacy & Security */}
            {activeTab === 'privacy' && (
              <div className="space-y-8">
                
                {/* Password Section */}
                <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/60 p-6 sm:p-8 rounded-2xl">
                  <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">Change Account Password</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Ensure your account uses a secure password to protect health details.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Current Password */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 rounded-xl text-sm outline-none transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block"></div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 rounded-xl text-sm outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Re-type new password"
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 rounded-xl text-sm outline-none transition-all duration-200"
                      />
                    </div>

                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSuccessToast(true);
                        setTimeout(() => setShowSuccessToast(false), 4000);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Data Privacy Controls */}
                <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/60 p-6 sm:p-8 rounded-2xl">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Data Privacy & Research Consent</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Manage how your diagnostic results and symptoms log data are integrated and securely handled.</p>
                  
                  <div className="space-y-5">
                    
                    {/* Toggle: Share Data */}
                    <div className="flex items-center justify-between gap-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40">
                      <div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Anonymized Medical Research</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Allows SymptoScope models to train on anonymous vitals data to improve diagnosis accuracy.</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShareData(!shareData);
                          // Auto save in background
                          const cached = localStorage.getItem('symptoscope_profile_addons');
                          const parsed = cached ? JSON.parse(cached) : {};
                          localStorage.setItem('symptoscope_profile_addons', JSON.stringify({ ...parsed, shareData: !shareData }));
                        }}
                        className={`relative w-12 h-6.5 rounded-full transition-colors duration-300 focus:outline-none ${
                          shareData ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                            shareData ? 'translate-x-5.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Toggle: Third-party integrations */}
                    <div className="flex items-center justify-between gap-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40">
                      <div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Wearable Device Health Connect</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Sync dynamic heartbeat and physical activity indices automatically from connected smartbands.</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setThirdPartyIntegrations(!thirdPartyIntegrations);
                          // Auto save in background
                          const cached = localStorage.getItem('symptoscope_profile_addons');
                          const parsed = cached ? JSON.parse(cached) : {};
                          localStorage.setItem('symptoscope_profile_addons', JSON.stringify({ ...parsed, thirdPartyIntegrations: !thirdPartyIntegrations }));
                        }}
                        className={`relative w-12 h-6.5 rounded-full transition-colors duration-300 focus:outline-none ${
                          thirdPartyIntegrations ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                            thirdPartyIntegrations ? 'translate-x-5.5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* Bottom Actions for personal settings edit mode */}
            {isEditing && activeTab === 'personal' && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 animate-[fadeIn_0.3s_ease-out]">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}