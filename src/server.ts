import express, { Application } from 'express';
import imagesRouter from './routes/images';
import path from 'path';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use('/api/images', imagesRouter);

// health
app.get('/', (_req, res) => {
  res.send('Image Processing API is running');
});

// serve thumbnails statically if needed
app.use('/thumbs', express.static(path.join(process.cwd(), 'images', 'thumb')));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
