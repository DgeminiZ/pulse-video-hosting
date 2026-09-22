export const VIDEO_STATUSES = ['published', 'hidden'] as const;

export type VideoStatus = (typeof VIDEO_STATUSES)[number];
