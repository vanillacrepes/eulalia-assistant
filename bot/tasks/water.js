const { getWater, getActiveUsers } = require('../utils/water');

async function waterReminder(client, water_threshold) {
  const now = Date.now();

  const userIds = await getActiveUsers();

  for(const userId of userIds) {
    const data = await getWater(userId);

    const diff = now - data.last_drank;

    if(diff >= water_threshold * 1000) {
      const user = client.users.cache.get(userId);
      if (user) user.send('drink water twin');
    }
  }
}

module.exports = (client, water_threshold) => {
  setInterval(() => waterReminder(client, water_threshold), 1000)
};