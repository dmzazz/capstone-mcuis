export const getCurrentTime = () => {
  const now = new Date();
  const day = now.toLocaleDateString('id-ID', {weekday: 'long'});
  const date = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const time = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${day}, ${date} ${time}`;
};
