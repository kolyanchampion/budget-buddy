import React from 'react';
import { ArrowRight, PieChart, TrendingUp, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>
      <div className="absolute top-0 left-0 -translate-y-12 -translate-x-1/3">
        <div className="w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Take control of your money with <span className="text-brand-600">Budget Buddy</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto md:mx-0">
              A simple and friendly budget tracker for students, teens, and anyone who wants to manage money without stress.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2">
                Start Tracking <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-semibold shadow-sm transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Dashboard Preview Card */}
          <div className="flex-1 w-full max-w-md">
            <div className="glass-card p-6 md:p-8 relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                <TrendingUp size={16} /> +$120 today
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Current Balance</p>
                <h2 className="text-4xl font-bold text-slate-900">$420.00</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-brand-500 mb-2"><Wallet size={20} /></div>
                  <p className="text-sm text-slate-500">Income</p>
                  <p className="text-lg font-bold text-slate-900">$650.00</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-red-500 mb-2"><PieChart size={20} /></div>
                  <p className="text-sm text-slate-500">Expenses</p>
                  <p className="text-lg font-bold text-slate-900">$230.00</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-500">Savings Goal</span>
                  <span className="text-sm font-bold text-brand-600">70%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-brand-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
