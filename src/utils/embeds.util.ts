import { EmbedBuilder } from "discord.js";
import { ColorsUtil } from "./colors.util";

export class EmbedsUtil {
    static info(title: string, lines: string[] = []): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(new ColorsUtil().transparent)
            .setDescription(`\`\`\`\n ${title} \n\`\`\`${lines.map(l => '\n» ' + l).join('')}`);
    }

    static success(title: string, lines: string[] = []): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(new ColorsUtil().green)
            .setDescription(`\`\`\`\n ${title} \n\`\`\`${lines.map(l => '\n» ' + l).join('')}`);
    }

    static warning(title: string, lines: string[] = []): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(new ColorsUtil().yellow)
            .setDescription(`\`\`\`\n ${title} \n\`\`\`${lines.map(l => '\n» ' + l).join('')}`);
    }

    static error(title: string, lines: string[] = []): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(new ColorsUtil().red)
            .setDescription(`\`\`\`\n ${title} \n\`\`\`${lines.map(l => '\n» ' + l).join('')}`);
    }
}