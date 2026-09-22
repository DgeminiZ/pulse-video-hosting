import { IsEnum } from 'class-validator';

export const LIKE_VALUES = ['like', 'dislike'] as const;

export type LikeValue = (typeof LIKE_VALUES)[number];

export class LikeVideoDto {
  @IsEnum(LIKE_VALUES)
  type: LikeValue;
}
