import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Image API Endpoint', () => {
    it('should return 200 and image file when given valid parameters', async () => {
        const response = await request.get('/api/images?filename=img1&width=300&height=300');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('image/jpeg');
    });

    it('should return 200 and image file for another valid set of parameters', async () => {
        const response = await request.get('/api/images?filename=img1&width=1000&height=1000');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('image/jpeg');
    });

    it('should return 400 and error JSON for missing filename', async () => {
        const response = await request.get('/api/images?width=300&height=300');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing filename parameter' });
    });

    it('should return 400 and error JSON for missing width', async () => {
        const response = await request.get('/api/images?filename=img1&height=300');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing width or height parameter' });
    });

    it('should return 400 and error JSON for missing height', async () => {
        const response = await request.get('/api/images?filename=img1&width=300');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing width or height parameter' });
    });

    it('should return 400 and error JSON for missing width and height', async () => {
        const response = await request.get('/api/images?filename=img1');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Missing width or height parameter' });
    });

    it('should return 400 and error JSON for non-numeric width', async () => {
        const response = await request.get('/api/images?filename=img1&width=abc&height=300');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Width and height must be numbers' });
    });

    it('should return 400 and error JSON for non-numeric height', async () => {
        const response = await request.get('/api/images?filename=img1&width=300&height=def');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Width and height must be numbers' });
    });

    it('should return 400 and error JSON for zero width', async () => {
        const response = await request.get('/api/images?filename=img1&width=0&height=300');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Width and height must be positive integers' });
    });

    it('should return 400 and error JSON for zero height', async () => {
        const response = await request.get('/api/images?filename=img1&width=300&height=0');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Width and height must be positive integers' });
    });

    it('should return 400 and error JSON for negative width', async () => {
        const response = await request.get('/api/images?filename=img1&width=-1&height=300');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Width and height must be positive integers' });
    });

    it('should return 400 and error JSON for negative height', async () => {
        const response = await request.get('/api/images?filename=img1&width=300&height=-1');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Width and height must be positive integers' });
    });

    it('should return 404 and error JSON for non-existent image', async () => {
        const response = await request.get('/api/images?filename=notfound&width=300&height=300');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Image notfound.jpg not found in images/full' });
    });
});
