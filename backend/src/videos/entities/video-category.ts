export const VIDEO_CATEGORIES = [
  'Design',
  'Technology',
  'Travel',
  'Music',
  'Education',
  'Gaming',
  'Other',
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
