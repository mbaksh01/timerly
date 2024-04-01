import { EmbedBuilder } from "discord.js";
import { getAllScores } from "../db.js";
import { sortScores } from "../timerly.js";

export async function getLeaderboardEmbed() {
    const scores = sortScores(await getAllScores());

    const leaderboardEmbed = new EmbedBuilder()
        .setColor(0xe47377)
        .setTitle('Leaderboard')
        .addFields(...scores
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