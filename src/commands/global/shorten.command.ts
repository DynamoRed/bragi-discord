import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import axios, { AxiosResponse } from 'axios';
import { ICommand } from "../../utils/interfaces/command.interface";
import { EmbedsUtil } from "../../utils/embeds.util";
import { API } from "../../utils/api.util";

const command: ICommand = {
    name: 'shorten',
    global: true,
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('shorten')
        .setDescription('Shorten an URL')
        .addStringOption(opt => opt.setName("url").setDescription("URL you want to shorten").setRequired(true)),
    execute(interaction: CommandInteraction, app: Client) {
        const url: string = interaction.options.get('url')?.value?.toString() || `https://dynamored.com`;

        if(!url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)){
            return interaction.reply({embeds: [EmbedsUtil.warning('😠 Invalid URL')], ephemeral: true});
        }

        axios.post(new API().shortenUrl(), new URLSearchParams({ url }), {headers: {"api-key": process.env.API_KEY}})
        .then((res: AxiosResponse) => {
            if(res.data){
                interaction.reply({embeds: [EmbedsUtil.info('🕺 Here is it !', [`https://dynamo.red/${res.data.data}`])], ephemeral: false});
            } else {
                interaction.reply({embeds: [EmbedsUtil.warning('😖 No result found')], ephemeral: true});
            }
        }).catch(reason => {
            interaction.reply({embeds: [EmbedsUtil.error('😕 An error occured. Please contact our administration team')], ephemeral: true});
        })
    },
}

module.exports = command;