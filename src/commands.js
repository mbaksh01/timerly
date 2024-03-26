import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Simple test command
const TEST_COMMAND = {
  name: 'leaderboard',
  description: 'Displays a leaderboard of all the scores.',
  type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);