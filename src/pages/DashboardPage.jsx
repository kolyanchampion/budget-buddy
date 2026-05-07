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
<div className="dashboard-shell relative min-h-screen flex flex-col font-sans transition-colors overflow-x-hidden">      <div className="pointer-events-none fixed inset-0 -z-10 opacity-90" />
      
      <Header 
        user={user} 
        settings={settings} 
        onUpdateSettings={onUpdateSettings} 
        onResetApp={onResetApp}
        onLogout={onLogout}
        onUploadLocalData={onUploadLocalData}
      />
      
      <main className="flex-1 w-full max-w-full pb-14">
          
        <section className="dashboard-hero relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-28 sm:pt-14 sm:pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl text-center md:text-left">
              <p className="hero-badge mb-3 px-4 py-2 text-xs sm:text-sm font-semibold">
                Your personal financial overview
              </p>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                {settings?.nickname ? `Hi, ${settings.nickname}!` : 'Welcome back!'}
              </h1>

              <p className="hero-subtitle mt-4 text-sm sm:text-base lg:text-lg">
                Here's your financial overview.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 w-full px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
          <div className="max-w-6xl mx-auto">
            <DashboardCards 
              transactions={transactions} 
              goals={goals} 
              settings={settings} 
              rates={rates} 
            />
          </div>
        </section>

        <section id="transactions" className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(320px,0.9fr)] gap-6 sm:gap-8 items-start">
            <div className="order-2 lg:order-1 min-w-0">
              <TransactionList 
                transactions={transactions} 
                onDelete={onDeleteTransaction} 
                settings={settings} 
                rates={rates} 
              />
            </div>

            <aside className="order-1 lg:order-2 min-w-0">
              <TransactionForm 
                onAdd={onAddTransaction} 
                settings={settings} 
              />
            </aside>
          </div>
        </section>

        <section id="calendar" className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto">
            <FinanceCalendar 
              transactions={transactions} 
              settings={settings} 
              rates={rates} 
            />
          </div>
        </section>

        <div className="w-full mt-8 sm:mt-12">
          <GoalsSection 
            goals={goals} 
            onAddGoal={onAddGoal} 
            onUpdateGoal={onUpdateGoal} 
            onDeleteGoal={onDeleteGoal} 
            settings={settings}
            rates={rates}
          />
        </div>

        <section id="insights" className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 mb-12">
          <div className="max-w-6xl mx-auto">
            <Insights 
              transactions={transactions} 
              settings={settings} 
              rates={rates} 
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
