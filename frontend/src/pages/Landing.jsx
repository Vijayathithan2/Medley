import { Link } from 'react-router-dom';
import { Activity, Shield, Users, Calendar, ArrowRight, HeartPulse } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-primary-500 to-secondary-500 p-1.5 rounded-lg text-white">
                <HeartPulse size={24} />
              </div>
              <span className="text-xl font-display font-bold text-gray-900 tracking-tight">Medley</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Log in</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 px-4 mx-auto max-w-7xl text-center">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-gray-900 tracking-tight leading-tight">
            Your Family's Health, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              Beautifully Managed.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
            Medley is the all-in-one smart health companion that organizes your medical records, tracks medications, schedules appointments, and provides AI-driven health insights.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/register" className="btn-primary px-8 py-3 text-lg flex items-center gap-2">
              Start for Free <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-3 text-lg">
              View Demo
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {[
            {
              icon: <Activity className="text-primary-500" size={28} />,
              title: "Smart Tracking",
              desc: "AI-driven insights analyzing your family's health patterns over time."
            },
            {
              icon: <Users className="text-secondary-500" size={28} />,
              title: "Family Profiles",
              desc: "Manage records, conditions, and medications for all your dependents."
            },
            {
              icon: <Calendar className="text-primary-500" size={28} />,
              title: "Appointment Sync",
              desc: "Seamlessly book and manage consultations with verified doctors."
            },
            {
              icon: <Shield className="text-secondary-500" size={28} />,
              title: "Secure Vault",
              desc: "Your medical files and data are encrypted and securely stored always."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 border-white/40 shadow-sm hover:shadow-glass hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
