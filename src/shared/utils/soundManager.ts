class SoundManager {
  private sounds: Map<string, HTMLAudioElement[]> = new Map();

  preload(soundPath: string, poolSize: number = 8) {
    const pool: HTMLAudioElement[] = [];
    
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(soundPath);
      audio.preload = 'auto';
      audio.load();
      pool.push(audio);
    }
    
    this.sounds.set(soundPath, pool);
    console.log(`Preloaded ${poolSize} instances of: ${soundPath}`);
  }


  play(soundPath: string, volume: number = 0.3) {
    const pool = this.sounds.get(soundPath);
    
    if (!pool) {
      console.warn(`Sound not preloaded: ${soundPath}`);
      return;
    }

    const audio = pool.find(a => a.paused || a.ended);
    
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.warn('Audio play failed:', err);
      });
    } else {
      console.warn('All audio instances busy for:', soundPath);
    }
  }
}

export const soundManager = new SoundManager();

soundManager.preload('/src/assets/sounds/deal-card-sound.mp3', 52);
