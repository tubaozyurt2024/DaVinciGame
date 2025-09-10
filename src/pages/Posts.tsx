import { useState, useCallback } from "react";
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, Stack, Box, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getPosts, createPost, updatePost, deletePost } from "../services/postService";
import { getUsers } from "../services/userService";
import type { Post } from "../types/post";
import type { User } from "../types/user";
import PostCard from "../components/PostCard";
import GenericForm from "../components/GenericForm";

export default function Posts() {
  const { data: posts, loading, error, setData: setPosts } = useFetch<Post[]>(getPosts);
  const { data: users } = useFetch<User[]>(getUsers);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const postsPerPage = 10;

  const handleAdd = () => {
    setEditingPost(null);
    setOpen(true);
  };

  const handleSave = async (data: Omit<Post, "id"> | Post) => {
    if ("id" in data) {
      // update
      const updated = await updatePost(data.id, data);
      setPosts((prev) => prev?.map((p) => (p.id === updated.id ? updated : p)) || null);
    } else {
      // create
      const created = await createPost(data);
      setPosts((prev) => (prev ? [...prev, created] : [created]));
    }
    setOpen(false);
  };

  const handleDelete = useCallback(
    async (id: number) => {
      await deletePost(id);
      setPosts((prev) => prev?.filter((p) => p.id !== id) || null);
    },
    [setPosts]
  );

  if (loading) return <Typography>Loading posts...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!posts) return <Typography>No posts available.</Typography>;

  const findUserName = (userId: number) => users?.find((u) => u.id === userId)?.name;

  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button variant="contained" onClick={handleAdd}>
          Add Post
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="outlined" onClick={() => navigate("/users")}>
            Users
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        {currentPosts.map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <PostCard
              post={post}
              userName={findUserName(post.userId)}
              onEdit={(p) => {
                setEditingPost(p);
                setOpen(true);
              }}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={totalPages} page={page} onChange={( _,p) => setPage(p)} />
      </Box>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingPost ? "Edit Post" : "Add Post"}</DialogTitle>
        <DialogContent>
          <GenericForm
            initialData={
              editingPost || {
                title: "",
                body: "",
                userId: 1,
              }
            }
            fields={[
              { name: "title", label: "Title", required: true },
              { name: "body", label: "Body" },
            ]}
            onSave={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
