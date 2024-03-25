import { Client, GatewayIntentBits } from 'discord.js';
import { checkTime, formatAsTimeTaken } from './timerly.js';
import { isTimeTaken, markTimeAsTaken, upsertUserScore } from './db.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('messageCreate', async message => {
    if (message.author.tag === client.user.tag) {
        return;
    }

    if (message.content.length !== 4 || !parseInt(message.content)) {
        return;
    }

    const messageDate = new Date(message.createdTimestamp);
    const formattedTime = formatAsTimeTaken(messageDate);

    if (await isTimeTaken(formattedTime)) {
        await message.react('❌');
        return;
    }

    const points = checkTime({ date: messageDate });

    if (points === 0) {
        await message.react('❌');
    } else {
        await upsertUserScore(message.author.tag, points);
        await markTimeAsTaken(formattedTime);
        await message.react('✅');
    }
});

export function init() {
    client.login(process.env.DISCORD_TOKEN);
}
