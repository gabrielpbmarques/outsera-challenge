import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  env: string;
  jwtSecret: string;
  dbUrl: string;
  sentryDsn: string;
}

export const config: IConfig = {
  env: process.env.MODE,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DB_URL,
  sentryDsn: process.env.SENTRY_DSN,
};
