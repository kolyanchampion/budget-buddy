import React from 'react';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';

export default function GoalsSection({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, settings, rates }) {
  return (
    <section id="goals" className="goals-section">
      <div className="goals-section__inner">
        <div className="goals-section__header">
          <div>
            <h2 className="goals-section__title">Savings Goals</h2>
            <p className="goals-section__subtitle">
              Track your progress towards your dreams
            </p>
          </div>
        </div>

        <div className="goals-section__grid">
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
