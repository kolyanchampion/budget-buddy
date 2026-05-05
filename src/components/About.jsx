import React from 'react';
import { BookOpen, Code, Lightbulb, Heart } from 'lucide-react';

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-brand-600" size={28} />
            <h2 className="text-3xl font-bold text-slate-900">About this Project</h2>
          </div>
          
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Budget Buddy is a student-friendly finance tracker created as an educational UX/UI and frontend project. It helps users build healthy money habits through simple tracking, clear visuals, and goal-based saving.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4">Project Purpose:</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="bg-green-100 text-green-600 p-1.5 rounded-lg mt-0.5"><Lightbulb size={18} /></div>
              <span className="text-slate-700">Improve financial awareness among teens and students.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-red-100 text-red-600 p-1.5 rounded-lg mt-0.5"><Heart size={18} /></div>
              <span className="text-slate-700">Make budgeting less stressful and more visual.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mt-0.5"><Code size={18} /></div>
              <span className="text-slate-700">Practice React development, state management, and component architecture.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mt-0.5"><LayoutDashboard size={18} /></div>
              <span className="text-slate-700">Demonstrate modern UX/UI design decisions (glassmorphism, clear typography).</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Re-importing LayoutDashboard since it wasn't imported at the top
import { LayoutDashboard } from 'lucide-react';
