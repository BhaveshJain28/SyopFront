import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { UseAuth } from "../contexts/AuthContext.jsx";
import { User, Activity, Stethoscope, History, Brain, RotateCcw, CheckCircle2, Shield, Check, Info, Heart, Thermometer, Weight, AlertTriangle } from "lucide-react";

export default function HealthJournal() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    medicalHistory: "",
    medications: "",
    allergies: "",
    lifestyle: "",
    familyHistory: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: ""
  });
  
  const { token, backendUrl } = UseAuth();
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const AiCardRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!formData.symptoms) {
      alert("Please enter your symptoms");
      setIsLoading(false);
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/journal`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await handlegeminiresponse();
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting journal entry:", error);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else {
        alert("An error occurred while submitting your log. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handlegeminiresponse = async () => {
    try {
      const gemini_response = await axios.post(`${backendUrl}/api/gemini/generate`, { symptoms: formData.symptoms }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { generatedText } = gemini_response.data;
      const geminiData = JSON.parse(generatedText);
      setPrediction(geminiData);
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      alert("AI insights are temporarily unavailable, but your symptoms have been logged successfully.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      symptoms: "",
      medicalHistory: "",
      medications: "",
      allergies: "",
      lifestyle: "",
      familyHistory: "",
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: ""
    });
    setPrediction(null);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    if (prediction && AiCardRef.current) {
      setTimeout(() => {
        AiCardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: "start"
        });
      }, 100);
    }
  }, [prediction]);

  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Main Card Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden relative">
          
          {/* Glowing gradient panel head */}
          <div className="bg-gradient-to-r from-medical-blue via-indigo-500 to-indigo-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-10 px-6 sm:px-8 text-center text-white relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-extrabold bg-white/10 dark:bg-sky-500/10 text-white dark:text-sky-400 backdrop-blur-md uppercase tracking-wider">
                Interactive Logging Portal
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Health Journal
              </h2>
              <p className="text-slate-200 dark:text-slate-400 text-xs sm:text-sm font-semibold opacity-90">
                {getCurrentDate()}
              </p>
            </div>
            
            {/* Wave shape divider */}
            <div className="absolute bottom-0 left-0 w-100 overflow-hidden leading-[0]">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] fill-white dark:fill-slate-900">
                <path d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z"></path>
              </svg>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="px-6 sm:px-10 pb-10 space-y-8 mt-6">
            
            {/* 1. Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="p-2 bg-medical-blue/10 text-medical-blue rounded-xl">
                  <User size={18} />
                </div>
                <h4 className="text-lg font-black tracking-wide uppercase text-slate-800 dark:text-slate-100">
                  Personal Information
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8 space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-600 shadow-sm"
                    placeholder="Age"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Vital Signs Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <Activity size={18} />
                </div>
                <h4 className="text-lg font-black tracking-wide uppercase text-slate-800 dark:text-slate-100">
                  Vital Signs
                </h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity size={14} className="text-red-500" />
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm"
                    placeholder="e.g. 120/80"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart size={14} className="text-emerald-500" />
                    Heart Rate
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm"
                    placeholder="BPM"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Thermometer size={14} className="text-orange-500" />
                    Temperature
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm"
                    placeholder="e.g. 98.6°F"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Weight size={14} className="text-purple-500" />
                    Weight
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm"
                    placeholder="kg"
                  />
                </div>
              </div>
            </div>

            {/* 3. Current Symptoms Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="p-2 bg-sky-500/10 text-sky-500 rounded-xl">
                  <Stethoscope size={18} />
                </div>
                <h4 className="text-lg font-black tracking-wide uppercase text-slate-800 dark:text-slate-100">
                  Current Symptoms
                </h4>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">How are you feeling today? <span className="text-red-500">*</span></label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm leading-relaxed"
                    placeholder="Describe your current symptoms in detail (e.g. fatigue level, high fever, joint swelling, persistent dry cough)..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Medications</label>
                    <textarea
                      name="medications"
                      value={formData.medications}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm leading-relaxed"
                      placeholder="List medications you're currently taking..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Known Allergies</label>
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-200 dark:border-sky-950/40 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm leading-relaxed"
                      placeholder="Any allergies to medications, foods, or environment..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Medical Background Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
                  <History size={18} />
                </div>
                <h4 className="text-lg font-black tracking-wide uppercase text-slate-800 dark:text-slate-100">
                  Medical Background
                </h4>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Past Medical History</label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-indigo-500/5 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-950/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm leading-relaxed"
                      placeholder="Previous diagnoses, surgeries, hospitalizations..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Family History</label>
                    <textarea
                      name="familyHistory"
                      value={formData.familyHistory}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-indigo-500/5 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-950/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm leading-relaxed"
                      placeholder="Family history of diabetes, hypertension, rare immune disorders..."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lifestyle Factors</label>
                  <textarea
                    name="lifestyle"
                    value={formData.lifestyle}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-indigo-500/5 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-950/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm transition-all dark:placeholder-slate-700 shadow-sm leading-relaxed"
                    placeholder="Exercise routine, typical diet, sleep hours, stress loads..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-primary text-white rounded-full font-bold shadow-lg shadow-medical-blue/20 hover:shadow-xl hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-base"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing Your Health...
                  </>
                ) : (
                  <>
                    <Brain size={18} />
                    Get AI Health Insights
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-8 py-4 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-full font-bold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <RotateCcw size={18} />
                Clear Form
              </button>
            </div>

          </div>
        </div>

        {/* Prediction Results Display */}
        {prediction && (
          <div ref={AiCardRef} className="mt-8 scroll-mt-24 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-none overflow-hidden relative p-6 sm:p-8 space-y-6">
              
              {/* Glowing decorative indicator */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-primary"></div>
              
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-gradient-primary text-white rounded-full shadow-lg shadow-medical-blue/25">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  Your AI Health Analysis
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold max-w-md mx-auto">
                  Based on deep machine-learning evaluations of your logs. Please review recommendations.
                </p>
              </div>

              {/* Assessment Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Primary Condition Block */}
                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-2xl p-5 text-center flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Primary Suspected Condition</span>
                    <h4 className="text-lg font-black text-slate-800 dark:text-slate-200">
                      {prediction.primaryCondition}
                    </h4>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-4.5 py-1.5 bg-medical-blue/15 text-medical-blue dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-wider">
                      Confidence: {prediction.percentMatchPrimary}%
                    </span>
                  </div>
                </div>

                {/* Risk Assessment Block */}
                <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-2xl p-5 text-center flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">AI Risk Assessment</span>
                    <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                      {prediction.riskAssessment}
                    </h4>
                  </div>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                      prediction.riskAssessment?.toLowerCase() === 'low'
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : prediction.riskAssessment?.toLowerCase() === 'medium'
                        ? 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
                    }`}>
                      <Shield size={13} />
                      {prediction.riskAssessment?.toLowerCase() === 'low' ? 'Good Standing' : 'Urgent Assessment'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Recommendations Block */}
              <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-2xl p-5 sm:p-6 space-y-4">
                <h5 className="font-black text-base text-slate-800 dark:text-slate-150 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-medical-blue">💡</span>
                  Suggested Recommendations
                </h5>
                <div className="grid grid-cols-1 gap-3">
                  {prediction.recommendation?.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl">
                      <span className="p-1 bg-emerald-500 text-white rounded-full mt-0.5 flex-shrink-0">
                        <Check size={12} className="stroke-[3]" />
                      </span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">
                        {rec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Disclaimer Banner */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-950/30 rounded-2xl p-4.5 flex gap-3 text-amber-700 dark:text-amber-400 text-sm">
                <AlertTriangle size={20} className="flex-shrink-0 mt-0.5 text-amber-500" />
                <div className="space-y-1">
                  <h6 className="font-bold text-amber-800 dark:text-amber-300">Important Medical Disclaimer</h6>
                  <p className="text-xs leading-relaxed font-semibold opacity-90">
                    This AI-generated summary is for informational support only and does not substitute for clinical diagnostics, prescription plans, or standard professional medical advice. Always contact a certified clinic or healthcare provider for emergency diagnosis or treatment programs.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}