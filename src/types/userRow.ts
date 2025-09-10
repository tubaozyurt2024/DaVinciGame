import type { User } from "./user";

export interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}
