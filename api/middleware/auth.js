function requireApiKey(req, res, next) {
  const key = req.headers['eulalia-api-key'];

  if(!key || key != process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized >:(' });
  }

  next();
}

// this is genuinely just for fun + understanding concepts !

module.exports = requireApiKey;