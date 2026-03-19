-- Table de stock pour ORUN MOMENT
create table if not exists public.event_stock (
  status text primary key check (status in ('etudiant', 'professionnel')),
  available integer not null default 53 check (available >= 0),
  updated_at timestamptz not null default now()
);

-- Seed initial 53 / 53
insert into public.event_stock (status, available)
values
  ('etudiant', 53),
  ('professionnel', 53)
on conflict (status) do update
set available = excluded.available,
    updated_at = now();

-- Fonction de réservation atomique
create or replace function public.reserve_stock(p_status text, p_qty int)
returns boolean
language plpgsql
security definer
as $$
declare
  updated_count int;
begin
  if p_qty is null or p_qty <= 0 then
    return false;
  end if;

  update public.event_stock
  set available = available - p_qty,
      updated_at = now()
  where status = p_status
    and available >= p_qty;

  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

-- RLS
alter table public.event_stock enable row level security;

drop policy if exists "allow read stock" on public.event_stock;
create policy "allow read stock"
on public.event_stock
for select
to anon
using (true);

-- Appel de la fonction depuis le client anon
grant execute on function public.reserve_stock(text, int) to anon;
