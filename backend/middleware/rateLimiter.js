import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit('my-limit-key');
    /*'my-limit-key' is now for all the users but it should be for each user
     when we have an authentication and it will be on the userId*/

    if (!success) {
      return res.status(429).json({
        message: 'Too many requests, please try again later',
      });
    }
    next();
  } catch (error) {
    console.log('Rate limit error', error);
    next(error);
  }
};

export default rateLimiter;
