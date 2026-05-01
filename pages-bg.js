const ROTATION_MS = 10000;
const PEXLS_K = '__PEXELS_API_KEY__';

const NATURE_QUERIES = ['slow motion ocean waves', 'calm mountain river', 'slow motion forest', 'calm waterfall', 'slow motion lake'];
const VIDEO_CACHE_KEY = 'calm-new-tab-video-cache';
const VIDEO_CACHE_TTL = 6 * 60 * 60 * 1000;

const FALLBACK_VIDEOS = [
  'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/856974/856974-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4',
];

const videos = [
  document.querySelector('.bg-video-a'),
  document.querySelector('.bg-video-b'),
];

let activeIndex = 0;
let pool = [];
let pointer = 0;

init();

async function init() {
  await hydratePool();
  const instantSrc = sessionStorage.getItem('calm-current-video');
  if (instantSrc && pool.length) {
    const match = pool.find(v => v.src === instantSrc);
    if (match) {
      pool.splice(pool.indexOf(match), 1);
      pool.unshift(match);
    }
  }
  preloadNext();
  showNext();
  setInterval(showNext, ROTATION_MS);
}

async function hydratePool() {
  const cached = localStorage.getItem(VIDEO_CACHE_KEY);
  if (cached) {
    try {
      const { ts, urls } = JSON.parse(cached);
      if (Date.now() - ts < VIDEO_CACHE_TTL && urls.length) {
        pool = urls.map((src, i) => ({ id: i, src }));
        shuffle(pool);
        return;
      }
    } catch {}
  }
  try {
    const query = NATURE_QUERIES[Math.floor(Math.random() * NATURE_QUERIES.length)];
    const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=15&nature=1`, {
      headers: { Authorization: PEXLS_K },
    });
    const data = await res.json();
    if (data.videos && data.videos.length) {
      const urls = [];
      for (const v of data.videos) {
        const fhd = v.video_files
          .filter(f => f.width === 1920 && f.height === 1080)[0]
          || v.video_files
          .filter(f => f.width >= 1920 && f.height >= 1080)
          .sort((a, b) => a.width - b.width)[0];
        if (fhd) urls.push(fhd.link);
      }
      if (urls.length) {
        localStorage.setItem(VIDEO_CACHE_KEY, JSON.stringify({ ts: Date.now(), urls }));
        pool = urls.map((src, i) => ({ id: i, src }));
        shuffle(pool);
        return;
      }
    }
  } catch {}
  pool = FALLBACK_VIDEOS.map((src, i) => ({ id: i, src }));
  shuffle(pool);
}

function preloadNext() {
  for (let i = 0; i < 3; i++) {
    const idx = (pointer + i) % pool.length;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = pool[idx].src;
    document.head.appendChild(link);
  }
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
      sessionStorage.setItem('calm-current-video', next.src);
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
      video.playbackRate = 0.5;
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
