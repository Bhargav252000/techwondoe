import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Apple from './apple';
import config from './ormconfig';
import validateEnv from './utils/validateEnv';

import AuthenticationController from './authentication/authentication.controller';
import TeamsController from './teams/teams.controller';
import CompanyController from './company/company.controller';

validateEnv();

(async () => {
  let retries = 5;
  while (retries) {
    try {
      console.log('Connecting to database...');
      await createConnection(config);
      console.log('Connected to the database');
      break;
    } catch (error) {
      retries--;
      console.log(`Failed to connect to the database. Retrying...attempts left: ${retries}`);
      console.log('Error while connecting to the database', error);

      await new Promise(resolve => setTimeout(resolve, 4000));

      return error;
    }
  }
  const app = new Apple([
    new AuthenticationController(),
    new TeamsController(),
    new CompanyController(),
  ]);
  app.listen();
})();
