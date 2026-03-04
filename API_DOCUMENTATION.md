# CraftLens AI - API Documentation

## Base URL
```
http://localhost:5000/api    (Development)
https://api.craftlens.ai     (Production)
```

## Authentication

All protected endpoints require a `Bearer` token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "businessName": "John's Embroidery",
  "businessCategory": "embroidery"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}

Error (400):
{
  "message": "User already exists"
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}

Error (400):
{
  "message": "Invalid credentials"
}
```

### Get User Profile
```
GET /auth/profile
Authorization: Bearer <TOKEN>

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "businessName": "John's Embroidery",
  "businessCategory": "embroidery",
  "subscription": "free",
  "totalProducts": 5,
  "isActive": true,
  "createdAt": "2026-03-01T10:00:00.000Z"
}

Error (404):
{
  "message": "User not found"
}
```

### Update User Profile
```
PUT /auth/profile
Authorization: Bearer <TOKEN>
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "businessName": "John's Premium Embroidery",
  "businessCategory": "embroidery"
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "businessName": "John's Premium Embroidery",
  ...
}
```

---

## Product Endpoints

### Upload Product
```
POST /products/upload
Authorization: Bearer <TOKEN>
Content-Type: multipart/form-data

Form Data:
{
  "image": <FILE>,
  "name": "Hand-stitched Floral Embroidery",
  "description": "Beautiful floral design on cotton",
  "cost": "150",
  "hourSpent": "3",
  "category": "embroidery"
}

Response (200):
{
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "name": "Hand-stitched Floral Embroidery",
    "imageUrl": "/uploads/1677000000000.jpg",
    "finalPrice": 899,
    "suggestedPrice": 899,
    "marketMinPrice": 650,
    "marketMaxPrice": 1200,
    "marketMedianPrice": 899,
    "confidenceScore": 84,
    "status": "active",
    "createdAt": "2026-03-03T10:30:00.000Z"
  },
  "similarProducts": [
    {
      "_id": "...",
      "name": "Floral Embroidery Patch",
      "price": 899,
      "similarity": 0.92
    },
    ...
  ],
  "pricing": {
    "minPrice": 650,
    "maxPrice": 1200,
    "suggestedPrice": 899,
    "confidenceScore": 84
  }
}

Error (400):
{
  "message": "Image is required"
}
```

### Get User's Products
```
GET /products
Authorization: Bearer <TOKEN>

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Hand-stitched Floral Embroidery",
    "finalPrice": 899,
    "suggestedPrice": 899,
    "confidenceScore": 84,
    "status": "active",
    "createdAt": "2026-03-03T10:30:00.000Z"
  },
  ...
]
```

### Get Product Details
```
GET /products/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "name": "Hand-stitched Floral Embroidery",
  "imageUrl": "/uploads/1677000000000.jpg",
  "cost": 150,
  "hourSpent": 3,
  "finalPrice": 899,
  "suggestedPrice": 899,
  "marketMinPrice": 650,
  "marketMaxPrice": 1200,
  "marketMedianPrice": 899,
  "confidenceScore": 84,
  "views": 0,
  "sales": 0,
  "status": "active",
  "createdAt": "2026-03-03T10:30:00.000Z"
}

Error (404):
{
  "message": "Product not found"
}
```

### Update Product Price
```
PUT /products/:id/price
Authorization: Bearer <TOKEN>
Content-Type: application/json

Body:
{
  "finalPrice": 950
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "finalPrice": 950,
  "lastModified": "2026-03-03T11:00:00.000Z",
  ...
}
```

### Delete Product
```
DELETE /products/:id
Authorization: Bearer <TOKEN>

Response (200):
{
  "message": "Product deleted"
}

Error (404):
{
  "message": "Product not found"
}
```

---

## Pricing & Analytics Endpoints

### Calculate Profit
```
GET /pricing/profit/:productId
Authorization: Bearer <TOKEN>

Response (200):
{
  "costPrice": 150,
  "sellingPrice": 899,
  "profit": 749,
  "profitMargin": 499,
  "profitPerHour": 250,
  "breakEven": 150,
  "roiPercentage": 499,
  "hourSpent": 3
}
```

### Get Price Fairness
```
GET /pricing/fairness/:productId
Authorization: Bearer <TOKEN>

Response (200):
{
  "status": "fair",
  "yourPrice": 899,
  "marketMedian": 899,
  "marketMin": 650,
  "marketMax": 1200,
  "percentageFromMedian": 0,
  "confidenceScore": 84
}

Status Values:
- "fair" (within ±25% of median)
- "underpriced" (more than 25% below median)
- "overpriced" (more than 25% above median)
```

### Get Price Analytics
```
GET /pricing/analytics
Authorization: Bearer <TOKEN>

Response (200):
{
  "totalProducts": 5,
  "averagePrice": 899,
  "totalProfit": 3745,
  "averageProfitMargin": 450,
  "priceRange": {
    "min": 650,
    "max": 1200
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided" | "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **Free Tier**: 5 uploads per month
- **Pro Tier**: Unlimited uploads
- **API Calls**: 100 requests per minute per user

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Internal Server Error |

---

## Webhook Events (Future)

When these events occur, we'll send POST requests to configured webhook URLs:

- `product.created` - New product uploaded
- `product.sold` - Product marked as sold
- `price.updated` - Product price changed
- `subscription.upgraded` - User upgraded plan

---

## Usage Examples

### JavaScript/Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Upload product
const formData = new FormData();
formData.append('image', imageFile);
formData.append('name', 'My Product');
formData.append('cost', 100);

const response = await api.post('/products/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "businessName": "My Business"
  }'

# Upload product
curl -X POST http://localhost:5000/api/products/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@product.jpg" \
  -F "name=My Product" \
  -F "cost=100"
```

---

## Pagination (Future)

```
GET /products?page=1&limit=10
GET /products?sort=-createdAt&limit=20
```

---

## Filtering (Future)

```
GET /products?category=embroidery&minPrice=500&maxPrice=2000
GET /products?status=active&views=gt:50
```

---

Last Updated: March 3, 2026
