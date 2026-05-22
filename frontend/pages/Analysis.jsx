import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Heart, Brain, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// Mock data for demonstrations
const vitalTrends = [
  { date: '2024-01', heartRate: 72, bloodPressure: 120, temperature: 98.6 },
  { date: '2024-02', heartRate: 74, bloodPressure: 118, temperature: 98.4 },
  { date: '2024-03', heartRate: 71, bloodPressure: 122, temperature: 98.7 },
  { date: '2024-04', heartRate: 73, bloodPressure: 119, temperature: 98.5 },
  { date: '2024-05', heartRate: 75, bloodPressure: 121, temperature: 98.6 },
  { date: '2024-06', heartRate: 70, bloodPressure: 117, temperature: 98.3 }
];

const riskFactors = [
  { name: 'Cardiovascular', value: 15, color: '#ef4444' },
  { name: 'Diabetes', value: 8, color: '#f97316' },
  { name: 'Respiratory', value: 12, color: '#eab308' },
  { name: 'Mental Health', value: 22, color: '#06b6d4' },
  { name: 'Low Risk', value: 43, color: '#10b981' }
];

const patientDemographics = [
  { ageGroup: '18-30', count: 145, percentage: 25 },
  { ageGroup: '31-45', count: 210, percentage: 36 },
  { ageGroup: '46-60', count: 132, percentage: 23 },
  { ageGroup: '60+', count: 93, percentage: 16 }
];

const aiPredictions = [
  { condition: 'Hypertension', confidence: 78, trend: 'up', risk: 'moderate' },
  { condition: 'Diabetes Type 2', confidence: 65, trend: 'stable', risk: 'low' },
  { condition: 'Heart Disease', confidence: 42, trend: 'down', risk: 'low' },
  { condition: 'Mental Health', confidence: 89, trend: 'up', risk: 'high' }
];

export default function Analysis() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  const StatCard = ({ icon: Icon, title, value, change, trend }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-100/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 dark:to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-2">
          <h6 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h6>
          <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{value}</h3>
          <p className={`text-xs font-bold flex items-center gap-1 mt-1 ${
            trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-slate-400'
          }`}>
            {trend === 'up' ? <TrendingUp size={14} /> : trend === 'down' ? <TrendingDown size={14} /> : <Activity size={14} />}
            {change}
          </p>
        </div>
        <div className="p-3 bg-medical-blue/10 dark:bg-sky-500/10 text-medical-blue dark:text-sky-400 rounded-2xl group-hover:scale-110 transition-transform">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );

  const PredictionCard = ({ condition, confidence, trend, risk }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-lg shadow-slate-100/30 dark:shadow-none space-y-4">
      <div className="flex justify-between items-center">
        <h5 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 tracking-tight">{condition}</h5>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
          risk === 'high' 
            ? 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400' 
            : risk === 'moderate' 
            ? 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400' 
            : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
        }`}>
          {risk} RISK
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Confidence: {confidence}%</span>
        <span className={`p-1.5 rounded-lg border ${
          trend === 'up' 
            ? 'border-red-500/20 bg-red-500/10 text-red-500' 
            : trend === 'down' 
            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' 
            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-400'
        }`}>
          {trend === 'up' ? <TrendingUp size={14} /> : trend === 'down' ? <TrendingDown size={14} /> : <Activity size={14} />}
        </span>
      </div>

      <div className="space-y-1">
        <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-primary h-full rounded-full transition-all duration-500" 
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 text-center flex items-center justify-center gap-1">
          <Clock size={10} />
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-500/10 text-medical-blue dark:text-sky-400 tracking-wider uppercase">
            Data Synthesis Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gradient-primary tracking-tight">
            AI Analytics & Insights
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-semibold leading-relaxed">
            Advanced pattern recognition and predictive wellness models compiled for patient safety.
          </p>
        </div>

        {/* Tab & Timeline Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'trends', label: 'Health Trends' },
              { id: 'predictions', label: 'AI Predictions' },
              { id: 'demographics', label: 'Demographics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white shadow-md shadow-medical-blue/20'
                    : 'text-slate-500 dark:text-slate-450 hover:text-slate-850 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-medical-blue/15 transition-all cursor-pointer"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Key Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard
                icon={Users}
                title="Total Patients"
                value="1,247"
                change="+12% from last month"
                trend="up"
              />
              <StatCard
                icon={Activity}
                title="Active Monitoring"
                value="892"
                change="+8% from last month"
                trend="up"
              />
              <StatCard
                icon={AlertTriangle}
                title="High Risk Cases"
                value="34"
                change="-5% from last month"
                trend="down"
              />
              <StatCard
                icon={CheckCircle}
                title="Resolved Cases"
                value="156"
                change="+18% from last month"
                trend="up"
              />
            </div>

            {/* Quick Insights Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-850 pb-4">
                <span className="h-2 w-2 rounded-full bg-medical-blue animate-pulse"></span>
                <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                  Key Insights
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { text: "Overall patient health trending positively", color: "bg-emerald-500" },
                  { text: "Mental health support showing increased demand", color: "bg-medical-blue" },
                  { text: "Seasonal patterns detected in respiratory conditions", color: "bg-amber-500" }
                ].map((insight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl">
                    <span className={`h-2.5 w-2.5 rounded-full ${insight.color} flex-shrink-0`}></span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{insight.text}</span>
                  </div>
                ))}

                {[
                  { text: "AI model accuracy improved by 12% this quarter", color: "bg-purple-500" },
                  { text: "Early intervention reduced hospital readmissions by 23%", color: "bg-red-500" },
                  { text: "Patient engagement with digital tools up 31%", color: "bg-indigo-500" }
                ].map((insight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-2xl">
                    <span className={`h-2.5 w-2.5 rounded-full ${insight.color} flex-shrink-0`}></span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{insight.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Health Trends Tab Content */}
        {activeTab === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 animate-fade-in">
            {/* Vital Signs Trends */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800/80 pb-3">
                Vital Signs Trends
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 'bold', paddingTop: 10 }} />
                    <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={3} name="Heart Rate (BPM)" activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="bloodPressure" stroke="#0ea5e9" strokeWidth={3} name="Blood Pressure (Systolic)" activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk Factor Distribution */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800/80 pb-3">
                Risk Factor Distribution
              </h3>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskFactors}
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {riskFactors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* AI Predictions Tab Content */}
        {activeTab === 'predictions' && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Predictions List Container */}
            <div className="bg-gradient-to-r from-medical-blue via-indigo-500 to-indigo-600 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight">AI Risk Predictions</h3>
                    <p className="text-xs text-slate-200">Neural Network Model v2.1 (Optimized)</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center px-4 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-bold tracking-wider uppercase">
                    Active Assessment
                  </span>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiPredictions.map((prediction, index) => (
                  <PredictionCard key={index} {...prediction} />
                ))}
              </div>
            </div>

            {/* Performance Metrics Block */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase">
                  Model Performance Metrics
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Overall Accuracy", value: 94.2, icon: CheckCircle, gradient: "from-blue-500 to-sky-600", text: "text-blue-500", progressBg: "bg-blue-500" },
                  { name: "Sensitivity", value: 89.7, icon: TrendingUp, gradient: "from-emerald-500 to-teal-600", text: "text-emerald-500", progressBg: "bg-emerald-500" },
                  { name: "Specificity", value: 91.4, icon: Activity, gradient: "from-purple-500 to-indigo-600", text: "text-purple-500", progressBg: "bg-purple-500" }
                ].map((metric, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-3xl p-6 flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full bg-slate-100 dark:bg-slate-900 ${metric.text}`}>
                      <metric.icon size={26} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                        {metric.value}%
                      </h3>
                      <h6 className="text-xs font-bold text-slate-500 dark:text-slate-405 uppercase tracking-wide">
                        {metric.name}
                      </h6>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${metric.progressBg} rounded-full`} style={{ width: `${metric.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-2">
                <button className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-full text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2">
                  <Heart size={16} className="text-red-500" />
                  AI Model Status: Optimized & Active
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demographics Tab Content */}
        {activeTab === 'demographics' && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Chart Grid */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide border-b border-slate-100 dark:border-slate-800/80 pb-3">
                Patient Demographics age trends
              </h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={patientDemographics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:hidden" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
                    <XAxis dataKey="ageGroup" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
                    <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Demographics Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {patientDemographics.map((demo, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl p-6 text-center space-y-4 shadow-md">
                  <div className="p-3.5 bg-sky-500/10 text-medical-blue dark:text-sky-400 rounded-full inline-flex">
                    <Users size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      {demo.count}
                    </h3>
                    <h6 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {demo.ageGroup} years
                    </h6>
                    <h4 className="text-sm font-extrabold text-medical-blue dark:text-sky-400">
                      {demo.percentage}% of total
                    </h4>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-primary h-full rounded-full" style={{ width: `${demo.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
