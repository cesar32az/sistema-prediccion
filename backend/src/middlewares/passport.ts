import config from '../config/dotenv';
import User, { IUser } from '../services/auth/user/User.model';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id).populate('roles');
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
