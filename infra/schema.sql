-- Database schema for the revenue gateway.
-- Apply with: psql $DATABASE_URL -f infra/schema.sql

create table if not exists tenants (
  id text primary key,
  name text not null
);

create table if not exists apps (
  id text primary key,
  tenant_id text references tenants(id),
  name text not null,
  webhook_url text,
  webhook_secret text
);

create table if not exists users (
  id text primary key,
  email text
);

create table if not exists subscriptions (
  id bigserial primary key,
  user_id text references users(id),
  app_id text references apps(id),
  provider text not null,
  plan text not null,
  status text not null,
  customer_id text,
  subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz default now()
);

create table if not exists usage_events (
  id bigserial primary key,
  user_id text references users(id),
  app_id text references apps(id),
  metric text not null,
  qty int not null,
  at timestamptz default now()
);
