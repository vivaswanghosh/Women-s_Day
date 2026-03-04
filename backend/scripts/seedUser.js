const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load env from backend root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../src/models/User');

const DUMMY_USER = {
    name: 'Demo Seller',
    email: 'demo@craftlens.ai',
    password: 'Demo@1234',
    businessName: 'CraftLens Demo Shop',
    businessCategory: 'embroidery',
    role: 'seller',
};

async function seedUser() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/craftlens-ai';
        console.log(`\n🔗 Connecting to MongoDB: ${mongoUri}`);

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully!\n');

        // Check if user already exists
        const existing = await User.findOne({ email: DUMMY_USER.email });
        if (existing) {
            console.log('ℹ️  Dummy user already exists:');
            console.log(`   Email:    ${DUMMY_USER.email}`);
            console.log(`   Password: ${DUMMY_USER.password}`);
            console.log(`   Name:     ${existing.name}`);
            console.log(`   ID:       ${existing._id}\n`);
            await mongoose.disconnect();
            process.exit(0);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(DUMMY_USER.password, salt);

        // Create the user
        const user = new User({
            name: DUMMY_USER.name,
            email: DUMMY_USER.email,
            password: hashedPassword,
            businessName: DUMMY_USER.businessName,
            businessCategory: DUMMY_USER.businessCategory,
            role: DUMMY_USER.role,
        });

        await user.save();

        console.log('🎉 Dummy user created successfully!\n');
        console.log('   ┌──────────────────────────────────────┐');
        console.log('   │        DUMMY USER CREDENTIALS        │');
        console.log('   ├──────────────────────────────────────┤');
        console.log(`   │  Email:    ${DUMMY_USER.email}    │`);
        console.log(`   │  Password: ${DUMMY_USER.password}             │`);
        console.log(`   │  Name:     ${DUMMY_USER.name}            │`);
        console.log(`   │  Role:     ${DUMMY_USER.role}                │`);
        console.log('   └──────────────────────────────────────┘\n');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
}

seedUser();
