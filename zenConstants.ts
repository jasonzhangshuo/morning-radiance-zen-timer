// 首页「静心之道」阶段（正念静坐等）
export interface MeditationPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  color: string;
  accent: string;
}

export const MEDITATION_PHASES: MeditationPhase[] = [
  {
    id: 'meditation',
    title: '正念静坐',
    subtitle: 'Phase 01 — Solitude',
    description: '在晨雾缭绕的森林深处，找回失落的自我。每一次呼吸都是与大地的对话，每一刻静谧都是对灵魂的洗礼。',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
    color: 'bg-zen-blue',
    accent: 'zen-blue',
  },
  {
    id: 'group',
    title: '小组交流',
    subtitle: 'Phase 02 — Connection',
    description: '智慧在共鸣中生长。围坐于温暖的炉火旁，与同行者分享生命的感悟。',
    imageUrl: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=1920&q=80',
    color: 'bg-zen-green',
    accent: 'zen-green',
  },
  {
    id: 'class',
    title: '班级交流',
    subtitle: 'Phase 03 — Enlightenment',
    description: '汇聚众人的光芒，点亮认知的荒原。在导师的指引下，深入探讨修行的真谛。',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80',
    color: 'bg-zen-orange',
    accent: 'zen-orange',
  },
];

export const SANCTUARY_CONTENT = [
  {
    title: '深呼吸',
    quote: '“吸纳空气的清冽，感受每一次呼吸在胸腔内缓缓流淌……”',
    duration: '10:00',
  },
];

// 正念静坐 10 分钟音频（本地 public/zen-mindfulness-10min.mp3）
// 若本地文件加载失败，会使用下方备用 URL
export const ZEN_AUDIO_URL = '/zen-mindfulness-10min.mp3';
export const ZEN_AUDIO_FALLBACK_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3';

