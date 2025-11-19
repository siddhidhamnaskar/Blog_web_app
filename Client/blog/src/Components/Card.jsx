import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Chip, Avatar, Box, IconButton } from '@mui/material';
import { formatISO9075 } from "date-fns";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { UserContext } from './Usercontext';
import { base_url, likePost, unlikePost } from '../Sevices/API';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077B5',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function MediaCard({Title,Summary,Content,img,createdAt,updatedAt,Author,_id, likes: initialLikes = []}) {
  const { userInfo } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes.length);
  const [authorImage, setAuthorImage] = useState('');

  useEffect(() => {
    if (Author?._id) {
      fetch(`${base_url}/photo/?Author=${Author._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.img) {
            setAuthorImage(data.img);
          }
        })
        .catch((err) => {
          console.log('Error fetching author image:', err);
        });
    }
    // Check if current user has liked this post
    if (userInfo?.id && initialLikes.includes(userInfo.id)) {
      setLiked(true);
    }
  }, [Author?._id, userInfo?.id, initialLikes]);

  const handleLike = async () => {
    const token=localStorage.getItem("token");
    if (!token) {
      alert('Please login to like posts');
      return;
    }
    try {
      if (liked) {
        await unlikePost(_id, token);
        setLiked(false);
        setLikes(likes - 1);
      } else {
        await likePost(_id,token);
        setLiked(true);
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "auto",
          marginTop: "20px",
          borderRadius: 2,
          
          border: '1px solid #e0e0e0',
        }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 2,
          }}
        >
          {/* Post Header */}
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={authorImage || Author?.img || userInfo?.image || ''}
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {Author?.Name || 'Author'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatISO9075(new Date(createdAt))} • Public
                </Typography>
              </Box>
              {/* <IconButton size="small">
                <MoreHorizIcon />
              </IconButton> */}
            </Box>

            {/* Post Title */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
                lineHeight: 1.3,
              }}
            >
              {Title}
            </Typography>

            {/* Post Summary */}
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              {Summary}
            </Typography>

            {/* Post Content Preview */}
            {Content && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                dangerouslySetInnerHTML={{
                  __html: Content.length > 200 ? Content.substring(0, 200) + '...' : Content
                }}
              />
            )}
          </CardContent>

          {/* Post Image */}
          {img && (
            <CardMedia
              component="img"
              height={{ xs: 200, sm: 250, md: 300 }}
              image={img}
              alt={Title}
              sx={{
                objectFit: 'cover',
              }}
            />
          )}

          {/* Post Actions */}
          <CardActions sx={{ pt: 1, px: 2, pb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="small"
                onClick={handleLike}
                sx={{ color: liked ? 'primary.main' : 'text.secondary' }}
              >
                <ThumbUpIcon />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {likes} Like{likes !== 1 ? 's' : ''}
              </Typography>
            </Box>
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" component={Link} to={`/details/${_id}`}>
                <CommentIcon />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Comment
              </Typography>
            </Box> */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Share
              </Typography>
            </Box> */}
          </CardActions>
        </Card>
      </Paper>
    </ThemeProvider>
  );
}
