export interface Reply {
  id: string;
  userId: string;
  userName: string;
  userLogo?: string;
  text: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userLogo?: string;
  text: string;
  replies: Reply[];
  likes: number;
  likedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}
