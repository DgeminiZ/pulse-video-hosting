import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { VIDEO_CATEGORIES, type VideoCategory } from '../entities/video-category';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(5000)
  description: string;

  @IsEnum(VIDEO_CATEGORIES)
  category: VideoCategory;
}
