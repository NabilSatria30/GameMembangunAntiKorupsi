const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const storyCanvas = document.getElementById("storyCanvas");
const storyCtx = storyCanvas.getContext("2d");

const ui = {
  hud: document.getElementById("hud"),
  score: document.getElementById("scoreText"),
  level: document.getElementById("levelText"),
  mode: document.getElementById("modeText"),
  budget: document.getElementById("budgetText"),
  time: document.getElementById("timeText"),
  integrity: document.getElementById("integrityText"),
  combo: document.getElementById("comboText"),
  rank: document.getElementById("rankText"),
  coin: document.getElementById("coinText"),
  strengthFill: document.getElementById("strengthFill"),
  missionPanel: document.getElementById("choicePanel"),
  missionToggle: document.getElementById("missionToggleButton"),
  missionText: document.getElementById("roundText"),
  levelGoal: document.getElementById("levelGoalText"),
  materialHintText: document.getElementById("materialHintText"),
  fundHintText: document.getElementById("fundHintText"),
  materialHintIcon: document.getElementById("materialHintIcon"),
  fundHintIcon: document.getElementById("fundHintIcon"),
  start: document.getElementById("startScreen"),
  shop: document.getElementById("shopScreen"),
  characterShopGrid: document.getElementById("characterShopGrid"),
  vehicleShopGrid: document.getElementById("vehicleShopGrid"),
  shopCoin: document.getElementById("shopCoinText"),
  achievement: document.getElementById("achievementScreen"),
  achievementGrid: document.getElementById("achievementGrid"),
  itemGuide: document.getElementById("itemGuideScreen"),
  itemGuideGrid: document.getElementById("itemGuideGrid"),
  levelSelect: document.getElementById("levelSelectScreen"),
  levelGrid: document.getElementById("levelGrid"),
  cinematic: document.getElementById("cinematicScreen"),
  cinematicLabel: document.getElementById("cinematicLabel"),
  cinematicTitle: document.getElementById("cinematicTitle"),
  cinematicText: document.getElementById("cinematicText"),
  cinematicProgress: document.getElementById("cinematicProgress"),
  story: document.getElementById("storyScreen"),
  dialog: document.getElementById("dialogScreen"),
  dialogAvatar: document.getElementById("dialogAvatar"),
  dialogMcAvatar: document.getElementById("dialogMcAvatar"),
  dialogBackground: document.getElementById("dialogBackground"),
  dialogSpeaker: document.getElementById("dialogSpeaker"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogText: document.getElementById("dialogText"),
  pause: document.getElementById("pauseScreen"),
  confirm: document.getElementById("confirmScreen"),
  confirmLabel: document.getElementById("confirmLabel"),
  confirmTitle: document.getElementById("confirmTitle"),
  confirmMessage: document.getElementById("confirmMessage"),
  over: document.getElementById("gameOverScreen"),
  how: document.getElementById("howScreen"),
  resultLabel: document.getElementById("resultLabel"),
  resultTitle: document.getElementById("resultTitle"),
  resultScene: document.getElementById("resultScene"),
  resultMessage: document.getElementById("resultMessage"),
  finalScore: document.getElementById("finalScore"),
  finalHighScore: document.getElementById("finalHighScore"),
  finalRank: document.getElementById("finalRank"),
  finalCombo: document.getElementById("finalCombo"),
  startHighScore: document.getElementById("startHighScore"),
  startLeaderboard: document.getElementById("startLeaderboard"),
  finalLeaderboard: document.getElementById("finalLeaderboard")
};

const buttons = {
  start: document.getElementById("startButton"),
  endless: document.getElementById("endlessButton"),
  shop: document.getElementById("shopButton"),
  closeShop: document.getElementById("closeShopButton"),
  achievement: document.getElementById("achievementButton"),
  closeAchievement: document.getElementById("closeAchievementButton"),
  itemGuide: document.getElementById("itemGuideButton"),
  closeItemGuide: document.getElementById("closeItemGuideButton"),
  settings: document.getElementById("settingsButton"),
  closeLevelSelect: document.getElementById("closeLevelSelectButton"),
  dash: document.getElementById("dashButton"),
  storyStart: document.getElementById("storyStartButton"),
  cinematicStart: document.getElementById("cinematicStartButton"),
  skipCinematic: document.getElementById("skipCinematicButton"),
  dialogContinue: document.getElementById("dialogContinueButton"),
  dialogSkip: document.getElementById("dialogSkipButton"),
  closeStory: document.getElementById("closeStoryButton"),
  how: document.getElementById("howButton"),
  closeHow: document.getElementById("closeHowButton"),
  pause: document.getElementById("pauseButton"),
  music: document.getElementById("musicButton"),
  resume: document.getElementById("resumeButton"),
  restart: document.getElementById("restartButton"),
  retryLevel: document.getElementById("retryLevelButton"),
  restartPause: document.getElementById("restartFromPauseButton"),
  homePause: document.getElementById("homeFromPauseButton"),
  clearData: document.getElementById("clearDataButton"),
  musicVolume: document.getElementById("musicVolumeSlider"),
  sfxVolume: document.getElementById("sfxVolumeSlider"),
  confirmYes: document.getElementById("confirmYesButton"),
  confirmNo: document.getElementById("confirmNoButton"),
  backToStart: document.getElementById("backToStartButton")
};

const itemTypes = {
  material: {
    label: "Baja Legal",
    color: "#1cad6f",
    icon: "beam",
    image: "material",
    score: 90,
    progress: 8,
    integrity: 1,
    budget: 2,
    message: "Material legal memperkuat proyek."
  },
  fund: {
    label: "Semen Standar",
    color: "#2675ff",
    icon: "bag",
    image: "fund",
    score: 80,
    progress: 7,
    integrity: 2,
    budget: 1,
    message: "Semen standar menambah progres konstruksi."
  },
  permit: {
    label: "Dokumen Izin",
    color: "#8ee8d6",
    icon: "doc",
    image: "permitDoc",
    score: 130,
    progress: 5,
    integrity: 5,
    budget: 0,
    message: "Dokumen izin lengkap membuat proyek transparan."
  },
  safety: {
    label: "Helm Kerja",
    color: "#f5b642",
    icon: "helmet",
    image: "safetyHelmet",
    score: 110,
    progress: 4,
    integrity: 8,
    budget: -1,
    message: "Keselamatan pekerja terjaga. Integritas naik."
  },
  shield: {
    label: "Shield Audit",
    color: "#9b5cff",
    icon: "shield",
    image: "auditShield",
    score: 140,
    progress: 2,
    integrity: 4,
    budget: 0,
    power: "shield",
    message: "Shield audit aktif. Satu item buruk akan ditahan."
  },
  magnet: {
    label: "Magnet Bahan",
    color: "#38d6d1",
    icon: "magnet",
    image: "materialMagnet",
    score: 120,
    progress: 2,
    integrity: 2,
    budget: 0,
    power: "magnet",
    message: "Magnet bahan aktif. Item baik tertarik ke pengawas."
  },
  time: {
    label: "Jam Bonus",
    color: "#ffd166",
    icon: "clock",
    image: "timeStar",
    score: 100,
    progress: 1,
    integrity: 1,
    budget: 0,
    power: "time",
    message: "Waktu proyek bertambah."
  },
  bribe: {
    label: "Suap Dana",
    color: "#f5b642",
    icon: "envelope",
    image: "bribe",
    score: -70,
    progress: -7,
    integrity: -18,
    budget: -5,
    message: "Suap dana membuat progres proyek mundur."
  },
  fake: {
    label: "Material Palsu",
    color: "#c53d4a",
    icon: "crack",
    image: "fake",
    score: -85,
    progress: -9,
    integrity: -12,
    budget: -2,
    message: "Material palsu membuat proyek rapuh."
  }
};

const levels = [
  {
    name: "Level 1: Jembatan Desa Bersih",
    project: "bridge",
    background: "backgroundBridge",
    projectLabel: "Jembatan Desa",
    goal: "Bangun jembatan desa sebagai awal pemulihan Kertasa",
    spawnInterval: 0.94,
    duration: 60,
    fallSpeed: 118,
    badChance: 0.13,
    fundChance: 0.28,
    rewardBudget: 26,
    message: "Level 1: mulai dari desa. Bangun jembatan dengan bahan legal.",
    theme: {
      sky: ["#bfefff", "#e9f8e7", "#ffe0a7"],
      river: ["#37b9d6", "#126eac"],
      ground: "#78bf6a",
      bank: "#5aa153",
      bridge: "#8b5a36",
      houses: ["#f5b642", "#18a999", "#e84d5b"]
    }
  },
  {
    name: "Level 2: Rumah Warga Layak",
    project: "house",
    background: "backgroundHouse",
    projectLabel: "Rumah Warga",
    goal: "Pulihkan kepercayaan warga lewat rumah layak",
    spawnInterval: 0.82,
    duration: 58,
    fallSpeed: 146,
    badChance: 0.21,
    fundChance: 0.29,
    rewardBudget: 22,
    message: "Level 2: bangun rumah warga yang layak dan aman.",
    theme: {
      sky: ["#d6f7ff", "#e7f1ff", "#ffd9a1"],
      river: ["#4aa5e8", "#254fba"],
      ground: "#8ac45f",
      bank: "#6aa34b",
      bridge: "#7a6540",
      houses: ["#ffcc4d", "#2b83ff", "#ff6b6b"]
    }
  },
  {
    name: "Level 3: Jalan Pasar Jujur",
    project: "road",
    background: "backgroundRoad",
    projectLabel: "Jalan Desa",
    goal: "Aspal jalan desa sebelum warga mencapai ruas rusak",
    spawnInterval: 0.72,
    duration: 56,
    fallSpeed: 170,
    badChance: 0.28,
    fundChance: 0.27,
    rewardBudget: 18,
    message: "Level 3: perbaiki jalan desa. Hindari suap dan material palsu.",
    theme: {
      sky: ["#ffd7b5", "#ffe8c7", "#ccebd2"],
      river: ["#23b8c7", "#0b7f92"],
      ground: "#74b86d",
      bank: "#4d965f",
      bridge: "#665f4b",
      houses: ["#f08a4b", "#30b8a6", "#d95780"]
    }
  },
  {
    name: "Level 4: Sekolah Tanpa Suap",
    project: "school",
    background: "backgroundSchool",
    projectLabel: "Sekolah",
    goal: "Masuk wilayah kota dan pulihkan sekolah yang rusak proyek",
    spawnInterval: 0.62,
    duration: 54,
    fallSpeed: 198,
    badChance: 0.34,
    fundChance: 0.24,
    rewardBudget: 14,
    message: "Level 4: bangun sekolah aman. Item jatuh lebih cepat.",
    theme: {
      sky: ["#97c7d8", "#b8ced4", "#d8d5bd"],
      river: ["#2d94ba", "#185a8c"],
      ground: "#5fa866",
      bank: "#3e8350",
      bridge: "#705244",
      houses: ["#e0a33c", "#158f87", "#cf4e58"]
    }
  },
  {
    name: "Level 5: Klinik Kertasa Bersih",
    project: "clinic",
    background: "backgroundClinic",
    projectLabel: "Pos Kesehatan",
    goal: "Tuntaskan klinik kota saat audit publik berlangsung",
    spawnInterval: 0.54,
    duration: 52,
    fallSpeed: 226,
    badChance: 0.40,
    fundChance: 0.22,
    rewardBudget: 0,
    message: "Level 5: ujian akhir. Jaga integritas sampai pos kesehatan selesai.",
    theme: {
      sky: ["#f5c8b0", "#d8c6df", "#b7d7d9"],
      river: ["#1e89b4", "#123d74"],
      ground: "#689b58",
      bank: "#416f41",
      bridge: "#5f4b45",
      houses: ["#d88f32", "#0f7f9a", "#b9425a"]
    }
  }
];

const endlessProjects = ["bridge", "house", "road", "school", "clinic"];

const projectItemAssets = {
  bridge: {
    material: { label: "Balok Baja", image: "bridgeBeam", message: "Balok baja membuat jembatan makin kuat." },
    fund: { label: "Baut Jembatan", image: "bridgeBolt", message: "Baut standar mengunci rangka jembatan." }
  },
  house: {
    material: { label: "Bata Layak", image: "houseBrick", message: "Bata layak memperkuat rumah warga." },
    fund: { label: "Cat Aman", image: "housePaint", message: "Cat aman merapikan rumah tanpa bahan berbahaya." }
  },
  road: {
    material: { label: "Aspal Standar", image: "roadAsphalt", message: "Aspal standar menutup ruas jalan rusak." },
    fund: { label: "Rambu Jalan", image: "roadSign", message: "Rambu membuat akses pasar lebih tertib." }
  },
  school: {
    material: { label: "Meja Belajar", image: "schoolDesk", message: "Meja belajar membuat kelas siap dipakai." },
    fund: { label: "Buku Sekolah", image: "schoolBooks", message: "Buku sekolah melengkapi ruang belajar." }
  },
  clinic: {
    material: { label: "Kotak Medis", image: "clinicKit", message: "Kotak medis menyiapkan layanan kesehatan." },
    fund: { label: "Ubin Klinik", image: "clinicTile", message: "Ubin klinik membuat pos kesehatan bersih." }
  }
};

const projectIcons = {
  bridge: "bridgeBeam",
  house: "houseBrick",
  road: "roadAsphalt",
  school: "schoolBooks",
  clinic: "clinicKit"
};

const dialogBackgrounds = {
  bridge: "assets/dialog/village-office.svg",
  house: "assets/dialog/community-hall.svg",
  road: "assets/dialog/market-meeting.svg",
  school: "assets/dialog/school-room.svg",
  clinic: "assets/dialog/clinic-room.svg"
};

const introSlides = [
  {
    label: "Opening Gelap",
    title: "Korupsi Tidak Selalu Besar",
    text: "Narator: Korupsi... tidak selalu dimulai dari uang miliaran. Kadang ia lahir dari tanda tangan palsu, tugas yang dibuang, dan proyek yang dibiarkan rusak.",
    background: "introDarkCity",
    speaker: "Narator"
  },
  {
    label: "Kota Rusak",
    title: "Kertasa Kehilangan Cahaya",
    text: "Neon berkedip. Berkas beterbangan. Jalan retak. Saat kejujuran hilang, kota ikut runtuh.",
    background: "introDarkCity",
    speaker: "Narator"
  },
  {
    label: "Kertas Misterius",
    title: "BerJuMPA Di KerTaS",
    text: "Satu lembar kertas bercahaya turun dari langit. Di sana tersimpan 9 nilai integritas untuk mengembalikan kota.",
    background: "introPaper",
    speaker: "Narator"
  },
  { label: "Berani", title: "Berani", text: "Berani berkata benar, bahkan ketika bayangan kekuasaan terlihat lebih besar.", background: "introPaper", speaker: "Alya" },
  { label: "Jujur", title: "Jujur", text: "Kejujuran memperbaiki yang retak dan membuat kota berani bercermin lagi.", background: "introPaper", speaker: "Alya" },
  { label: "Mandiri", title: "Mandiri", text: "Mandiri berarti menyelesaikan tugas tanpa jalan pintas curang.", background: "introPaper", speaker: "Alya" },
  { label: "Peduli", title: "Peduli", text: "Peduli pada warga berarti tidak membiarkan bantuan tersangkut di meja yang salah.", background: "introPaper", speaker: "Alya" },
  { label: "Anti Korupsi", title: "Anti Korupsi", text: "Melawan korupsi sekecil apa pun sebelum ia menjadi rantai yang mengikat kota.", background: "introPaper", speaker: "Alya" },
  { label: "Disiplin", title: "Disiplin", text: "Disiplin membuat jam kota bergerak lagi dan kepercayaan kembali tepat waktu.", background: "introPaper", speaker: "Alya" },
  { label: "Kerja Keras", title: "Kerja Keras", text: "Perubahan dibangun dengan tangan yang mau bekerja, bukan tangan yang meminta bagian.", background: "introLightCity", speaker: "Alya" },
  { label: "Tanggung Jawab", title: "Tanggung Jawab", text: "Berani mengakui kesalahan, lalu memperbaikinya sampai tuntas.", background: "introLightCity", speaker: "Alya" },
  { label: "Sederhana", title: "Sederhana", text: "Kesederhanaan melindungi hati dari kemewahan yang tidak seharusnya.", background: "introLightCity", speaker: "Alya" },
  {
    label: "Climax",
    title: "BerJuMPA Di KerTaS",
    text: "Sembilan simbol menyatu. Kota Kertasa perlahan terang kembali. Pilihan kecil menentukan masa depan kota.",
    background: "introLightCity",
    speaker: "Alya"
  }
];

const shopCatalog = {
  characters: [
    { id: "mcBuilder", name: "Alya Pengawas", price: 0, asset: "mcBuilder", note: "Skin awal pengelola proyek." },
    { id: "mcCrimson", name: "Alya Berani", price: 180, asset: "mcCrimson", note: "Aura merah untuk nilai Berani." },
    { id: "mcAzure", name: "Alya Jujur", price: 220, asset: "mcAzure", note: "Glow biru-putih untuk nilai Jujur." }
  ],
  vehicles: [
    { id: "default", name: "Mobil Audit Biru", price: 0, colors: ["#5b7cff", "#38d6d1"], note: "Kendaraan awal." },
    { id: "gold", name: "Mobil Integritas Emas", price: 200, colors: ["#ffd166", "#ff8f2f"], note: "Bonus visual emas." },
    { id: "night", name: "Mobil Neon Kertasa", price: 260, colors: ["#241638", "#9b5cff"], note: "Tema cyberpunk malam." }
  ]
};

const achievementList = [
  { id: "firstClear", name: "Langkah Pertama", desc: "Selesaikan 1 level cerita.", check: () => unlockedLevel >= 1 },
  { id: "chapterOne", name: "Chapter Desa", desc: "Buka semua proyek desa.", check: () => unlockedLevel >= 4 },
  { id: "rich", name: "Kas Integritas", desc: "Kumpulkan 500 koin.", check: () => coins >= 500 },
  { id: "collector", name: "Kolektor Skin", desc: "Miliki 3 skin dari shop.", check: () => ownedCharacterSkins.length + ownedVehicleSkins.length >= 3 },
  { id: "rankB", name: "Pengawas Andal", desc: "Capai rank B atau lebih.", check: () => highScore >= 7500 }
];

const itemGuideEntries = [
  { type: "Legal", title: "Bahan Proyek", icon: "bridgeBeam", text: "Item legal menambah progres dan menjaga proyek tetap aman." },
  { type: "Legal", title: "Dokumen Izin", icon: "permitDoc", text: "Menaikkan integritas dan membantu combo tetap bernilai." },
  { type: "Power-Up", title: "Shield Audit", icon: "auditShield", text: "Menahan satu item buruk yang tidak sengaja diambil." },
  { type: "Power-Up", title: "Magnet Bahan", icon: "materialMagnet", text: "Menarik item baik ke arah karakter selama beberapa detik." },
  { type: "Power-Up", title: "Jam Bonus", icon: "timeStar", text: "Menambah waktu proyek." },
  { type: "Ilegal", title: "Suap Dana", icon: "bribe", text: "Mengurangi skor, progres, dana, dan memutus combo." },
  { type: "Ilegal", title: "Material Palsu", icon: "fake", text: "Merusak progres dan integritas proyek." }
];

function currentLevel() {
  if (game.levelIndex < levels.length) return levels[game.levelIndex];
  const cycleIndex = (game.levelIndex - levels.length) % endlessProjects.length;
  const base = levels.find((level) => level.project === endlessProjects[cycleIndex]) || levels[0];
  const endlessRound = game.levelIndex - levels.length + 1;
  return {
    ...base,
    name: `Endless ${endlessRound}: ${base.projectLabel}`,
    goal: `Mode endless: raih skor sebanyak mungkin di ${base.projectLabel.toLowerCase()}`,
    spawnInterval: Math.max(0.34, base.spawnInterval - endlessRound * 0.035),
    duration: Math.max(38, base.duration - endlessRound * 1.5),
    fallSpeed: base.fallSpeed + endlessRound * 14,
    badChance: Math.min(0.52, base.badChance + endlessRound * 0.018),
    rewardBudget: Math.max(4, base.rewardBudget),
    message: `Endless ${endlessRound}: combo bersih memberi skor lebih besar.`
  };
}

function isEndlessMode() {
  return game.levelIndex >= levels.length;
}

const input = {
  left: false,
  right: false
};

let width = 0;
let height = 0;
let dpr = 1;
let lastTime = 0;
let scene = "start";
let storyTime = 0;
let storyClock = 0;
let highScore = Number(localStorage.getItem("bridgeSafeHighScore") || 0);
let leaderboard = loadLeaderboard();
let musicEnabled = localStorage.getItem("bridgeSafeMusicEnabled") !== "false";
let musicVolume = Number(localStorage.getItem("bridgeSafeMusicVolume") || 18);
let sfxVolume = Number(localStorage.getItem("bridgeSafeSfxVolume") || 42);
let selectedMode = "level";
let failedLevelIndex = 0;
let unlockedLevel = Number(localStorage.getItem("bridgeSafeUnlockedLevel") || 0);
let settingsReturnScene = "start";
let introIndex = 0;
let dialogLines = [];
let dialogIndex = 0;
let coins = Number(localStorage.getItem("bridgeSafeCoins") || 0);
let ownedCharacterSkins = loadList("bridgeSafeOwnedCharacters", ["mcBuilder"]);
let ownedVehicleSkins = loadList("bridgeSafeOwnedVehicles", ["default"]);
let equippedCharacterSkin = localStorage.getItem("bridgeSafeEquippedCharacter") || "mcBuilder";
let equippedVehicleSkin = localStorage.getItem("bridgeSafeEquippedVehicle") || "default";
let pendingConfirm = null;
let missionHintPinnedOpen = false;

const game = createInitialState();
const assets = createAssetLibrary();
const audio = createGameAudio();

function createInitialState() {
  return {
    score: 0,
    budget: 40,
    integrity: 100,
    progress: 0,
    levelIndex: 0,
    mode: selectedMode,
    levelStarted: false,
    combo: 0,
    comboTimer: 0,
    maxCombo: 0,
    lastDirection: 1,
    dashCooldown: 0,
    dashTimer: 0,
    shield: 0,
    magnetTimer: 0,
    difficulty: 1,
    elapsed: 0,
    timeLeft: levels[0].duration,
    spawnTimer: 0.35,
    message: "Ambil item bersih. Hindari korupsi.",
    messageTimer: 2.6,
    hintTimer: 5,
    player: { x: 0, y: 0, width: 94, height: 28, speed: 520 },
    items: [],
    particles: [],
    clouds: [],
    villagers: [],
    workers: [],
    thanks: [],
    celebration: {
      active: false,
      timer: 0,
      nextLevelIndex: 0,
      final: false
    },
    quake: 0,
    ended: false
  };
}

function createAssetLibrary() {
  const paths = {
    background: "assets/background/village-map.png",
    backgroundBridge: "assets/background/rumahkeren.png",
    backgroundHouse: "assets/background/village-map.png",
    backgroundRoad: "assets/background/market-road-bg.svg",
    backgroundDrainage: "assets/background/rice-drainage-bg.svg",
    backgroundSchool: "assets/background/school-yard-bg.png",
    backgroundClinic: "assets/background/clinic-village-bg.svg",
    bridge: "assets/bridge/wooden-bridge.svg",
    caughtScene: "assets/scenes/caught-scene.svg",
    dialogOffice: "assets/dialog/village-office.svg",
    dialogHall: "assets/dialog/community-hall.svg",
    dialogMarket: "assets/dialog/market-meeting.svg",
    dialogSchool: "assets/dialog/school-room.svg",
    dialogClinic: "assets/dialog/clinic-room.svg",
    animeIntroVillage: "assets/intro/anime-village.svg",
    animeIntroOffice: "assets/intro/anime-office.svg",
    animeIntroPromise: "assets/intro/anime-promise.svg",
    introDarkCity: "assets/intro/kertasa-dark-city.svg",
    introPaper: "assets/intro/kertasa-paper.svg",
    introLightCity: "assets/intro/kertasa-light-city.svg",
    projectHouse: "assets/projects/house-project.png",
    projectRoad: "assets/projects/road-project.svg",
    projectDrainage: "assets/projects/drainage-project.svg",
    projectSchool: "assets/projects/school-project.png",
    projectClinic: "assets/projects/clinic-project.svg",
    worker: "assets/animation/worker-run.svg",
    mcBuilder: "assets/characters/mc-builder.svg",
    mcCrimson: "assets/characters/mc-crimson.svg",
    mcAzure: "assets/characters/mc-azure.svg",
    workerNpc: "assets/characters/worker-npc.png",
    npcChief: "assets/characters/npc-chief.svg",
    auditor: "assets/characters/auditor.svg",
    villager: "assets/characters/villager-walk.svg",
    villagerMale: "assets/characters/villager-male.png",
    villagerFemale: "assets/characters/villager-female.png",
    schoolChild: "assets/characters/school-child.svg",
    healthWorker: "assets/characters/health-worker.svg",
    marketCitizen: "assets/characters/market-citizen.svg",
    vfx: "assets/vfx/clean-burst.svg",
    material: "assets/items/steel-beam.svg",
    fund: "assets/items/cement-bag.svg",
    bridgeBeam: "assets/items/bridge-beam.png",
    bridgeBolt: "assets/items/bridge-bolt.png",
    houseBrick: "assets/items/house-brick.png",
    housePaint: "assets/items/house-paint.svg",
    roadAsphalt: "assets/items/road-asphalt.svg",
    roadSign: "assets/items/road-sign.svg",
    schoolDesk: "assets/items/school-desk.svg",
    schoolBooks: "assets/items/school-books.svg",
    clinicKit: "assets/items/clinic-kit.svg",
    clinicTile: "assets/items/clinic-tile.svg",
    permitDoc: "assets/items/permit-doc.svg",
    safetyHelmet: "assets/items/safety-helmet.svg",
    auditShield: "assets/items/audit-shield.svg",
    materialMagnet: "assets/items/material-magnet.svg",
    timeStar: "assets/items/time-star.svg",
    bribe: "assets/items/bribe-envelope.svg",
    fake: "assets/items/fake-material.svg",
    houseYellow: "assets/houses/yellow-house.png",
    houseTeal: "assets/houses/teal-house.svg",
    houseRed: "assets/houses/red-house.png",
    houseBlueStilt: "assets/houses/blue-stilt-house.png"
  };
  const images = {};

  for (const [key, path] of Object.entries(paths)) {
    const image = new Image();
    image.src = path;
    images[key] = image;
  }

  return { images, paths };
}

function createGameAudio() {
  const sfxPaths = {
    click: "assets/sfx/click.wav",
    good: "assets/sfx/good.wav",
    bad: "assets/sfx/bad.wav",
    combo: "assets/sfx/combo.wav",
    dialog: "assets/sfx/dialog.wav",
    win: "assets/sfx/win.wav",
    lose: "assets/sfx/lose.wav"
  };
  const sfx = Object.fromEntries(
    Object.entries(sfxPaths).map(([name, path]) => {
      const sound = new Audio(path);
      sound.preload = "auto";
      sound.volume = sfxVolumeFor(name);
      return [name, sound];
    })
  );
  const bgm = new Audio("assets/bgm/clean-project-loop.wav");
  bgm.loop = true;
  bgm.volume = musicEnabled ? musicVolume / 100 : 0;

  function play(name) {
    if (!musicEnabled) return;
    const base = sfx[name];
    if (!base) return;
    const sound = base.cloneNode();
    sound.volume = sfxVolumeFor(name);
    sound.play().catch(() => {});
  }

  return {
    click: () => play("click"),
    good: () => play("good"),
    bad: () => play("bad"),
    combo: () => play("combo"),
    dialog: () => play("dialog"),
    win: () => play("win"),
    lose: () => play("lose"),
    startBgm: () => {
      if (musicEnabled) bgm.play().catch(() => {});
    },
    pauseBgm: () => bgm.pause(),
    setVolumes: () => {
      bgm.volume = musicEnabled ? musicVolume / 100 : 0;
      for (const [name, sound] of Object.entries(sfx)) sound.volume = musicEnabled ? sfxVolumeFor(name) : 0;
    },
    stopBgm: () => {
      bgm.pause();
      bgm.currentTime = 0;
    }
  };
}

function sfxVolumeFor(name) {
  if (!musicEnabled) return 0;
  const base = name === "bad" || name === "lose" ? 0.86 : name === "dialog" ? 0.6 : 1;
  return (sfxVolume / 100) * base;
}

function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  game.player.x = clamp(game.player.x || width * 0.5, 56, width - 56);
  seedClouds();
  resizeStoryCanvas();
}

function resizeStoryCanvas() {
  const rect = storyCanvas.getBoundingClientRect();
  const storyDpr = Math.min(window.devicePixelRatio || 1, 2);
  storyCanvas.width = Math.max(1, Math.floor(rect.width * storyDpr));
  storyCanvas.height = Math.max(1, Math.floor(rect.height * storyDpr));
  storyCtx.setTransform(storyDpr, 0, 0, storyDpr, 0, 0);
}

function seedClouds() {
  game.clouds = Array.from({ length: Math.max(7, Math.floor(width / 150)) }, () => ({
    x: Math.random() * width,
    y: 58 + Math.random() * height * 0.25,
    speed: 8 + Math.random() * 22,
    size: 42 + Math.random() * 58,
    alpha: 0.2 + Math.random() * 0.22
  }));
}

function resetGame(mode = selectedMode, startIndex = mode === "endless" ? levels.length : 0) {
  selectedMode = mode;
  missionHintPinnedOpen = false;
  Object.assign(game, createInitialState());
  game.mode = mode;
  game.levelIndex = startIndex;
  game.timeLeft = currentLevel().duration;
  game.player.x = width * 0.5;
  game.player.y = playerY();
  resetVillagers();
  resetWorkers();
  seedClouds();
  updateHud();
  setMessage(currentLevel().message, 2.6);
}

function setScene(nextScene) {
  scene = nextScene;
  ui.start.classList.toggle("active", scene === "start");
  ui.shop.classList.toggle("active", scene === "shop");
  ui.achievement.classList.toggle("active", scene === "achievement");
  ui.itemGuide.classList.toggle("active", scene === "itemguide");
  ui.levelSelect.classList.toggle("active", scene === "levelselect");
  ui.cinematic.classList.toggle("active", scene === "cinematic");
  ui.story.classList.toggle("active", scene === "story");
  ui.dialog.classList.toggle("active", scene === "dialog");
  ui.pause.classList.toggle("active", scene === "paused");
  ui.confirm.classList.toggle("active", scene === "confirm");
  ui.over.classList.toggle("active", scene === "gameover");
  ui.how.classList.toggle("active", scene === "how");

  const inGame = scene === "playing" || scene === "dialog" || (scene === "paused" && game.levelStarted);
  ui.hud.style.opacity = inGame ? "1" : "0";
  ui.hud.style.pointerEvents = inGame ? "auto" : "none";
  ui.missionPanel.classList.toggle("hidden", !inGame);

  if (scene === "cinematic") {
    storyTime = 0;
    storyClock = performance.now();
    resizeStoryCanvas();
  }
}

function startIntro() {
  audio.click();
  introIndex = 0;
  storyTime = 0;
  storyClock = performance.now();
  setScene("cinematic");
}

function advanceIntro() {
  audio.dialog();
  if (introIndex < introSlides.length - 1) {
    introIndex += 1;
    storyTime = 0;
    return;
  }
  openLevelSelect();
}

function skipIntro() {
  audio.click();
  openLevelSelect();
}

function startGame(mode = "level", startIndex = mode === "endless" ? levels.length : 0) {
  audio.click();
  resetGame(mode, startIndex);
  lastTime = performance.now();
  if (mode === "endless") {
    game.levelStarted = true;
    setScene("playing");
  } else {
    showLevelDialog();
    setScene("dialog");
  }
  audio.startBgm();
}

function openLevelSelect() {
  renderLevelSelect();
  setScene("levelselect");
}

function startStoryLevel(index) {
  startGame("level", index);
}

function retryFailedLevel() {
  startGame(selectedMode, selectedMode === "endless" ? Math.max(levels.length, failedLevelIndex) : failedLevelIndex);
}

function restartCurrentLevel() {
  const index = selectedMode === "endless" ? Math.max(levels.length, game.levelIndex) : game.levelIndex;
  startGame(selectedMode, index);
}

function beginLevel() {
  audio.click();
  game.levelStarted = true;
  lastTime = performance.now();
  setScene("playing");
}

function pauseGame() {
  if (scene !== "playing") return;
  audio.click();
  settingsReturnScene = "playing";
  setScene("paused");
  audio.pauseBgm();
}

function resumeGame() {
  audio.click();
  if (settingsReturnScene !== "playing") {
    setScene(settingsReturnScene);
    return;
  }
  lastTime = performance.now();
  setScene("playing");
  audio.startBgm();
}

function goHomeFromPause() {
  audio.click();
  audio.stopBgm();
  input.left = false;
  input.right = false;
  settingsReturnScene = "start";
  setScene("start");
}

function advanceDialog() {
  if (dialogIndex < dialogLines.length - 1) {
    dialogIndex += 1;
    renderDialogLine();
    audio.dialog();
    return;
  }
  beginLevel();
}

function skipDialog() {
  beginLevel();
}

function update(dt) {
  updateBackground(dt);
  updateParticles(dt);

  if (scene !== "playing" || game.ended) return;

  if (game.celebration.active) {
    updateLevelCelebration(dt);
    updateHud();
    return;
  }

  game.elapsed += dt;
  game.difficulty = 1 + game.levelIndex * 0.62 + game.elapsed / 34 + game.progress / 160;
  game.messageTimer = Math.max(0, game.messageTimer - dt);
  game.comboTimer = Math.max(0, game.comboTimer - dt);
  if (game.comboTimer <= 0) game.combo = 0;
  game.dashCooldown = Math.max(0, game.dashCooldown - dt);
  game.dashTimer = Math.max(0, game.dashTimer - dt);
  game.magnetTimer = Math.max(0, game.magnetTimer - dt);
  game.hintTimer = Math.max(0, game.hintTimer - dt);
  game.quake *= Math.pow(0.0008, dt);
  game.timeLeft = Math.max(0, game.timeLeft - dt);

  updatePlayer(dt);
  updateWorkers(dt);
  spawnItems(dt);
  updateItems(dt);
  updateVillagers(dt);
  updateHud();

  if (game.integrity <= 0) {
    endGame(false, "Integritas proyek habis karena terlalu banyak korupsi.");
  }

  if (game.progress >= 100) {
    game.progress = 100;
    completeLevel();
  }

  if (game.timeLeft <= 0 && game.progress < 100) {
    game.quake = 9;
    endGame(false, `Waktu habis. Warga sudah membutuhkan ${currentLevel().projectLabel.toLowerCase()}, tetapi proyek belum selesai.`);
  }
}

function updatePlayer(dt) {
  const axis = Number(input.right) - Number(input.left);
  if (axis !== 0) game.lastDirection = axis;
  game.player.x += axis * game.player.speed * dt;
  game.player.x = clamp(game.player.x, 54, width - 54);
  game.player.y = playerY();
}

function dashPlayer() {
  if (scene !== "playing" || game.ended || game.celebration.active || game.dashCooldown > 0) return;
  const direction = input.left ? -1 : input.right ? 1 : game.lastDirection || 1;
  game.player.x = clamp(game.player.x + direction * Math.min(230, width * 0.22), 54, width - 54);
  game.dashCooldown = 0.72;
  game.dashTimer = 0.18;
  burst(game.player.x - direction * 46, game.player.y + 4, "#8ee8d6", 10);
  audio.click();
}

function spawnItems(dt) {
  game.spawnTimer -= dt;
  const level = currentLevel();
  const interval = Math.max(0.32, level.spawnInterval - game.difficulty * 0.035);
  if (game.spawnTimer > 0) return;

  game.spawnTimer = interval;
  const roll = Math.random();
  const badLine = level.badChance;
  const fundLine = badLine + level.fundChance;
  let type = "material";
  if (roll < badLine) type = Math.random() > 0.5 ? "bribe" : "fake";
  else if (roll < fundLine) type = "fund";
  else if (roll > 0.965) type = "shield";
  else if (roll > 0.935) type = "magnet";
  else if (roll > 0.9) type = "time";
  else if (roll > 0.84) type = Math.random() > 0.5 ? "permit" : "safety";

  game.items.push({
    type,
    assetKey: itemAssetForType(type).image,
    x: 42 + Math.random() * (width - 84),
    y: -36,
    size: 31,
    vy: level.fallSpeed + game.difficulty * 22 + Math.random() * 66,
    spin: Math.random() * Math.PI,
    spinSpeed: -3 + Math.random() * 6
  });
}

function updateItems(dt) {
  for (const item of game.items) {
    if (game.magnetTimer > 0 && itemTypes[item.type].score > 0) {
      const dx = game.player.x - item.x;
      const dy = game.player.y - item.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < Math.min(360, width * 0.38)) {
        item.x += (dx / distance) * 260 * dt;
        item.y += (dy / distance) * 200 * dt;
      }
    }
    item.y += item.vy * dt;
    item.spin += item.spinSpeed * dt;

    if (collidesWithPlayer(item)) {
      collectItem(item);
      item.collected = true;
    } else if (item.y > height + 60) {
      item.missed = true;
      if (itemTypes[item.type].score > 0) {
        missLegalItem(item);
      }
    }
  }

  game.items = game.items.filter((item) => !item.collected && !item.missed);
}

function missLegalItem(item) {
  const config = itemConfig(item.type);
  game.score = Math.max(0, game.score - 45);
  game.progress = clamp(game.progress - 4, 0, 100);
  game.integrity = clamp(game.integrity - 3, 0, 100);
  setMessage(`${config.label} terlewat. Proyek melambat.`, 1.25);
  burst(item.x, height - 72, "#e84d5b", 10);
  audio.bad();
}

function collectItem(item) {
  const config = itemConfig(item.type);
  const progressMultiplier = Math.max(0.48, 1 - game.levelIndex * 0.055);
  const good = config.score > 0;
  if (!good && game.shield > 0) {
    game.shield -= 1;
    burst(item.x, item.y, "#9b5cff", 28);
    setMessage("Shield audit menahan item korupsi.", 1.4);
    audio.combo();
    return;
  }
  const multiplier = good ? applyCombo() : resetCombo();
  game.score = Math.max(0, game.score + Math.round(config.score * multiplier));
  game.progress = clamp(game.progress + config.progress * progressMultiplier, 0, 100);
  game.integrity = clamp(game.integrity + config.integrity, 0, 100);
  game.budget = Math.max(0, game.budget + config.budget);
  applyPowerUp(config);
  setMessage(good && multiplier > 1 ? `${config.message} Combo x${multiplier}!` : config.message, 1.2);

  burst(item.x, item.y, config.color, good ? 16 : 22);
  audio[good && multiplier >= 3 ? "combo" : good ? "good" : "bad"]();

  if (!good) {
    game.quake = 7;
  }
}

function applyCombo() {
  game.combo += 1;
  game.comboTimer = 3.2;
  game.maxCombo = Math.max(game.maxCombo, game.combo);
  return Math.min(6, 1 + Math.floor(game.combo / 4));
}

function applyPowerUp(config) {
  if (config.power === "shield") {
    game.shield = Math.min(3, game.shield + 1);
  }
  if (config.power === "magnet") {
    game.magnetTimer = Math.max(game.magnetTimer, 7);
  }
  if (config.power === "time") {
    game.timeLeft = Math.min(currentLevel().duration + 18, game.timeLeft + 9);
  }
}

function resetCombo() {
  game.combo = 0;
  game.comboTimer = 0;
  return 1;
}

function itemAssetForType(type) {
  const project = currentLevel().project;
  return projectItemAssets[project]?.[type] || itemTypes[type];
}

function itemConfig(type) {
  return {
    ...itemTypes[type],
    ...(type === "material" || type === "fund" ? itemAssetForType(type) : {})
  };
}

function completeLevel() {
  const current = currentLevel();
  const endlessBonus = isEndlessMode() ? 1.35 + (game.levelIndex - levels.length) * 0.08 : 1;
  game.score += Math.round((350 + game.integrity * 2 + game.budget * 2 + game.maxCombo * 9) * endlessBonus);
  const coinReward = Math.round((isEndlessMode() ? 34 : 55) + game.integrity * 0.25 + game.maxCombo * 1.5 + (isEndlessMode() ? (game.levelIndex - levels.length) * 4 : 0));
  addCoins(coinReward);
  setMessage(`${current.projectLabel} selesai! +${coinReward} koin.`, 3);
  if (game.mode === "level") {
    unlockedLevel = Math.max(unlockedLevel, Math.min(levels.length - 1, game.levelIndex + 1));
    localStorage.setItem("bridgeSafeUnlockedLevel", String(unlockedLevel));
  }
  burst(width * 0.5, bridgeY() - 70, "#f5b642", 34);

  game.items = [];
  game.celebration.active = true;
  game.celebration.timer = 0;
  game.celebration.nextLevelIndex = game.levelIndex + 1;
  game.celebration.final = game.mode === "level" && game.levelIndex >= levels.length - 1;
  game.budget += current.rewardBudget;
  prepareCelebrationVillagers();
  audio.win();
}

function updateLevelCelebration(dt) {
  game.celebration.timer += dt;
  game.messageTimer = Math.max(0, game.messageTimer - dt);
  updateVillagers(dt, { safeMode: true });
  updateWorkers(dt);

  if (Math.random() < dt * 18) {
    const x = bridgeRight() - 40 + Math.random() * 110;
    const y = bridgeY() - 26 - Math.random() * 70;
    burst(x, y, Math.random() > 0.5 ? "#f5b642" : "#1cad6f", 3);
  }

  updateThanks(dt);

  const allCrossed = game.villagers.every((person) => person.x > bridgeRight() + 24);
  if (!allCrossed && game.celebration.timer < 5.2) return;

  if (game.celebration.final) {
    endGame(true, "Lima proyek desa selesai. Warga berterima kasih karena fasilitas aman dan dana dijaga bersih.");
    return;
  }

  game.levelIndex = game.celebration.nextLevelIndex;
  game.progress = 0;
  game.elapsed = 0;
  game.timeLeft = currentLevel().duration;
  game.spawnTimer = 1.15;
  game.celebration.active = false;
  resetVillagers();
  resetWorkers();
  game.hintTimer = 5;
  if (game.mode === "endless") {
    game.levelStarted = true;
    setMessage(currentLevel().message, 2.4);
  } else {
    showLevelDialog();
    setScene("dialog");
  }
}

function collidesWithPlayer(item) {
  const px = game.player.x - game.player.width * 0.5;
  const py = game.player.y - game.player.height * 0.5;
  return (
    item.x + item.size * 0.5 > px &&
    item.x - item.size * 0.5 < px + game.player.width &&
    item.y + item.size * 0.5 > py &&
    item.y - item.size * 0.5 < py + game.player.height
  );
}

function updateBackground(dt) {
  for (const cloud of game.clouds) {
    cloud.x += cloud.speed * dt;
    if (cloud.x - cloud.size > width + 30) {
      cloud.x = -cloud.size - Math.random() * 160;
      cloud.y = 56 + Math.random() * height * 0.25;
    }
  }
}

function resetVillagers() {
  const left = bridgeLeft();
  const level = currentLevel();
  const yOffset = villagerPathYOffset(level.project);
  const spacing = Math.max(30, Math.min(48, bridgeWidth() / 8));
  const count = Math.min(11, 7 + (game.levelIndex % 5));
  game.villagers = Array.from({ length: count }, (_, index) => ({
    x: left - 62 - index * spacing,
    y: bridgeY() + 48 + yOffset + Math.random() * 18,
    speed: 0,
    bob: Math.random() * Math.PI * 2,
    variant: index % 2,
    role: villagerRoleForLevel(level.project, index),
    lead: index === 0
  }));
}

function prepareCelebrationVillagers() {
  const left = bridgeLeft();
  const yOffset = villagerPathYOffset(currentLevel().project);
  const spacing = Math.max(34, bridgeWidth() / 11);
  game.thanks = [];
  game.villagers = Array.from({ length: 9 }, (_, index) => ({
    x: left - 35 - index * spacing,
    y: bridgeY() + yOffset + Math.random() * 18 - 9,
    speed: 92 + Math.random() * 24,
    bob: Math.random() * Math.PI * 2,
    variant: index % 2,
    role: villagerRoleForLevel(currentLevel().project, index),
    lead: index === 0,
    cheering: false
  }));
}

function resetWorkers() {
  const left = bridgeLeft();
  const box = getProjectBox(currentLevel().project, left, bridgeY());
  game.workers = Array.from({ length: 4 }, (_, index) => ({
    x: box.x + box.w * (0.22 + index * 0.17),
    y: box.y + box.h * (0.72 + (index % 2) * 0.12),
    bob: Math.random() * Math.PI * 2,
    task: index % 3,
    variant: index % 2
  }));
}

function updateWorkers(dt) {
  for (const worker of game.workers) {
    worker.bob += dt * (5.5 + worker.task);
  }
}

function villagerRoleForLevel(project, index) {
  if (project === "school") return "schoolChild";
  if (project === "clinic") return index % 3 === 0 ? "healthWorker" : "villager";
  if (project === "road") return "marketCitizen";
  return "villager";
}

function villagerPathYOffset(project) {
  return project === "house" ? 58 : 0;
}

function updateVillagers(dt, options = {}) {
  const left = bridgeLeft();
  const right = bridgeRight();
  const yOffset = villagerPathYOffset(currentLevel().project);

  for (const person of game.villagers) {
    person.bob += dt * 8;
    person.x += person.speed * dt;
    person.y = options.safeMode
      ? bridgeY() + yOffset + (person.lead ? 0 : Math.sin(person.bob * 0.5) * 8)
      : bridgeY() + 50 + yOffset + Math.sin(person.bob * 0.5) * 5;

    if (person.x > right + 44) {
      if (options.safeMode) {
        person.cheering = true;
        person.speed = 0;
        person.x = right + 48 + Math.random() * 72;
        person.y = bridgeY() + 50 + yOffset + Math.random() * 22;
        addThanks(person.x, person.y - 72);
      } else {
        person.x = left - 220 - Math.random() * 90;
        person.lead = false;
      }
    }
  }
}

function addThanks(x, y) {
  game.thanks.push({
    x,
    y,
    text: "Terima kasih!",
    life: 2.2
  });
}

function updateThanks(dt) {
  for (const bubble of game.thanks) {
    bubble.y -= 14 * dt;
    bubble.life -= dt;
  }
  game.thanks = game.thanks.filter((bubble) => bubble.life > 0);
}

function endGame(won, reason) {
  if (game.ended) return;
  game.ended = true;
  failedLevelIndex = game.levelIndex;
  game.score += won ? Math.round(game.integrity * 7 + game.budget * 4) : 0;
  highScore = Math.max(highScore, game.score);
  localStorage.setItem("bridgeSafeHighScore", String(highScore));
  const finalRank = rankForScore(game.score);
  leaderboard = saveLeaderboard({
    score: Math.round(game.score),
    rank: finalRank.rank,
    level: game.levelIndex + 1,
    mode: isEndlessMode() ? "Endless" : "Cerita",
    combo: game.maxCombo,
    date: new Date().toLocaleDateString("id-ID")
  });

  audio[won ? "win" : "lose"]();
  ui.resultLabel.textContent = won ? "Proyek Bersih" : "Proyek Bermasalah";
  ui.resultTitle.textContent = won ? "Proyek Desa Aman!" : "Tertangkap!";
  ui.resultScene.src = won ? assets.paths.npcChief : assets.paths.caughtScene;
  ui.resultScene.style.display = "block";
  ui.resultMessage.textContent = won ? reason : `${reason} Pelaku proyek bermasalah ditangkap auditor.`;
  ui.finalScore.textContent = Math.round(game.score);
  ui.finalHighScore.textContent = highScore;
  ui.finalRank.textContent = finalRank.rank;
  ui.finalCombo.textContent = `x${Math.max(1, game.maxCombo)}`;
  ui.startHighScore.textContent = highScore;
  buttons.retryLevel.style.display = won ? "none" : "inline-flex";
  renderLeaderboard(ui.finalLeaderboard);
  renderLeaderboard(ui.startLeaderboard);
  audio.stopBgm();

  setTimeout(() => setScene("gameover"), won ? 700 : 250);
}

function setMessage(text, duration) {
  game.message = text;
  game.messageTimer = duration;
}

function showLevelDialog() {
  const level = currentLevel();
  const dialog = levelDialog(level, game.levelIndex);
  game.levelStarted = false;
  dialogLines = dialog.lines || [dialog];
  dialogIndex = 0;
  ui.dialogAvatar.src = dialog.avatar;
  ui.dialogMcAvatar.src = assets.paths.mcBuilder;
  ui.dialogBackground.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.2), rgba(6,20,31,0.3)), url("${dialog.background}")`;
  renderDialogLine();
  setMessage(level.message, 2.6);
  audio.dialog();
}

function renderDialogLine() {
  const line = dialogLines[dialogIndex] || dialogLines[0];
  ui.dialogSpeaker.textContent = line.speaker;
  ui.dialogTitle.textContent = line.title;
  ui.dialogText.textContent = line.text;
  ui.dialogAvatar.src = line.avatar || ui.dialogAvatar.src;
  const label = dialogIndex >= dialogLines.length - 1 ? "Mulai Level" : "Next";
  buttons.dialogContinue.innerHTML = `<span class="button-icon ${dialogIndex >= dialogLines.length - 1 ? "icon-play" : "icon-next"}" aria-hidden="true"></span>${label}`;
}

function levelDialog(level, index) {
  if (isEndlessMode()) {
    const round = index - levels.length + 1;
    return {
      avatar: round % 3 === 0 ? assets.paths.auditor : assets.paths.npcChief,
      speaker: round % 3 === 0 ? "Auditor Publik" : "Kepala Desa",
      title: `Endless ${round}: Skor Lebih Tinggi`,
      text: `Fasilitas berikutnya adalah ${level.projectLabel.toLowerCase()}. Jaga combo bersih, hindari item korupsi, dan kejar ranking terbaik.`,
      background: dialogBackgrounds[level.project] || dialogBackgrounds.bridge
    };
  }
  const dialogs = [
    {
      background: dialogBackgrounds.bridge,
      avatar: assets.paths.npcChief,
      lines: [
        { speaker: "Kepala Desa", title: "Ruang Kantor Desa", text: "Jembatan sungai adalah nadi desa. Tapi kali ini kita butuh pengawasan yang benar-benar bersih.", avatar: assets.paths.npcChief },
        { speaker: "Alya", title: "Pengelola Proyek", text: "Saya akan berdiri di lapangan, memeriksa bahan, pekerja, dan setiap dokumen proyek.", avatar: assets.paths.mcBuilder },
        { speaker: "Kepala Desa", title: "Misi Dimulai", text: "Kalau ada suap atau bahan palsu, hentikan. Kertasa Bersih dimulai dari jembatan ini.", avatar: assets.paths.npcChief }
      ]
    },
    {
      background: dialogBackgrounds.house,
      avatar: assets.paths.villagerFemale,
      lines: [
        { speaker: "Tokoh Warga", title: "Balai Warga", text: "Rumah ini akan ditempati keluarga yang sudah lama menunggu tempat aman.", avatar: assets.paths.villagerFemale },
        { speaker: "Alya", title: "Audit Lapangan", text: "Saya cek bata, cat, dan keselamatan pekerja. Rumah layak tidak boleh dibangun dari bahan palsu.", avatar: assets.paths.mcBuilder }
      ]
    },
    {
      background: dialogBackgrounds.road,
      avatar: assets.paths.marketCitizen,
      lines: [
        { speaker: "Pedagang Pasar", title: "Rapat Pasar", text: "Jalan rusak membuat hasil panen terlambat sampai pasar.", avatar: assets.paths.marketCitizen },
        { speaker: "Alya", title: "Rencana Jalan", text: "Aspal standar, rambu, dan dokumen izin harus masuk tepat waktu. Aku akan jaga combo kerja bersih.", avatar: assets.paths.mcBuilder }
      ]
    },
    {
      background: dialogBackgrounds.school,
      avatar: assets.paths.schoolChild,
      lines: [
        { speaker: "Guru Sekolah", title: "Ruang Kelas", text: "Anak-anak butuh ruang belajar yang kuat dan nyaman.", avatar: assets.paths.schoolChild },
        { speaker: "Alya", title: "Janji Pengawas", text: "Aku akan memastikan meja, buku, dan struktur sekolah selesai tanpa celah korupsi.", avatar: assets.paths.mcBuilder }
      ]
    },
    {
      background: dialogBackgrounds.clinic,
      avatar: assets.paths.auditor,
      lines: [
        { speaker: "Auditor Publik", title: "Ruang Klinik", text: "Pos kesehatan akan diaudit publik. Semua bukti harus bersih.", avatar: assets.paths.auditor },
        { speaker: "Alya", title: "Final Project", text: "Saya siap. Proyek terakhir harus aman, rapi, dan bisa dipakai warga dengan bangga.", avatar: assets.paths.mcBuilder }
      ]
    }
  ];
  return dialogs[index] || dialogs[0];
}

function rankForScore(score) {
  if (score >= 18000) return { rank: "S", label: "Legenda Bersih" };
  if (score >= 12000) return { rank: "A", label: "Teladan Desa" };
  if (score >= 7500) return { rank: "B", label: "Pengawas Andal" };
  if (score >= 3500) return { rank: "C", label: "Pembangun Jujur" };
  return { rank: "D", label: "Perlu Latihan" };
}

function addCoins(amount) {
  coins += Math.max(0, Math.round(amount));
  localStorage.setItem("bridgeSafeCoins", String(coins));
}

function spendCoins(amount) {
  if (coins < amount) return false;
  coins -= amount;
  localStorage.setItem("bridgeSafeCoins", String(coins));
  return true;
}

function loadList(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function loadLeaderboard() {
  try {
    const saved = JSON.parse(localStorage.getItem("bridgeSafeLeaderboard") || "[]");
    return Array.isArray(saved) ? saved.slice(0, 5) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entry) {
  const next = [...leaderboard, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  localStorage.setItem("bridgeSafeLeaderboard", JSON.stringify(next));
  return next;
}

function renderLeaderboard(target) {
  if (!target) return;
  const rows = leaderboard.length ? leaderboard : [{ score: 0, rank: "-", mode: "Belum ada", combo: 0 }];
  target.innerHTML = rows.map((row, index) => (
    `<li><b>#${index + 1}</b><span>${row.mode} Lv ${row.level || "-"}</span><em>${row.rank} · ${row.score}</em></li>`
  )).join("");
}

function openShop() {
  renderShop();
  setScene("shop");
}

function renderShop() {
  ui.shopCoin.textContent = coins;
  ui.characterShopGrid.innerHTML = shopCatalog.characters.map((item) => renderShopItem(item, "character")).join("");
  ui.vehicleShopGrid.innerHTML = shopCatalog.vehicles.map((item) => renderShopItem(item, "vehicle")).join("");
  ui.shop.querySelectorAll("[data-shop-id]").forEach((button) => {
    button.addEventListener("click", () => handleShopAction(button.dataset.shopType, button.dataset.shopId));
  });
}

function renderShopItem(item, type) {
  const owned = type === "character" ? ownedCharacterSkins.includes(item.id) : ownedVehicleSkins.includes(item.id);
  const equipped = type === "character" ? equippedCharacterSkin === item.id : equippedVehicleSkin === item.id;
  const image = type === "character" ? assets.paths[item.asset] : "";
  const swatch = type === "vehicle" ? `style="background:linear-gradient(135deg,${item.colors[0]},${item.colors[1]})"` : "";
  return `<article class="shop-card">
    <div class="shop-preview" ${swatch}>${image ? `<img src="${image}" alt="">` : ""}</div>
    <strong>${item.name}</strong>
    <p>${item.note}</p>
    <button class="${equipped ? "ghost-button" : "primary-button"}" data-shop-type="${type}" data-shop-id="${item.id}" type="button">
      <span class="button-icon ${equipped ? "icon-check" : owned ? "icon-play" : "icon-shop"}" aria-hidden="true"></span>${equipped ? "Equipped" : owned ? "Equip" : `Beli ${item.price}`}
    </button>
  </article>`;
}

function handleShopAction(type, id) {
  const list = type === "character" ? shopCatalog.characters : shopCatalog.vehicles;
  const item = list.find((entry) => entry.id === id);
  if (!item) return;
  const ownedList = type === "character" ? ownedCharacterSkins : ownedVehicleSkins;
  if (!ownedList.includes(id)) {
    if (!spendCoins(item.price)) {
      showNotice("Koin Belum Cukup", "Mainkan level atau endless untuk mengumpulkan lebih banyak koin.");
      return;
    }
    ownedList.push(id);
    localStorage.setItem(type === "character" ? "bridgeSafeOwnedCharacters" : "bridgeSafeOwnedVehicles", JSON.stringify(ownedList));
  }
  if (type === "character") {
    equippedCharacterSkin = id;
    localStorage.setItem("bridgeSafeEquippedCharacter", id);
  } else {
    equippedVehicleSkin = id;
    localStorage.setItem("bridgeSafeEquippedVehicle", id);
  }
  renderShop();
  updateHud();
}

function openAchievements() {
  ui.achievementGrid.innerHTML = achievementList.map((item) => {
    const done = item.check();
    return `<article class="achievement-card ${done ? "is-done" : ""}">
      <strong>${done ? "Terbuka" : "Terkunci"}</strong>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
    </article>`;
  }).join("");
  setScene("achievement");
}

function openItemGuide() {
  ui.itemGuideGrid.innerHTML = itemGuideEntries.map((item) => `
    <article class="guide-card ${item.type.toLowerCase().replace("-", "")}">
      <img src="${assets.paths[item.icon]}" alt="">
      <span>${item.type}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
  setScene("itemguide");
}

function showConfirm({ label = "Konfirmasi", title, message, onYes, returnScene = scene }) {
  pendingConfirm = { onYes, returnScene };
  ui.confirmLabel.textContent = label;
  ui.confirmTitle.textContent = title;
  ui.confirmMessage.textContent = message;
  setScene("confirm");
}

function showNotice(title, message) {
  showConfirm({
    label: "Info",
    title,
    message,
    returnScene: scene,
    onYes: () => {}
  });
  buttons.confirmYes.innerHTML = `<span class="button-icon icon-check" aria-hidden="true"></span>OK`;
  buttons.confirmNo.style.display = "none";
}

function closeConfirm(runAction) {
  const action = pendingConfirm;
  buttons.confirmYes.innerHTML = `<span class="button-icon icon-check" aria-hidden="true"></span>Ya`;
  buttons.confirmNo.style.display = "inline-flex";
  pendingConfirm = null;
  if (runAction && action?.onYes) action.onYes();
  setScene(action?.returnScene || "start");
}

function clearSavedData() {
  highScore = 0;
  leaderboard = [];
  unlockedLevel = 0;
  coins = 0;
  ownedCharacterSkins = ["mcBuilder"];
  ownedVehicleSkins = ["default"];
  equippedCharacterSkin = "mcBuilder";
  equippedVehicleSkin = "default";
  localStorage.removeItem("bridgeSafeHighScore");
  localStorage.removeItem("bridgeSafeLeaderboard");
  localStorage.removeItem("bridgeSafeUnlockedLevel");
  localStorage.removeItem("bridgeSafeCoins");
  localStorage.removeItem("bridgeSafeOwnedCharacters");
  localStorage.removeItem("bridgeSafeOwnedVehicles");
  localStorage.removeItem("bridgeSafeEquippedCharacter");
  localStorage.removeItem("bridgeSafeEquippedVehicle");
  renderLeaderboard(ui.startLeaderboard);
  renderLeaderboard(ui.finalLeaderboard);
  ui.startHighScore.textContent = "0";
  updateHud();
  setMessage("Data progres sudah dihapus.", 2);
  audio.bad();
}

function requestClearSavedData() {
  showConfirm({
    label: "Hapus Data",
    title: "Hapus semua progres?",
    message: "High score, koin, skin yang dibeli, achievement, dan level terbuka akan kembali ke awal.",
    returnScene: "paused",
    onYes: clearSavedData
  });
}

function toggleMusic() {
  const wasEnabled = musicEnabled;
  musicEnabled = !musicEnabled;
  localStorage.setItem("bridgeSafeMusicEnabled", String(musicEnabled));
  updateMusicButton();
  audio.setVolumes();
  if (musicEnabled && scene === "playing") audio.startBgm();
  else audio.pauseBgm();
  if (!wasEnabled && musicEnabled) audio.click();
}

function updateVolumeSettings() {
  musicVolume = Number(buttons.musicVolume.value);
  sfxVolume = Number(buttons.sfxVolume.value);
  localStorage.setItem("bridgeSafeMusicVolume", String(musicVolume));
  localStorage.setItem("bridgeSafeSfxVolume", String(sfxVolume));
  audio.setVolumes();
}

function updateMusicButton() {
  buttons.music.classList.toggle("is-off", !musicEnabled);
  buttons.music.setAttribute("aria-pressed", String(musicEnabled));
  buttons.music.setAttribute("aria-label", musicEnabled ? "Suara aktif" : "Semua suara mati");
}

function updateParticles(dt) {
  for (const particle of game.particles) {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy += 60 * dt;
    particle.life -= dt;
  }
  game.particles = game.particles.filter((particle) => particle.life > 0);
}

function burst(x, y, color, count) {
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 34 + Math.random() * 115;
    game.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2 + Math.random() * 3,
      color,
      spark: Math.random() < 0.16,
      life: 0.35 + Math.random() * 0.6
    });
  }
}

function draw() {
  const shakeX = (Math.random() - 0.5) * game.quake;
  const shakeY = (Math.random() - 0.5) * game.quake;
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(shakeX, shakeY);
  drawSky();
  if (currentLevel().project === "bridge" && !usesFullBackgroundArt(currentLevel())) {
    drawRiver();
    drawVillage();
  }
  drawBridge();
  drawWorkers();
  drawVillagers();
  drawItems();
  drawPlayer();
  drawParticles();
  drawMessage();
  ctx.restore();

  if (scene === "cinematic") {
    drawStoryVideo();
  }
}

function drawStoryVideo() {
  const w = storyCanvas.clientWidth || 960;
  const h = storyCanvas.clientHeight || 540;
  const now = performance.now();
  const storyDt = Math.min(0.08, (now - storyClock) / 1000 || 1 / 60);
  storyClock = now;
  storyTime += storyDt;
  const slide = introSlides[introIndex] || introSlides[0];
  const image = assets.images[slide.background];
  const entrance = easeInOut(clamp(storyTime / 0.8, 0, 1));
  const pan = Math.sin(storyTime * 0.25) * 12;

  ui.cinematicLabel.textContent = `${slide.label} ${introIndex + 1}/${introSlides.length}`;
  ui.cinematicTitle.textContent = slide.title;
  ui.cinematicText.textContent = slide.text;
  ui.cinematicProgress.style.transform = `scaleX(${(introIndex + entrance) / introSlides.length})`;
  buttons.cinematicStart.style.display = "inline-flex";

  storyCtx.clearRect(0, 0, w, h);
  const gradient = storyCtx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "#b9d8ff");
  gradient.addColorStop(0.48, "#f8d4ff");
  gradient.addColorStop(1, "#fff1bd");
  storyCtx.fillStyle = gradient;
  storyCtx.fillRect(0, 0, w, h);

  if (image?.complete && image.naturalWidth) {
    storyCtx.globalAlpha = 0.9;
    storyCtx.drawImage(image, -pan, 0, w + 24, h);
    storyCtx.globalAlpha = 1;
  }

  drawAnimeIntroCharacters(w, h, slide, entrance);
  drawCinematicParticles(w, h, storyTime, 0.85, 0.1);
  drawCinematicVignette(w, h, 0.08, 0.88);
}

const integrityWords = [
  { text: "BERANI", effect: "fire", caption: "Nyali untuk menolak suap menyalakan harapan baru." },
  { text: "JUJUR", effect: "gold", caption: "Kejujuran menjadi cahaya yang menembus gelapnya korupsi." },
  { text: "MANDIRI", effect: "rise", caption: "Bangunan kembali berdiri karena warga percaya pada usaha sendiri." },
  { text: "PEDULI", effect: "care", caption: "Masyarakat saling membantu agar tidak ada yang tertinggal." },
  { text: "ADIL", effect: "scale", caption: "Keadilan menimbang kepentingan rakyat di atas kepentingan pribadi." },
  { text: "DISIPLIN", effect: "order", caption: "Kota menjadi tertata saat aturan dijaga bersama." },
  { text: "KERJA KERAS", effect: "work", caption: "Pekerja membangun negeri dengan tenaga dan hati yang bersih." },
  { text: "TANGGUNG JAWAB", effect: "shield", caption: "Setiap amanah dilindungi untuk keselamatan rakyat." },
  { text: "SEDERHANA", effect: "peace", caption: "Kehidupan yang bersih membawa damai, terang, dan kepercayaan." }
];

function drawAnimeIntroCharacters(w, h, slide, entrance) {
  const mc = assets.images.mcBuilder;
  const chief = assets.images.npcChief;
  const mcHeight = h * 0.7;
  const mcWidth = mcHeight * 0.72;
  const npcHeight = h * 0.58;
  const npcWidth = npcHeight * 0.72;
  const y = h * 0.92;
  storyCtx.save();
  storyCtx.translate(0, (1 - entrance) * 34);
  storyCtx.globalAlpha = entrance;
  if (chief?.complete && chief.naturalWidth && slide.speaker !== "Alya") {
    storyCtx.drawImage(chief, w * 0.08, y - npcHeight, npcWidth, npcHeight);
  }
  if (mc?.complete && mc.naturalWidth) {
    storyCtx.drawImage(mc, w * 0.68, y - mcHeight, mcWidth, mcHeight);
  }
  storyCtx.restore();
}

function drawStoryCloud(x, y, size) {
  storyCtx.beginPath();
  storyCtx.ellipse(x, y, size, size * 0.24, 0, 0, Math.PI * 2);
  storyCtx.fill();
  storyCtx.beginPath();
  storyCtx.arc(x - size * 0.33, y - size * 0.08, size * 0.26, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.04, y - size * 0.18, size * 0.32, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.38, y - size * 0.02, size * 0.22, 0, Math.PI * 2);
  storyCtx.fill();
}

function drawStoryPeople(w, h, beat, eased) {
  const people = [assets.images.villagerMale, assets.images.villagerFemale, assets.images.schoolChild];
  people.forEach((image, index) => {
    if (!image?.complete || !image.naturalWidth) return;
    const size = Math.min(70, w * 0.075);
    const x = w * (0.16 + index * 0.08 + eased * 0.1);
    const y = h * 0.64 + Math.sin(storyTime * 5 + index) * 3;
    storyCtx.drawImage(image, x, y - size, size * 0.86, size);
  });
}

function easeInOut(value) {
  return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function drawEpicOpeningSky(w, h, progress, chaos) {
  const sky = storyCtx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, blendColor("#101827", "#ffd7a1", progress * 0.9));
  sky.addColorStop(0.5, blendColor("#263246", "#e9f8ff", progress));
  sky.addColorStop(1, blendColor("#182334", "#f6ffe8", progress));
  storyCtx.fillStyle = sky;
  storyCtx.fillRect(0, 0, w, h);

  const lightning = Math.max(0, Math.sin(storyTime * 8.5) - 0.78) * chaos;
  if (lightning > 0) {
    storyCtx.globalAlpha = lightning;
    storyCtx.fillStyle = "#ffffff";
    storyCtx.fillRect(0, 0, w, h);
    storyCtx.strokeStyle = "#d9f5ff";
    storyCtx.lineWidth = Math.max(3, w * 0.006);
    storyCtx.beginPath();
    storyCtx.moveTo(w * 0.18, 0);
    storyCtx.lineTo(w * 0.25, h * 0.18);
    storyCtx.lineTo(w * 0.2, h * 0.28);
    storyCtx.lineTo(w * 0.31, h * 0.48);
    storyCtx.stroke();
    storyCtx.globalAlpha = 1;
  }

  storyCtx.globalAlpha = 0.4 + chaos * 0.45;
  storyCtx.fillStyle = "#151b28";
  drawStoryCloud(loopX(w * 0.15 + storyTime * 10, w, 180), h * 0.18, w * 0.12);
  drawStoryCloud(loopX(w * 0.58 + storyTime * 7, w, 180), h * 0.11, w * 0.13);
  drawStoryCloud(loopX(w * 0.82 + storyTime * 5, w, 180), h * 0.23, w * 0.1);
  storyCtx.globalAlpha = 1;
}

function drawEpicRain(w, h, time, chaos) {
  if (chaos <= 0.04) return;
  storyCtx.save();
  storyCtx.globalAlpha = chaos * 0.46;
  storyCtx.strokeStyle = "#cfe9ff";
  storyCtx.lineWidth = 1.3;
  for (let i = 0; i < 70; i += 1) {
    const x = ((i * 83 + time * 390) % (w + 120)) - 80;
    const y = (i * 47 + time * 260) % h;
    storyCtx.beginPath();
    storyCtx.moveTo(x, y);
    storyCtx.lineTo(x - 16, y + 42);
    storyCtx.stroke();
  }
  storyCtx.restore();
}

function drawEpicCity(w, h, restoration, time) {
  const groundY = h * 0.66;
  const camera = Math.sin(time * 0.35) * w * 0.025 + restoration * w * 0.1;
  storyCtx.fillStyle = blendColor("#1a2425", "#3f9d59", restoration);
  storyCtx.fillRect(0, groundY, w, h - groundY);

  storyCtx.fillStyle = blendColor("#1b1d23", "#3a4148", restoration);
  storyCtx.fillRect(0, groundY + h * 0.21, w, h * 0.1);
  storyCtx.strokeStyle = `rgba(255,255,255,${0.2 + restoration * 0.6})`;
  storyCtx.setLineDash([24, 22]);
  storyCtx.lineWidth = 4;
  storyCtx.beginPath();
  storyCtx.moveTo(0, groundY + h * 0.26);
  storyCtx.lineTo(w, groundY + h * 0.26);
  storyCtx.stroke();
  storyCtx.setLineDash([]);

  const buildings = [
    { x: -0.02, width: 0.12, bad: 0.42, good: 0.3, color: "#ffd24d", accent: "#e84d5b", broken: true },
    { x: 0.13, width: 0.15, bad: 0.2, good: 0.38, color: "#dff6ff", accent: "#18a999", broken: true },
    { x: 0.31, width: 0.15, bad: 0.33, good: 0.5, color: "#f7fbff", accent: "#2675ff", broken: false },
    { x: 0.52, width: 0.17, bad: 0.24, good: 0.42, color: "#eef4ff", accent: "#e84d5b", broken: true },
    { x: 0.74, width: 0.13, bad: 0.28, good: 0.5, color: "#d9f0ff", accent: "#2675ff", broken: false },
    { x: 0.88, width: 0.14, bad: 0.36, good: 0.56, color: "#fff1c7", accent: "#18a999", broken: false }
  ];

  buildings.forEach((building, index) => {
    const x = w * building.x - camera * (0.2 + index * 0.03);
    const bw = w * building.width;
    const damagedHeight = h * building.bad;
    const restoredHeight = h * building.good;
    const bh = damagedHeight + (restoredHeight - damagedHeight) * restoration;
    drawEpicBuilding(x, groundY, bw, bh, building, restoration);
  });

  drawBrokenProject(w * 0.5 - camera * 0.2, groundY, w * 0.2, h * 0.22, restoration);
  drawEpicPark(w * 0.63 + restoration * w * 0.04, groundY, w * 0.16, restoration);
  drawIndonesianFlag(w * 0.82 + restoration * w * 0.04, groundY - h * 0.37, h * 0.28, restoration);
}

function drawEpicBuilding(x, groundY, bw, bh, building, restoration) {
  storyCtx.fillStyle = restoration < 0.5 ? "rgba(0,0,0,0.28)" : "rgba(16,32,45,0.18)";
  storyCtx.fillRect(x - bw * 0.08, groundY - 3, bw * 1.16, 9);
  storyCtx.fillStyle = blendColor("#3d414a", building.color, restoration);
  storyCtx.fillRect(x, groundY - bh, bw, bh);
  storyCtx.fillStyle = blendColor("#7c2f36", building.accent, restoration);
  storyCtx.fillRect(x, groundY - bh, bw, Math.max(8, bh * 0.07));

  if (building.broken && restoration < 0.72) {
    storyCtx.fillStyle = "#20242c";
    storyCtx.beginPath();
    storyCtx.moveTo(x, groundY - bh);
    storyCtx.lineTo(x + bw * 0.28, groundY - bh - bw * 0.18 * (1 - restoration));
    storyCtx.lineTo(x + bw * 0.6, groundY - bh);
    storyCtx.closePath();
    storyCtx.fill();
  }

  storyCtx.fillStyle = `rgba(38,117,255,${0.12 + restoration * 0.28})`;
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const windowY = groundY - bh + 24 + row * 32;
      if (windowY < groundY - 12) {
        storyCtx.fillRect(x + bw * (0.18 + col * 0.25), windowY, bw * 0.12, 14);
      }
    }
  }
}

function drawBrokenProject(x, groundY, bw, bh, restoration) {
  storyCtx.strokeStyle = blendColor("#6a4b33", "#f5b642", restoration);
  storyCtx.lineWidth = Math.max(3, bw * 0.025);
  storyCtx.beginPath();
  storyCtx.moveTo(x, groundY);
  storyCtx.lineTo(x + bw * 0.08, groundY - bh * (0.55 + restoration * 0.45));
  storyCtx.moveTo(x + bw * 0.32, groundY);
  storyCtx.lineTo(x + bw * 0.28, groundY - bh * (0.45 + restoration * 0.45));
  storyCtx.moveTo(x + bw * 0.04, groundY - bh * 0.45);
  storyCtx.lineTo(x + bw * (0.36 + restoration * 0.36), groundY - bh * (0.68 + restoration * 0.12));
  storyCtx.stroke();
  storyCtx.fillStyle = blendColor("#7d2e38", "#2675ff", restoration);
  storyCtx.fillRect(x + bw * (0.5 + restoration * 0.16), groundY - bh * 0.8, bw * 0.18, bh * 0.06);
}

function drawEpicPark(x, groundY, size, restoration) {
  storyCtx.globalAlpha = restoration;
  storyCtx.fillStyle = "#1cad6f";
  storyCtx.fillRect(x, groundY - size * 0.12, size, size * 0.12);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.fillRect(x + size * 0.2, groundY - size * 0.19, size * 0.62, size * 0.06);
  drawTree(x + size * 0.25, groundY - size * 0.1, size * 0.42, storyTime);
  drawTree(x + size * 0.78, groundY - size * 0.1, size * 0.36, storyTime + 1);
  storyCtx.globalAlpha = 1;
}

function drawIndonesianFlag(x, y, poleHeight, restoration) {
  storyCtx.globalAlpha = 0.15 + restoration * 0.85;
  storyCtx.strokeStyle = "#10202d";
  storyCtx.lineWidth = 4;
  storyCtx.beginPath();
  storyCtx.moveTo(x, y);
  storyCtx.lineTo(x, y + poleHeight);
  storyCtx.stroke();
  const wave = Math.sin(storyTime * 4) * 5;
  storyCtx.fillStyle = "#e84d5b";
  storyCtx.fillRect(x + 4, y + 8 + wave, poleHeight * 0.42, poleHeight * 0.12);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.fillRect(x + 4, y + 8 + poleHeight * 0.12 + wave, poleHeight * 0.42, poleHeight * 0.12);
  storyCtx.globalAlpha = 1;
}

function drawFloatingMoney(w, h, time, chaos) {
  if (chaos <= 0.03) return;
  storyCtx.save();
  storyCtx.globalAlpha = chaos * 0.9;
  for (let i = 0; i < 18; i += 1) {
    const x = loopX(w * (0.08 + i * 0.07) + time * (28 + i), w, 80);
    const y = h * (0.2 + ((i * 37 + time * 23) % 42) / 100);
    storyCtx.save();
    storyCtx.translate(x, y);
    storyCtx.rotate(Math.sin(time * 2 + i) * 0.5);
    storyCtx.fillStyle = "#6ed27d";
    storyRoundRect(-15, -7, 30, 14, 3);
    storyCtx.fillStyle = "rgba(16,32,45,0.38)";
    storyCtx.fillRect(-4, -4, 8, 8);
    storyCtx.restore();
  }
  storyCtx.restore();
}

function drawRedWhiteBreakthrough(w, h, restoration, progress) {
  const alpha = clamp((progress - 0.16) / 0.22, 0, 1);
  if (alpha <= 0) return;
  const beam = storyCtx.createLinearGradient(0, h * 0.08, w, h * 0.72);
  beam.addColorStop(0, `rgba(232,77,91,${0.1 + alpha * 0.28})`);
  beam.addColorStop(0.48, `rgba(255,255,255,${0.18 + alpha * 0.32})`);
  beam.addColorStop(1, `rgba(232,77,91,${0.06 + alpha * 0.2})`);
  storyCtx.fillStyle = beam;
  storyCtx.beginPath();
  storyCtx.moveTo(w * 0.08, 0);
  storyCtx.lineTo(w * 0.74, 0);
  storyCtx.lineTo(w, h * 0.62);
  storyCtx.lineTo(w * 0.38, h);
  storyCtx.closePath();
  storyCtx.fill();

  storyCtx.globalAlpha = alpha * restoration;
  storyCtx.fillStyle = "#fff4b8";
  storyCtx.beginPath();
  storyCtx.arc(w * 0.5, h * 0.16, Math.min(w, h) * 0.09, 0, Math.PI * 2);
  storyCtx.fill();
  storyCtx.globalAlpha = 1;
}

function drawHeroStride(w, h, time, restoration) {
  const groundY = h * 0.66;
  const x = w * (0.14 + clamp((storyTime - 2.2) / 10, 0, 1) * 0.28);
  const y = groundY + Math.sin(time * 6) * 3;
  const size = Math.min(w, h) * 0.13;
  storyCtx.save();
  storyCtx.shadowColor = `rgba(255,255,255,${0.35 + restoration * 0.35})`;
  storyCtx.shadowBlur = 18 + restoration * 28;
  drawCartoonPerson(x, y, size, "#2675ff", "#e84d5b", true);
  storyCtx.restore();
}

function drawEpicCrowd(w, h, time, restoration) {
  const groundY = h * 0.66;
  const crowd = [
    { x: 0.2, color: "#fff4d8", hat: "#18a999" },
    { x: 0.46, color: "#f5b642", hat: "#2675ff" },
    { x: 0.58, color: "#ffffff", hat: "#e84d5b" },
    { x: 0.71, color: "#18a999", hat: "#f5b642" }
  ];
  crowd.forEach((person, index) => {
    const x = w * person.x + Math.sin(time + index) * w * 0.012;
    const y = groundY - 6 + Math.sin(time * 4 + index) * 2;
    const alpha = index === 0 ? 0.35 + restoration * 0.65 : restoration;
    storyCtx.globalAlpha = alpha;
    drawCartoonPerson(x, y, Math.min(w, h) * 0.056, person.color, person.hat, index > 0);
    storyCtx.globalAlpha = 1;
  });
}

function drawEpicVehicles(w, h, time, restoration) {
  const roadY = h * 0.66 + h * 0.25;
  drawTruck(loopX(w * 0.1 + time * (36 + restoration * 42), w, 180), roadY, w * 0.13, "#e84d5b", "AMAN");
  storyCtx.globalAlpha = restoration;
  drawTruck(loopX(w * 0.6 + time * 46, w, 180), roadY + h * 0.035, w * 0.12, "#2675ff", "BAJA");
  storyCtx.globalAlpha = 1;
}

function drawEpicWord(w, h, word, local, isFinale, restoration) {
  if (isFinale || storyTime < 4) return;
  const alpha = Math.min(1, local * 3, (1 - local) * 2.4);
  const pulse = 1 + Math.sin(local * Math.PI) * 0.08;
  const y = h * 0.24 - (1 - alpha) * 26;
  storyCtx.save();
  storyCtx.globalAlpha = alpha;
  storyCtx.textAlign = "center";
  storyCtx.textBaseline = "middle";
  storyCtx.font = `950 ${clamp(w * 0.075 * pulse, 34, 78)}px Inter, system-ui`;
  storyCtx.shadowBlur = 24;
  storyCtx.shadowColor = word.effect === "gold" ? "#ffd95a" : word.effect === "fire" ? "#ff5b2d" : "#ffffff";
  storyCtx.fillStyle = word.effect === "gold" ? "#ffe27a" : word.effect === "fire" ? "#ff6b3d" : "#ffffff";
  storyCtx.fillText(word.text, w * 0.5, y, w * 0.78);
  storyCtx.shadowBlur = 0;
  storyCtx.strokeStyle = `rgba(232,77,91,${0.45 + restoration * 0.25})`;
  storyCtx.lineWidth = 5;
  storyCtx.beginPath();
  storyCtx.moveTo(w * 0.2, y + h * 0.075);
  storyCtx.lineTo(w * 0.5, y + h * 0.075);
  storyCtx.stroke();
  storyCtx.strokeStyle = "rgba(255,255,255,0.82)";
  storyCtx.beginPath();
  storyCtx.moveTo(w * 0.5, y + h * 0.075);
  storyCtx.lineTo(w * 0.8, y + h * 0.075);
  storyCtx.stroke();

  if (word.effect === "scale") drawJusticeScale(w * 0.5, y + h * 0.17, Math.min(w, h) * 0.12, alpha);
  if (word.effect === "shield") drawShield(w * 0.5, y + h * 0.17, Math.min(w, h) * 0.11, alpha);
  storyCtx.restore();
}

function drawJusticeScale(x, y, size, alpha) {
  storyCtx.globalAlpha = alpha * 0.9;
  storyCtx.strokeStyle = "#ffe27a";
  storyCtx.lineWidth = 3;
  storyCtx.beginPath();
  storyCtx.moveTo(x, y - size * 0.5);
  storyCtx.lineTo(x, y + size * 0.35);
  storyCtx.moveTo(x - size * 0.6, y - size * 0.35);
  storyCtx.lineTo(x + size * 0.6, y - size * 0.35);
  storyCtx.moveTo(x - size * 0.42, y - size * 0.35);
  storyCtx.lineTo(x - size * 0.55, y);
  storyCtx.moveTo(x + size * 0.42, y - size * 0.35);
  storyCtx.lineTo(x + size * 0.55, y);
  storyCtx.stroke();
  storyCtx.globalAlpha = 1;
}

function drawShield(x, y, size, alpha) {
  storyCtx.globalAlpha = alpha * 0.9;
  storyCtx.fillStyle = "rgba(38,117,255,0.72)";
  storyCtx.beginPath();
  storyCtx.moveTo(x, y - size * 0.55);
  storyCtx.lineTo(x + size * 0.48, y - size * 0.28);
  storyCtx.lineTo(x + size * 0.36, y + size * 0.34);
  storyCtx.lineTo(x, y + size * 0.58);
  storyCtx.lineTo(x - size * 0.36, y + size * 0.34);
  storyCtx.lineTo(x - size * 0.48, y - size * 0.28);
  storyCtx.closePath();
  storyCtx.fill();
  storyCtx.globalAlpha = 1;
}

function drawCinematicParticles(w, h, time, restoration, chaos) {
  for (let i = 0; i < 50; i += 1) {
    const x = (i * 97 + time * (20 + restoration * 36)) % w;
    const y = (i * 53 + time * (12 + chaos * 58)) % h;
    const glow = i % 3 === 0 ? "#e84d5b" : i % 3 === 1 ? "#ffffff" : "#f5b642";
    storyCtx.globalAlpha = 0.15 + restoration * 0.35 + chaos * 0.1;
    storyCtx.fillStyle = glow;
    storyCtx.beginPath();
    storyCtx.arc(x, y, 1.4 + (i % 4), 0, Math.PI * 2);
    storyCtx.fill();
  }
  storyCtx.globalAlpha = 1;
}

function drawCinematicVignette(w, h, chaos, restoration) {
  const gradient = storyCtx.createRadialGradient(w * 0.5, h * 0.45, h * 0.18, w * 0.5, h * 0.45, h * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, `rgba(0,0,0,${0.38 + chaos * 0.26 - restoration * 0.08})`);
  storyCtx.fillStyle = gradient;
  storyCtx.fillRect(0, 0, w, h);
}

function drawOpeningSun(w, h, progress) {
  const x = w * (0.12 + progress * 0.18);
  const y = h * (0.2 - progress * 0.04);
  const radius = Math.min(w, h) * 0.075;
  storyCtx.fillStyle = "rgba(255, 222, 93, 0.34)";
  storyCtx.beginPath();
  storyCtx.arc(x, y, radius * 1.9, 0, Math.PI * 2);
  storyCtx.fill();
  storyCtx.fillStyle = "#ffd950";
  storyCtx.beginPath();
  storyCtx.arc(x, y, radius, 0, Math.PI * 2);
  storyCtx.fill();
}

function drawOpeningClouds(w, h, time) {
  storyCtx.globalAlpha = 0.82;
  storyCtx.fillStyle = "#ffffff";
  drawStoryCloud(loopX(w * 0.1 + time * 18, w, 160), h * 0.18, w * 0.09);
  drawStoryCloud(loopX(w * 0.62 + time * 12, w, 180), h * 0.12, w * 0.11);
  drawStoryCloud(loopX(w * 0.36 + time * 9, w, 150), h * 0.27, w * 0.075);
  storyCtx.globalAlpha = 1;
}

function drawOpeningBirds(w, h, time) {
  storyCtx.strokeStyle = "rgba(16, 32, 45, 0.55)";
  storyCtx.lineWidth = Math.max(2, w * 0.003);
  for (let i = 0; i < 6; i += 1) {
    const x = loopX(w * (0.08 + i * 0.14) + time * (42 + i * 8), w, 80);
    const y = h * (0.2 + Math.sin(time * 1.4 + i) * 0.035 + i * 0.015);
    const flap = Math.sin(time * 8 + i) * 5;
    storyCtx.beginPath();
    storyCtx.moveTo(x - 12, y);
    storyCtx.quadraticCurveTo(x - 5, y - 8 - flap, x, y);
    storyCtx.quadraticCurveTo(x + 7, y - 8 + flap, x + 14, y);
    storyCtx.stroke();
  }
}

function drawOpeningWorld(w, h, progress, time) {
  const groundY = h * 0.66;
  const camera = progress * w * 0.5;
  storyCtx.fillStyle = blendColor("#78bf6a", "#50a866", progress);
  storyCtx.fillRect(0, groundY, w, h - groundY);
  storyCtx.fillStyle = "#4c89d8";
  storyCtx.fillRect(-camera * 0.1, groundY + h * 0.18, w * 0.5, h * 0.06);
  storyCtx.fillStyle = "#6c5d4b";
  storyCtx.fillRect(0, groundY + h * 0.19, w, h * 0.045);
  storyCtx.fillStyle = "#3d4650";
  storyCtx.fillRect(0, groundY + h * 0.2, w, h * 0.085);
  storyCtx.strokeStyle = "rgba(255,255,255,0.75)";
  storyCtx.setLineDash([22, 22]);
  storyCtx.lineWidth = 4;
  storyCtx.beginPath();
  storyCtx.moveTo(0, groundY + h * 0.242);
  storyCtx.lineTo(w, groundY + h * 0.242);
  storyCtx.stroke();
  storyCtx.setLineDash([]);

  drawVillageHouse(w * 0.08 - camera * 0.25, groundY, w * 0.13, "#ffcf4d", "#e84d5b");
  drawVillageHouse(w * 0.24 - camera * 0.2, groundY + 8, w * 0.12, "#18a999", "#ffffff");
  drawProjectBuilding(w * 0.42 - camera * 0.08, groundY, w * 0.16, h * 0.23, "#fffbef", "#2675ff", progress);
  drawProjectBuilding(w * 0.6 + camera * 0.03, groundY, w * 0.18, h * 0.3, "#f8faff", "#e84d5b", progress);
  drawCityTower(w * 0.78 + camera * 0.08, groundY, w * 0.11, h * 0.38, "#d7f0ff", "#2675ff", progress);
  drawCityTower(w * 0.9 + camera * 0.1, groundY, w * 0.12, h * 0.46, "#fff1cc", "#18a999", progress);

  drawTree(w * 0.16 - camera * 0.14, groundY, w * 0.075, time);
  drawTree(w * 0.52 + camera * 0.02, groundY, w * 0.065, time + 1);
  drawPark(w * 0.69 + camera * 0.04, groundY, w * 0.13);
}

function drawVillageHouse(x, groundY, size, wall, roof) {
  storyCtx.fillStyle = "rgba(16,32,45,0.18)";
  storyCtx.fillRect(x - size * 0.12, groundY - size * 0.02, size * 1.15, size * 0.08);
  storyCtx.fillStyle = wall;
  storyCtx.fillRect(x, groundY - size * 0.58, size, size * 0.58);
  storyCtx.fillStyle = roof;
  storyCtx.beginPath();
  storyCtx.moveTo(x - size * 0.08, groundY - size * 0.58);
  storyCtx.lineTo(x + size * 0.5, groundY - size * 0.96);
  storyCtx.lineTo(x + size * 1.08, groundY - size * 0.58);
  storyCtx.closePath();
  storyCtx.fill();
  storyCtx.fillStyle = "#10202d";
  storyCtx.fillRect(x + size * 0.4, groundY - size * 0.3, size * 0.2, size * 0.3);
}

function drawProjectBuilding(x, groundY, bw, bh, wall, accent, progress) {
  const visibleHeight = bh * (0.45 + progress * 0.55);
  storyCtx.fillStyle = "rgba(16,32,45,0.18)";
  storyCtx.fillRect(x - bw * 0.08, groundY - 4, bw * 1.16, 10);
  storyCtx.fillStyle = wall;
  storyCtx.fillRect(x, groundY - visibleHeight, bw, visibleHeight);
  storyCtx.fillStyle = accent;
  storyCtx.fillRect(x, groundY - visibleHeight, bw, 9);
  storyCtx.fillStyle = "rgba(38,117,255,0.22)";
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      storyCtx.fillRect(x + bw * (0.17 + col * 0.26), groundY - visibleHeight + 24 + row * 34, bw * 0.12, 16);
    }
  }
}

function drawCityTower(x, groundY, bw, bh, wall, accent, progress) {
  const lift = easeInOut(progress) * bh;
  storyCtx.fillStyle = wall;
  storyCtx.fillRect(x, groundY - lift, bw, lift);
  storyCtx.fillStyle = accent;
  storyCtx.fillRect(x, groundY - lift, bw, 10);
  storyCtx.fillStyle = "rgba(16,32,45,0.16)";
  for (let y = groundY - lift + 24; y < groundY - 16; y += 32) {
    storyCtx.fillRect(x + bw * 0.18, y, bw * 0.22, 13);
    storyCtx.fillRect(x + bw * 0.6, y, bw * 0.22, 13);
  }
}

function drawTree(x, groundY, size, time) {
  const sway = Math.sin(time * 1.6) * size * 0.04;
  storyCtx.fillStyle = "#8b5a36";
  storyCtx.fillRect(x - size * 0.08, groundY - size * 0.52, size * 0.16, size * 0.52);
  storyCtx.fillStyle = "#1cad6f";
  storyCtx.beginPath();
  storyCtx.arc(x + sway, groundY - size * 0.62, size * 0.28, 0, Math.PI * 2);
  storyCtx.arc(x - size * 0.2 + sway, groundY - size * 0.48, size * 0.24, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.2 + sway, groundY - size * 0.48, size * 0.24, 0, Math.PI * 2);
  storyCtx.fill();
}

function drawPark(x, groundY, size) {
  storyCtx.fillStyle = "#1cad6f";
  storyCtx.fillRect(x, groundY - size * 0.18, size, size * 0.18);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.fillRect(x + size * 0.18, groundY - size * 0.26, size * 0.64, size * 0.08);
  storyCtx.fillStyle = "#e84d5b";
  storyCtx.beginPath();
  storyCtx.arc(x + size * 0.2, groundY - size * 0.32, size * 0.09, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.48, groundY - size * 0.34, size * 0.08, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.76, groundY - size * 0.31, size * 0.09, 0, Math.PI * 2);
  storyCtx.fill();
}

function drawOpeningPeople(w, h, time, progress) {
  const groundY = h * 0.66;
  const workers = [
    { x: 0.32, color: "#f5b642", hat: "#e84d5b" },
    { x: 0.39, color: "#2675ff", hat: "#f5b642" },
    { x: 0.55, color: "#18a999", hat: "#ffffff" },
    { x: 0.68, color: "#e84d5b", hat: "#f5b642" }
  ];
  workers.forEach((worker, index) => {
    const bob = Math.sin(time * 5 + index) * 3;
    const x = w * worker.x + Math.sin(time + index) * w * 0.012;
    const y = groundY - 10 + bob;
    const scale = Math.min(w, h) * 0.0011;
    drawCartoonPerson(x, y, 46 * scale, worker.color, worker.hat, true);
  });

  const citizens = [
    { x: loopX(w * 0.12 + time * 18, w, 80), color: "#ffffff", hat: "#18a999" },
    { x: loopX(w * 0.72 + time * 12, w, 80), color: "#ffcf4d", hat: "#2675ff" },
    { x: loopX(w * 0.86 - time * 10, w, 80), color: "#f8faff", hat: "#e84d5b" }
  ];
  citizens.forEach((person, index) => {
    drawCartoonPerson(person.x, groundY + h * 0.17 + Math.sin(time * 4 + index) * 2, Math.min(w, h) * 0.048, person.color, person.hat, false);
  });
}

function drawCartoonPerson(x, feetY, size, shirt, hat, isWorker) {
  storyCtx.strokeStyle = "#10202d";
  storyCtx.lineWidth = Math.max(2, size * 0.06);
  storyCtx.lineCap = "round";
  storyCtx.fillStyle = shirt;
  storyCtx.fillRect(x - size * 0.18, feetY - size * 0.72, size * 0.36, size * 0.42);
  storyCtx.fillStyle = "#ffd5a8";
  storyCtx.beginPath();
  storyCtx.arc(x, feetY - size * 0.9, size * 0.17, 0, Math.PI * 2);
  storyCtx.fill();
  storyCtx.fillStyle = hat;
  storyCtx.fillRect(x - size * 0.22, feetY - size * 1.08, size * 0.44, size * 0.1);
  if (isWorker) storyCtx.fillRect(x - size * 0.16, feetY - size * 1.15, size * 0.32, size * 0.1);
  storyCtx.beginPath();
  storyCtx.moveTo(x - size * 0.11, feetY - size * 0.3);
  storyCtx.lineTo(x - size * 0.19, feetY);
  storyCtx.moveTo(x + size * 0.11, feetY - size * 0.3);
  storyCtx.lineTo(x + size * 0.21, feetY);
  storyCtx.moveTo(x - size * 0.2, feetY - size * 0.58);
  storyCtx.lineTo(x - size * 0.38, feetY - size * 0.44);
  storyCtx.moveTo(x + size * 0.2, feetY - size * 0.58);
  storyCtx.lineTo(x + size * 0.39, feetY - size * 0.76);
  storyCtx.stroke();
  storyCtx.strokeStyle = "#542a1f";
  storyCtx.lineWidth = Math.max(1.2, size * 0.035);
  storyCtx.beginPath();
  storyCtx.arc(x, feetY - size * 0.88, size * 0.09, 0.1, Math.PI - 0.1);
  storyCtx.stroke();
}

function drawOpeningVehicles(w, h, time, progress) {
  const roadY = h * 0.66 + h * 0.24;
  drawTruck(loopX(w * 0.04 + time * 65, w, 180), roadY, w * 0.13, "#e84d5b", "SEMEN");
  drawTruck(loopX(w * 0.64 + time * 45, w, 180), roadY + h * 0.035, w * 0.12, "#2675ff", "BAJA");
}

function drawTruck(x, y, size, color, label) {
  storyCtx.fillStyle = "rgba(16,32,45,0.18)";
  storyCtx.fillRect(x - size * 0.08, y + size * 0.2, size * 1.05, size * 0.11);
  storyCtx.fillStyle = color;
  storyCtx.fillRect(x, y - size * 0.18, size * 0.64, size * 0.34);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.fillRect(x + size * 0.64, y - size * 0.1, size * 0.28, size * 0.26);
  storyCtx.fillStyle = "#10202d";
  storyCtx.font = `900 ${Math.max(9, size * 0.11)}px Inter, system-ui`;
  storyCtx.textAlign = "center";
  storyCtx.textBaseline = "middle";
  storyCtx.fillText(label, x + size * 0.32, y, size * 0.54);
  storyCtx.fillStyle = "#10202d";
  storyCtx.beginPath();
  storyCtx.arc(x + size * 0.2, y + size * 0.2, size * 0.09, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.74, y + size * 0.2, size * 0.09, 0, Math.PI * 2);
  storyCtx.fill();
  storyCtx.fillStyle = "#f5b642";
  storyCtx.beginPath();
  storyCtx.arc(x + size * 0.2, y + size * 0.2, size * 0.04, 0, Math.PI * 2);
  storyCtx.arc(x + size * 0.74, y + size * 0.2, size * 0.04, 0, Math.PI * 2);
  storyCtx.fill();
}

function drawOpeningCranes(w, h, time, progress) {
  const groundY = h * 0.66;
  const x = w * 0.58;
  const top = groundY - h * 0.42;
  storyCtx.strokeStyle = "#f5b642";
  storyCtx.lineWidth = Math.max(4, w * 0.006);
  storyCtx.beginPath();
  storyCtx.moveTo(x, groundY);
  storyCtx.lineTo(x, top);
  storyCtx.lineTo(x + w * 0.25, top + Math.sin(time) * 8);
  storyCtx.moveTo(x, top);
  storyCtx.lineTo(x - w * 0.1, top + h * 0.06);
  storyCtx.stroke();
  const hookX = x + w * (0.12 + Math.sin(time * 0.7) * 0.08);
  storyCtx.strokeStyle = "#10202d";
  storyCtx.lineWidth = 3;
  storyCtx.beginPath();
  storyCtx.moveTo(hookX, top + 4);
  storyCtx.lineTo(hookX, top + h * 0.18);
  storyCtx.stroke();
  storyCtx.fillStyle = "#2675ff";
  storyCtx.fillRect(hookX - w * 0.025, top + h * 0.18, w * 0.05, h * 0.022);
}

function drawOpeningWord(w, h, word, local, isFinale) {
  if (isFinale) return;
  const alpha = Math.min(1, local * 3, (1 - local) * 3);
  const y = h * 0.25 - (1 - alpha) * 18;
  storyCtx.save();
  storyCtx.globalAlpha = alpha;
  storyCtx.fillStyle = "rgba(255,255,255,0.86)";
  storyRoundRect(w * 0.5 - w * 0.21, y - h * 0.06, w * 0.42, h * 0.12, 14);
  storyCtx.fillStyle = word === "Jujur" || word === "Berani" ? "#e84d5b" : "#10202d";
  storyCtx.font = `950 ${clamp(w * 0.062, 32, 62)}px Inter, system-ui`;
  storyCtx.textAlign = "center";
  storyCtx.textBaseline = "middle";
  storyCtx.fillText(word, w * 0.5, y, w * 0.38);
  storyCtx.fillStyle = "#e84d5b";
  storyCtx.fillRect(w * 0.5 - w * 0.2, y + h * 0.064, w * 0.2, 7);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.fillRect(w * 0.5, y + h * 0.064, w * 0.2, 7);
  storyCtx.restore();
}

function drawOpeningLogo(w, h, alpha) {
  storyCtx.save();
  storyCtx.globalAlpha = easeInOut(alpha);
  const cx = w * 0.5;
  const cy = h * 0.22;
  const markW = w * 0.22;
  const markH = h * 0.14;
  storyCtx.fillStyle = "rgba(255,255,255,0.9)";
  storyRoundRect(cx - markW * 0.5, cy - markH * 0.5, markW, markH, 16);
  storyCtx.fillStyle = "#e84d5b";
  storyCtx.fillRect(cx - markW * 0.39, cy - markH * 0.26, markW * 0.78, markH * 0.25);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.fillRect(cx - markW * 0.39, cy, markW * 0.78, markH * 0.25);
  storyCtx.fillStyle = "#10202d";
  storyCtx.font = `950 ${clamp(w * 0.035, 24, 42)}px Inter, system-ui`;
  storyCtx.textAlign = "center";
  storyCtx.textBaseline = "middle";
  storyCtx.fillText("Jembatan Aman", cx, cy + markH * 0.62, markW * 1.5);
  storyCtx.fillStyle = "#ffffff";
  storyCtx.font = `900 ${clamp(w * 0.021, 15, 24)}px Inter, system-ui`;
  storyCtx.fillText("#BerjumpaDiKertas", cx, cy + markH * 1.05, markW * 1.8);
  storyCtx.restore();
}

function storyRoundRect(x, y, w, h, r) {
  storyCtx.beginPath();
  storyCtx.roundRect(x, y, w, h, r);
  storyCtx.fill();
}

function loopX(x, w, pad) {
  return ((x + pad) % (w + pad * 2)) - pad;
}

function blendColor(a, b, amount) {
  const first = hexToRgb(a);
  const second = hexToRgb(b);
  const mix = clamp(amount, 0, 1);
  const r = Math.round(first.r + (second.r - first.r) * mix);
  const g = Math.round(first.g + (second.g - first.g) * mix);
  const blue = Math.round(first.b + (second.b - first.b) * mix);
  return `rgb(${r}, ${g}, ${blue})`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function drawSky() {
  const level = currentLevel();
  const theme = level.theme;
  const map = assets.images[level.background] || assets.images.background;
  if (map.complete && map.naturalWidth) {
    ctx.drawImage(map, 0, 0, width, height);
    if (usesFullBackgroundArt(level)) return;
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = theme.sky[0];
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
  } else {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, theme.sky[0]);
    gradient.addColorStop(0.46, theme.sky[1]);
    gradient.addColorStop(1, theme.sky[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  for (const cloud of game.clouds) {
    ctx.globalAlpha = cloud.alpha;
    ctx.fillStyle = "#ffffff";
    pill(cloud.x, cloud.y, cloud.size, cloud.size * 0.34, cloud.size * 0.18);
    circle(cloud.x + cloud.size * 0.22, cloud.y - cloud.size * 0.08, cloud.size * 0.2);
    circle(cloud.x + cloud.size * 0.46, cloud.y, cloud.size * 0.16);
    ctx.globalAlpha = 1;
  }
}

function usesFullBackgroundArt(level) {
  return assets.paths[level.background]?.includes("rumahkeren.png");
}

function drawRiver() {
  const theme = currentLevel().theme;
  const riverTop = height * 0.45;
  const riverGradient = ctx.createLinearGradient(0, riverTop, 0, height);
  riverGradient.addColorStop(0, theme.river[0]);
  riverGradient.addColorStop(1, theme.river[1]);
  ctx.fillStyle = riverGradient;
  ctx.beginPath();
  ctx.moveTo(0, riverTop);
  ctx.bezierCurveTo(width * 0.24, riverTop + 40, width * 0.6, riverTop - 30, width, riverTop + 28);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 9; i += 1) {
    const y = riverTop + 32 + i * 36 + Math.sin(performance.now() * 0.001 + i) * 8;
    ctx.beginPath();
    ctx.moveTo(-40, y);
    ctx.bezierCurveTo(width * 0.25, y - 18, width * 0.55, y + 18, width + 40, y - 5);
    ctx.stroke();
  }
}

function drawVillage() {
  const theme = currentLevel().theme;
  const level = currentLevel();
  const groundY = bridgeY() + 48;
  ctx.fillStyle = theme.ground;
  ctx.fillRect(0, groundY, width, height - groundY);
  ctx.fillStyle = theme.bank;
  ctx.fillRect(0, groundY, bridgeLeft() - 28, 22);
  ctx.fillRect(bridgeRight() + 28, groundY, width - bridgeRight(), 22);

  drawLandHouses(groundY, theme);
}

function drawHouse(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y + 24, 70, 46);
  ctx.fillStyle = "#9c4f36";
  ctx.beginPath();
  ctx.moveTo(x - 8, y + 28);
  ctx.lineTo(x + 35, y);
  ctx.lineTo(x + 78, y + 28);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.fillRect(x + 12, y + 38, 14, 14);
  ctx.fillRect(x + 44, y + 38, 14, 14);
}

function drawHouseAsset(key, x, y, w, h, fallbackColor) {
  const image = assets.images[key];
  if (image?.complete && image.naturalWidth) {
    ctx.drawImage(image, x, y, w, h);
    return;
  }
  drawHouse(x + w * 0.12, y + h * 0.22, fallbackColor);
}

function drawLandHouses(groundY, theme) {
  const leftLimit = bridgeLeft() - 44;
  const rightStart = bridgeRight() + 44;
  const baseline = groundY + 4;
  const leftHouses = [
    { key: "houseYellow", x: 34, w: 180, h: 99, color: theme.houses[0] },
    { key: "houseBlueStilt", x: 178, w: 138, h: 101, color: theme.houses[1] },
    { key: "houseRed", x: 314, w: 106, h: 85, color: theme.houses[2] }
  ];
  const rightHouses = [
    { key: "houseYellow", offset: 34, w: 180, h: 93, color: theme.houses[0] },
    { key: "houseRed", offset: 176, w: 120, h: 90, color: theme.houses[2] },
    { key: "houseTeal", offset: 316, w: 132, h: 101, color: theme.houses[1] },
    { key: "houseBlueStilt", offset: 474, w: 112, h: 96, color: theme.houses[1] }
  ];

  for (const house of leftHouses) {
    if (house.x + house.w <= leftLimit) {
      drawHouseAsset(house.key, house.x, baseline - house.h, house.w, house.h, house.color);
    }
  }

  for (const house of rightHouses) {
    const x = rightStart + house.offset;
    if (x + house.w <= width - 16) {
      drawHouseAsset(house.key, x, baseline - house.h, house.w, house.h, house.color);
    }
  }
}

function drawBridge() {
  const left = bridgeLeft();
  const right = bridgeRight();
  const y = bridgeY();
  const level = currentLevel();
  const progress = game.progress / 100;
  const builtRight = left + bridgeWidth() * progress;
  const levelTint = level.theme.bridge;
  const projectImage = getProjectImage(level.project);
  const projectBox = getProjectBox(level.project, left, y);

  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(62, 39, 25, 0.24)";
  ctx.lineWidth = 24;
  ctx.beginPath();
  ctx.moveTo(left - 18, y + 28);
  ctx.lineTo(right + 18, y + 28);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.52)";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.quadraticCurveTo(width * 0.5, y - 28, right, y);
  ctx.stroke();

  if (projectImage?.complete && projectImage.naturalWidth) {
    ctx.save();
    ctx.beginPath();
    if (isBuildingProject(level.project)) {
      const builtHeight = projectBox.h * progress;
      ctx.rect(projectBox.x, projectBox.y + projectBox.h - builtHeight, projectBox.w, builtHeight);
    } else {
      ctx.rect(projectBox.x, projectBox.y, projectBox.w * progress, projectBox.h);
    }
    ctx.clip();
    ctx.globalAlpha = game.integrity > 40 ? 1 : 0.78;
    ctx.drawImage(projectImage, projectBox.x, projectBox.y, projectBox.w, projectBox.h);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  ctx.strokeStyle = "rgba(232,77,91,0.8)";
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 7]);
  ctx.beginPath();
  ctx.moveTo(builtRight, y - 42);
  ctx.lineTo(builtRight, y + 44);
  ctx.stroke();
  ctx.setLineDash([]);

  if (!projectImage?.complete || !projectImage.naturalWidth) {
    ctx.strokeStyle = game.integrity > 40 ? levelTint : "#7d3d37";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.quadraticCurveTo(width * 0.5, y - 28, builtRight, y - Math.sin(progress * Math.PI) * 28);
    ctx.stroke();

    ctx.strokeStyle = "#58351f";
    ctx.lineWidth = 5;
    for (let x = left + 18; x < builtRight; x += 34) {
      ctx.beginPath();
      ctx.moveTo(x, y - 12);
      ctx.lineTo(x, y + 16);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(16,32,45,0.72)";
  pill(width * 0.5 - 72, y - 86, 144, 34, 17);
  ctx.fillStyle = "#fff";
  ctx.font = "900 15px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${level.projectLabel} ${Math.round(game.progress)}%`, width * 0.5, y - 69, 132);
}

function isBuildingProject(project) {
  return project === "house" || project === "school" || project === "clinic";
}

function getProjectImage(project) {
  const projectImages = {
    bridge: assets.images.bridge,
    house: assets.images.projectHouse,
    road: assets.images.projectRoad,
    drainage: assets.images.projectDrainage,
    school: assets.images.projectSchool,
    clinic: assets.images.projectClinic
  };
  return projectImages[project] || assets.images.bridge;
}

function getProjectBox(project, left, y) {
  const base = {
    bridge: { x: left - 58, y: y - 82, w: bridgeWidth() + 116, h: 132 },
    house: { x: left - 56, y: y - 156, w: bridgeWidth() + 112, h: 190 },
    road: { x: left - 68, y: y - 74, w: bridgeWidth() + 136, h: 120 },
    drainage: { x: left - 66, y: y - 78, w: bridgeWidth() + 132, h: 124 },
    school: { x: left - 56, y: y - 118, w: bridgeWidth() + 112, h: 190 },
    clinic: { x: left - 56, y: y - 118, w: bridgeWidth() + 112, h: 142 }
  };
  return base[project] || base.bridge;
}

function drawVillagers() {
  for (const person of game.villagers) {
    const jump = person.cheering ? Math.abs(Math.sin(person.bob * 1.4)) * 16 : 0;
    const bob = Math.sin(person.bob) * 2 - jump;
    if (person.cheering) {
      if (drawVillagerImage(person, 0.62, bob)) {
        ctx.strokeStyle = "#10202d";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(person.x - 5, person.y - 30);
        ctx.lineTo(person.x - 17, person.y - 44 - bob);
        ctx.moveTo(person.x + 5, person.y - 30);
        ctx.lineTo(person.x + 17, person.y - 44 + bob);
        ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(16,32,45,0.14)";
        pill(person.x - 13, person.y + 8, 26, 8, 4);
        ctx.strokeStyle = "#10202d";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(person.x - 5, person.y - 6);
        ctx.lineTo(person.x - 16, person.y - 20 - bob);
        ctx.moveTo(person.x + 5, person.y - 6);
        ctx.lineTo(person.x + 16, person.y - 20 + bob);
        ctx.stroke();
        ctx.fillStyle = "#10202d";
        circle(person.x, person.y - 17 + bob, 6);
        ctx.fillStyle = "#f5b642";
        pill(person.x - 6, person.y - 12 + bob, 12, 19, 7);
      }
      continue;
    }

    if (person.lead) {
      ctx.fillStyle = "rgba(16,32,45,0.68)";
      pill(person.x - 48, person.y - 58, 96, 25, 13);
      ctx.fillStyle = "#fff";
      ctx.font = "800 12px Inter, system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(game.celebration.active ? "Warga lewat" : "Menunggu aman", person.x, person.y - 45, 90);
    }
    if (drawVillagerImage(person, 0.58, bob)) {
      if (person.speed > 0) {
        ctx.strokeStyle = "rgba(16,32,45,0.75)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(person.x - 11, person.y - 1 + bob);
        ctx.lineTo(person.x - 18, person.y + 7 - bob);
        ctx.moveTo(person.x + 11, person.y - 1 - bob);
        ctx.lineTo(person.x + 18, person.y + 7 + bob);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = "#10202d";
      circle(person.x, person.y - 17 + bob, 6);
      ctx.fillStyle = "#18a999";
      pill(person.x - 6, person.y - 12 + bob, 12, 19, 7);
    }
  }

  if (game.celebration.active) {
    const alpha = Math.min(1, game.celebration.timer * 1.8);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(16,32,45,0.74)";
    pill(width / 2 - 92, bridgeY() - 136, 184, 44, 22);
    ctx.fillStyle = "#fff";
    ctx.font = "950 22px Inter, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HORE!", width / 2, bridgeY() - 114);
    ctx.globalAlpha = 1;
  }

  drawThanksBubbles();
}

function drawWorkers() {
  if (!game.workers.length || game.progress >= 100) return;
  const image = assets.images.workerNpc;
  for (const worker of game.workers) {
    const bob = Math.sin(worker.bob) * 2;
    const swing = Math.sin(worker.bob * 1.6) * 0.55;
    ctx.save();
    ctx.translate(worker.x, worker.y + bob);
    if (image?.complete && image.naturalWidth) {
      ctx.drawImage(image, -75, -62, 150, 68);
    } else {
      ctx.fillStyle = "#10202d";
      circle(0, -42, 7);
      ctx.fillStyle = "#f5b642";
      pill(-9, -34, 18, 28, 8);
    }
    ctx.rotate(swing);
    ctx.strokeStyle = "#8b5a36";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(12, -30);
    ctx.lineTo(28, -48);
    ctx.stroke();
    ctx.fillStyle = "#26384a";
    pill(24, -53, 17, 8, 3);
    ctx.restore();
  }
}

function renderLevelSelect() {
  ui.levelGrid.innerHTML = levels.map((level, index) => {
    const unlocked = index <= unlockedLevel;
    const icon = assets.paths[projectIcons[level.project]] || assets.paths.bridge;
    return `<button class="level-card" type="button" data-level="${index}" ${unlocked ? "" : "disabled"}>
      <i style="background-image:url('${icon}')"></i>
      <strong>${level.projectLabel}</strong>
      <span>${unlocked ? `Level ${index + 1}` : "Terkunci"}</span>
    </button>`;
  }).join("");

  ui.levelGrid.querySelectorAll("[data-level]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.level);
      if (index <= unlockedLevel) startStoryLevel(index);
    });
  });
}

function drawThanksBubbles() {
  for (const bubble of game.thanks) {
    const alpha = clamp(bubble.life / 2.2, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(16,32,45,0.76)";
    pill(bubble.x - 48, bubble.y - 16, 96, 28, 14);
    ctx.fillStyle = "#fff";
    ctx.font = "850 12px Inter, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(bubble.text, bubble.x, bubble.y - 2, 88);
    ctx.globalAlpha = 1;
  }
}

function drawVillagerImage(person, scale, bob) {
  const image = getVillagerImage(person);
  if (!image?.complete || !image.naturalWidth) return false;
  const drawWidth = 130 * scale;
  const drawHeight = 150 * scale;
  ctx.drawImage(
    image,
    person.x - drawWidth * 0.5,
    person.y - drawHeight + 13 + bob,
    drawWidth,
    drawHeight
  );
  return true;
}

function getVillagerImage(person) {
  if (person.role === "schoolChild") return assets.images.schoolChild;
  if (person.role === "healthWorker") return assets.images.healthWorker;
  if (person.role === "marketCitizen") return assets.images.marketCitizen;
  return person.variant === 1 ? assets.images.villagerFemale : assets.images.villagerMale;
}

function drawVillagerSprite(image, person, frame, scale, bob) {
  const drawWidth = 96 * scale;
  const drawHeight = 112 * scale;
  const sourceY = (person.variant || 0) * 112;
  ctx.drawImage(
    image,
    frame * 96,
    sourceY,
    96,
    112,
    person.x - drawWidth * 0.5,
    person.y - drawHeight + 13 + bob,
    drawWidth,
    drawHeight
  );
}

function drawItems() {
  for (const item of game.items) {
    const config = itemConfig(item.type);
    const image = assets.images[item.assetKey || config.image];
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.spin * 0.15);
    if (image?.complete && image.naturalWidth) {
      const drawSize = item.size * 2.08;
      ctx.drawImage(image, -drawSize * 0.5, -drawSize * 0.5, drawSize, drawSize);
    } else {
      ctx.fillStyle = "rgba(16,32,45,0.16)";
      circle(3, 5, item.size * 0.56);
      ctx.fillStyle = config.color;
      drawItemIcon(config.icon, item.size);
    }
    ctx.restore();
  }
}

function drawItemIcon(icon, size) {
  if (icon === "coin" || icon === "bag") {
    circle(0, 0, size * 0.5);
    ctx.fillStyle = "#fff";
    pill(-size * 0.22, -size * 0.22, size * 0.44, size * 0.5, 5);
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    pill(-size * 0.34, -size * 0.05, size * 0.68, size * 0.16, 3);
    return;
  }

  if (icon === "envelope") {
    pill(-size * 0.55, -size * 0.38, size * 1.1, size * 0.76, 6);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-size * 0.48, -size * 0.26);
    ctx.lineTo(0, 3);
    ctx.lineTo(size * 0.48, -size * 0.26);
    ctx.stroke();
    return;
  }

  if (icon === "crack") {
    pill(-size * 0.52, -size * 0.32, size * 1.04, size * 0.64, 6);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(1, -2);
    ctx.lineTo(-4, 3);
    ctx.lineTo(8, 11);
    ctx.stroke();
    return;
  }

  pill(-size * 0.58, -size * 0.25, size * 1.16, size * 0.5, 6);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  pill(-size * 0.4, -size * 0.09, size * 0.8, size * 0.18, 3);
}

function drawPlayer() {
  const p = game.player;
  const moving = input.left || input.right;
  const wheelBob = moving ? Math.sin(performance.now() / 90) * 2 : 0;
  const cabinBob = moving ? Math.sin(performance.now() / 130) * 1.4 : 0;
  const heroAsset = shopCatalog.characters.find((item) => item.id === equippedCharacterSkin)?.asset || "mcBuilder";
  const hero = assets.images[heroAsset] || assets.images.mcBuilder;
  const car = shopCatalog.vehicles.find((item) => item.id === equippedVehicleSkin) || shopCatalog.vehicles[0];
  if (game.dashTimer > 0) {
    ctx.globalAlpha = game.dashTimer / 0.18;
    ctx.fillStyle = "rgba(142,232,214,0.42)";
    pill(p.x - game.lastDirection * 112 - 38, p.y - 24, 110, 38, 19);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = "rgba(16,32,45,0.16)";
  pill(p.x - 58, p.y + 17, 116, 16, 8);

  ctx.fillStyle = "#241638";
  pill(p.x - p.width * 0.5, p.y - p.height * 0.5, p.width, p.height, 9);
  const carGradient = ctx.createLinearGradient(p.x - 36, p.y - 28, p.x + 36, p.y);
  carGradient.addColorStop(0, car.colors[0]);
  carGradient.addColorStop(1, car.colors[1]);
  ctx.fillStyle = carGradient;
  pill(p.x - 34, p.y - 26 + cabinBob, 68, 27, 8);
  ctx.fillStyle = "#fff";
  ctx.font = "900 12px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ANTI SUAP", p.x, p.y - 12 + cabinBob);

  if (hero?.complete && hero.naturalWidth) {
    ctx.drawImage(hero, p.x - 25, p.y - 83 + cabinBob, 50, 62);
  } else {
    ctx.fillStyle = "#f4c28b";
    circle(p.x, p.y - 58 + cabinBob, 8);
    ctx.fillStyle = "#18a999";
    pill(p.x - 9, p.y - 50 + cabinBob, 18, 25, 8);
  }

  ctx.fillStyle = "#f5b642";
  circle(p.x - 34, p.y + 15 + wheelBob, 9);
  circle(p.x + 34, p.y + 15 - wheelBob, 9);

  if (moving) {
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p.x - 18, p.y + 15 + wheelBob);
    ctx.lineTo(p.x - 50, p.y + 15 - wheelBob);
    ctx.moveTo(p.x + 18, p.y + 15 - wheelBob);
    ctx.lineTo(p.x + 50, p.y + 15 + wheelBob);
    ctx.stroke();
  }
}

function drawParticles() {
  const spark = assets.images.vfx;
  for (const particle of game.particles) {
    ctx.globalAlpha = Math.max(0, particle.life * 1.8);
    if (particle.spark && spark.complete && spark.naturalWidth) {
      const size = particle.radius * 7;
      ctx.drawImage(spark, particle.x - size * 0.5, particle.y - size * 0.5, size, size);
    } else {
      ctx.fillStyle = particle.color;
      circle(particle.x, particle.y, particle.radius);
    }
    ctx.globalAlpha = 1;
  }
}

function drawMessage() {
  if (scene !== "playing" || game.messageTimer <= 0) return;
  const alpha = Math.min(1, game.messageTimer);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(16, 32, 45, 0.74)";
  pill(width / 2 - 220, height * 0.22, 440, 42, 21);
  ctx.fillStyle = "#fff";
  ctx.font = "800 15px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(game.message, width / 2, height * 0.22 + 21, 400);
  ctx.globalAlpha = 1;
}

function updateHud() {
  const level = currentLevel();
  const material = itemConfig("material");
  const fund = itemConfig("fund");
  ui.score.textContent = Math.max(0, Math.round(game.score));
  ui.level.textContent = isEndlessMode() ? `E${game.levelIndex - levels.length + 1}` : `${game.levelIndex + 1}/${levels.length}`;
  ui.mode.textContent = isEndlessMode() ? "Endless" : "Cerita";
  ui.budget.textContent = Math.max(0, Math.round(game.budget));
  ui.time.textContent = Math.ceil(game.timeLeft);
  ui.integrity.textContent = `${Math.round(game.integrity)}%`;
  ui.combo.textContent = game.combo > 0 ? `x${Math.min(6, 1 + Math.floor(game.combo / 4))}` : "x1";
  ui.rank.textContent = rankForScore(game.score).rank;
  ui.coin.textContent = coins;
  ui.missionText.textContent = level.name;
  ui.levelGoal.textContent = level.goal;
  ui.materialHintText.lastChild.nodeValue = `${material.label}: progres naik`;
  ui.fundHintText.lastChild.nodeValue = `${fund.label}: progres naik`;
  ui.materialHintIcon.style.backgroundImage = `url("${assets.paths[material.image]}")`;
  ui.fundHintIcon.style.backgroundImage = `url("${assets.paths[fund.image]}")`;
  const compactHint = scene === "playing" && game.hintTimer <= 0 && !game.celebration.active && !ui.missionPanel.classList.contains("is-collapsed") && !missionHintPinnedOpen;
  ui.missionPanel.classList.toggle("level-hint-hidden", compactHint);
  ui.strengthFill.style.transform = `scaleX(${game.progress / 100})`;
  ui.strengthFill.style.filter = game.integrity < 35 ? "saturate(1.8)" : "none";
  ui.startHighScore.textContent = highScore;
  renderLeaderboard(ui.startLeaderboard);
}

function circle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function pill(x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function playerY() {
  return Math.min(height - 92, bridgeY() + 158);
}

function bridgeY() {
  return Math.max(288, height * 0.52);
}

function bridgeWidth() {
  return Math.min(560, width * 0.62);
}

function bridgeLeft() {
  return width * 0.5 - bridgeWidth() * 0.5;
}

function bridgeRight() {
  return width * 0.5 + bridgeWidth() * 0.5;
}

function gameLoop(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;
  update(dt);
  draw();
  requestAnimationFrame(gameLoop);
}

buttons.start.addEventListener("click", () => {
  startIntro();
});
buttons.endless.addEventListener("click", () => startGame("endless"));
buttons.shop.addEventListener("click", openShop);
buttons.closeShop.addEventListener("click", () => setScene("start"));
buttons.achievement.addEventListener("click", openAchievements);
buttons.closeAchievement.addEventListener("click", () => setScene("start"));
buttons.itemGuide.addEventListener("click", openItemGuide);
buttons.closeItemGuide.addEventListener("click", () => setScene("start"));
buttons.settings.addEventListener("click", () => {
  audio.click();
  settingsReturnScene = "start";
  setScene("paused");
});
buttons.closeLevelSelect.addEventListener("click", () => {
  audio.click();
  setScene("start");
});
buttons.cinematicStart.addEventListener("click", advanceIntro);
buttons.skipCinematic.addEventListener("click", skipIntro);
buttons.storyStart.addEventListener("click", () => startGame("level"));
buttons.dialogContinue.addEventListener("click", advanceDialog);
buttons.dialogSkip.addEventListener("click", skipDialog);
buttons.closeStory.addEventListener("click", () => {
  audio.click();
  setScene("start");
});
buttons.pause.addEventListener("click", pauseGame);
buttons.music.addEventListener("click", toggleMusic);
buttons.resume.addEventListener("click", resumeGame);
buttons.restart.addEventListener("click", () => startGame(selectedMode));
buttons.retryLevel.addEventListener("click", retryFailedLevel);
buttons.restartPause.addEventListener("click", restartCurrentLevel);
buttons.homePause.addEventListener("click", goHomeFromPause);
buttons.clearData.addEventListener("click", requestClearSavedData);
buttons.musicVolume.addEventListener("input", updateVolumeSettings);
buttons.sfxVolume.addEventListener("input", updateVolumeSettings);
buttons.confirmYes.addEventListener("click", () => closeConfirm(true));
buttons.confirmNo.addEventListener("click", () => closeConfirm(false));
buttons.backToStart.addEventListener("click", () => {
  audio.click();
  setScene("start");
});
buttons.how.addEventListener("click", () => {
  audio.click();
  setScene("how");
});
buttons.closeHow.addEventListener("click", () => {
  audio.click();
  setScene("start");
});
buttons.dash.addEventListener("click", dashPlayer);
ui.missionToggle.addEventListener("click", () => {
  if (ui.missionPanel.classList.contains("level-hint-hidden")) {
    missionHintPinnedOpen = true;
    ui.missionPanel.classList.remove("level-hint-hidden", "is-collapsed");
    ui.missionToggle.setAttribute("aria-expanded", "true");
    ui.missionToggle.setAttribute("aria-label", "Tutup panel item");
    audio.click();
    return;
  }
  const collapsed = ui.missionPanel.classList.toggle("is-collapsed");
  missionHintPinnedOpen = !collapsed;
  ui.missionToggle.setAttribute("aria-expanded", String(!collapsed));
  ui.missionToggle.setAttribute("aria-label", collapsed ? "Buka panel item" : "Tutup panel item");
  audio.click();
});

document.querySelectorAll("[data-action]").forEach((button) => {
  const action = button.dataset.action;
  button.addEventListener("pointerdown", () => { input[action] = true; });
  button.addEventListener("pointerup", () => { input[action] = false; });
  button.addEventListener("pointercancel", () => { input[action] = false; });
  button.addEventListener("pointerleave", () => { input[action] = false; });
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft" || event.code === "KeyA") input.left = true;
  if (event.code === "ArrowRight" || event.code === "KeyD") input.right = true;
  if (event.code === "Space") {
    event.preventDefault();
    dashPlayer();
  }
  if (event.code === "Escape") {
    if (scene === "playing") pauseGame();
    else if (scene === "paused") resumeGame();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" || event.code === "KeyA") input.left = false;
  if (event.code === "ArrowRight" || event.code === "KeyD") input.right = false;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
buttons.musicVolume.value = String(musicVolume);
buttons.sfxVolume.value = String(sfxVolume);
updateHud();
updateMusicButton();
setScene("start");
requestAnimationFrame(gameLoop);
