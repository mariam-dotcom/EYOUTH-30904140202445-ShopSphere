const axios = require('axios');

const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL;

async function listForItem(itemId) {
  const { data } = await axios.get(`${REVIEW_SERVICE_URL}/reviews/${itemId}`);
  return data;
}

async function create(itemId, account, { stars, note }) {
  if (!stars) {
    const err = new Error('A star rating (1-5) is required.');
    err.status = 400;
    throw err;
  }
  const { data } = await axios.post(`${REVIEW_SERVICE_URL}/reviews/${itemId}`, {
    stars,
    note,
    accountId: account.id,
    displayName: account.displayName,
  });

  // Fire-and-forget background notification (Task 3.3) — temporary error logging to debug
  axios.post(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5000'}/api/notify-review`, {  
    itemId,  
    stars,  
    displayName: account.displayName,
  }).catch((err) => {
    console.error('[notify-review error]:', err.message);
  });

  return data;
}

module.exports = { listForItem, create };