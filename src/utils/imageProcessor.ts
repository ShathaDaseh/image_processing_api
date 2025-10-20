import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';

export const processImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const inputPath = path.join(process.cwd(), 'images', 'full', `${filename}.jpg`);
  const thumbDir = path.join(process.cwd(), 'images', 'thumb');

  if (!existsSync(inputPath)) {
    throw new Error(`Image ${filename}.jpg not found in images/full`);
  }

  try {
    await fs.mkdir(thumbDir, { recursive: true });
  } catch {
  }

  const outFilename = `${filename}_${width}x${height}.jpg`;
  const outPath = path.join(thumbDir, outFilename);

  if (existsSync(outPath)) {
    return outPath;
  }

  await sharp(inputPath).resize(width, height).toFile(outPath);

  return outPath;
};
