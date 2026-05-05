import React from 'react';
import { Target, Laptop, Plane, ShieldAlert } from 'lucide-react';

const GOALS = [
  { id: 1, title: "New Laptop", target: 800, saved: 560, icon: <Laptop size={20} className="text-blue-500" /> },
  { id: 2, title: "Trip with Friends", target: 400, saved: 180, icon: <Plane size={20} className="text-orange-500" /> },
  { id: 3, title: "Emergency Fund", target: 1000, saved: 250, icon: <ShieldAlert size={20} className="text-green-500" /> }
];

export default function Goals() {
  return (
    <section id="goals" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Target className="text-brand-600" size={28} />
        <h2 className="text-2xl font-bold text-slate-900">Savings Goals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GOALS.map(goal => {
          const percentage = Math.round((goal.saved / goal.target) * 100);
          
          return (
            <div key={goal.id} className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {goal.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{goal.title}</h3>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                  {percentage}%
                </span>
              </div>
              
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">${goal.saved}</span>
                <span className="text-slate-500">of ${goal.target}</span>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: percentage >= 100 ? '#10b981' : '#3b82f6'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
