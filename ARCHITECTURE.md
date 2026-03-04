# CraftLens AI - Architecture & System Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                  (React Single Page App)                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │ (HTTPS/REST)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Pages: Home, Login, Register, Dashboard, Products, Analytics│
│  │ Components: Navbar, Forms, Cards, Charts                 │  │
│  │ State: AuthContext, Local State                          │  │
│  │ Styling: Tailwind CSS, React Icons                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ (REST API Calls)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js + Express)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Routes:                                                   │  │
│  │  ├─ /api/auth (Login, Register, Profile)                │  │
│  │  ├─ /api/products (CRUD, Upload)                        │  │
│  │  └─ /api/pricing (Analytics, Fairness, Profit)         │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ Controllers:                                             │  │
│  │  ├─ AuthController (Login/Register logic)               │  │
│  │  ├─ ProductController (Image upload, embedding)         │  │
│  │  └─ PricingController (Smart pricing, analytics)        │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ Utilities:                                               │  │
│  │  ├─ Cosine Similarity (Vector comparison)               │  │
│  │  ├─ Price Calculator (Outlier removal, median)          │  │
│  │  └─ JWT Auth Middleware                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ (JSON Queries/Responses)
              ┌────────────┼────────────┐
              ▼            ▼            ▼
     ┌─────────────┐ ┌──────────┐ ┌─────────┐
     │  MongoDB    │ │   File   │ │ External│
     │  Database   │ │  Storage │ │   APIs  │
     │  Collections│ │ (Uploads)│ │(Etsy...)│
     └─────────────┘ └──────────┘ └─────────┘
```

## Data Flow - Product Upload & Pricing

```
User Upload
    │
    ▼
Browser (React)
    │ (FormData: image + product details)
    ▼
POST /api/products/upload
    │
    ▼
Backend (Express)
    │
    ├─ Save image to disk
    │
    ├─ Generate embedding (512-dim vector)
    │   (Placeholder, real: CNN model)
    │
    ├─ Query MongoDB for similar products
    │   (Using cosine similarity)
    │
    ├─ Retrieve top 20 similar items
    │
    ├─ Calculate smart price
    │   ├─ Remove outliers (bottom 10%, top 10%)
    │   ├─ Calculate min, max, median
    │   ├─ Weighted average based on similarity
    │   └─ Determine confidence score
    │
    ├─ Save to MongoDB
    │   (product document with all metrics)
    │
    └─ Return JSON response
        {
          product: { ... },
          pricing: { minPrice, maxPrice, suggestedPrice, confidenceScore },
          similarProducts: [ ... ]
        }
    │
    ▼
Browser (React)
    │ (Display pricing results)
    ▼
Show to User
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (seller|admin),
  businessName: String,
  businessCategory: String,
  subscription: String (free|pro),
  subscriptionEndDate: Date,
  totalProducts: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  imageUrl: String,
  embeddingVector: [Number] (512 dimensions),
  cost: Number,
  hourSpent: Number,
  suggestedPrice: Number,
  finalPrice: Number,
  marketMinPrice: Number,
  marketMaxPrice: Number,
  marketMedianPrice: Number,
  confidenceScore: Number,
  category: String,
  status: String (draft|active|sold),
  views: Number,
  sales: Number,
  priceHistory: [{
    price: Number,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### MarketDataset Collection
```javascript
{
  _id: ObjectId,
  name: String,
  imageUrl: String,
  embedding: [Number],
  price: Number,
  category: String,
  source: String (etsy|meesho|amazon|other),
  popularity: Number,
  color: String,
  material: String,
  views: Number,
  sales: Number,
  rating: Number,
  reviews: Number,
  createdAt: Date
}
```

## Technology Choices

### Frontend
- **React 18**: Latest hooks, concurrent features, better performance
- **Tailwind CSS**: Utility-first, rapid UI development, no CSS conflicts
- **React Router v6**: Latest version with improved API
- **Axios**: Promise-based HTTP client, interceptors for auth
- **React Icons**: Lightweight, modular icon library

### Backend
- **Express.js**: Lightweight, flexible, perfect for REST APIs
- **MongoDB**: Flexible schema, great for startups, good for embeddings
- **JWT**: Stateless authentication, scalable
- **Multer**: Simple file upload handling
- **bcryptjs**: Password hashing, security

### Scalability Considerations
- **Microservices Ready**: AI processing can be separated into FastAPI service
- **Vector Database**: MongoDB Atlas Vector Search for production
- **Caching**: Redis for embedding caching, popular searches
- **CDN**: CloudFront/CloudFlare for image delivery
- **Load Balancing**: AWS ALB for horizontal scaling

## Security Measures

1. **Authentication**: JWT with expiration
2. **Input Validation**: Express-validator on backend
3. **Password Security**: Bcrypt hashing with salt rounds
4. **CORS**: Restricted origins in production
5. **File Upload**: Type validation, size limits
6. **Environment Variables**: Sensitive data not in code
7. **API Rate Limiting**: Prevent brute force attacks
8. **HTTPS Only**: In production

## Performance Optimizations

1. **Lazy Loading**: React Router code splitting
2. **Image Optimization**: Compress uploads, CDN delivery
3. **Embedding Caching**: Cache popular product embeddings
4. **Database Indexing**: Index on userId, category, price range
5. **Pagination**: Load products in batches
6. **Horizontal Scaling**: Stateless backend servers

## Deployment Architecture

### Development
- Local MongoDB
- npm run dev for both frontend and backend

### Staging
- AWS EC2 for servers
- MongoDB Atlas for database
- S3 for image storage
- CloudFront for CDN

### Production
- Containerized with Docker
- Kubernetes orchestration
- Load balancer (AWS ALB)
- Auto-scaling groups
- RDS MySQL or MongoDB Atlas
- S3 + CloudFront for images
- CloudWatch for monitoring
- Sentry for error tracking

## File Management

- **Image Location**: `/uploads` directory on backend
- **Production**: AWS S3 bucket with CloudFront CDN
- **Cleanup**: Delete old product images after 30 days
- **Compression**: Optimize images on upload

## Error Handling

- **Try-Catch Blocks**: All async operations wrapped
- **Global Error Handler**: Express middleware for 404, 500 errors
- **User-Friendly Messages**: Frontend displays meaningful errors
- **Logging**: Console logs in development, file logs in production
- **Monitoring**: Integrated with Sentry/DataDog

---

## Future Enhancements

1. **Real AI Integration**: Replace mock embeddings with real CNN models
2. **Vector Similarity**: Use dedicated vector DB (Pinecone, Weaviate)
3. **Real-time Analytics**: WebSockets for live updates
4. **Marketplace**: Buy/sell functionality with payments
5. **Social Features**: Creator profiles, followers, messaging
6. **Mobile App**: React Native version
7. **AI Description Generator**: Auto-generate product descriptions
8. **Trend Prediction**: LSTM/Prophet for sales forecasting
