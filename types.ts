
export interface MonumentImage {
  url: string;
  attribution: string;
  source: string;
  license?: string;
}

export interface OfficialRecord {
  label: string;
  value: string;
}

export interface InstitutionalLink {
  title: string;
  url: string;
  description?: string;
}

export interface Agent {
  name: string;
  role: string;
  contribution: string;
}

export interface Monument {
  id: string;
  name: string;
  slug: string;
  dynasty: string;
  era: string;
  location: string;
  coreStory: string;
  eraSignificance: string;
  experientialAppeal: string;
  promotionalAngle: string;
  emotionalHook: string;
  institutionalStats?: {
    protectionStatus: string;
    visitorFootfall: string;
    bestTimeToVisit: string;
    resourceId?: string;
  };
  officialRecords?: OfficialRecord[];
  institutionalLinks?: InstitutionalLink[];
  socialMedia: {
    caption: string;
    hashtags: string[];
    reelIdeas: string[];
    emojis: string;
  };
  imageUrl: string;
  archiveGallery: MonumentImage[];
  groundingSources?: { title: string; uri: string }[];
  mapsUri?: string;
  coordinates?: { lat: number; lng: number };
  mapPosition?: { x: number; y: number }; // Percentage from left/top (0-100)
  model3dUrl?: string;
}

export enum AppSection {
  INTRO = 'intro',
  HOME = 'home',
  EXPLORER = 'explorer',
  AI_SEARCH = 'ai_search',
  STORY = 'story'
}