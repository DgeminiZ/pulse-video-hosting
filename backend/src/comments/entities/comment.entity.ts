export class Comment {
  id: string;
  videoId: string;
  author: string;
  text: string;
  createdAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
