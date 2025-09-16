-- Create the users table
create table public.users (
  id uuid not null,
  email text not null,
  full_name text not null,
  phone_number text null,
  user_type text not null default 'customer'::text,
  avatar_url text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email),
  constraint users_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE,
  constraint users_user_type_check check (
    (
      user_type = any (
        array['customer'::text, 'vendor'::text, 'admin'::text]
      )
    )
  )
) TABLESPACE pg_default;

-- Create the update trigger function (if it doesn't exist)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create the trigger for automatic updated_at updates
create trigger update_users_updated_at 
  before update on public.users 
  for each row 
  execute function public.update_updated_at_column();

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Create RLS policies

-- Users can view their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Users can insert their own profile (for signup)
create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Admin users can view all profiles (optional)
create policy "Admin users can view all profiles" on public.users
  for select using (
    exists (
      select 1 from public.users 
      where id = auth.uid() and user_type = 'admin'
    )
  );

-- Create indexes for better performance
create index idx_users_email on public.users(email);
create index idx_users_user_type on public.users(user_type);
create index idx_users_created_at on public.users(created_at);
