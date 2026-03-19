export type AttendeeStatus = "etudiant" | "professionnel";
import { hasSupabaseCredentials, supabase } from "./supabaseClient";

interface StockState {
  etudiant: number;
  professionnel: number;
}

const STORAGE_KEY = "orun_stock_state_v1";
const INITIAL_STOCK: StockState = {
  etudiant: 53,
  professionnel: 53,
};
let inMemoryStock: StockState = { ...INITIAL_STOCK };
let initialized = false;

export function getStockState(): StockState {
  if (!initialized) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<StockState>;
        inMemoryStock = {
          etudiant: Number.isFinite(parsed.etudiant) ? Math.max(0, parsed.etudiant as number) : INITIAL_STOCK.etudiant,
          professionnel: Number.isFinite(parsed.professionnel)
            ? Math.max(0, parsed.professionnel as number)
            : INITIAL_STOCK.professionnel,
        };
      } catch {
        inMemoryStock = { ...INITIAL_STOCK };
      }
    }
    initialized = true;
  }
  return { ...inMemoryStock };
}

function setStockState(next: StockState) {
  inMemoryStock = { ...next };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export async function initStockFromSupabase(): Promise<StockState> {
  const local = getStockState();
  if (!hasSupabaseCredentials || !supabase) return local;

  const { data, error } = await supabase.from("event_stock").select("status, available");
  if (error || !data) return local;

  const next: StockState = { ...INITIAL_STOCK };
  for (const row of data as Array<{ status: AttendeeStatus; available: number }>) {
    if (row.status === "etudiant" || row.status === "professionnel") {
      next[row.status] = Math.max(0, Number(row.available) || 0);
    }
  }
  setStockState(next);
  return next;
}

export function getAvailablePlaces(status: AttendeeStatus): number {
  return getStockState()[status];
}

export function isSoldOutAll(): boolean {
  const state = getStockState();
  return state.etudiant <= 0 && state.professionnel <= 0;
}

export async function reservePlaces(status: AttendeeStatus, qty: number): Promise<boolean> {
  const state = getStockState();
  const amount = Math.max(1, qty);

  if (hasSupabaseCredentials && supabase) {
    const { data, error } = await supabase.rpc("reserve_stock", {
      p_status: status,
      p_qty: amount,
    });

    if (!error && data === true) {
      await initStockFromSupabase();
      return true;
    }
    return false;
  }

  if (state[status] < amount) return false;
  setStockState({ ...state, [status]: state[status] - amount });
  return true;
}
