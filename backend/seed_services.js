require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./src/models/Service');

const services = [
  {"name": "Contract Work", "category": "Borewell", "price": "Contact for Quote", "popular": true, "description": "Complete borewell contract work"},
  {"name": "Borewell Drilling", "category": "Borewell", "price": "From ₹150/ft", "popular": true, "description": "High-speed precision borewell drilling"},
  {"name": "Pump Installation", "category": "Borewell", "price": "From ₹2000", "popular": false, "description": "Professional installation of water pumps"},
  {"name": "Pump Accessories", "category": "Borewell", "price": "Varies", "popular": false, "description": "High-quality accessories for your borewell"},

  {"name": "Texmo Pumps", "category": "New Motor & Pumps", "price": "MRP", "popular": true, "description": "Authorized Texmo pump dealer"},
  {"name": "CRI Pumps", "category": "New Motor & Pumps", "price": "MRP", "popular": true, "description": "Authorized CRI pump dealer"},
  {"name": "Kirloskar Pumps", "category": "New Motor & Pumps", "price": "MRP", "popular": false, "description": "Authorized Kirloskar pump dealer"},
  {"name": "Other Brands", "category": "New Motor & Pumps", "price": "MRP", "popular": false, "description": "Various other reliable pump brands"},

  {"name": "Pump Repair", "category": "Repairing & Maintenance", "price": "From ₹500", "popular": true, "description": "Expert repair services for all water pumps"},
  {"name": "Motor Repair", "category": "Repairing & Maintenance", "price": "From ₹800", "popular": true, "description": "Complete motor diagnosis and repair"},
  {"name": "Sleeve Fitting", "category": "Repairing & Maintenance", "price": "Contact for Quote", "popular": false, "description": "Precision sleeve fitting services"},
  {"name": "Bore Motor Repair", "category": "Repairing & Maintenance", "price": "From ₹1000", "popular": false, "description": "Specialized borewell motor repairing"},
  {"name": "Open Well Pump Repair", "category": "Repairing & Maintenance", "price": "From ₹600", "popular": false, "description": "Repairs for open well submersible pumps"},
  {"name": "Rewinding", "category": "Repairing & Maintenance", "price": "From ₹1500", "popular": false, "description": "Motor coil rewinding services"},

  {"name": "Dewatering Pumps", "category": "Dewatering", "price": "Contact for Quote", "popular": true, "description": "Heavy-duty dewatering pump services"},
  {"name": "Water Tanker Services", "category": "Dewatering", "price": "From ₹800/tank", "popular": true, "description": "Fast and reliable water tanker supply"},
  {"name": "Emergency Water Removal", "category": "Dewatering", "price": "Contact for Quote", "popular": false, "description": "24/7 emergency water removal and clearing"}
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Service.deleteMany({});
    console.log('Cleared existing services');
    await Service.insertMany(services);
    console.log('Inserted new hierarchical services');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });
