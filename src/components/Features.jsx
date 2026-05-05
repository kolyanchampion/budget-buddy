import React from 'react';
import { LineChart, CheckCircle2, ShieldCheck, Smartphone, Target, LayoutDashboard } from 'lucide-react';

const FEATURES = [
  {
    title: "Track Income & Expenses",
    description: "Easily log your daily spending and keep track of where your money goes.",
    icon: <LayoutDashboard size={24} />
  },
  {
    title: "Set Savings Goals",
    description: "Create custom goals and watch your progress grow over time.",
    icon: <Target size={24} />
  },
  {
    title: "Understand Habits",
    description: "Get insights into your spending patterns with beautiful charts.",
    icon: <LineChart size={24} />
  },
  {
    title: "Student Friendly",
    description: "Designed specifically for students and beginners. No complex jargon.",
    icon: <CheckCircle2 size={24} />
  },
  {
    title: "Secure & Private",
    description: "Your data stays on your device. We don't connect to your bank.",
    icon: <ShieldCheck size={24} />
  },
  {
    title: "Works Everywhere",
    description: "Fully responsive design looks great on mobile, tablet, and desktop.",
    icon: <Smartphone size={24} />
  }
];

export default function Features() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why choose Budget Buddy?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage your money effectively, without the complexity of traditional finance apps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
