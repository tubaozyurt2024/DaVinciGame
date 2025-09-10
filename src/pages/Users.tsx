import { useState, useCallback } from "react";
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, Stack, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import type { User } from "../types/user";
import GenericForm from "../components/GenericForm";

export default function Users() {
  const { data: users, loading, error, setData: setUsers } = useFetch<User[]>(getUsers);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    setEditingUser(null);
    setOpen(true);
  };

  const handleSave = async (data: Omit<User, "id"> | User) => {
    if ("id" in data) {
      const updated = await updateUser(data.id, data);
      setUsers((prev) => prev?.map((u) => (u.id === updated.id ? updated : u)) || null);
    } else {
      const created = await createUser(data);
      setUsers((prev) => (prev ? [...prev, created] : [created]));
    }
    setOpen(false);
  };

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteUser(id);
      setUsers((prev) => prev?.filter((u) => u.id !== id) || null);
    },
    [setUsers]
  );

  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!users) return <Typography>No users available.</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button variant="contained" onClick={handleAdd}>
          Add User
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="outlined" onClick={() => navigate("/posts")}>
            Posts
          </Button>
        </Stack>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setEditingUser(user);
                        setOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(user.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <GenericForm
            initialData={editingUser || { name: "", username: "", email: "" }}
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "username", label: "Username", required: true },
              { name: "email", label: "Email", type: "email" },
            ]}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
