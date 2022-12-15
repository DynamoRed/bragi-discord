import fs from 'fs';
import { Configuration } from './config.util';
import color from 'colors/safe';
import { EmbedBuilder, Guild, TextChannel } from 'discord.js';
import app from '../app';
import { EmbedsUtil } from './embeds.util';

export enum LogType {
	Title = "TITLE",
	Header = "HEADER",

	Error = "ERROR",
	Warning = "WARNING",
	Success = "SUCCESS",
	Info = "INFO",
}

export class Logging {
	static loggingChannel: TextChannel;

	constructor(){}

	static init(): Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(this._logPath, "", err => {
				if(err){
					console.error("An error occured when writing logs");
					reject();
					throw err;
				}

				resolve();
			})
		});
	}

	static logInChannel(serverId: string | null, title: string, content?: string[]): Promise<void>{
		const from: Guild | undefined = app.guilds.cache.find(g => g.id === serverId);
		return new Promise((resolve, reject) => {
			const emb: EmbedBuilder = EmbedsUtil.info(title, content);
			if(from) emb.setFooter({text: `on ${from?.name}`, iconURL: from?.iconURL() || ""});
			else emb.setFooter({text: `in DM`, iconURL: app.user?.avatarURL() || ""});
			this.loggingChannel.send({embeds: [emb]}).then(() => resolve()).catch(() => reject());
		});
	}

	static write(content: string, type: LogType = LogType.Info): void {
		if(!content || !fs.existsSync(this._logPath)) return;

		let nowDate = new Date().toLocaleString("fr-FR", {hour12: false});
		let finalLog = [LogType.Title, LogType.Header].includes(type) ? `${nowDate} - ${content}` : `${nowDate} - [${type.toUpperCase()}] ${content}`;
		let consoleLog = [LogType.Title, LogType.Header].includes(type) ? content : `[${type.toUpperCase()}] ${content}`;

		fs.appendFile(this._logPath, finalLog+'\n', err => {
			if(err){
				console.error("An error occured when saving logs");
				throw err;
			}

			switch(type){
				case LogType.Error:
					console.log(color.red(consoleLog));
					break;

				case LogType.Warning:
					console.log(color.yellow(consoleLog));
					break;

				case LogType.Success:
					console.log(color.green(consoleLog));
					break;

				case LogType.Header:
					console.log(color.bold(color.white(`\n##############################################`)));
					console.log(color.bold(color.white(consoleLog)));
					console.log(color.bold(color.white(`##############################################`)));
					break;

				case LogType.Title:
					console.log(color.cyan(`\n**********************************************`));
					console.log(color.cyan(consoleLog));
					console.log(color.cyan(`**********************************************\n`));
					break;

				default:
					console.log(color.grey(consoleLog));
			}
		})
	}

	private static get _logPath(){
		return `${process.env.LOG_FLDR}/${new Configuration().name.toLowerCase()}/${new Date().toLocaleDateString("fr-FR").replaceAll('/', '-')}.log`;
	}
}