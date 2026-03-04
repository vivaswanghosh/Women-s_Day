#!/usr/bin/env python3
"""
Mock AI Embedding Generator and Market Data Seeder
Generates realistic embeddings and market dataset for CraftLens AI
"""

import random
import json
from datetime import datetime, timedelta

def generate_random_embedding(dimension=512):
    """Generate random embedding vector"""
    return [random.uniform(-1, 1) for _ in range(dimension)]

def generate_market_data(count=100):
    """Generate mock market dataset"""
    
    categories = ["embroidery", "crochet", "jewelry", "diy"]
    colors = ["red", "blue", "green", "yellow", "purple", "pink", "black", "white", "multicolor"]
    materials = ["cotton", "silk", "wool", "polyester", "gold", "silver", "beads", "thread"]
    sources = ["etsy", "meesho", "amazon"]
    
    products = []
    
    for i in range(count):
        product = {
            "name": f"Handmade Product {i+1}",
            "imageUrl": f"https://example.com/images/{i+1}.jpg",
            "embedding": generate_random_embedding(),
            "price": random.randint(200, 5000),
            "category": random.choice(categories),
            "source": random.choice(sources),
            "popularity": random.randint(0, 100),
            "color": random.choice(colors),
            "material": random.choice(materials),
            "views": random.randint(10, 1000),
            "sales": random.randint(0, 100),
            "rating": round(random.uniform(3.0, 5.0), 1),
            "reviews": random.randint(0, 50),
            "trend": "rising" if random.random() > 0.5 else "stable"
        }
        products.append(product)
    
    return products

def generate_mongodb_insert_script(products):
    """Generate MongoDB insert script"""
    
    script = "db.marketdatasets.insertMany([\n"
    
    for product in products:
        doc = {
            "name": product["name"],
            "imageUrl": product["imageUrl"],
            "embedding": product["embedding"],
            "price": product["price"],
            "category": product["category"],
            "source": product["source"],
            "popularity": product["popularity"],
            "color": product["color"],
            "material": product["material"],
            "views": product["views"],
            "sales": product["sales"],
            "rating": product["rating"],
            "reviews": product["reviews"],
            "createdAt": datetime.now().isoformat()
        }
        script += json.dumps(doc) + ",\n"
    
    script = script.rstrip(",\n") + "\n]);"
    return script

if __name__ == "__main__":
    # Generate 100 mock products
    products = generate_market_data(100)
    
    # Save as JSON
    with open('mock_market_data.json', 'w') as f:
        json.dump(products, f, indent=2)
    
    print("✅ Generated mock_market_data.json")
    
    # Generate MongoDB script
    script = generate_mongodb_insert_script(products)
    
    with open('seed_market_data.js', 'w') as f:
        f.write(script)
    
    print("✅ Generated seed_market_data.js")
    print("\nTo seed MongoDB, run:")
    print("mongosh < seed_market_data.js")
