export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
  googleId?: string;
  recyclingScore?: number;
  totalScans?: number;
  totalCo2SavedKg?: number;
}

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('ecovision_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

export const setAuthSession = (user: AuthUser, accessToken?: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ecovision_user', JSON.stringify(user));
  if (accessToken) {
    localStorage.setItem('ecovision_token', accessToken);
  }
};

export const clearAuthSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('ecovision_user');
  localStorage.removeItem('ecovision_token');
  window.location.href = '/login';
};

export const isAuthenticated = (): boolean => {
  return getAuthUser() !== null;
};
