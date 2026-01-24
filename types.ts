
export enum TimerMode {
  MAIN = 'MAIN',
  SUPPLEMENTARY = 'SUPPLEMENTARY'
}

export interface Background {
  url: string;
  name: string;
  location: string;
}

export const MODES = {
  [TimerMode.MAIN]: {
    label: '主分享',
    seconds: 300,
  },
  [TimerMode.SUPPLEMENTARY]: {
    label: '补充分享',
    seconds: 180,
  }
};

export const BACKGROUNDS: Background[] = [
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000',
    name: 'Valley Mist',
    location: '谷地'
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000',
    name: 'Distant Peaks',
    location: '远山'
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000',
    name: 'Emerald Forest',
    location: '雨林'
  },
  {
    url: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=2000',
    name: 'Mountain Retreat',
    location: '山居'
  }
];

// Zen quotes for random display
export const ZEN_QUOTES: string[] = [
  '观照 · 呼吸',
  '静心 · 当下',
  '行住坐卧 · 皆是修行',
  '一念觉 · 一念迷',
  '心若止水 · 万物自明',
  '放下执念 · 自在随缘',
  '念起即觉 · 觉即不随',
  '万法归一 · 一归何处',
  '空即是色 · 色即是空',
  '不思善恶 · 本来面目',
  '心如明镜 · 照见本性',
  '无住生心 · 应无所住',
  '活在当下 · 此刻即是',
  '觉知呼吸 · 回归本心',
  '静观己心 · 了悟自性'
];
