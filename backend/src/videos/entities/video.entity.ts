import type { VideoCategory } from './video-category';
import type { VideoStatus } from './video-status';

export class Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  views: number;
  likes: number;
  dislikes: number;
  status: VideoStatus;
  createdAt: Date;

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}
