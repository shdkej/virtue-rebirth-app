import { useCallback, useSyncExternalStore } from "react";
import {
  computeMonthTotal,
  computeTodayTotal,
  computeYesterdayTotal,
  INITIAL_VIRTUE,
  MOCK_DEEDS,
  type IDeed,
} from "./mock-data";
import type { ITone } from "./judge";

// ---------- Storage keys ----------------------------------------------------
export const STORAGE_KEY = "virtue.rebirth.v1";
export const TONE_KEY = "virtue.tone.v1";
export const DAILYCAP_KEY = "virtue.dailycap.v1";
export const THEME_KEY = "virtue.theme.v1";

export type ITheme = "light" | "dark";

interface ISnapshot {
  deeds: IDeed[];
  lastSyncedAt: string;
}

// ---------- Server-safe environment guards ----------------------------------
const isBrowser = (): boolean => typeof window !== "undefined";

// ---------- Internal pub-sub ------------------------------------------------
type IListener = () => void;
const listeners = new Set<IListener>();
const subscribe = (cb: IListener): (() => void) => {
  listeners.add(cb);
  if (isBrowser()) {
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEY ||
        e.key === TONE_KEY ||
        e.key === DAILYCAP_KEY ||
        e.key === THEME_KEY ||
        e.key === null
      ) {
        cb();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  }
  return () => listeners.delete(cb);
};

const notify = () => {
  listeners.forEach((l) => l());
};

// ---------- Snapshot caching to keep useSyncExternalStore stable -----------
let cachedDeedsRaw: string | null = null;
let cachedDeeds: IDeed[] | null = null;
let cachedSortedRaw: string | null = null;
let cachedSorted: IDeed[] | null = null;

// SSR fallback snapshot — sorted desc, derived once from MOCK_DEEDS.
const SEED_SORTED: IDeed[] = [...MOCK_DEEDS].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

// ---------- Snapshot reads --------------------------------------------------
const readSnapshot = (): ISnapshot => {
  if (!isBrowser()) {
    return { deeds: MOCK_DEEDS, lastSyncedAt: "" };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed on first load.
      const seeded: ISnapshot = {
        deeds: MOCK_DEEDS,
        lastSyncedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as ISnapshot;
    if (!parsed || !Array.isArray(parsed.deeds)) {
      return { deeds: MOCK_DEEDS, lastSyncedAt: "" };
    }
    return parsed;
  } catch {
    return { deeds: MOCK_DEEDS, lastSyncedAt: "" };
  }
};

const writeSnapshot = (snap: ISnapshot) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  } catch {
    /* ignore quota / private-mode errors */
  }
};

// ---------- getSnapshot helpers (stable refs!) ------------------------------
const getDeedsSnapshot = (): IDeed[] => {
  if (!isBrowser()) return MOCK_DEEDS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedDeedsRaw && cachedDeeds) return cachedDeeds;
  cachedDeedsRaw = raw;
  cachedDeeds = readSnapshot().deeds;
  return cachedDeeds;
};

const getDeedsSortedSnapshot = (): IDeed[] => {
  if (!isBrowser()) return SEED_SORTED;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedSortedRaw && cachedSorted) return cachedSorted;
  cachedSortedRaw = raw;
  const deeds = readSnapshot().deeds;
  cachedSorted = [...deeds].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return cachedSorted;
};

const getServerDeeds = (): IDeed[] => SEED_SORTED;

// ---------- Public deed hooks -----------------------------------------------
export const useDeeds = (): IDeed[] => {
  return useSyncExternalStore(subscribe, getDeedsSortedSnapshot, getServerDeeds);
};

export interface IVirtueStats {
  total: number;
  today: number;
  yesterday: number;
  month: number;
  count: number;
}

// Stats snapshot cache so useSyncExternalStore gets a stable reference.
let cachedStatsRaw: string | null = null;
let cachedStats: IVirtueStats | null = null;

const computeStats = (deeds: IDeed[]): IVirtueStats => {
  const now = new Date();
  const sum = deeds.reduce((s, d) => s + d.score, 0);
  return {
    total: INITIAL_VIRTUE + sum,
    today: computeTodayTotal(deeds, now),
    yesterday: computeYesterdayTotal(deeds, now),
    month: computeMonthTotal(deeds, now),
    count: deeds.length,
  };
};

const SEED_STATS: IVirtueStats = computeStats(MOCK_DEEDS);

const getStatsSnapshot = (): IVirtueStats => {
  if (!isBrowser()) return SEED_STATS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedStatsRaw && cachedStats) return cachedStats;
  cachedStatsRaw = raw;
  cachedStats = computeStats(getDeedsSnapshot());
  return cachedStats;
};

const getServerStats = (): IVirtueStats => SEED_STATS;

export const useVirtueStats = (): IVirtueStats => {
  return useSyncExternalStore(subscribe, getStatsSnapshot, getServerStats);
};

// ---------- Mutations -------------------------------------------------------
const invalidateDeedCaches = () => {
  cachedDeedsRaw = null;
  cachedDeeds = null;
  cachedSortedRaw = null;
  cachedSorted = null;
  cachedStatsRaw = null;
  cachedStats = null;
};

const genId = (): string =>
  `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const addDeed = (
  input: Omit<IDeed, "id" | "createdAt"> & { createdAt?: string },
): IDeed => {
  const saved: IDeed = {
    id: genId(),
    createdAt: input.createdAt ?? new Date().toISOString(),
    photoUrl: input.photoUrl,
    memo: input.memo,
    score: input.score,
    comment: input.comment,
    tags: input.tags,
  };
  if (!isBrowser()) return saved;
  const snap = readSnapshot();
  const next: ISnapshot = {
    deeds: [...snap.deeds, saved],
    lastSyncedAt: new Date().toISOString(),
  };
  writeSnapshot(next);
  invalidateDeedCaches();
  notify();
  return saved;
};

export const clearDeeds = (): void => {
  if (!isBrowser()) return;
  const next: ISnapshot = { deeds: [], lastSyncedAt: new Date().toISOString() };
  writeSnapshot(next);
  invalidateDeedCaches();
  notify();
};

export const exportJson = (): string => {
  if (!isBrowser()) {
    return JSON.stringify({ deeds: MOCK_DEEDS, lastSyncedAt: "" }, null, 2);
  }
  return JSON.stringify(readSnapshot(), null, 2);
};

// ---------- Generic localStorage-backed scalar hook ------------------------
const scalarCache = new Map<string, { raw: string | null; value: unknown }>();

function readScalar<T>(key: string, fallback: T, parse: (s: string) => T): T {
  if (!isBrowser()) return fallback;
  const raw = window.localStorage.getItem(key);
  const cached = scalarCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  let value: T;
  if (raw === null) {
    value = fallback;
  } else {
    try {
      value = parse(raw);
    } catch {
      value = fallback;
    }
  }
  scalarCache.set(key, { raw, value });
  return value;
}

function writeScalar(key: string, raw: string) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, raw);
    scalarCache.set(key, { raw, value: scalarCache.get(key)?.value });
  } catch {
    /* ignore */
  }
}

// ---------- useTone ---------------------------------------------------------
const parseTone = (s: string): ITone => (s === "casual" ? "casual" : "soft");

export const useTone = (): [ITone, (t: ITone) => void] => {
  const getSnap = useCallback(() => readScalar<ITone>(TONE_KEY, "soft", parseTone), []);
  const getServer = useCallback((): ITone => "soft", []);
  const tone = useSyncExternalStore(subscribe, getSnap, getServer);
  const setTone = useCallback((t: ITone) => {
    writeScalar(TONE_KEY, t);
    scalarCache.delete(TONE_KEY);
    notify();
  }, []);
  return [tone, setTone];
};

// ---------- useDailyCapEnabled ---------------------------------------------
const parseBool = (s: string): boolean => s === "true";

export const useDailyCapEnabled = (): [boolean, (b: boolean) => void] => {
  const getSnap = useCallback(
    () => readScalar<boolean>(DAILYCAP_KEY, true, parseBool),
    [],
  );
  const getServer = useCallback(() => true, []);
  const enabled = useSyncExternalStore(subscribe, getSnap, getServer);
  const setEnabled = useCallback((b: boolean) => {
    writeScalar(DAILYCAP_KEY, String(b));
    scalarCache.delete(DAILYCAP_KEY);
    notify();
  }, []);
  return [enabled, setEnabled];
};

// ---------- useTheme --------------------------------------------------------
const parseTheme = (s: string): ITheme => (s === "dark" ? "dark" : "light");

export const useTheme = (): [ITheme, (t: ITheme) => void] => {
  const getSnap = useCallback(() => readScalar<ITheme>(THEME_KEY, "light", parseTheme), []);
  const getServer = useCallback((): ITheme => "light", []);
  const theme = useSyncExternalStore(subscribe, getSnap, getServer);
  const setTheme = useCallback((t: ITheme) => {
    writeScalar(THEME_KEY, t);
    scalarCache.delete(THEME_KEY);
    if (isBrowser()) {
      document.documentElement.classList.toggle("dark", t === "dark");
    }
    notify();
  }, []);
  return [theme, setTheme];
};
