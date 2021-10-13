import { connect, ConnectOptions } from 'mongoose';
import config from './dotenv';

const URI: string = `mongodb://${config.DB.MONGODB_HOST}:${config.DB.MONGODB_PORT}/${config.DB.MONGODB_DATABASE}`;
const options: ConnectOptions = {
  authSource: 'admin',
  user: config.DB.USER,
  pass: config.DB.PASS,
};

(async () => {
  try {
    await connect(URI, options);
    console.log(`🟢 The database ${config.DB.MONGODB_DATABASE} is connected.`);
  } catch (error) {
    console.error(`🔴 Unable to connect to the database: ${error}.`);
  }
})();
