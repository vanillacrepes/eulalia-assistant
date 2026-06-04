const BASE_URL = process.env.EULALIA_API_URL
const headers = {
  'Content-Type': 'application/json',
  'eulalia-api-key': process.env.EULALIA_API_KEY
};

async function getWater(userId) {
  const res = await fetch(`${BASE_URL}/api/water/${userId}`, {headers: headers});
  return res.json();
}

async function logDrink(userId) {
  const res = await fetch(`${BASE_URL}/api/water/${userId}/drank`, {headers: headers, method: 'POST'});
  return res.json();
}

async function toggleActive(userId) {
  const res = await fetch(`${BASE_URL}/api/water/${userId}/active`, {headers: headers, method: 'PATCH'});
  return res.json();
}

module.exports = { getWater, logDrink, toggleActive };