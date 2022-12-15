require("dotenv").config();
import { ActivityType, Client } from 'discord.js';
import { CommandsHandler } from './handlers/commands.handler';
import { EventsHandler } from './handlers/events.handler';
import { Configuration } from './utils/config.util';
import { Logging, LogType } from './utils/logging.util';
import { v4 as uuidV4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import { API } from './utils/api.util';

const appRunnerUuid: string = uuidV4();

const app: Client = new Client({
	intents: ["Guilds", "GuildMembers", "GuildMessages", "GuildMessageReactions", "MessageContent"],
	presence: {
		status: 'online',
		activities: [{ name: 'Shortening a quantum computer', type: ActivityType.Playing }]
	}
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
	console.error(`Unhandled rejection: ${reason?.stack || reason}`);
})

const start = () => {
	const envConfig: Configuration = new Configuration();

	Logging.write(`Starting app ${appRunnerUuid}: ${envConfig.name} (${envConfig.version})`, LogType.Header);

	axios.get(new API().authorizationUrl(process.env.API_KEY))
	.then((res: AxiosResponse) => {
		if(res.data.data != 'true'){
			Logging.write(`Invalid API Key provided.`, LogType.Error);
		} else {
			CommandsHandler.handle().then(() => {
				EventsHandler.handle().then(() => {
					Logging.write(`Application final launch phase`, LogType.Title);
					app.login(process.env.TOKEN);
					Logging.write("Connected to the API", LogType.Success);
				});
			});
		}
	}).catch(reason => {
		Logging.write(`Failed connecting to the API. ${reason}`, LogType.Error);
	})
}

Logging.init().then(() => {
	start();
});

export default app;