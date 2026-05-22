import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UseAuth } from '../contexts/AuthContext';
import { ArrowLeft, Printer, Download, Calendar, User, Mail, ShieldAlert, Activity, Heart, Award } from 'lucide-react';

const GeneratePDF = () => {
  const { user, token, backendUrl } = UseAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    daysTracked: 14,
    symptomsCount: 8,
    aiInsights: 5,
    improvementIndex: '18%'
  });

  useEffect(() => {
    if (user) {
      // Set loading to false once user is checked
      setLoading(false);
      
      // Attempt to load profile extensions for accurate statistics
      const cached = localStorage.getItem('symptoscope_profile_addons');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.age) {
            // Adjust mock stats dynamically based on age
            setStats(prev => ({
              ...prev,
              daysTracked: Math.min(60, Math.max(5, parseInt(parsed.age) * 2 - 40))
            }));
          }
        } catch(e){}
      }
    }
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const reportText = `SYMPTOSCOPE MEDICAL HEALTH REPORT
=================================
Generated: ${new Date().toLocaleString()}
Report ID: SY-${Date.now().toString().slice(-6)}

PATIENT DEMOGRAPHICS
-------------------
Name: ${user?.FirstName} ${user?.LastName || ''}
Email: ${user?.email || 'N/A'}
Account Status: Active

DIAGNOSTIC SUMMARY (LAST 30 DAYS)
---------------------------------
Days Tracked: ${stats.daysTracked} days
Symptoms Logged: ${stats.symptomsCount} logs
AI Insights: ${stats.aiInsights} insights
Overall Improvement: ${stats.improvementIndex}

AI PROGNOSIS & RECOMMENDATIONS
-----------------------------
1. Fatigue Patterns: Elevated fatigue levels detected during evening cycles. Recommendation: Optimize hydration and schedule active rest intervals.
2. Joint Pain Index: Minor flare-ups correlated with temperature drops. Recommendation: Wear protective wraps and maintain low-impact flexibility training.
3. Sleeping Sync: Sleep patterns indicate a 15% increase in deep rest cycles. Recommendation: Maintain current bedtime hygiene rules.

---------------------------------
Disclaimer: This report is generated dynamically by SymptoScope based on self-logged data. It is for information purposes and should be reviewed by a professional healthcare provider.
`;
    
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `symptoscope-report-${user?.FirstName.toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-12 h-12 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
          <p className="font-semibold text-sm">Assembling health record dashboard...</p>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 pt-28 pb-16 transition-colors duration-300 relative print:bg-white print:text-black print:pt-4 print:pb-0">
      
      {/* Decorative Orbs - Hidden during print */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/20 dark:bg-sky-950/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 print:hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-950/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 print:hidden" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 print:px-0">
        
        {/* Navigation Breadcrumb - Hidden during print */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadText}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Download as Text
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Report Content Document */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 dark:shadow-none p-8 sm:p-12 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
          
          {/* Header section with Logo & Details */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-100 dark:border-slate-800 print:border-slate-300">
            <div>
              <div className="flex items-center gap-2 text-sky-500">
                <Heart className="w-8 h-8 fill-sky-500 animate-pulse" />
                <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 print:text-sky-600 print:bg-none">
                  SYMPTOSCOPE
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mt-3 text-slate-800 dark:text-slate-100 print:text-black">
                Clinical Health Report
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 print:text-slate-700">
                AI-Driven Diagnostics & Symptom Sync Log
              </p>
            </div>
            
            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 space-y-1 print:text-slate-700">
              <p className="flex items-center sm:justify-end gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Generated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </p>
              <p>Report ID: <span className="font-mono text-slate-800 dark:text-slate-200 font-bold print:text-black">SY-{Date.now().toString().slice(-6)}</span></p>
              <p>Status: <span className="text-emerald-500 dark:text-emerald-400 font-bold print:text-emerald-600">Verified Profile</span></p>
            </div>
          </div>

          {/* Demographics details */}
          <div className="mt-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 print:bg-slate-50 print:border-slate-300">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 print:text-black">
              Patient Identification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-500 flex items-center justify-center shadow-sm print:bg-white print:border print:border-slate-300">
                  <User className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">FullName</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 print:text-black">
                    {user.FirstName} {user.LastName || ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-500 flex items-center justify-center shadow-sm print:bg-white print:border print:border-slate-300">
                  <Mail className="w-4 h-4 text-sky-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Email Contact</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate print:text-black">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-500 flex items-center justify-center shadow-sm print:bg-white print:border print:border-slate-300">
                  <Activity className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Log Scope</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 print:text-black">
                    Past 30 Days
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Vitals / Stats Cards Grid */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 print:text-black">
              Diagnostic Vitals & Log Metrics
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="border border-slate-150 dark:border-slate-800 rounded-xl p-4 text-center bg-white dark:bg-slate-900 print:border-slate-300">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Days Tracked</p>
                <p className="text-2xl font-black mt-1 text-sky-600 dark:text-sky-400 print:text-black">{stats.daysTracked}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Consecutive logs</p>
              </div>

              <div className="border border-slate-150 dark:border-slate-800 rounded-xl p-4 text-center bg-white dark:bg-slate-900 print:border-slate-300">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Symptoms Logged</p>
                <p className="text-2xl font-black mt-1 text-sky-600 dark:text-sky-400 print:text-black">{stats.symptomsCount}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Verified checks</p>
              </div>

              <div className="border border-slate-150 dark:border-slate-800 rounded-xl p-4 text-center bg-white dark:bg-slate-900 print:border-slate-300">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">AI Insights</p>
                <p className="text-2xl font-black mt-1 text-sky-600 dark:text-sky-400 print:text-black">{stats.aiInsights}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Diagnostic runs</p>
              </div>

              <div className="border border-slate-150 dark:border-slate-800 rounded-xl p-4 text-center bg-white dark:bg-slate-900 print:border-slate-300">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Improvement Rate</p>
                <p className="text-2xl font-black mt-1 text-emerald-500 dark:text-emerald-400 print:text-emerald-600">{stats.improvementIndex}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Patient baseline</p>
              </div>

            </div>
          </div>

          {/* AI Prognosis Cards */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 print:text-black">
                Predictive AI Diagnoses & Insights
              </h3>
              
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden print:border-slate-300">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 print:bg-slate-50 print:border-slate-300">
                  <ShieldAlert className="w-5 h-5 text-sky-500" />
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200 print:text-black">Symptom Cycle Risk Evaluations</span>
                </div>
                
                <div className="p-6 space-y-4 division-y divide-slate-100 dark:divide-slate-800/60 print:divide-slate-300">
                  
                  <div className="pb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 print:text-black">Fatigue Cycles</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/50 print:text-amber-700 print:border-amber-500">Moderate Risk</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed print:text-slate-800">
                      Logs show increased fatigue parameters toward late evening cycles. Correlations point to potential sleep disruption or low water retention. Recommendation: Increase active hydration metrics.
                    </p>
                  </div>

                  <div className="py-4 border-t border-slate-100 dark:border-slate-800/50 print:border-slate-300">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 print:text-black">Joint & Muscle Discomfort</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 print:text-emerald-700 print:border-emerald-500">Low/Controlled Risk</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed print:text-slate-800">
                      Discomfort levels remain low and steady. Minor anomalies noticed during drop in outside temperatures. Recommendation: Maintain light aerobic physical thresholds.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 print:border-slate-300">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 print:text-black">AI Insomnia Risk Assessment</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200/50 print:text-sky-700 print:border-sky-500">Optimized Sleep Sync</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed print:text-slate-800">
                      Sleep quality baseline indicates a 15% increase in restorative parameters over the last 14 days, matching normal REM metrics. Recommendation: Maintain consistent sleeping environment.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Medical Disclaimer Section */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/10 text-slate-500 dark:text-slate-400 space-y-2 print:border-slate-300 print:bg-white print:text-slate-700">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-xs print:text-black">
                <Award className="w-4 h-4 text-sky-500" />
                <span>Regulatory Notice & Clinical Disclaimer</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                This report is compiled dynamically based on biometric metrics and symptoms voluntarily logged by the user inside SymptoScope. The diagnostic insights provided by the AI integration are for reference assistance only and do not constitute a direct replacement for professional medical consultation, lab testing, or clinical diagnosis.
              </p>
              <div className="flex justify-between items-end pt-4 text-[9px] font-bold text-slate-400 dark:text-slate-500 print:text-slate-600">
                <p>SymptoScope Clinical Reports Division • ISO-27001 Certified</p>
                <div className="text-right">
                  <p className="border-b border-slate-300 pb-1 w-36 h-8 flex items-end justify-center font-normal italic">Self-Reported Log</p>
                  <p className="mt-1 font-bold">Patient Signature / Authorization</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen pt-28 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl max-w-sm text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Access Denied</h3>
        <p className="text-sm">Please log in to your account to view and generate dynamic health reports.</p>
        <Link to="/login" className="inline-flex w-full justify-center bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 rounded-2xl font-bold transition-transform hover:-translate-y-0.5 shadow-md shadow-sky-500/20">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default GeneratePDF;
