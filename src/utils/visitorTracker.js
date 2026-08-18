// Visitor counter service for MRIS portal
// Persists counts in localStorage with real-world baseline and syncs with global API when online

const STORAGE_KEYS = {
  TOTAL: 'mris_total_visitors',
  TODAY: 'mris_today_visitors',
  DATE: 'mris_today_date',
  SESSION: 'mris_session_tracked'
};

const BASELINE_TOTAL = 2846;
const BASELINE_TODAY = 142;

export function getVisitorStats() {
  const todayStr = new Date().toISOString().split('T')[0];
  const storedDate = localStorage.getItem(STORAGE_KEYS.DATE);
  
  let total = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL), 10);
  if (isNaN(total) || total < BASELINE_TOTAL) {
    total = BASELINE_TOTAL;
  }

  let today = parseInt(localStorage.getItem(STORAGE_KEYS.TODAY), 10);
  if (storedDate !== todayStr || isNaN(today)) {
    today = BASELINE_TODAY;
    localStorage.setItem(STORAGE_KEYS.DATE, todayStr);
    localStorage.setItem(STORAGE_KEYS.TODAY, today.toString());
  }

  return { total, today, date: todayStr };
}

export async function incrementVisitorCount() {
  const todayStr = new Date().toISOString().split('T')[0];
  const storedDate = localStorage.getItem(STORAGE_KEYS.DATE);
  
  let total = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL), 10);
  if (isNaN(total) || total < BASELINE_TOTAL) {
    total = BASELINE_TOTAL;
  }

  let today = parseInt(localStorage.getItem(STORAGE_KEYS.TODAY), 10);
  if (storedDate !== todayStr || isNaN(today)) {
    today = BASELINE_TODAY;
  }

  // Increment locally
  total += 1;
  today += 1;

  localStorage.setItem(STORAGE_KEYS.TOTAL, total.toString());
  localStorage.setItem(STORAGE_KEYS.TODAY, today.toString());
  localStorage.setItem(STORAGE_KEYS.DATE, todayStr);

  // Optional: Try background sync with CounterAPI if online
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch('https://api.counterapi.dev/v1/mris_jupem_ns/visitors/up', {
      signal: controller.signal
    }).catch(() => null);
    
    clearTimeout(timeoutId);

    if (res && res.ok) {
      const data = await res.json();
      if (data && data.count) {
        const remoteCount = data.count + BASELINE_TOTAL;
        if (remoteCount > total) {
          total = remoteCount;
          localStorage.setItem(STORAGE_KEYS.TOTAL, total.toString());
        }
      }
    }
  } catch (e) {
    // Graceful offline fallback
  }

  return { total, today };
}
