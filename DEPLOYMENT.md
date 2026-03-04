# CraftLens AI - Deployment Guide

## Deployment Options

### Option 1: Local Development Setup
**Best for:** Development, testing, learning

See [README.md](README.md) for local setup instructions.

---

### Option 2: Docker Compose (Local)
**Best for:** Testing production-like environment locally

Prerequisites:
- Docker Desktop installed
- Docker Compose installed

Steps:
```bash
# From project root
docker-compose up -d

# Backend will be at: http://localhost:5000
# Frontend will be at: http://localhost:3000
# MongoDB will be at: localhost:27017

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

### Option 3: AWS Deployment
**Best for:** Production with high availability

#### Prerequisites
- AWS Account
- AWS CLI installed

#### Services Used
- **EC2:** Application servers
- **RDS:** MongoDB or MySQL database
- **S3:** Image storage
- **CloudFront:** CDN
- **ALB:** Load balancer
- **Route53:** DNS

#### Deployment Steps

##### 1. Set Up RDS Database
```bash
# Create MongoDB Atlas cluster (easier than RDS)
# Or set up MongoDB on EC2

# Connection string:
mongodb+srv://username:password@cluster.mongodb.net/craftlens-ai
```

##### 2. Create EC2 Instances
```bash
# Backend instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t3.medium
- Security group: Allow 5000, 22
- Key pair: Save safely

# Frontend instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t3.small
- Security group: Allow 80, 443, 22
- Key pair: Save safely
```

##### 3. Deploy Backend
```bash
# SSH into backend instance
ssh -i your-key.pem ubuntu@backend-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone repository
git clone <repo-url>
cd CraftLens\ AI/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add your production configuration

# Install PM2 (for process management)
sudo npm install -g pm2

# Start application
pm2 start src/index.js --name "craftlens-backend"
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt install -y nginx

# Edit Nginx config
sudo nano /etc/nginx/sites-available/default

# Add:
upstream backend {
  server localhost:5000;
}

server {
  listen 80 default_server;
  server_name _;

  location / {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

# Enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

##### 4. Deploy Frontend
```bash
# SSH into frontend instance
ssh -i your-key.pem ubuntu@frontend-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone repository
git clone <repo-url>
cd CraftLens\ AI/frontend

# Install dependencies
npm install

# Build
npm run build

# Install serve
sudo npm install -g serve

# Start
serve -s build -l 3000 > /dev/null &

# Setup Nginx
sudo apt install -y nginx

# Edit config
sudo nano /etc/nginx/sites-available/default

# Add:
server {
  listen 80 default_server;
  server_name _;
  root /home/ubuntu/CraftLens\ AI/frontend/build;

  location / {
    try_files $uri /index.html;
  }
}

sudo systemctl start nginx
sudo systemctl enable nginx
```

##### 5. Setup SSL (HTTPS)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

##### 6. Setup S3 for Images
```bash
# Create S3 bucket
aws s3 mb s3://craftlens-images-prod

# Configure bucket policy (public read)
# Update backend .env:
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=craftlens-images-prod
AWS_REGION=us-east-1
```

##### 7. Setup CloudFront
```bash
# In AWS Console:
# Create CloudFront distribution
# Origin: S3 bucket
# Cache: 30 days
# Distribution domain: d123.cloudfront.net
```

##### 8. Setup Route53 DNS
```bash
# Point domain to:
# Backend: backend.craftlens.ai → ALB IP
# Frontend: www.craftlens.ai → CloudFront
# API: api.craftlens.ai → ALB IP
```

---

### Option 4: Heroku Deployment
**Best for:** Quick deployment, free tier available

#### Backend Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create craftlens-api

# Add MongoDB Atlas
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Frontend Deployment
```bash
# Create React app
heroku create craftlens-app

# Create Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

---

### Option 5: DigitalOcean Deployment
**Best for:** Affordable, reliable VPS

#### Steps
```bash
# Create Droplet (Ubuntu 22.04, 2GB RAM)
# SSH in

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone repo
git clone <repo-url>

# Deploy with Docker Compose
docker-compose up -d

# Setup Nginx as reverse proxy
sudo apt install -y nginx
```

---

### Option 6: Railway Deployment
**Best for:** Modern, git-based deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Link to GitHub
railway up

# Set environment variables in Railway dashboard
```

---

## Database Deployment

### MongoDB Atlas (Recommended)
```bash
# Create account at mongodb.com/cloud/atlas

# Create cluster
# Get connection string:
mongodb+srv://user:pass@cluster.mongodb.net/craftlens-ai

# Add to .env:
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/craftlens-ai

# Seed data
node backend/scripts/generate_market_data.py
mongosh < seed_market_data.js
```

### PostgreSQL Alternative
```bash
# Install
sudo apt install -y postgresql postgresql-contrib

# Create database
sudo -u postgres createdb craftlens_ai

# Update backend to use PostgreSQL
npm install pg sequelize
```

---

## Monitoring & Logging

### Setup Error Tracking (Sentry)
```bash
# Install Sentry
npm install @sentry/node

# In backend/src/index.js:
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your_sentry_dsn"
});
```

### Setup Monitoring
- **CloudWatch:** AWS native monitoring
- **DataDog:** APM and monitoring
- **New Relic:** Performance monitoring
- **Prometheus:** Open-source monitoring

### Setup Logging
```bash
# Winston for logging
npm install winston

# Logs to file + console
```

---

## Continuous Integration/Deployment

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to AWS
        run: |
          # Deployment script
```

---

## Scaling Strategy

### Horizontal Scaling
- Load balancer (AWS ALB)
- Multiple backend servers
- Multiple frontend servers
- Database replication

### Vertical Scaling
- Larger EC2 instances
- More RAM
- Better CPU

### Caching
- Redis for session management
- CloudFront for static assets
- Database query caching

---

## Backup & Recovery

```bash
# MongoDB Backup
mongodump --uri="mongodb+srv://..." --out=./backup

# MongoDB Restore
mongorestore ./backup

# Automated backups (daily)
0 2 * * * mongodump --uri="..." --out=/backups/$(date +\%Y\%m\%d)
```

---

## Security Checklist

- [ ] HTTPS enabled (SSL cert)
- [ ] Environment variables secured
- [ ] Database credentials encrypted
- [ ] API keys rotated
- [ ] Security groups configured
- [ ] Firewall rules set
- [ ] Regular security patches
- [ ] Monitoring alerts enabled
- [ ] Backup verified
- [ ] Incident response plan

---

## Cost Estimation (Monthly)

| Service | Cost |
|---------|------|
| AWS EC2 (2 instances) | $30-50 |
| MongoDB Atlas | $50-100 |
| S3 Storage | $5-10 |
| CloudFront | $10-20 |
| Data Transfer | $5-15 |
| **Total** | **$100-195** |

---

## Rollback Procedure

```bash
# Keep previous versions tagged
git tag -l

# Rollback to previous version
git checkout v1.0.0
npm install
npm run build
git push origin main

# Restart services
pm2 restart all
```

---

## Performance Optimization

1. **Database Indexing**
```javascript
db.products.createIndex({ "userId": 1, "createdAt": -1 })
db.products.createIndex({ "embedding": "2dsphere" })
```

2. **Caching**
```javascript
// Redis cache for embeddings
const cache = new Redis();
const embedding = await cache.get(productId);
```

3. **CDN**
```javascript
// Serve images through CloudFront
const imageUrl = `https://d123.cloudfront.net/${filename}`;
```

---

**Last Updated:** March 3, 2026
