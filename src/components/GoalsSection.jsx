import React from 'react';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';

export default function GoalsSection({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, settings, rates }) {
  return (
    <section id="goals" className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 sm:mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] font-heading">Savings Goals</h2>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm mt-1">Track your progress towards your dreams</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onUpdate={onUpdateGoal} 
              onDelete={onDeleteGoal} 
              settings={settings}
              rates={rates}
            />
          ))}
          
          <GoalForm onAdd={onAddGoal} settings={settings} />
        </div>
      </div>
    </section>
  );
}
