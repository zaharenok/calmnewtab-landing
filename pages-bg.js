const ROTATION_MS = 10000;
const CACHE_KEY = 'calm-new-tab-video-cache';

const VIDEO_SOURCES = [
  'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/856974/856974-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/1671054/1671054-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/1093632/1093632-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2505902/2505902-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/856116/856116-hd_1920_1080_25fps.mp4',
];

const videos = [
  document.querySelector('.bg-video-a'),
  document.querySelector('.bg-video-b'),
];

let activeIndex = 0;
let pool = [];
let pointer = 0;
const blobCache = new Map();
let preloadQueue = [];

init();

function init() {
  pool = VIDEO_SOURCES.map((src, i) => ({ id: i, src }));
  shuffle(pool);
  preloadNext();
  showNext();
  setInterval(showNext, ROTATION_MS);
}

function preloadNext() {
  const next3 = [];
  for (let i = 0; i < 3; i++) {
    const idx = (pointer + i) % pool.length;
    next3.push(pool[idx].src);
  }
  next3.forEach((src) => {
    if (blobCache.has(src)) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
  });
}

function showNext() {
  if (!pool.length) return;

  const next = pool[pointer % pool.length];
  pointer += 1;

  const nextLayer = activeIndex === 0 ? 1 : 0;
  const currentLayer = activeIndex;

  loadAndPlay(videos[nextLayer], next.src)
    .then(() => {
      videos[nextLayer].classList.add('is-visible');
      videos[currentLayer].classList.remove('is-visible');
      videos[currentLayer].pause();
      activeIndex = nextLayer;
      preloadNext();
    })
    .catch(() => {});
}

function loadAndPlay(video, src) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener('loadeddata', onLoaded);
      video.removeEventListener('error', onError);
    };
    const onLoaded = () => {
      cleanup();
      video.currentTime = 0;
      const p = video.play();
      if (p && typeof p.then === 'function') p.then(resolve).catch(reject);
      else resolve();
    };
    const onError = () => { cleanup(); reject(new Error('video load failed')); };

    video.pause();
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.addEventListener('loadeddata', onLoaded, { once: true });
    video.addEventListener('error', onError, { once: true });
    video.src = src;
    video.load();
  });
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
}
