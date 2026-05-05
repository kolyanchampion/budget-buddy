import React from 'react';

export default function EmptyState({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 h-full w-full">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--bg-soft)] rounded-full flex items-center justify-center text-[var(--text-muted)] mb-3 sm:mb-4 shadow-inner border border-[var(--border)]">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-[250px] sm:max-w-sm">
        {description}
      </p>
    </div>
  );
}
