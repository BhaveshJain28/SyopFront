import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, ClipboardList, Brain, TrendingUp, Plus, BarChart3, FileText, Clock, Target, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { user, token, backendUrl, isLogin } = UseAuth();
  const navigate = useNavigate();
  const [daysAccount, setDaysAccount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [recentActivitiesCount, setRecentActivitiesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // it is a function that give us the data of how long ago a user's account was created
  const getDaysAgo = (createdAt) => {
    if (!createdAt) return 0;
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = now - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDaysAccount(getDaysAgo(res.data.user.createdAt));
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const handleUserJournal = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/journal/recent-activity`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecentActivities(res.data.activities);
      setRecentActivitiesCount(res.data.activitiesCount);
    } catch (error) {
      console.error("Error fetching user journal:", error.message);
    } finally {
      setLoading(false); // set loading to false after fetching data from backend
    }
  };

  useEffect(() => {
    if (isLogin && token) {
      handleUserData();
      handleUserJournal();
    } else {
      setLoading(false);
    }
  }, [isLogin, token]);

  const stats = [
    {
      number: `${daysAccount}`,
      label: "Days Tracked",
      icon: Calendar,
      gradient: "from-sky-500/20 to-blue-500/20 text-sky-500",
      bgGradient: "from-sky-500 to-blue-600"
    },
    {
      number: `${recentActivitiesCount}`,
      label: "Symptoms Logged",
      icon: ClipboardList,
      gradient: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
      bgGradient: "from-emerald-500 to-teal-600"
    },
    {
      number: "8",
      label: "AI Insights",
      icon: Brain,
      gradient: "from-purple-500/20 to-indigo-500/20 text-purple-500",
      bgGradient: "from-purple-500 to-indigo-600"
    },
    {
      number: "92-95%",
      label: "Accuracy",
      icon: TrendingUp,
      gradient: "from-amber-500/20 to-orange-500/20 text-amber-500",
      bgGradient: "from-amber-500 to-orange-600"
    }
  ];

  const recentActivity = [
    {
      type: "symptom",
      title: "Logged fatigue level: 7/10",
      time: "Today, 2:30 PM",
      badge: "High",
      color: "border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500"
    },
    {
      type: "insight",
      title: "AI detected sleep quality improvement",
      time: "Yesterday, 9:15 AM",
      badge: "Insight",
      color: "border-sky-500/30 bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400",
      dot: "bg-sky-500"
    },
    {
      type: "medication",
      title: "Medication reminder: Methotrexate taken",
      time: "2 days ago, 8:00 AM",
      badge: "Completed",
      color: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500"
    }
  ];

  const handleGenerateReport = () => {
    navigate("/GeneratePDF");
    const reportWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');

    const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Report - ${user?.FirstName || 'Patient'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #87CEEB 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            background: linear-gradient(135deg, #4682B4, #87CEEB);
            color: white;
            padding: 40px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(70, 130, 180, 0.3);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 10px 0;
            font-weight: bold;
        }
        
        .header p {
            font-size: 1.2rem;
            margin: 0;
            opacity: 0.9;
        }
        
        .header-icon {
            font-size: 3rem;
            opacity: 0.7;
        }
        
        .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .section-title {
            color: #4682B4;
            margin-bottom: 25px;
            font-size: 1.8rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #E0F6FF, #B0E0E6);
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #87CEEB;
        }
        
        .stat-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        
        .stat-number {
            font-size: 2.2rem;
            margin: 0 0 5px 0;
            color: #4682B4;
            font-weight: bold;
        }
        
        .stat-label {
            margin: 0 0 8px 0;
            color: #2F4F4F;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .stat-change {
            color: #008B8B;
            font-weight: 500;
            font-size: 0.9rem;
        }
        
        .activity-container {
            max-height: 600px;
            overflow-y: auto;
        }
        
        .activity-item {
            background: linear-gradient(135deg, #F0F8FF, #E6F3FF);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            border: 1px solid #B0E0E6;
            box-shadow: 0 2px 10px rgba(135, 206, 235, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .activity-content p {
            margin: 0 0 8px 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: #2F4F4F;
        }
        
        .activity-time {
            margin: 0;
            color: #708090;
            font-size: 0.95rem;
        }
        
        .activity-badge {
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        
        .download-section {
            text-align: center;
        }
        
        .download-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }
        
        .btn {
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
            min-width: 200px;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #4682B4, #87CEEB);
            color: white;
            box-shadow: 0 5px 15px rgba(70, 130, 180, 0.4);
        }
        
        .btn-primary:hover {
            box-shadow: 0 8px 25px rgba(70, 130, 180, 0.6);
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, #87CEEB, #B0E0E6);
            color: #2F4F4F;
            border: 2px solid #4682B4;
            box-shadow: 0 5px 15px rgba(135, 206, 235, 0.4);
        }
        
        .btn-secondary:hover {
            box-shadow: 0 8px 25px rgba(135, 206, 235, 0.6);
            background: linear-gradient(135deg, #B0E0E6, #87CEEB);
        }
        
        .note-section {
            margin-top: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #E0F6FF, #F0F8FF);
            border-radius: 10px;
            border: 1px solid #B0E0E6;
        }
        
        .note-text {
            margin: 0;
            color: #2F4F4F;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .report-id {
            margin: 10px 0 0 0;
            color: #708090;
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-content">
                <div>
                    <h1>Health Report</h1>
                    <p>Generated on ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</p>
                    <p style="font-size: 1.1rem; margin: 5px 0 0 0; opacity: 0.8;">
                        Patient: ${user?.FirstName || 'Patient'}
                    </p>
                </div>
                <div>
                    <div class="header-icon">📊</div>
                </div>
            </div>
        </div>

        <!-- Stats Overview -->
        <div class="card">
            <h2 class="section-title">📈 Summary Statistics</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <h3 class="stat-number">${daysAccount}</h3>
                    <p class="stat-label">Days Tracked</p>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📋</div>
                    <h3 class="stat-number">${recentActivitiesCount}</h3>
                    <p class="stat-label">Symptoms Logged</p>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🧠</div>
                    <h3 class="stat-number">8</h3>
                    <p class="stat-label">AI Insights</p>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <h3 class="stat-number">15%</h3>
                    <p class="stat-label">Improvement</p>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="card">
            <h2 class="section-title">🕒 Recent Activity Log</h2>
            <div class="activity-container">
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Logged fatigue level: 7/10</p>
                        <p class="activity-time">🕐 Today, 2:30 PM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #FF6B6B;">High</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>AI detected sleep quality improvement</p>
                        <p class="activity-time">🕐 Yesterday, 9:15 AM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #4ECDC4;">Insight</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Medication reminder: Methotrexate taken</p>
                        <p class="activity-time">🕐 2 days ago, 8:00 AM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #45B7D1;">Completed</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Logged joint pain level: 5/10</p>
                        <p class="activity-time">🕐 3 days ago, 10:15 AM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #FFA726;">Medium</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Exercise correlation with mood detected</p>
                        <p class="activity-time">🕐 4 days ago, 3:45 PM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #4ECDC4;">Insight</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Vitamin D supplement taken</p>
                        <p class="activity-time">🕐 5 days ago, 9:00 AM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #45B7D1;">Completed</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Logged mood level: 8/10</p>
                        <p class="activity-time">🕐 6 days ago, 7:20 PM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #66BB6A;">Good</span>
                </div>
                <div class="activity-item">
                    <div class="activity-content">
                        <p>Weather pattern affecting symptoms</p>
                        <p class="activity-time">🕐 1 week ago, 11:30 AM</p>
                    </div>
                    <span class="activity-badge" style="background-color: #4ECDC4;">Insight</span>
                </div>
            </div>
        </div>

        <!-- Download Section -->
        <div class="card download-section">
            <h2 class="section-title">📥 Download Report</h2>
            <p style="color: #708090; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6;">
                Download your complete health report for your records or to share with your healthcare provider.
            </p>
            <div class="download-buttons">
                <button class="btn btn-primary" onclick="downloadTextReport()">
                    📄 Download as Text
                </button>
                <button class="btn btn-secondary" onclick="downloadPDFReport()">
                    🖨️ Print/Save as PDF
                </button>
            </div>
            <div class="note-section">
                <p class="note-text">
                    <strong>📋 Note:</strong> This report contains a comprehensive overview of your health tracking data. 
                    For detailed analysis and recommendations, please consult with your healthcare provider.
                </p>
                <p class="report-id">
                    Report ID: ${Date.now()} | Generated: ${new Date().toLocaleString()}
                </p>
            </div>
        </div>
    </div>

    <script>
        function downloadTextReport() {
            const reportContent = \`HEALTH TRACKING REPORT
Generated on: ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
Patient: ${user?.FirstName || 'Patient'}

=== SUMMARY STATISTICS ===
Days Tracked: ${daysAccount}
Symptoms Logged: ${recentActivitiesCount}
AI Insights: 8
Improvement: 15%

=== RECENT ACTIVITY LOG ===
1. Logged fatigue level: 7/10
   Time: Today, 2:30 PM
   Status: High
   Type: Symptom

2. AI detected sleep quality improvement
   Time: Yesterday, 9:15 AM
   Status: Insight
   Type: Insight

3. Medication reminder: Methotrexate taken
   Time: 2 days ago, 8:00 AM
   Status: Completed
   Type: Medication

4. Logged joint pain level: 5/10
   Time: 3 days ago, 10:15 AM
   Status: Medium
   Type: Symptom

5. Exercise correlation with mood detected
   Time: 4 days ago, 3:45 PM
   Status: Insight
   Type: Insight

6. Vitamin D supplement taken
   Time: 5 days ago, 9:00 AM
   Status: Completed
   Type: Medication

7. Logged mood level: 8/10
   Time: 6 days ago, 7:20 PM
   Status: Good
   Type: Symptom

8. Weather pattern affecting symptoms
   Time: 1 week ago, 11:30 AM
   Status: Insight
   Type: Insight

=== NOTES ===
This report contains a comprehensive overview of your health tracking data.
For detailed analysis and recommendations, please consult with your healthcare provider.

Generated by SymptoScope App
Report ID: \${Date.now()}\`;

            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'health-report-' + new Date().toISOString().split('T')[0] + '.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        function downloadPDFReport() {
            window.print();
        }
    </script>
</body>
</html>
  `;

    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
  };

  if (!isLogin) {
    return (
      <div className="pt-28 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl max-w-sm text-center space-y-4">
          <div className="bg-red-500/10 text-red-500 rounded-full p-4 inline-flex">
            <TrendingUp className="rotate-90" size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Access Denied</h3>
          <p className="text-sm">Please log in to your SymptomAI account to view your medical logs dashboard.</p>
          <Link to="/login" className="inline-flex w-full justify-center bg-gradient-primary text-white py-3 rounded-2xl font-bold transition-transform hover:-translate-y-0.5 shadow-md shadow-medical-blue/20">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-gradient-primary tracking-tight">
              Welcome back, {user.FirstName}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-semibold">
              Your health overview for{" "}
              <span className="text-slate-800 dark:text-slate-200">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </p>
          </div>
          <Link to="/journal" className="inline-flex">
            <button className="bg-gradient-primary text-white px-5 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-medical-blue/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm shadow">
              <Plus size={18} />
              Quick Log
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl shadow-slate-100/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 dark:to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`p-3.5 rounded-2xl mb-4 ${stat.gradient} relative z-10`}>
                  <IconComponent size={24} />
                </div>
                <div className="space-y-1 relative z-10">
                  {stat.number !== null && stat.number !== undefined ? (
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      {stat.number}
                    </h3>
                  ) : (
                    <div className="w-5 h-5 border-2 border-medical-blue border-t-transparent rounded-full animate-spin mx-auto my-1"></div>
                  )}
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none mb-8 md:mb-12">
          <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
              Quick Actions
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/journal" className="group">
              <button className="w-full h-full bg-slate-50 hover:bg-gradient-primary border border-slate-100 dark:border-slate-800 dark:bg-slate-950/40 hover:border-transparent dark:hover:bg-gradient-primary rounded-2xl p-5 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group-hover:shadow-md">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl group-hover:scale-110 transition-transform shadow-sm text-medical-blue">
                  <Plus size={22} />
                </div>
                <div>
                  <span className="font-extrabold text-sm block">Log Symptoms</span>
                  <span className="text-xs opacity-75 dark:opacity-60 block mt-0.5">Report metrics and run AI insights</span>
                </div>
              </button>
            </Link>

            <Link to="/analysis" className="group">
              <button className="w-full h-full bg-slate-50 hover:bg-gradient-primary border border-slate-100 dark:border-slate-800 dark:bg-slate-950/40 hover:border-transparent dark:hover:bg-gradient-primary rounded-2xl p-5 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group-hover:shadow-md">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl group-hover:scale-110 transition-transform shadow-sm text-sky-500">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <span className="font-extrabold text-sm block">View Analysis</span>
                  <span className="text-xs opacity-75 dark:opacity-60 block mt-0.5">Explore timelines and disease graphs</span>
                </div>
              </button>
            </Link>

            <div className="group cursor-pointer" onClick={handleGenerateReport}>
              <button className="w-full h-full bg-slate-50 hover:bg-gradient-primary border border-slate-100 dark:border-slate-800 dark:bg-slate-950/40 hover:border-transparent dark:hover:bg-gradient-primary rounded-2xl p-5 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group-hover:shadow-md">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl group-hover:scale-110 transition-transform shadow-sm text-purple-500">
                  <FileText size={22} />
                </div>
                <div>
                  <span className="font-extrabold text-sm block">Generate Report</span>
                  <span className="text-xs opacity-75 dark:opacity-60 block mt-0.5">Export custom records to a PDF doc</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Recent Activity Log */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none">
            <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <Clock className="text-sky-500" size={20} />
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Recent Activity Log
              </h4>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-slate-100 dark:border-slate-800/60 dark:bg-slate-950/20 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${activity.dot} mt-1.5 flex-shrink-0`}></span>
                    <div>
                      <p className="font-extrabold text-sm text-slate-700 dark:text-slate-200">
                        {activity.title}
                      </p>
                      <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${activity.color}`}>
                      {activity.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Goals */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none">
            <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <Target className="text-emerald-500" size={20} />
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                Today's Goals
              </h4>
            </div>
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <div className="h-16 w-16 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-600 animate-pulse">
                <Target size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-slate-600 dark:text-slate-300">
                  Coming Soon...
                </p>
                <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed">
                  We are developing interactive checklists to support your daily wellness logs.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  ) : (
    <div className="pt-28 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-colors duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold tracking-wide">Fetching health data...</p>
      </div>
    </div>
  );
}