export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  }).replace(/\//g, ' ');
};

export const validatePersonalInfo = (info: any): boolean => {
  return !!(info.name && info.age && info.gender && info.occupation && info.address);
};

export const redirectToRegistration = (): void => {
  window.open('https://antrian.sambanglihum.com/apps/RegOnline/', '_blank');
};