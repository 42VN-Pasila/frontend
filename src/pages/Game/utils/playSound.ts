export const playSound = (soundPath: string, volume: number = 0.01) => {
  try {
    const audio = new Audio(soundPath);
    audio.volume = volume;
    audio.play().catch((error) => {
      console.warn('Sound play failed:', error);
    });
  } catch (error) {
    console.warn('Sound error:', error);
  }
};