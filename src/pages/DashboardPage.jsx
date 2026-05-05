import React from 'react';
import Header from '../components/Header';
import DashboardCards from '../components/DashboardCards';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import FinanceCalendar from '../components/FinanceCalendar';
import GoalsSection from '../components/GoalsSection';
import Insights from '../components/Insights';
import Footer from '../components/Footer';

export default function DashboardPage({
  user,
  settings,
  transactions,
  goals,
  rates,
  onUpdateSettings,
  onAddTransaction,
  onDeleteTransaction,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onResetApp,
  onLogout,
  onUploadLocalData
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg)] transition-colors overflow-x-hidden">
      <Header 
        user={user} 
        settings={settings} 
        onUpdateSettings={onUpdateSettings} 
        onResetApp={onResetApp}
        onLogout={onLogout}
        onUploadLocalData={onUploadLocalData}
      />
      
      <main className="flex-1 pb-12 w-full max-w-full">
        <div className="bg-[var(--primary)] pt-10 pb-20 sm:pb-24 rounded-b-[2rem] sm:rounded-b-[3rem] shadow-sm mb-[-3rem] sm:mb-[-4rem] transition-colors w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading truncate">
              {settings?.nickname ? `Hi, ${settings.nickname}!` : 'Welcome back!'}
            </h1>
            <p className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-base">Here's your financial overview.</p>
          </div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <DashboardCards transactions={transactions} goals={goals} settings={settings} rates={rates} />
        </div>

        <section id="transactions" className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <TransactionList transactions={transactions} onDelete={onDeleteTransaction} settings={settings} rates={rates} />
            </div>
            <div className="flex flex-col gap-8 order-1 lg:order-2">
              <TransactionForm onAdd={onAddTransaction} settings={settings} />
            </div>
          </div>
        </section>

        <section id="calendar" className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto">
            <FinanceCalendar transactions={transactions} settings={settings} rates={rates} />
          </div>
        </section>

        <GoalsSection 
          goals={goals} 
          onAddGoal={onAddGoal} 
          onUpdateGoal={onUpdateGoal} 
          onDeleteGoal={onDeleteGoal} 
          settings={settings}
          rates={rates}
        />

        <section id="insights" className="w-full px-4 sm:px-6 lg:px-8 mt-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <Insights transactions={transactions} settings={settings} rates={rates} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
