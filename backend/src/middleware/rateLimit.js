// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW = 3600000; // 1 hour in ms

export function rateLimit(req, res, next) {
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(clientIp);

  if (rateLimitData) {
    if (now < rateLimitData.resetTime) {
      if (rateLimitData.count >= RATE_LIMIT) {
        console.warn(`Rate limit exceeded for IP: ${clientIp}`);
        return res.status(429).json({ 
          error: 'Too many registration attempts. Please try again later.' 
        });
      }
      rateLimitData.count++;
    } else {
      rateLimitData.count = 1;
      rateLimitData.resetTime = now + RATE_WINDOW;
    }
  } else {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_WINDOW });
  }

  next();
}

// Cleanup old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now >= data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_WINDOW);

