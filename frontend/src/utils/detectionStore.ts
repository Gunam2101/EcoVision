// Live Detection Store managing real dynamic counters without mock values

export interface DetectionRecord {
  id: string;
  material: string;
  classification: 'REUSABLE' | 'NON_REUSABLE';
  confidence: number;
  dateTime: string;
  co2SavedKg: number;
}

export interface GlobalStats {
  totalScans: number;
  totalObjectsDetected: number;
  totalReusableCount: number;
  totalSingleUseCount: number;
  totalCo2SavedKg: number;
  categoryCounts: { [key: string]: number };
}

const STORAGE_KEY_STATS = 'ecovision_live_stats';
const STORAGE_KEY_LOGS = 'ecovision_live_logs';

export const getLiveStats = (): GlobalStats => {
  if (typeof window === 'undefined') {
    return {
      totalScans: 0,
      totalObjectsDetected: 0,
      totalReusableCount: 0,
      totalSingleUseCount: 0,
      totalCo2SavedKg: 0,
      categoryCounts: {},
    };
  }

  const saved = localStorage.getItem(STORAGE_KEY_STATS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }

  return {
    totalScans: 0,
    totalObjectsDetected: 0,
    totalReusableCount: 0,
    totalSingleUseCount: 0,
    totalCo2SavedKg: 0,
    categoryCounts: {},
  };
};

export const getLiveLogs = (): DetectionRecord[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY_LOGS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return [];
};

export const addLiveDetection = (objects: any[]) => {
  if (typeof window === 'undefined' || !objects || objects.length === 0) return;

  const currentStats = getLiveStats();
  const currentLogs = getLiveLogs();

  let addedCo2 = 0;
  let addedReusable = 0;
  let addedSingleUse = 0;
  const newRecords: DetectionRecord[] = [];

  const categoryCounts = { ...currentStats.categoryCounts };

  objects.forEach((obj) => {
    const isReusable = obj.reusable || obj.classification === 'REUSABLE';
    const co2 = obj.co2SavingsKg || (isReusable ? 0.50 : 0.0);

    if (isReusable) addedReusable++;
    else addedSingleUse++;

    addedCo2 += co2;
    categoryCounts[obj.label] = (categoryCounts[obj.label] || 0) + 1;

    newRecords.push({
      id: `det-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      material: obj.label,
      classification: isReusable ? 'REUSABLE' : 'NON_REUSABLE',
      confidence: Math.round((obj.confidence || 0.95) * 100),
      dateTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      co2SavedKg: parseFloat(co2.toFixed(2)),
    });
  });

  const updatedStats: GlobalStats = {
    totalScans: currentStats.totalScans + 1,
    totalObjectsDetected: currentStats.totalObjectsDetected + objects.length,
    totalReusableCount: currentStats.totalReusableCount + addedReusable,
    totalSingleUseCount: currentStats.totalSingleUseCount + addedSingleUse,
    totalCo2SavedKg: parseFloat((currentStats.totalCo2SavedKg + addedCo2).toFixed(2)),
    categoryCounts,
  };

  const updatedLogs = [...newRecords, ...currentLogs].slice(0, 50);

  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updatedStats));
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updatedLogs));

  return updatedStats;
};
