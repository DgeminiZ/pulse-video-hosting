import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('videos/:videoId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('videoId') videoId: string,
    @Body() dto: CreateCommentDto,
  ): Comment {
    return this.commentsService.create(videoId, dto);
  }

  @Get()
  findByVideo(@Param('videoId') videoId: string): Comment[] {
    return this.commentsService.findByVideo(videoId);
  }
}
