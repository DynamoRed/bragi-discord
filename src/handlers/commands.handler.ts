import fs from 'fs';
import { Logging, LogType } from '../utils/logging.util';
import { ICommand } from "../utils/interfaces/command.interface";
import { Collection, User } from 'discord.js';

export class CommandsHandler {
	static commands: ICommand[] = [];
	static timeouts: Collection<User, string[]> = new Collection<User, string[]>();

	static handle(): Promise<void>{
		return new Promise((resolve, reject) => {
			Logging.write(`Handling commands`, LogType.Title);

			fs.readdirSync('./src/commands').filter(el => !el.endsWith('.command.ts')).forEach(folder => {
				fs.readdirSync(`./src/commands/${folder}`).filter(el => el.endsWith('command.ts')).forEach(file => {
					const command: ICommand = require(`../commands/${folder}/${file}`);
					this.commands.push(command);
					Logging.write(`Found ${folder}/${command.data.name}: ${file}`);
				})
			});

			resolve();
		});
	}
}