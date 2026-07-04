import { createClient } from "@supabase/supabase-js";

const getSupabaseUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  if (envUrl && typeof envUrl === "string" && (envUrl.startsWith("http://") || envUrl.startsWith("https://"))) {
    return envUrl;
  }
  return "https://spedwnalwfpesoutzxvm.supabase.co";
};

const getSupabaseAnonKey = (): string => {
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  if (envKey && typeof envKey === "string" && envKey.trim() !== "" && envKey !== "undefined") {
    return envKey;
  }
  return "sb_publishable_I5ZvuCrRuZQG-nObeCG3Eg_JTOjVzz2";
};

export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());

/**
 * --- SUPABASE SETUP INSTRUCTIONS ---
 * 
 * To save order details correctly, make sure you have created the 'orders' table in your Supabase project.
 * Go to your Supabase Dashboard -> SQL Editor, paste the following SQL query, and run it:
 * 
 * ```sql
 * create table if not exists orders (
 *   id uuid default gen_random_uuid() primary key,
 *   order_id text not null unique,
 *   customer_name text not null,
 *   customer_phone text not null,
 *   shipping_address text not null,
 *   city text not null,
 *   payment_method text not null,
 *   items jsonb not null,
 *   total_amount numeric not null,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Enable Row Level Security (RLS)
 * alter table orders enable row level security;
 * 
 * -- Allow public inserts so customers can place orders without logging in
 * create policy "Allow public inserts" on orders for insert with check (true);
 * 
 * -- Optional: Allow public to view orders (or restrict this to authenticated admins)
 * create policy "Allow public selects" on orders for select using (true);
 * ```
 */
