import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { LikeVideoDto } from './dto/like-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() dto: CreateVideoDto): Video {
    return this.videosService.create(dto);
  }

  @Get()
  findAll(): Video[] {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Video {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoDto): Video {
    return this.videosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { id: string } {
    return this.videosService.remove(id);
  }

  @Post(':id/reaction')
  react(@Param('id') id: string, @Body() dto: LikeVideoDto): Video {
    return this.videosService.react(id, dto.type);
  }
}
