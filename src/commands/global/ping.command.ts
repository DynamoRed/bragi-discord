import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../utils/interfaces/command.interface";
import { EmbedsUtil } from "../../utils/embeds.util";

const command: ICommand = {
    name: 'ping',
    global: true,
    timeout: 60,
    data: new SlashCommandBuilder().setName('ping').setDescription('Get latence'),
    execute(interaction: CommandInteraction, app: Client) {
        interaction.reply({embeds: [EmbedsUtil.info('🏓 Pong', [`**Client:** \`${Date.now() - interaction.createdTimestamp}ms\``])], ephemeral: true});
    },
}

module.exports = command;