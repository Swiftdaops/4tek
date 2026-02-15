require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  const uri = process.env.MONGO_URI;
  console.log('Testing MONGO_URI ->', uri ? '(present)' : '(missing)');
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected OK');
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error('Connect failed:', e && e.message ? e.message : e);
    process.exit(1);
  }
}

test();
