export type Category = {
  id: string;
  name: string;
  color?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId?: string | null;
  updatedAt: number; // epoch ms
  createdAt: number; // epoch ms
  pinned?: boolean;
};
