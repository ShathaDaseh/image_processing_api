/*
import { processImage } from '../src/utils/imageProcessor';
import fs from 'fs';
import path from 'path';

describe('processImage utility', () => {
    const filename = 'fjord';
    const width = 150;
    const height = 150;
    const thumbPath = path.join(process.cwd(), 'images', 'thumb', `${filename}_${width}x${height}.jpg`);

    beforeAll(() => {
        // ensure test image exists in images/full/fjord.jpg
        const sample = path.join(process.cwd(), 'images', 'full', `${filename}.jpg`);
        if (!fs.existsSync(sample)) {
            throw new Error('Please put a sample image at images/full/fjord.jpg before running tests');
        }
    });

    it('creates resized image and returns output path', async () => {
        const result = await processImage(filename, width, height);
        expect(typeof result).toBe('string');
        expect(result).toBe(thumbPath);
        expect(fs.existsSync(thumbPath)).toBeTrue();
    });
});
*/
