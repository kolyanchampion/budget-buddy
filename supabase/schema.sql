-- Create tables

create table if not exists user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  theme text default 'system' check (theme in ('light', 'dark', 'system')),
  base_currency text default 'UAH' check (base_currency in ('UAH', 'USD', 'EUR', 'PLN')),
  display_currency text default 'UAH' check (display_currency in ('UAH', 'USD', 'EUR', 'PLN')),
  monthly_budget_limit numeric null check (monthly_budget_limit is null or monthly_budget_limit > 0),
  savings_reminder_enabled boolean default false,
  nickname text null,
  setup_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  amount_base numeric not null check (amount_base > 0),
  base_currency text not null default 'UAH' check (base_currency in ('UAH', 'USD', 'EUR', 'PLN')),
  date date not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  target_amount_base numeric not null check (target_amount_base > 0),
  saved_amount_base numeric not null default 0 check (saved_amount_base >= 0),
  base_currency text not null default 'UAH' check (base_currency in ('UAH', 'USD', 'EUR', 'PLN')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index if not exists idx_transactions_user_id on transactions(user_id);
create index if not exists idx_transactions_date on transactions(date);
create index if not exists idx_goals_user_id on goals(user_id);
create index if not exists idx_user_settings_user_id on user_settings(user_id);

-- Enable RLS
alter table user_settings enable row level security;
alter table transactions enable row level security;
alter table goals enable row level security;

-- Policies for user_settings
create policy "Users can view own settings" on user_settings for select using (auth.uid() = user_id);
create policy "Users can insert own settings" on user_settings for insert with check (auth.uid() = user_id);
create policy "Users can update own settings" on user_settings for update using (auth.uid() = user_id);
create policy "Users can delete own settings" on user_settings for delete using (auth.uid() = user_id);

-- Policies for transactions
create policy "Users can view own transactions" on transactions for select using (auth.uid() = user_id);
create policy "Users can insert own transactions" on transactions for insert with check (auth.uid() = user_id);
create policy "Users can update own transactions" on transactions for update using (auth.uid() = user_id);
create policy "Users can delete own transactions" on transactions for delete using (auth.uid() = user_id);

-- Policies for goals
create policy "Users can view own goals" on goals for select using (auth.uid() = user_id);
create policy "Users can insert own goals" on goals for insert with check (auth.uid() = user_id);
create policy "Users can update own goals" on goals for update using (auth.uid() = user_id);
create policy "Users can delete own goals" on goals for delete using (auth.uid() = user_id);
