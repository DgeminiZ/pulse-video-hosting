import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { VideosService } from '../videos/videos.service';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  constructor(private readonly videosService: VideosService) {}

  create(videoId: string, dto: CreateCommentDto): Comment {
    this.videosService.exists(videoId);

    const comment = new Comment({
      id: randomUUID(),
      videoId,
      author: dto.author,
      text: dto.text,
      createdAt: new Date(),
    });
    this.comments.push(comment);
    return comment;
  }

  findByVideo(videoId: string): Comment[] {
    this.videosService.exists(videoId);
    return this.comments.filter((comment) => comment.videoId === videoId);
  }
}
