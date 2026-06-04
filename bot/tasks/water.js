const { getWater, getActiveUsers } = require('../utils/water');

const water_threshold = 5; // in seconds

async function waterReminder(client) {
  const now = Date.now();

  const userIds = await getActiveUsers();

  for(const userId of userIds) {
    const data = await getWater(userId);

    const diff = now - data.last_drank;

    if(diff >= water_threshold * 1000) {
      const user = client.users.cache.get(userId);
      if (user) user.send('drink water twin');
      console.log(`dm'd ${user} + ${userId}`)
    }
  }
}

module.exports = (client) => {
  setInterval(() => waterReminder(client), 1000)
};