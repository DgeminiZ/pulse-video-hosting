import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { VIDEO_CATEGORIES, type VideoCategory } from '../entities/video-category';
import { VIDEO_STATUSES, type VideoStatus } from '../entities/video-status';

export class UpdateVideoDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsEnum(VIDEO_CATEGORIES)
  category?: VideoCategory;

  @IsOptional()
  @IsEnum(VIDEO_STATUSES)
  status?: VideoStatus;
}
