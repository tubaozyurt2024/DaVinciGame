import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import type { PostCardProps } from "../types/postComponents";

const PostCard = ({ post, userName, onEdit, onDelete }: PostCardProps) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>{post.title}</Typography>
      <Typography variant="body2" color="text.secondary">User: {userName || post.userId}</Typography>
      <Typography variant="body1">{post.body}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => onEdit(post)}>Edit</Button>
      <Button size="small" color="error" onClick={() => onDelete(post.id)}>Delete</Button>
    </CardActions>
  </Card>
);

export default PostCard;
