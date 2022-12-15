import { IEvent } from "../utils/interfaces/event.interface"
import { CommandsHandler } from "../handlers/commands.handler";
import { REST, Routes, RESTPostAPIApplicationCommandsJSONBody, Client } from 'discord.js';
import { Logging, LogType } from '../utils/logging.util';
import { EmbedsUtil } from "../utils/embeds.util";

const event: IEvent = {
    name: 'ready',
    once: true,
    execute(app: Client){
		Logging.write('Initialization ended', LogType.Header);
        Logging.write('App is now ready !', LogType.Success);
		app.channels.fetch("1051514676464320542").then((channel: any) => {
			Logging.loggingChannel = channel;
			Logging.loggingChannel?.send({embeds: [EmbedsUtil.success("🤖 Bot started")]});
		})

		const rest = new REST({version: '10'}).setToken(process.env.TOKEN || 'NO_TOKEN');

		try {
			const jsonGlobalCommands: RESTPostAPIApplicationCommandsJSONBody[] = CommandsHandler.commands.filter(c => c.global).map(c => c.data.toJSON());
			rest.put(Routes.applicationCommands(app.user?.id || ''), {body: jsonGlobalCommands});

			let specificServersIds: string[] = [];
			CommandsHandler.commands.filter(c => !c.global && c.specificTo).forEach(c => {
				c.specificTo?.forEach(s => { if(!specificServersIds.includes(s)) specificServersIds.push(s); });
			})

			specificServersIds.forEach(s => {
				const jsonSpecificCommands: RESTPostAPIApplicationCommandsJSONBody[] = CommandsHandler.commands.filter(c => !c.global && c.specificTo?.includes(s)).map(c => c.data.toJSON());
				rest.put(Routes.applicationGuildCommands(app.user?.id || '', s), {body: jsonSpecificCommands});
			})
		} catch (err) {
			Logging.write(`${err}`, LogType.Error);
		}
    }
}

module.exports = event;