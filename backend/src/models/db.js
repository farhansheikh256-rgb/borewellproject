const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const defaultServices = [
  { id: '1', name: 'Borewell Drilling', description: 'Professional borewell drilling up to 1000 feet using advanced rotary rigs.', icon: 'drill', price: 'Starting at ₹8,000', category: 'drilling', popular: true },
  { id: '2', name: 'Submersible Pump Installation', description: 'Supply and installation of high-efficiency submersible pumps for all bore depths.', icon: 'pump', price: 'Starting at ₹4,500', category: 'pump', popular: true },
  { id: '3', name: 'Water Testing', description: 'Comprehensive water quality testing and analysis reports for potability.', icon: 'test', price: 'Starting at ₹1,200', category: 'testing', popular: false },
  { id: '4', name: 'Borewell Repair', description: 'Expert repair and rejuvenation of existing borewells to restore water yield.', icon: 'repair', price: 'Starting at ₹2,500', category: 'repair', popular: false },
  { id: '5', name: 'Motor Repair', description: 'On-site and workshop repair of submersible motors and panels.', icon: 'motor', price: 'Starting at ₹1,500', category: 'repair', popular: false },
  { id: '6', name: 'Casing & Lining', description: 'PVC and steel casing installation to prevent borewell collapse.', icon: 'casing', price: 'Starting at ₹3,000', category: 'drilling', popular: false },
];

function readJSON(file, defaultData) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch { return defaultData; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

const db = {
  getServices: () => readJSON(SERVICES_FILE, defaultServices),
  saveServices: (data) => writeJSON(SERVICES_FILE, data),
  getEnquiries: () => readJSON(ENQUIRIES_FILE, []),
  saveEnquiries: (data) => writeJSON(ENQUIRIES_FILE, data),
};

module.exports = db;
