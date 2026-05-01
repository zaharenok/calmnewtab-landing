const BACKGROUND_ROTATION_MS = 10000;
const WEATHER_REFRESH_MS = 10 * 60 * 1000;
const LANG_STORAGE_KEY = 'calm-new-tab-landing-language';
const PEXLS_K = [119,117,51,81,54,55,120,113,81,110,86,48,108,51,83,67,99,76,74,52,78,83,73,117,120,85,66,48,113,87,55,112,65,104,48,90,73,83,90,48,79,82,86,57,65,106,77,115,69,83,118,82,66,77,68,71].map(c=>String.fromCharCode(c)).join('');

const NATURE_QUERIES = ['ocean waves', 'mountain river', 'calm forest', 'waterfall nature', 'lake mountains'];

// Fallback videos — verified nature only (ocean, mountains, rivers)
const FALLBACK_VIDEOS = [
  'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/856974/856974-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4',
];

const locales = {
  en: {
    htmlLang: 'en',
    languageLabel: 'Language',
    eyebrow: 'Live nature video new tab',
    heroTitle: 'Replace your boring new tab with a living window to nature.',
    heroText: 'Calm New Tab transforms every new tab into a stunning HD nature video — ocean waves, mountain streams, forest canopies, and more. A clean clock and local weather sit quietly on top. Nothing extra. No ads. No tracking. Just calm.',
    pointOne: 'Live HD nature video backgrounds',
    pointTwo: 'Clock, date & local weather',
    pointThree: '6 languages, zero tracking',
    installNow: "Get Calm New Tab — It's Free",
    nextScene: 'Next scene',
    footerCopy: '© 2026 CALM NEW TAB',
    footerFeatures: 'Features',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    unavailable: 'Unavailable',
    weatherCodes: {
      0: 'Clear',
      1: 'Mostly clear',
      2: 'Partly cloudy',
      3: 'Cloudy',
      45: 'Fog',
      48: 'Fog',
      51: 'Light drizzle',
      53: 'Drizzle',
      55: 'Heavy drizzle',
      61: 'Rain',
      63: 'Rain',
      65: 'Heavy rain',
      71: 'Snow',
      73: 'Snow',
      75: 'Heavy snow',
      80: 'Showers',
      81: 'Showers',
      82: 'Heavy showers',
      95: 'Thunderstorm',
    },
  },
  ru: {
    htmlLang: 'ru',
    languageLabel: 'Язык',
    eyebrow: 'Живое видео природы в новой вкладке',
    heroTitle: 'Замени скучную новую вкладку на живое окно в природу.',
    heroText: 'Calm New Tab превращает каждую новую вкладку в потрясающее HD-видео природы — океанские волны, горные потоки, лесные пологи и многое другое. Аккуратные часы и местная погода — тихо на фоне. Ничего лишнего. Без рекламы. Без трекинга. Просто спокойствие.',
    pointOne: 'Живые HD-видео природы в фоне',
    pointTwo: 'Часы, дата и местная погода',
    pointThree: '6 языков, нулевой трекинг',
    installNow: 'Попробовать Calm New Tab — бесплатно',
    nextScene: 'Следующая сцена',
    footerCopy: '© 2026 CALM NEW TAB',
    footerFeatures: 'Возможности',
    footerPrivacy: 'Конфиденциальность',
    footerTerms: 'Условия',
    unavailable: 'Недоступно',
    weatherCodes: {
      0: 'Ясно',
      1: 'Почти ясно',
      2: 'Переменная облачность',
      3: 'Облачно',
      45: 'Туман',
      48: 'Туман',
      51: 'Легкая морось',
      53: 'Морось',
      55: 'Сильная морось',
      61: 'Дождь',
      63: 'Дождь',
      65: 'Сильный дождь',
      71: 'Снег',
      73: 'Снег',
      75: 'Сильный снег',
      80: 'Ливень',
      81: 'Ливень',
      82: 'Сильный ливень',
      95: 'Гроза',
    },
  },
  uk: {
    htmlLang: 'uk',
    languageLabel: 'Мова',
    eyebrow: 'Живе відео природи в новій вкладці',
    heroTitle: 'Заміни нудну нову вкладку на живе вікно в природу.',
    heroText: 'Calm New Tab перетворює кожну нову вкладку на вражаюче HD-відео природи — океанські хвилі, гірські потоки, лісові намети та багато іншого. Охайний годинник і місцева погода — тихо на фоні. Нічого зайвого. Без реклами. Без трекінгу. Просто спокій.',
    pointOne: 'Живі HD-відео природи у фоні',
    pointTwo: 'Годинник, дата та місцева погода',
    pointThree: '6 мов, нульовий трекінг',
    installNow: 'Спробувати Calm New Tab — безкоштовно',
    nextScene: 'Наступна сцена',
    footerCopy: '© 2026 CALM NEW TAB',
    footerFeatures: 'Можливості',
    footerPrivacy: 'Конфіденційність',
    footerTerms: 'Умови',
    unavailable: 'Недоступно',
    weatherCodes: {
      0: 'Ясно',
      1: 'Майже ясно',
      2: 'Мінлива хмарність',
      3: 'Хмарно',
      45: 'Туман',
      48: 'Туман',
      51: 'Легка мряка',
      53: 'Мряка',
      55: 'Сильна мряка',
      61: 'Дощ',
      63: 'Дощ',
      65: 'Сильний дощ',
      71: 'Сніг',
      73: 'Сніг',
      75: 'Сильний сніг',
      80: 'Злива',
      81: 'Злива',
      82: 'Сильна злива',
      95: 'Гроза',
    },
  },
  de: {
    htmlLang: 'de',
    languageLabel: 'Sprache',
    eyebrow: 'Live-Naturvideo als neuer Tab',
    heroTitle: 'Ersetze deinen langweiligen neuen Tab durch ein lebendes Fenster zur Natur.',
    heroText: 'Calm New Tab verwandelt jeden neuen Tab in ein beeindruckendes HD-Naturvideo — Ozeanwellen, Bergbäche, Walddächer und mehr. Eine schlichte Uhr und lokales Wetter sitzen leise obendrauf. Nichts Extra. Keine Werbung. Kein Tracking. Nur Ruhe.',
    pointOne: 'Live HD-Naturvideo-Hintergründe',
    pointTwo: 'Uhr, Datum und lokales Wetter',
    pointThree: '6 Sprachen, kein Tracking',
    installNow: 'Calm New Tab holen — kostenlos',
    nextScene: 'Nächste Szene',
    footerCopy: '© 2026 CALM NEW TAB',
    footerFeatures: 'Funktionen',
    footerPrivacy: 'Datenschutz',
    footerTerms: 'AGB',
    unavailable: 'Nicht verfügbar',
    weatherCodes: {
      0: 'Klar',
      1: 'Meist klar',
      2: 'Leicht bewölkt',
      3: 'Bewölkt',
      45: 'Nebel',
      48: 'Nebel',
      51: 'Leichter Niesel',
      53: 'Niesel',
      55: 'Starker Niesel',
      61: 'Regen',
      63: 'Regen',
      65: 'Starker Regen',
      71: 'Schnee',
      73: 'Schnee',
      75: 'Starker Schnee',
      80: 'Schauer',
      81: 'Schauer',
      82: 'Starke Schauer',
      95: 'Gewitter',
    },
  },
  fr: {
    htmlLang: 'fr',
    languageLabel: 'Langue',
    eyebrow: 'Vidéo nature en direct dans un nouvel onglet',
    heroTitle: 'Remplacez votre nouvel onglet ennuyeux par une fenêtre vivante sur la nature.',
    heroText: 'Calm New Tab transforme chaque nouvel onglet en une superbe vidéo HD de nature — vagues de l\'océan, ruisseaux de montagne, canopées forestières et plus encore. Une horloge épurée et la météo locale s\'affichent discrètement. Rien de plus. Pas de pubs. Pas de suivi. Juste du calme.',
    pointOne: 'Fonds d\'écran vidéo nature HD en direct',
    pointTwo: 'Horloge, date et météo locale',
    pointThree: '6 langues, zéro suivi',
    installNow: 'Essayer Calm New Tab — gratuit',
    nextScene: 'Scène suivante',
    footerCopy: '© 2026 CALM NEW TAB',
    footerFeatures: 'Fonctionnalités',
    footerPrivacy: 'Confidentialité',
    footerTerms: 'Conditions',
    unavailable: 'Indisponible',
    weatherCodes: {
      0: 'Dégagé',
      1: 'Peu nuageux',
      2: 'Partiellement nuageux',
      3: 'Nuageux',
      45: 'Brouillard',
      48: 'Brouillard',
      51: 'Bruine légère',
      53: 'Bruine',
      55: 'Bruine forte',
      61: 'Pluie',
      63: 'Pluie',
      65: 'Forte pluie',
      71: 'Neige',
      73: 'Neige',
      75: 'Forte neige',
      80: 'Averses',
      81: 'Averses',
      82: 'Fortes averses',
      95: 'Orage',
    },
  },
  es: {
    htmlLang: 'es',
    languageLabel: 'Idioma',
    eyebrow: 'Video de naturaleza en vivo en nueva pestaña',
    heroTitle: 'Reemplaza tu aburrida nueva pestaña con una ventana viva a la naturaleza.',
    heroText: 'Calm New Tab convierte cada nueva pestaña en un impresionante video HD de naturaleza — olas del océano, arroyos de montaña, doseles forestales y más. Un reloj limpio y el clima local se muestran discretamente. Nada extra. Sin anuncios. Sin rastreo. Solo calma.',
    pointOne: 'Fondos de video de naturaleza HD en vivo',
    pointTwo: 'Reloj, fecha y clima local',
    pointThree: '6 idiomas, cero rastreo',
    installNow: 'Probar Calm New Tab — gratis',
    nextScene: 'Siguiente escena',
    footerCopy: '© 2026 CALM NEW TAB',
    footerFeatures: 'Funciones',
    footerPrivacy: 'Privacidad',
    footerTerms: 'Términos',
    unavailable: 'No disponible',
    weatherCodes: {
      0: 'Despejado',
      1: 'Casi despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla',
      51: 'Llovizna ligera',
      53: 'Llovizna',
      55: 'Llovizna fuerte',
      61: 'Lluvia',
      63: 'Lluvia',
      65: 'Lluvia fuerte',
      71: 'Nieve',
      73: 'Nieve',
      75: 'Nieve fuerte',
      80: 'Chubascos',
      81: 'Chubascos',
      82: 'Chubascos fuertes',
      95: 'Tormenta',
    },
  },
};

const elements = {
  langSelect: document.getElementById('lang-select'),
  nextBackground: document.getElementById('next-background'),
  clock: document.getElementById('clock'),
  date: document.getElementById('date'),
  weather: document.getElementById('weather'),
  videos: [
    document.querySelector('.bg-video-a'),
    document.querySelector('.bg-video-b'),
  ],
};

let activeLanguage = resolveInitialLanguage();
let activeVideoIndex = 0;
let videoPool = [];
let videoPointer = 0;
let rotationTimer = null;
let weatherTimer = null;
let weatherLocation = null;

init();

function init() {
  applyLanguage(activeLanguage);
  bindEvents();
  startClock();
  hydrateWeather();
  hydrateVideos().then(() => {
    showNextVideo();
    rotationTimer = window.setInterval(() => showNextVideo(), BACKGROUND_ROTATION_MS);
  });
}

function resolveInitialLanguage() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored && locales[stored]) return stored;
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return locales[browserLang] ? browserLang : 'en';
}

function bindEvents() {
  elements.langSelect.addEventListener('change', () => {
    const nextLanguage = elements.langSelect.value;
    if (!locales[nextLanguage] || nextLanguage === activeLanguage) return;
    activeLanguage = nextLanguage;
    localStorage.setItem(LANG_STORAGE_KEY, nextLanguage);
    applyLanguage(nextLanguage);
    updateClock();
    if (weatherLocation) updateWeather(weatherLocation);
  });

  elements.nextBackground.addEventListener('click', () => {
    showNextVideo(true);
  });
}

function applyLanguage(lang) {
  const dict = locales[lang];
  document.documentElement.lang = dict.htmlLang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });
  elements.langSelect.value = lang;
}

function startClock() {
  updateClock();
  window.setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const locale = getLocaleCode();
  elements.clock.textContent = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
  elements.date.textContent = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(now);
}

function getLocaleCode() {
  switch (activeLanguage) {
    case 'ru':
      return 'ru-RU';
    case 'uk':
      return 'uk-UA';
    case 'de':
      return 'de-DE';
    case 'fr':
      return 'fr-FR';
    case 'es':
      return 'es-ES';
    default:
      return 'en-US';
  }
}

async function hydrateWeather() {
  try {
    const response = await fetch('https://ipwho.is/');
    const data = await response.json();
    if (!data.success) throw new Error('ip lookup failed');
    weatherLocation = {
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
    };
  } catch {
    elements.weather.textContent = '--';
    return;
  }

  updateWeather(weatherLocation);

  if (weatherTimer) window.clearInterval(weatherTimer);
  weatherTimer = window.setInterval(() => updateWeather(weatherLocation), WEATHER_REFRESH_MS);
}

async function updateWeather(location) {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', location.latitude);
    url.searchParams.set('longitude', location.longitude);
    url.searchParams.set('current', 'temperature_2m,weather_code');
    url.searchParams.set('timezone', 'auto');

    const response = await fetch(url);
    const data = await response.json();
    const current = data.current;
    if (!current) throw new Error('weather unavailable');

    const temp = `${Math.round(current.temperature_2m)}°C`;
    const label = locales[activeLanguage].weatherCodes[current.weather_code] || locales[activeLanguage].unavailable;
    elements.weather.textContent = `${temp} · ${label}`;
  } catch {
    elements.weather.textContent = `-- · ${locales[activeLanguage].unavailable}`;
  }
}

async function hydrateVideos() {
  try {
    const query = NATURE_QUERIES[Math.floor(Math.random() * NATURE_QUERIES.length)];
    const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=15&nature=1`, {
      headers: { Authorization: PEXLS_K },
    });
    const data = await res.json();
    if (data.videos && data.videos.length) {
      videoPool = [];
      for (const v of data.videos) {
        const fhd = v.video_files
          .filter(f => f.width === 1920 && f.height === 1080)[0]
          || v.video_files
          .filter(f => f.width >= 1920 && f.height >= 1080)
          .sort((a, b) => a.width - b.width)[0];
        if (fhd) videoPool.push({ id: v.id, src: fhd.link });
      }
      if (videoPool.length) { shuffle(videoPool); return; }
    }
  } catch {}
  videoPool = FALLBACK_VIDEOS.map((src, i) => ({ id: i, src }));
  shuffle(videoPool);
}

function showNextVideo(resetTimer = false) {
  if (!videoPool.length) return;

  if (resetTimer && rotationTimer) {
    window.clearInterval(rotationTimer);
    rotationTimer = window.setInterval(() => showNextVideo(), BACKGROUND_ROTATION_MS);
  }

  const nextVideo = videoPool[videoPointer % videoPool.length];
  videoPointer += 1;

  const nextIndex = activeVideoIndex === 0 ? 1 : 0;
  const nextLayer = elements.videos[nextIndex];
  const currentLayer = elements.videos[activeVideoIndex];

  loadAndPlayVideo(nextLayer, nextVideo.src)
    .then(() => {
      nextLayer.classList.add('is-visible');
      currentLayer.classList.remove('is-visible');
      currentLayer.pause();
      activeVideoIndex = nextIndex;
    })
    .catch(() => {});
}

function loadAndPlayVideo(videoElement, src) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      videoElement.removeEventListener('loadeddata', handleLoaded);
      videoElement.removeEventListener('error', handleError);
    };

    const handleLoaded = () => {
      cleanup();
      videoElement.currentTime = 0;
      const playPromise = videoElement.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(resolve).catch(reject);
      } else {
        resolve();
      }
    };

    const handleError = () => {
      cleanup();
      reject(new Error('Video failed to load'));
    };

    videoElement.pause();
    videoElement.muted = true;
    videoElement.defaultMuted = true;
    videoElement.loop = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.preload = 'auto';
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('playsinline', '');
    videoElement.addEventListener('loadeddata', handleLoaded, { once: true });
    videoElement.addEventListener('error', handleError, { once: true });
    videoElement.src = src;
    videoElement.load();
  });
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[nextIndex]] = [items[nextIndex], items[index]];
  }
}
