import request from 'supertest';
import app from '../server';
import { processImage } from '../utils/imageProcessor';

describe('Images API', () => {
  it('should return 200 OK for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return JSON response', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-type']).toContain('application/json');
  });
});

describe('Image Processor', () => {
  it('should process image successfully with valid inputs', async () => {
    const result = await processImage('img1', 300, 300);
    expect(typeof result).toBe('string');
    expect(result).toContain('img1_300x300.jpg');
  });

  it('should throw error for non-existent image', async () => {
    try {
      await processImage('nonexistent', 300, 300);
      fail('Expected function to throw');
    } catch (error) {
      expect((error as Error).message).toBe('Image nonexistent.jpg not found in images/full');
    }
  });

  it('should throw error for invalid dimensions', async () => {
    try {
      await processImage('img1', -1, 300);
      fail('Expected function to throw');
    } catch (error) {
      expect((error as Error).message).toContain('Expected positive integer for width');
    }
  });

  it('should throw error for zero width', async () => {
    try {
      await processImage('img1', 0, 300);
      fail('Expected function to throw');
    } catch (error) {
      expect((error as Error).message).toContain('Expected positive integer for width');
    }
  });

  it('should process image with large dimensions', async () => {
    const result = await processImage('img1', 1000, 1000);
    expect(typeof result).toBe('string');
    expect(result).toContain('img1_1000x1000.jpg');
  });
});
