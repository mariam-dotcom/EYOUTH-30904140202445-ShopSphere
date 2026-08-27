
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { itemId, stars, displayName } = req.body || {};

  console.log(
    `[notify-review] Would send email: "${displayName}" rated item ${itemId} with ${stars} stars.`
  );

  return res.status(200).json({ notified: true, itemId, stars });
};