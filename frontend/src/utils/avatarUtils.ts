export const getProfileAvatar = (fullName?: string, customAvatarUrl?: string): string => {
  if (customAvatarUrl && customAvatarUrl.startsWith('http')) {
    return customAvatarUrl;
  }

  const safeName = (fullName || 'User').trim();
  const firstName = safeName.split(/\s+/)[0]?.toLowerCase() || 'user';

  const femaleNames = [
    'sarah', 'emma', 'priya', 'ananya', 'sophia', 'jessica', 'laura', 'maria',
    'divya', 'kavya', 'chloe', 'emily', 'hannah', 'olivia', 'isabella', 'mia',
    'amanda', 'rachel', 'sneha', 'pooja', 'deepa', 'meera', 'aarti', 'neha',
    'nisha', 'isha', 'tanvi', 'riya', 'maya', 'ava', 'zoe', 'lily', 'grace'
  ];

  const isFemale = femaleNames.some((name) => firstName === name || firstName.includes(name));
  const primary = isFemale ? '#f472b6' : '#60a5fa';
  const secondary = isFemale ? '#f9a8d4' : '#93c5fd';
  const shirt = isFemale ? '#fdf2f8' : '#dbeafe';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${safeName} avatar">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${secondary}" />
          <stop offset="100%" stop-color="${primary}" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="32" fill="url(#g)"/>
      <circle cx="64" cy="42" r="20" fill="#f8fafc"/>
      <path d="M40 94c3-16 13-23 24-23s21 7 24 23v8H40v-8Z" fill="${shirt}"/>
      <path d="M46 38c2-17 12-20 18-20 16 0 22 11 22 20v10H46V38Z" fill="${isFemale ? '#4b5563' : '#1f2937'}" opacity="0.85"/>
      <circle cx="64" cy="44" r="17" fill="#f8fafc"/>
      <path d="M51 40c3-9 10-13 13-13s9 2 13 7c-3 2-5 5-7 8H58c-2-1-4-2-7-2Z" fill="${isFemale ? '#3b3b3b' : '#0f172a'}"/>
      <circle cx="58" cy="44" r="2" fill="#111827"/>
      <circle cx="70" cy="44" r="2" fill="#111827"/>
      <path d="M59 52c3 3 7 3 10 0" stroke="#111827" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
