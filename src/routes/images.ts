import express, { Request, Response } from 'express';
import { processImage } from '../utils/imageProcessor.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const filename = String(req.query.filename || '');
  const widthRaw = req.query.width;
  const heightRaw = req.query.height;

  // validation
  if (!filename) {
    return res.status(400).json({ error: 'Missing filename parameter' });
  }
  if (!widthRaw || !heightRaw) {
    return res.status(400).json({ error: 'Missing width or height parameter' });
  }

  const width = Number(widthRaw);
  const height = Number(heightRaw);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    return res.status(400).json({ error: 'Width and height must be numbers' });
  }
  if (width <= 0 || height <= 0) {
    return res.status(400).json({ error: 'Width and height must be positive integers' });
  }

  try {
    const thumbPath = await processImage(filename, width, height);
    return res.sendFile(thumbPath);
  } catch (err) {
    const message = (err as Error).message || 'Unexpected error';
    if (message.includes('not found')) {
      return res.status(404).json({ error: message });
    }
    return res.status(500).json({ error: message });
  }
});

export default router;
