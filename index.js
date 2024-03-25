import 'dotenv/config'
import { init as dbInit } from './db.js';
import { init as botInit } from './bot.js';
import express from 'express';
import { VerifyDiscordRequest } from './utils.js';
import {
    InteractionType,
    InteractionResponseType,

} from 'discord-interactions';
import { getLeaderboardEmbed } from './commands/leaderboard.js';

dbInit();
botInit();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
    const { type, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        if (name === 'leaderboard') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    embeds: [
                        await getLeaderboardEmbed()
                    ]
                },
            });
        }
    }
});
  
app.listen(port, () => {
    console.log('Listening on port', port);
});

// console.log("00:00 = " + checkTime({ date: new Date(2024, 2, 1, 0, 0, 0, 0) }));
// console.log("01:01 = " + checkTime({ date: new Date(2024, 2, 1, 1, 1, 0, 0) }));
// console.log("01:10 = " + checkTime({ date: new Date(2024, 2, 1, 1, 10, 0, 0) }));
// console.log("01:23 = " + checkTime({ date: new Date(2024, 2, 1, 1, 23, 0, 0) }));
// console.log("02:02 = " + checkTime({ date: new Date(2024, 2, 1, 2, 2, 0, 0) }));
// console.log("02:20 = " + checkTime({ date: new Date(2024, 2, 1, 2, 20, 0, 0) }));
// console.log("03:03 = " + checkTime({ date: new Date(2024, 2, 1, 3, 3, 0, 0) }));
// console.log("03:30 = " + checkTime({ date: new Date(2024, 2, 1, 3, 30, 0, 0) }));
// console.log("04:04 = " + checkTime({ date: new Date(2024, 2, 1, 4, 4, 0, 0) }));
// console.log("04:40 = " + checkTime({ date: new Date(2024, 2, 1, 4, 40, 0, 0) }));
// console.log("05:05 = " + checkTime({ date: new Date(2024, 2, 1, 5, 5, 0, 0) }));
// console.log("05:50 = " + checkTime({ date: new Date(2024, 2, 1, 5, 50, 0, 0) }));
// console.log("06:06 = " + checkTime({ date: new Date(2024, 2, 1, 6, 6, 0, 0) }));
// console.log("07:07 = " + checkTime({ date: new Date(2024, 2, 1, 7, 7, 0, 0) }));
// console.log("08:08 = " + checkTime({ date: new Date(2024, 2, 1, 8, 8, 0, 0) }));
// console.log("09:09 = " + checkTime({ date: new Date(2024, 2, 1, 9, 9, 0, 0) }));
// console.log("10:01 = " + checkTime({ date: new Date(2024, 2, 1, 10, 1, 0, 0) }));
// console.log("10:10 = " + checkTime({ date: new Date(2024, 2, 1, 10, 10, 0, 0) }));
// console.log("11:11 = " + checkTime({ date: new Date(2024, 2, 1, 11, 11, 0, 0) }));
// console.log("12:12 = " + checkTime({ date: new Date(2024, 2, 1, 12, 12, 0, 0) }));
// console.log("12:21 = " + checkTime({ date: new Date(2024, 2, 1, 12, 21, 0, 0) }));
// console.log("12:34 = " + checkTime({ date: new Date(2024, 2, 1, 12, 34, 0, 0) }));
// console.log("13:13 = " + checkTime({ date: new Date(2024, 2, 1, 13, 13, 0, 0) }));
// console.log("13:31 = " + checkTime({ date: new Date(2024, 2, 1, 13, 31, 0, 0) }));
// console.log("14:14 = " + checkTime({ date: new Date(2024, 2, 1, 14, 14, 0, 0) }));
// console.log("14:41 = " + checkTime({ date: new Date(2024, 2, 1, 14, 41, 0, 0) }));
// console.log("15:15 = " + checkTime({ date: new Date(2024, 2, 1, 15, 15, 0, 0) }));
// console.log("15:51 = " + checkTime({ date: new Date(2024, 2, 1, 15, 51, 0, 0) }));
// console.log("16:16 = " + checkTime({ date: new Date(2024, 2, 1, 16, 16, 0, 0) }));
// console.log("17:17 = " + checkTime({ date: new Date(2024, 2, 1, 17, 17, 0, 0) }));
// console.log("18:18 = " + checkTime({ date: new Date(2024, 2, 1, 18, 18, 0, 0) }));
// console.log("19:19 = " + checkTime({ date: new Date(2024, 2, 1, 19, 19, 0, 0) }));
// console.log("20:20 = " + checkTime({ date: new Date(2024, 2, 1, 20, 20, 0, 0) }));
// console.log("21:12 = " + checkTime({ date: new Date(2024, 2, 1, 21, 12, 0, 0) }));
// console.log("21:21 = " + checkTime({ date: new Date(2024, 2, 1, 21, 21, 0, 0) }));
// console.log("22:22 = " + checkTime({ date: new Date(2024, 2, 1, 22, 22, 0, 0) }));
// console.log("23:23 = " + checkTime({ date: new Date(2024, 2, 1, 23, 23, 0, 0) }));
// console.log("23:32 = " + checkTime({ date: new Date(2024, 2, 1, 23, 32, 0, 0) }));