import configData from '@/data/game.config.json';
import codesData from '@/data/codes.json';
import racesData from '@/data/races.json';
import elementsData from '@/data/elements.json';
import blessingsData from '@/data/blessings.json';
import weaponsData from '@/data/weapons.json';
import bossesData from '@/data/bosses.json';
import buildsData from '@/data/builds.json';
import updatesData from '@/data/updates.json';
import faqsData from '@/data/faqs.json';

// ─── Interfaces ───────────────────────────────────────────────

export interface GameConfig {
  game: {
    name: string;
    platform: string;
    developer: string;
    genre: string;
    robloxPlaceId: string;
    robloxUniverseId: string;
    maxLevel: number;
    currentUpdate: string;
    lastManualDataReview: string;
    officialDiscord: string;
    officialRobloxUrl: string;
  };
  stats: {
    playing: string;
    likeRatio: string;
    visits: string;
    favorites: string;
    lastChecked: string;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    baseUrl: string;
    primaryKeywords: string[];
    secondaryKeywords: string[];
    defaultOgImage?: string;
  };
}

export interface Code {
  code: string;
  reward: string;
  status: 'active' | 'expired' | 'limited' | 'unverified';
  source: string;
  addedDate: string;
  notes?: string;
}

export interface Race {
  id: string;
  slug: string;
  name: string;
  rarity: string;
  dropRate: string;
  tier: string;
  bestFor: string;
  effects: string[];
  notes: string;
}

export interface Element {
  id: string;
  slug: string;
  name: string;
  rarity: string;
  dropRate: string;
  tier: string;
  bestFor: string;
  effects: string[];
  notes: string;
}

export interface Blessing {
  id: string;
  slug: string;
  name: string;
  rarity: string;
  dropRate: string;
  tier: string;
  bestFor: string;
  effects: string[];
  notes: string;
}

export interface Weapon {
  id: string;
  slug: string;
  name: string;
  type: string;
  tier: string;
  bestFor: string;
  obtainMethod: string;
  recommendedRace: string;
  recommendedElement: string;
  recommendedBlessing: string;
  notes: string;
}

export interface Boss {
  id: string;
  slug: string;
  name: string;
  levelRequirement: string;
  drops: string[];
  tier: string;
  bestFor: string;
  strategy: string;
}

export interface Build {
  id: string;
  slug: string;
  name: string;
  tier: string;
  weapon: string;
  race: string;
  element: string;
  blessing: string;
  useCase: string;
  notes: string;
}

export interface Update {
  title: string;
  slug: string;
  date: string;
  summary: string;
  changes: string[];
  affectedPages: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// ─── Data Access ──────────────────────────────────────────────

const config: GameConfig = configData as GameConfig;
const codes: Code[] = (codesData as { codes: Code[] }).codes;
const races: Race[] = (racesData as { items: Race[] }).items;
const elements: Element[] = (elementsData as { items: Element[] }).items;
const blessings: Blessing[] = (blessingsData as { items: Blessing[] }).items;
const weapons: Weapon[] = (weaponsData as { items: Weapon[] }).items;
const bosses: Boss[] = (bossesData as { items: Boss[] }).items;
const builds: Build[] = (buildsData as { items: Build[] }).items;
const updates: Update[] = (updatesData as { items: Update[] }).items;
const faqs = faqsData as { global: FAQ[]; pages: Record<string, FAQ[]> };

export const getGameConfig = () => config;

export const getCodesLastChecked = () => (codesData as { lastChecked: string }).lastChecked;

export const getActiveCodes = () => codes.filter(c => c.status === 'active' || c.status === 'limited');

export const getExpiredCodes = () => codes.filter(c => c.status === 'expired');

export const getAllCodes = () => codes;

export const getRaces = () => races;

export const getRacesLastChecked = () => (racesData as { lastChecked: string }).lastChecked;

export const getRaceBySlug = (slug: string) => races.find(r => r.slug === slug);

export const getRacesByTier = (tier: string) => races.filter(r => r.tier === tier);

export const getElements = () => elements;

export const getElementsLastChecked = () => (elementsData as { lastChecked: string }).lastChecked;

export const getElementBySlug = (slug: string) => elements.find(e => e.slug === slug);

export const getElementsByTier = (tier: string) => elements.filter(e => e.tier === tier);

export const getBlessings = () => blessings;

export const getBlessingsLastChecked = () => (blessingsData as { lastChecked: string }).lastChecked;

export const getBlessingBySlug = (slug: string) => blessings.find(b => b.slug === slug);

export const getBlessingsByTier = (tier: string) => blessings.filter(b => b.tier === tier);

export const getWeapons = () => weapons;

export const getWeaponBySlug = (slug: string) => weapons.find(w => w.slug === slug);

export const getWeaponsByTier = (tier: string) => weapons.filter(w => w.tier === tier);

export const getWeaponsByType = (type: string) => weapons.filter(w => w.type === type);

export const getBosses = () => bosses;

export const getBossBySlug = (slug: string) => bosses.find(b => b.slug === slug);

export const getBuilds = () => builds;

export const getBuildBySlug = (slug: string) => builds.find(b => b.slug === slug);

export const getUpdates = () => updates;

export const getGlobalFAQs = () => faqs.global;

export const getPageFAQs = (page: string) => faqs.pages[page] || [];

// ─── Helpers ──────────────────────────────────────────────────

export function getCurrentDateString() {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toFixed(0);
}

// ─── Color Maps ───────────────────────────────────────────────

export const TIER_COLORS: Record<string, string> = {
  S: 'bg-red-500 text-white',
  A: 'bg-orange-500 text-white',
  B: 'bg-yellow-500 text-black',
  C: 'bg-green-500 text-white',
  D: 'bg-gray-400 text-white',
};

export const TIER_BORDER_COLORS: Record<string, string> = {
  S: 'border-red-500',
  A: 'border-orange-500',
  B: 'border-yellow-500',
  C: 'border-green-500',
  D: 'border-gray-400',
};

export const RARITY_COLORS: Record<string, string> = {
  Mythical: 'bg-purple-600 text-white',
  Legendary: 'bg-orange-500 text-white',
  Epic: 'bg-pink-500 text-white',
  Rare: 'bg-blue-500 text-white',
  Uncommon: 'bg-green-500 text-white',
  Common: 'bg-gray-400 text-white',
};

export const RARITY_BORDER_COLORS: Record<string, string> = {
  Mythical: 'border-purple-500',
  Legendary: 'border-orange-500',
  Epic: 'border-pink-500',
  Rare: 'border-blue-500',
  Uncommon: 'border-green-500',
  Common: 'border-gray-400',
};

export const TIER_ORDER = ['S', 'A', 'B', 'C', 'D'];
export const RARITY_ORDER = ['Mythical', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];

// ─── SEO Schema Generators ────────────────────────────────────

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = config.seo.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, baseUrl).href,
    })),
  };
}

export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateVideoGameSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: config.game.name,
    description: config.seo.siteDescription,
    genre: config.game.genre,
    url: config.game.officialRobloxUrl,
    operatingSystem: 'Roblox',
    author: {
      '@type': 'Organization',
      name: config.game.developer,
    },
    applicationCategory: 'Game',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateItemListSchema(items: { name: string; url: string; position: number }[]) {
  const baseUrl = config.seo.baseUrl;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: new URL(item.url, baseUrl).href,
    })),
  };
}
