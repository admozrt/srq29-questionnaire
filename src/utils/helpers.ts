export const getCurrentDateInIndonesia = () => {
    const now = new Date();
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    }).format(now);
};

export const validatePersonalInfo = (info: any): boolean => {
  return !!(info.name && info.age && info.gender && info.institution);
};

export const redirectToRegistration = (): void => {
  window.open('https://antrian.sambanglihum.com/apps/RegOnline/', '_blank');
};