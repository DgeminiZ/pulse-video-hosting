import { randomUUID } from 'node:crypto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import type { LikeValue } from './dto/like-video.dto';

@Injectable()
export class VideosService {
  private videos: Video[] = [];

  create(dto: CreateVideoDto): Video {
    const video = new Video({
      id: randomUUID(),
      title: dto.title,
      description: dto.description,
      category: dto.category,
      views: 0,
      likes: 0,
      dislikes: 0,
      status: 'published',
      createdAt: new Date(),
    });
    this.videos.push(video);
    return video;
  }

  findAll(): Video[] {
    return this.videos;
  }

  findOne(id: string): Video {
    const video = this.videos.find((item) => item.id === id);
    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
    video.views += 1;
    return video;
  }

  exists(id: string): boolean {
    const video = this.videos.some((item) => item.id === id);
    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
    return true;
  }

  update(id: string, dto: UpdateVideoDto): Video {
    const video = this.videos.find((item) => item.id === id);
    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
    Object.assign(video, dto);
    return video;
  }

  remove(id: string): { id: string } {
    const index = this.videos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }
    this.videos.splice(index, 1);
    return { id };
  }

  react(id: string, type: LikeValue): Video {
    const video = this.videos.find((item) => item.id === id);
    if (!video) {
      throw new NotFoundException(`Video with id "${id}" not found`);
    }

    if (type === 'like') {
      if (video.likes > 0) {
        video.likes -= 1;
      } else {
        video.likes += 1;
        if (video.dislikes > 0) {
          video.dislikes -= 1;
        }
      }
    } else if (type === 'dislike') {
      if (video.dislikes > 0) {
        video.dislikes -= 1;
      } else {
        video.dislikes += 1;
        if (video.likes > 0) {
          video.likes -= 1;
        }
      }
    } else {
      throw new BadRequestException(`Unknown reaction type "${type}"`);
    }

    return video;
  }
}
