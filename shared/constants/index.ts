export const APP_NAME = 'EcoVision AI';
export const APP_TAGLINE = 'AI Powered Smart Waste Detection & Smart Recycling Platform';

export const WASTE_METRICS = {
  PLASTIC: { co2PerKg: 1.5, points: 15, recyclable: true, color: '#3B82F6' },
  GLASS: { co2PerKg: 0.3, points: 10, recyclable: true, color: '#10B981' },
  METAL: { co2PerKg: 2.1, points: 25, recyclable: true, color: '#F59E0B' },
  PAPER: { co2PerKg: 0.8, points: 8, recyclable: true, color: '#8B5CF6' },
  CARDBOARD: { co2PerKg: 0.9, points: 12, recyclable: true, color: '#EC4899' },
  ORGANIC: { co2PerKg: 0.2, points: 5, recyclable: true, color: '#84CC16' },
  E_WASTE: { co2PerKg: 4.5, points: 50, recyclable: true, color: '#EF4444' },
  HAZARDOUS: { co2PerKg: 0.0, points: 0, recyclable: false, color: '#DC2626' },
  TRASH: { co2PerKg: 0.0, points: 0, recyclable: false, color: '#6B7280' },
};

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
  },
  DETECTION: {
    UPLOAD: '/api/v1/detection/upload',
    LIVE: '/api/v1/detection/live',
    HISTORY: '/api/v1/detection/history',
    STATS: '/api/v1/detection/stats',
  },
  ADMIN: {
    USERS: '/api/v1/admin/users',
    LOGS: '/api/v1/admin/logs',
    SETTINGS: '/api/v1/admin/settings',
  },
};
