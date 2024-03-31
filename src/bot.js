import { Client, GatewayIntentBits, Events } from 'discord.js';
import { checkTime, formatAsTimeTaken } from './timerly.js';
import { isTimeTaken, markTimeAsTaken, upsertUserScore } from './db.js';
import { getLeaderboardEmbed } from './commands/leaderboard.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('messageCreate', async message => {
    if (message.author.tag === client.user.tag) {
        return;
    }

    if (message.content.length !== 4 || isNaN(parseInt(message.content))) {
        return;
    }

    const messageDate = new Date(message.createdTimestamp);
    const formattedTime = formatAsTimeTaken(messageDate);

    const messageFomattedTime =
        `${message.content[0]}${message.content[1]}:${message.content[2]}${message.content[3]}`;

    console.log(`Timestamp of discord message: ${messageDate}`);
    console.log(`Timestamp of discord message fomatted for internal use: ${formattedTime}`);
    console.log(`Content of message formatted as time: ${messageFomattedTime}`);

    if (formattedTime.includes(messageFomattedTime) === false) {
        await message.react('❌');
        console.log('Rejected due to message content not including current time.');
        return;
    }

    if (await isTimeTaken(formattedTime)) {
        await message.react('❌');
        console.log('Rejected due to time already existing in the db.');
        return;
    }

    const points = checkTime({ date: messageDate });

    if (points === 0) {
        await message.react('❌');
        console.log('Rejected due to points equaling 0.');
    } else {
        await upsertUserScore(message.author.tag, points);
        await markTimeAsTaken(formattedTime);
        await message.react('✅');

        if (points === 1) {
            await message.react('1️⃣');
        } else if (points === 2) { 
            await message.react('2️⃣');
        } else if (points === 3) {
            await message.react('3️⃣')
        }
    }
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) {
        return;
    }

    if (interaction.commandName !== 'leaderboard') {
        return;
    }

    await interaction.reply({ 
        embeds: [await getLeaderboardEmbed()]
    })
});

export function init() {
    client.login(process.env.DISCORD_TOKEN);
}
