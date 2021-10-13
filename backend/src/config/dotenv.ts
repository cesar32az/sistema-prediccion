import * as dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV;

if (environment === 'production') {
  dotenv.config();
} else {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.dev') });
}

export default {
  jwtSecret: process.env.JWT_SECRET || 'secretJR',
  DB: {
    MONGODB_HOST: process.env.MONGODB_HOST || 'localhost', // dockers: mongo
    MONGODB_PORT: process.env.MONGODB_PORT || 27017,
    MONGODB_DATABASE: process.env.MONGODB_DB || 'tsc-mongo',
    USER: process.env.MONGODB_USER || 'root',
    PASS: process.env.MONGODB_PASSWORD || 'julio123',
  },
};
