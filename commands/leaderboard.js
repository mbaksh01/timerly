import { EmbedBuilder } from "discord.js";
import { getAllScores } from "../db.js";

export async function getLeaderboardEmbed() {
    const scores = await getAllScores();

    const leaderboardEmbed = new EmbedBuilder()
        .setColor(0xe47377)
        .setTitle('Leaderboard')
        .addFields(...scores
            .sort((a, b) => new Date(a.lastUpdatedDateTimeUTC) - new Date(b.lastUpdatedDateTimeUTC))
            .map((score, index) => {
                let prefix = '';

                if (index === 0) {
                    prefix = '🥇 ';
                } else if (index === 1) {
                    prefix = '🥈 ';
                } else if (index === 2) {
                    prefix = '🥉 ';
                }

                return {
                    name: `${prefix}${score.username}`,
                    value: `Score: ${score.score}`
                };
            }
        ));

    return leaderboardEmbed;
}