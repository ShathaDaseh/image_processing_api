## API Endpoints

### Health Check
- **Endpoint:** `/`
- **Method:** GET
- **Response:**
  ```json
  { "message": "Image Processing API is running" }

### Image Processing
- **Endpoint:** `/api/images`
- **Method:** GET
- **Query Parameters:**
  - `filename` (required): The name of the image file (without extension, assumes .jpg)
  - `width` (required): The desired width in pixels (positive integer)
  - `height` (required): The desired height in pixels (positive integer)
- **Example URL:** `http://localhost:3000/api/images?filename=img1&width=300&height=300`
- **Response:** Returns the resized image file (JPEG) with a 200 status code on success.
- **Error Responses:**
  - 400: Missing or invalid parameters (e.g., non-numeric width/height, negative values)
  - 404: Image file not found in images/full/
  - 500: Internal server error during processing
