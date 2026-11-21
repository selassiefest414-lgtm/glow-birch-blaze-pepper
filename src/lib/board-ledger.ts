import { actions, type ActionStatus } from "@/data/brief";

export type LedgerRow = { status: ActionStatus; note: string };
export type LedgerState = Record<string, LedgerRow>;

const KEY = "rdj-board-ledger-v1";
const STATUSES: ActionStatus[] = ["open", "ready", "adopted", "deferred"];

export function emptyLedger(): LedgerState {
  const state: LedgerState = {};
  for (const action of actions) state[action.id] = { status: "open", note: "" };
  return state;
}

export function loadLedger(): LedgerState {
  const base = emptyLedger();
  if (typeof window === "undefined") return base;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<Record<string, Partial<LedgerRow>>>;
    for (const action of actions) {
      const row = parsed[action.id];
      if (!row) continue;
      const status = STATUSES.includes(row.status as ActionStatus)
        ? (row.status as ActionStatus)
        : "open";
      const note = typeof row.note === "string" ? row.note.slice(0, 280) : "";
      base[action.id] = { status, note };
    }
  } catch {
    return base;
  }
  return base;
}

export function saveLedger(state: LedgerState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
