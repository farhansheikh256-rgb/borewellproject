require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./src/middleware/errorHandler');
const enquiryRoutes = require('./src/routes/enquiryRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully');
    try {
      const Service = require('./src/models/Service');
      const count = await Service.countDocuments();
      if (count === 0) {
        console.log('🌱 Database is empty. Seeding services from services.json...');
        const fs = require('fs');
        const servicesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'services.json'), 'utf8'));

        // Remove individual 'id' fields to let MongoDB generate its own '_id'
        const formattedServices = servicesData.map(s => {
          const { id, ...rest } = s;
          return rest;
        });

        await Service.insertMany(formattedServices);
        console.log('🌱 Services seeded successfully!');
      } else {
        console.log(`ℹ️ Services collection already has ${count} records.`);
      }
    } catch (seedErr) {
      console.error('❌ Error seeding database:', seedErr);
    }
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Borewell Service API is running' });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Borewell API Server running on http://localhost:${PORT}`);
});
