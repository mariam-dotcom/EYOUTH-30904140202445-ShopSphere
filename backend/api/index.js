const app = require('../src/app');
const { connectMongo } = require('../src/config/db');

let mongoConnected = false;

module.exports = async (req, res) => {
  if (!mongoConnected) {
    await connectMongo();
    mongoConnected = true;
  }
  return app(req, res);
};