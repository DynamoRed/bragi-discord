import { Client, Interaction } from "discord.js";
import { CommandsHandler } from "../handlers/commands.handler";
import { Logging, LogType } from "../utils/logging.util";
import { IEvent } from "../utils/interfaces/event.interface";
import { EmbedsUtil } from "../utils/embeds.util";

const event: IEvent = {
    name: 'interactionCreate',
    execute(app: Client, interaction: Interaction){
        if(interaction.isCommand()){
            CommandsHandler.commands.filter(cmd => cmd.name === interaction.commandName).forEach(cmd => {
                if(cmd.inTest && interaction.user.id != "324956349353951232") return interaction.reply({embeds: [EmbedsUtil.warning("⚗️ This command is in development. You're not allowed to use it !")], ephemeral: true});

                if(cmd.restrictToChannels && !cmd.restrictToChannels.includes(interaction.channelId)) return interaction.reply({embeds: [EmbedsUtil.error("⚠️ You cannot use that here !")], ephemeral: true});

                if(CommandsHandler.timeouts.get(interaction.user)?.includes(cmd.name)) return interaction.reply({embeds: [EmbedsUtil.warning("⏰ You need to wait before using that again !")], ephemeral: true});

                let argsStr: string = interaction.options.data.map(opt => opt.name + ": " + opt.value).join(" ");
                Logging.logInChannel(interaction.guildId, "🏷️ Command send", [`${interaction.user} send \`/${interaction.commandName} ${argsStr}\` in ${interaction.channel}`]).then(() => {
                    try {
                        cmd.execute(interaction, app);

                        let timeoutCommands = CommandsHandler.timeouts.get(interaction.user) || [];
                        timeoutCommands.push(cmd.name);
                        CommandsHandler.timeouts.set(interaction.user, timeoutCommands);
                        setTimeout(() => {
                            CommandsHandler.timeouts.set(interaction.user, CommandsHandler.timeouts.get(interaction.user)?.filter(c => c != cmd.name) || []);
                        }, (cmd.timeout || 0)*1000);
                    } catch (err) {
                        Logging.write(`${err}`, LogType.Error);
                        interaction.reply(`An error occurred. Please contact an Administrator !`);
                    }
                });
            })
        }
    }
}

module.exports = event;