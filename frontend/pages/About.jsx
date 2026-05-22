import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { Stethoscope, Activity, UserRound, Pill, CheckCircle2, Syringe, Microscope, Dna, Thermometer, Brain, Rocket, Users, Shield, Target, Eye, Heart, Code2, Award, Zap } from "lucide-react";


import boot from "../pages/images/boot.png";
import express from "../pages/images/express.png";
import mongo from "../pages/images/mongo.png";
import node from "../pages/images/node.png";
import ReactLogo from "../pages/images/react.png";
import Rohit from "../pages/images/rohit_image.jpg";
import Bhavesh from "../pages/images/bhavesh_image.jpg";
import Navita from "../pages/images/navita_image.jpg";

export default function About() {
  const { isDarkMode } = useTheme();
  const teamMembers = [
    {
      name: "Bhavesh Jain",
      role: "Full Stack Developer",
      image: Bhavesh,
      bio: "Btech CSE, Arya College of Engineering"
    },
    {
      name: "Navita Tulsani",
      role: "Full Stack Developer",
      image: Navita,
      bio: "Btech CSE(IT), Poornima College of Engineering"
    },
    {
      name: "Rohit Kumawat",
      role: "Full Stack Developer",
      image: Rohit,
      bio: "Btech CSE, Poornima College of Engineering"
    }
  ];

  const certifications = [
    {
      name: "React JS",
      icon: <img src={ReactLogo} alt="React logo" className="w-[50px] h-[50px] object-contain mx-auto" />
    },
    {
      name: "Node JS",
      icon: <img src={node} alt="node.js" className="w-[50px] h-[50px] object-contain mx-auto" />
    },
    {
      name: "Express JS",
      icon: <img src={express} alt="express.js" className="w-[50px] h-[50px] object-contain mx-auto" />
    },
    {
      name: "MongoDB",
      icon: <img src={mongo} alt="mongoDb logo" className="w-[50px] h-[50px] object-contain mx-auto" />
    },
    {
      name: "Bootstrap Framework",
      icon: <img src={boot} alt="bootstrap logo" className="w-[50px] h-[50px] object-contain mx-auto" />
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
              <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 shadow-md uppercase tracking-wider">
                <Zap size={13} />
                Revolutionizing Healthcare
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
                Revolutionizing Rare Disease <br />
                <span className="text-amber-400">Healthcare with AI</span>
              </h1>
              <p className="text-slate-200 dark:text-slate-350 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                We're on a mission to transform how patients with rare conditions understand, track, and manage their health through cutting-edge artificial intelligence and compassionate care systems.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <a href="#our-purpose" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 shadow-md">
                  <Rocket size={18} />
                  Our Mission
                </a>
                <a href="#our-team" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/40 hover:border-white/60 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 shadow-md">
                  <Users size={18} />
                  Meet the Team
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform duration-300 group">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                  <img src="/SymptoScopeLogo.png" alt="SymptoScope Logo" className="h-16 w-auto object-contain bg-transparent" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-800 dark:text-slate-150 uppercase text-xs tracking-widest">SymptoScope Engine</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
                    AI Symptom Journal for Rare Conditions
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase">
                  <Activity size={12} />
                  Empowering Health
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Animated Background Icons (Floatings with delayed classes matching styles in global.css) */}
        <div className="medical-equipment absolute pointer-events-none opacity-20 top-[15%] left-[5%] animate-float-1">
          <Stethoscope size={48} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 top-[25%] right-[8%] animate-float-2">
          <Activity size={40} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 bottom-[30%] left-[15%] animate-float-3">
          <UserRound size={36} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 top-[45%] right-[25%] animate-float-4">
          <Pill size={32} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 bottom-[15%] right-[12%] animate-float-5">
          <Syringe size={36} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 top-[35%] left-[25%] animate-float-6">
          <Microscope size={44} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 top-[10%] right-[5%] animate-float-3">
          <Dna size={32} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 bottom-[10%] left-[8%] animate-float-5">
          <Activity size={36} className="text-white" />
        </div>
        <div className="medical-equipment absolute pointer-events-none opacity-20 top-[55%] left-[12%] animate-float-4">
          <Thermometer size={28} className="text-white" />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="our-purpose" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center px-4 py-1 bg-medical-blue/10 text-medical-blue dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-wider">
              Core Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Our Purpose
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-semibold leading-relaxed">
              Bridging the gap between patients with rare conditions and the insights they need to live better lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
              <div className="p-4 bg-medical-blue/10 text-medical-blue rounded-2xl inline-flex">
                <Target size={28} />
              </div>
              <div className="space-y-2">
                <h3 id="our-mission" className="text-2xl font-black text-slate-850 dark:text-slate-150 tracking-tight">Our Mission</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                  To empower patients with rare conditions through AI-driven insights, enabling them to take control of their health journey and improve their quality of life through data-driven decisions.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  "Patient-centered healthcare innovation",
                  "Evidence-based medical insights",
                  "Accessible healthcare technology"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-350">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
              <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl inline-flex">
                <Eye size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-850 dark:text-slate-150 tracking-tight">Our Vision</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                  A world where every patient with a rare condition has access to personalized, AI-powered health insights that enable them to advocate for better care and achieve optimal health outcomes.
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  "Global healthcare transformation",
                  "Personalized medicine for all",
                  "Empowered patient communities"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-350">
                    <Award className="text-amber-500 flex-shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Team Section */}
      <section id="our-team" className="py-20 bg-slate-100/40 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-900 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center px-4 py-1 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-wider">
              Our Innovators
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-semibold leading-relaxed">
              Full Stack Learners dedicated to transforming healthcare through advanced systems engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-24 h-24 object-cover relative z-10 border-2 border-white dark:border-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-850 dark:text-slate-150 tracking-tight">{member.name}</h4>
                  <p className="text-xs sm:text-sm font-extrabold text-medical-blue dark:text-sky-400">{member.role}</p>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold max-w-[200px]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center px-4 py-1 bg-purple-500/10 text-purple-500 dark:text-purple-400 rounded-full text-xs font-black uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Compassion", desc: "Every patient's journey matters. We approach healthcare with profound empathy, support, and clinical understanding.", icon: Heart, color: "text-red-500 bg-red-50 dark:bg-red-950/20" },
              { title: "Innovation", desc: "Pushing the boundaries of what's possible in healthcare technology, AI diagnostics, and modern tracking models.", icon: Microscope, color: "text-medical-blue bg-sky-50 dark:bg-sky-950/20" },
              { title: "Integrity", desc: "Maintaining the absolute highest ethical standards in health informatics, HIPAA guidelines, and robust data privacy.", icon: Shield, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" }
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 text-center space-y-4 hover:-translate-y-0.5 transition-transform">
                  <div className={`p-4 rounded-2xl inline-flex ${value.color}`}>
                    <Icon size={32} />
                  </div>
                  <h4 className="text-lg font-black text-slate-850 dark:text-slate-150 tracking-wide uppercase">{value.title}</h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Tech Stack Used Section */}
      <section className="py-20 bg-slate-100/40 dark:bg-slate-950/40 border-t border-slate-150 dark:border-slate-900">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center px-4 py-1 bg-sky-500/10 text-medical-blue dark:text-sky-400 rounded-full text-xs font-black uppercase tracking-wider">
              Under The Hood
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Tech Stack Used
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-semibold leading-relaxed">
              Combined core technologies to compile dynamic and highly optimized clinical journals.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-5 text-center flex flex-col items-center justify-center gap-3 w-36 shadow-sm hover:-translate-y-1 transition-all duration-300">
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-2xl w-16 h-16 flex items-center justify-center">
                  {cert.icon}
                </div>
                <h6 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-350 text-center">
                  {cert.name}
                </h6>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-medical-blue to-indigo-600 text-white rounded-t-[40px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto opacity-95 leading-relaxed font-semibold">
            Join thousands of patients who are taking control of their conditions with AI-powered insights.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-350 text-slate-950 font-black rounded-full transition-transform hover:-translate-y-0.5 shadow-lg shadow-amber-400/20 text-sm">
              <Rocket size={16} />
              Get Started Today
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 hover:border-white/70 text-white font-bold rounded-full transition-colors text-sm bg-white/5 hover:bg-white/10">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
