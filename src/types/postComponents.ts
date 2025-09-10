import type { Post } from "./post";

export interface PostCardProps {
  post: Post;
  userName?: string;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export interface PostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (post: Omit<Post, "id"> | Post) => void;
  editingPost?: Post | null;
}
