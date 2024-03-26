import 'dotenv/config'
import { init as dbInit } from './db.js';
import { init as botInit } from './bot.js';

dbInit();
botInit();
