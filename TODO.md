# API Cleanup TODO

## Step 1: Update API/routes/posts.js
- [x] Change POST route from '/' to '/post'
- [x] Change GET routes: '/' to '/blogs', '/:id' to '/blogs/:id'
- [x] Change DELETE route from '/:id' to '/blogs/:id'
- [x] Change PUT route from '/:id' to '/edit/:id'
- [x] Change '/names/:author' to '/names/' and update to use req.query.Author
- [x] Change '/my/:authorId' to '/myBlogs/' and update to use req.query.Author

## Step 2: Update API/index.js
- [x] Remove all inline route code (signup, login, profile, logout, post, photo, blogs, etc.)
- [x] Add imports for route modules: const authRoutes = require('./routes/auth'); const postRoutes = require('./routes/posts'); const profileRoutes = require('./routes/profile');
- [x] Add app.use('/', authRoutes); app.use('/', postRoutes); app.use('/photo', profileRoutes);
- [x] Uncomment app.use(cookieParser());
- [x] Remove unused imports (User, Post, Photos, bcrypt, jwt, multer, fs)
- [x] Keep cloudinary config and other setup

## Step 3: Test and verify
- [x] Run the server and test endpoints (Server starts successfully, but requires .env setup for MongoDB URL)
