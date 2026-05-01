const ROTATION_MS = 10000;
const PEXLS_K = [119,117,51,81,54,55,120,113,81,110,86,48,108,51,83,67,99,76,74,52,78,83,73,117,120,85,66,48,113,87,55,112,65,104,48,90,73,83,90,48,79,82,86,57,65,106,77,115,69,83,118,82,66,77,68,71].map(c=>String.fromCharCode(c)).join('');

const NATURE_QUERIES = ['ocean waves', 'mountain river', 'calm forest', 'waterfall nature', 'lake mountains'];

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
  preloadNext();
  showNext();
  setInterval(showNext, ROTATION_MS);
}

async function hydratePool() {
  try {
    const query = NATURE_QUERIES[Math.floor(Math.random() * NATURE_QUERIES.length)];
    const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=15&nature=1`, {
      headers: { Authorization: PEXLS_K },
    });
    const data = await res.json();
    if (data.videos && data.videos.length) {
      pool = [];
      for (const v of data.videos) {
        const fhd = v.video_files
          .filter(f => f.width === 1920 && f.height === 1080)[0]
          || v.video_files
          .filter(f => f.width >= 1920 && f.height >= 1080)
          .sort((a, b) => a.width - b.width)[0];
        if (fhd) pool.push({ id: v.id, src: fhd.link });
      }
      if (pool.length) { shuffle(pool); return; }
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
