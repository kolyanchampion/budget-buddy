import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] py-8 border-t border-[var(--border)] text-center w-full">
      <div className="max-w-3xl mx-auto px-4">
        <h4 className="font-bold text-[var(--text)] mb-2 font-heading">Budget Buddy</h4>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-md mx-auto">
          A simple, beautiful way to track your spending and achieve your financial goals. Designed for clarity and ease of use.
        </p>
        <p className="text-xs text-[var(--text-muted)] font-medium opacity-70">
          Made for an Interdisciplinary Project
        </p>
      </div>
    </footer>
  );
}
