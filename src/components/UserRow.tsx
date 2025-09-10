import type { UserRowProps } from "../types/userRow";
import { TableRow, TableCell, Stack, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function UserRow({ user, onEdit, onDelete }: UserRowProps) {
  return (
    <TableRow hover>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => onEdit(user)}>
            <Edit />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(user.id)}>
            <Delete />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
