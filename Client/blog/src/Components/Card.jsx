import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Chip, Avatar, Box } from '@mui/material';
import { formatISO9075 } from "date-fns";
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#21CBF3',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function MediaCard({Title,Summary,Content,img,createdAt,updatedAt,Author,_id}) {
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={8}
        sx={{
          width: "380px",
          margin: "auto",
          marginTop: "30px",
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Card
          sx={{
            width: "380px",
            margin: "auto",
            marginTop: "0px",
            borderRadius: 3,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Link to={`/details/${_id}`}>
              <CardMedia
                component="img"
                height="220"
                image={img}
                alt={Title}
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Link>
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                px: 1,
                py: 0.5,
              }}
            >
              <Typography variant="caption" color="primary" fontWeight="bold">
                NEW
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ pb: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {Title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <Chip
                icon={<AccessTimeIcon />}
                label={formatISO9075(new Date(createdAt))}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              {Author && (
                <Chip
                  icon={<PersonIcon />}
                  label={Author.Name || 'Author'}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {Summary}
            </Typography>
          </CardContent>

          <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
            <Button
              component={Link}
              to={`/details/${_id}`}
              size="small"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateX(4px)',
                },
              }}
            >
              Read More
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </ThemeProvider>
  );
}
