export interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author?: string;
  createdAt: string;
  tags?: string[];
  readTime?: number;
  views?: number;
  category?: string;
  likes: number;
  trending?: boolean;
  featured?: boolean;
  comments: Comment[];
}
